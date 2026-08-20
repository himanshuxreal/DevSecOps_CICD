import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Display from './components/Display';
import Keypad from './components/Keypad';
import HistoryDrawer from './components/HistoryDrawer';
import UnitConverter from './components/UnitConverter';
import KeyboardModal from './components/KeyboardModal';
import { THEMES } from './utils/themes';
import { playSound } from './utils/audio';
import { evaluateExpression, formatResult } from './utils/mathEngine';

export default function App() {
  // Application State
  const [mode, setMode] = useState(() => localStorage.getItem('procalc_mode') || 'standard');
  const [theme, setTheme] = useState(() => localStorage.getItem('procalc_theme') || 'dark');
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('procalc_sound');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [equation, setEquation] = useState('');
  const [currentInput, setCurrentInput] = useState('0');
  const [activeOperator, setActiveOperator] = useState(null);
  const [angleMode, setAngleMode] = useState('DEG'); // 'DEG' | 'RAD'
  const [memoryValue, setMemoryValue] = useState(0);
  const [isResultState, setIsResultState] = useState(false);
  const [error, setError] = useState(null);

  // History State
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('procalc_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isKeyboardModalOpen, setIsKeyboardModalOpen] = useState(false);
  const [pressedKeyVisual, setPressedKeyVisual] = useState(null);

  // Persist settings
  useEffect(() => {
    localStorage.setItem('procalc_mode', mode);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem('procalc_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('procalc_sound', JSON.stringify(soundEnabled));
  }, [soundEnabled]);

  useEffect(() => {
    localStorage.setItem('procalc_history', JSON.stringify(history));
  }, [history]);

  const currentThemeObj = THEMES.find((t) => t.id === theme) || THEMES[0];
  const themeStyles = currentThemeObj.styles;

  // Clear All
  const handleClear = useCallback(() => {
    playSound('clear', soundEnabled);
    setEquation('');
    setCurrentInput('0');
    setActiveOperator(null);
    setIsResultState(false);
    setError(null);
  }, [soundEnabled]);

  // Clear Entry
  const handleClearEntry = useCallback(() => {
    playSound('clear', soundEnabled);
    setCurrentInput('0');
    setError(null);
  }, [soundEnabled]);

  // Backspace (Delete last digit)
  const handleBackspace = useCallback(() => {
    playSound('digit', soundEnabled);
    if (error) {
      handleClear();
      return;
    }
    if (isResultState) {
      setCurrentInput('0');
      setIsResultState(false);
      return;
    }
    if (currentInput.length > 1) {
      setCurrentInput(currentInput.slice(0, -1));
    } else {
      setCurrentInput('0');
    }
  }, [error, isResultState, currentInput, handleClear, soundEnabled]);

  // Digit or Parenthesis
  const handleDigit = useCallback(
    (digit) => {
      playSound('digit', soundEnabled);
      setError(null);

      if (digit === '(' || digit === ')') {
        if (isResultState) {
          setEquation(digit);
          setCurrentInput('');
          setIsResultState(false);
        } else {
          setEquation((prev) => (prev ? `${prev} ${digit}` : digit));
        }
        return;
      }

      if (isResultState) {
        setEquation('');
        setCurrentInput(digit === '.' ? '0.' : digit);
        setIsResultState(false);
        return;
      }

      if (digit === '.') {
        if (currentInput.includes('.')) return;
        setCurrentInput(currentInput === '' || currentInput === '0' ? '0.' : currentInput + '.');
        return;
      }

      if (currentInput === '0') {
        setCurrentInput(digit);
      } else {
        if (currentInput.length < 24) {
          setCurrentInput(currentInput + digit);
        }
      }
    },
    [soundEnabled, isResultState, currentInput]
  );

  // Binary Operator (+, -, *, /, ^)
  const handleOperator = useCallback(
    (op) => {
      playSound('operator', soundEnabled);
      setError(null);

      const opSymbol = op === '*' ? '×' : op === '/' ? '÷' : op === '-' ? '−' : op;

      if (isResultState) {
        setEquation(`${currentInput} ${opSymbol}`);
        setCurrentInput('');
        setActiveOperator(opSymbol);
        setIsResultState(false);
        return;
      }

      if (currentInput !== '') {
        const newEquation = equation ? `${equation} ${currentInput} ${opSymbol}` : `${currentInput} ${opSymbol}`;
        setEquation(newEquation);
        setCurrentInput('');
        setActiveOperator(opSymbol);
      } else if (equation) {
        // Replace trailing operator
        const tokens = equation.trim().split(' ');
        const lastToken = tokens[tokens.length - 1];
        if (['+', '−', '×', '÷', '^', '%'].includes(lastToken)) {
          tokens[tokens.length - 1] = opSymbol;
          setEquation(tokens.join(' '));
          setActiveOperator(opSymbol);
        }
      }
    },
    [soundEnabled, isResultState, currentInput, equation]
  );

  // Equals / Evaluate
  const handleEquals = useCallback(() => {
    if (error) {
      handleClear();
      return;
    }

    let fullExpr = equation;
    if (currentInput !== '') {
      fullExpr = fullExpr ? `${fullExpr} ${currentInput}` : currentInput;
    }

    if (!fullExpr || !fullExpr.trim()) return;

    const evalResult = evaluateExpression(fullExpr, angleMode);

    if (evalResult.success) {
      playSound('equals', soundEnabled);
      const newHistoryItem = {
        id: Date.now(),
        equation: fullExpr,
        result: evalResult.formatted,
        timestamp: Date.now()
      };
      setHistory((prev) => [newHistoryItem, ...prev].slice(0, 50));
      setCurrentInput(evalResult.formatted);
      setEquation('');
      setActiveOperator(null);
      setIsResultState(true);
      setError(null);
    } else {
      playSound('error', soundEnabled);
      setError(evalResult.error || 'Error');
    }
  }, [equation, currentInput, angleMode, soundEnabled, error, handleClear]);

  // Scientific Functions
  const handleScientificFunc = useCallback(
    (func) => {
      playSound('function', soundEnabled);
      setError(null);

      const val = parseFloat(currentInput.replace(/,/g, '')) || 0;

      switch (func) {
        case 'pi':
          setCurrentInput(Math.PI.toString());
          setIsResultState(false);
          break;
        case 'e':
          setCurrentInput(Math.E.toString());
          setIsResultState(false);
          break;
        case 'sin':
        case 'cos':
        case 'tan':
        case 'asin':
        case 'acos':
        case 'atan':
        case 'log':
        case 'ln':
        case 'sqrt':
        case 'cbrt':
        case 'fact':
        case 'recip':
        case 'sqr':
        case 'cube':
        case 'exp':
        case 'pow10': {
          const expr = `${func}(${val})`;
          const evalRes = evaluateExpression(expr, angleMode);
          if (evalRes.success) {
            setCurrentInput(evalRes.formatted);
            setIsResultState(true);
            const newHistoryItem = {
              id: Date.now(),
              equation: `${func}(${val})`,
              result: evalRes.formatted,
              timestamp: Date.now()
            };
            setHistory((prev) => [newHistoryItem, ...prev].slice(0, 50));
          } else {
            playSound('error', soundEnabled);
            setError(evalRes.error || 'Error');
          }
          break;
        }
        case 'pow':
          handleOperator('^');
          break;
        default:
          break;
      }
    },
    [currentInput, angleMode, soundEnabled, handleOperator]
  );

  // Toggle Sign (+/-)
  const handleToggleSign = useCallback(() => {
    playSound('digit', soundEnabled);
    if (!currentInput || currentInput === '0') return;
    if (currentInput.startsWith('-')) {
      setCurrentInput(currentInput.substring(1));
    } else {
      setCurrentInput('-' + currentInput);
    }
  }, [currentInput, soundEnabled]);

  // Memory Actions (MC, MR, M+, M-, MS)
  const handleMemoryAction = useCallback(
    (action) => {
      playSound('function', soundEnabled);
      const val = parseFloat(currentInput.replace(/,/g, '')) || 0;

      switch (action) {
        case 'MC':
          setMemoryValue(0);
          break;
        case 'MR':
          setCurrentInput(formatResult(memoryValue));
          setIsResultState(true);
          break;
        case 'M+':
          setMemoryValue((prev) => prev + val);
          setIsResultState(true);
          break;
        case 'M-':
          setMemoryValue((prev) => prev - val);
          setIsResultState(true);
          break;
        case 'MS':
          setMemoryValue(val);
          setIsResultState(true);
          break;
        default:
          break;
      }
    },
    [currentInput, memoryValue, soundEnabled]
  );

  // Select Calculation from History
  const handleSelectCalculation = (item, type = 'result') => {
    playSound('digit', soundEnabled);
    if (type === 'equation') {
      setEquation(item.equation);
      setCurrentInput('');
    } else {
      setCurrentInput(String(item.result));
    }
    setIsResultState(true);
    setIsHistoryOpen(false);
  };

  // Keyboard Event Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      // If user is typing in an input field (e.g. Unit converter), don't intercept standard typing
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes(e.target.tagName)) {
        return;
      }

      const key = e.key;

      if (key >= '0' && key <= '9') {
        e.preventDefault();
        handleDigit(key);
      } else if (key === '.') {
        e.preventDefault();
        handleDigit('.');
      } else if (key === '+' || key === '-') {
        e.preventDefault();
        handleOperator(key);
      } else if (key === '*') {
        e.preventDefault();
        handleOperator('×');
      } else if (key === '/') {
        e.preventDefault();
        handleOperator('÷');
      } else if (key === '^') {
        e.preventDefault();
        handleOperator('^');
      } else if (key === '(' || key === ')') {
        e.preventDefault();
        handleDigit(key);
      } else if (key === 'Enter' || key === '=') {
        e.preventDefault();
        handleEquals();
      } else if (key === 'Backspace') {
        e.preventDefault();
        handleBackspace();
      } else if (key === 'Escape') {
        e.preventDefault();
        if (isHistoryOpen) setIsHistoryOpen(false);
        else if (isKeyboardModalOpen) setIsKeyboardModalOpen(false);
        else handleClear();
      } else if (key.toLowerCase() === 'c') {
        e.preventDefault();
        handleClear();
      } else if (key.toLowerCase() === 'h') {
        e.preventDefault();
        setIsHistoryOpen((prev) => !prev);
      } else if (key.toLowerCase() === 's') {
        e.preventDefault();
        setMode((prev) => (prev === 'standard' ? 'scientific' : 'standard'));
      } else if (key.toLowerCase() === 'm') {
        e.preventDefault();
        setSoundEnabled((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    handleDigit,
    handleOperator,
    handleEquals,
    handleBackspace,
    handleClear,
    isHistoryOpen,
    isKeyboardModalOpen,
    soundEnabled
  ]);

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center p-3 sm:p-6 transition-colors duration-500 ${themeStyles.bg}`}>
      {/* Dynamic Background Glow / Blur elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      {/* Main Glass Calculator Container */}
      <main
        className={`w-full max-w-md ${
          mode === 'scientific' ? 'sm:max-w-xl' : 'sm:max-w-md'
        } rounded-3xl border shadow-2xl transition-all duration-300 relative z-10 flex flex-col ${themeStyles.calcContainer}`}
      >
        {/* Navigation & Toolbar Header */}
        <Header
          mode={mode}
          setMode={setMode}
          theme={theme}
          setTheme={setTheme}
          soundEnabled={soundEnabled}
          setSoundEnabled={setSoundEnabled}
          toggleHistory={() => setIsHistoryOpen(true)}
          historyCount={history.length}
          toggleKeyboardModal={() => setIsKeyboardModalOpen(true)}
        />

        {/* Dynamic Body: Converter vs Calculator */}
        <div className="p-4 sm:p-5 flex flex-col">
          {mode === 'converter' ? (
            <UnitConverter themeStyles={themeStyles} />
          ) : (
            <>
              {/* Display Panel */}
              <Display
                equation={equation}
                currentInput={currentInput}
                activeOperator={activeOperator}
                angleMode={angleMode}
                toggleAngleMode={() => setAngleMode(angleMode === 'DEG' ? 'RAD' : 'DEG')}
                memoryValue={memoryValue}
                themeStyles={themeStyles}
                onBackspace={handleBackspace}
                onClear={handleClear}
                error={error}
              />

              {/* Keypad */}
              <Keypad
                mode={mode}
                themeStyles={themeStyles}
                onDigit={handleDigit}
                onOperator={handleOperator}
                onEquals={handleEquals}
                onClear={handleClear}
                onClearEntry={handleClearEntry}
                onToggleSign={handleToggleSign}
                onScientificFunc={handleScientificFunc}
                onMemoryAction={handleMemoryAction}
                memoryValue={memoryValue}
                angleMode={angleMode}
                toggleAngleMode={() => setAngleMode(angleMode === 'DEG' ? 'RAD' : 'DEG')}
                pressedKey={pressedKeyVisual}
              />
            </>
          )}
        </div>
      </main>

      {/* Footer Branding & Helper Note */}
      <footer className="mt-4 text-center text-xs text-slate-400/80 font-medium z-10 flex items-center gap-2">
        <span>Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono text-[10px]">H</kbd> for history</span>
        <span>•</span>
        <span><kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono text-[10px]">S</kbd> for scientific mode</span>
      </footer>

      {/* History Drawer */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelectCalculation={handleSelectCalculation}
        onClearHistory={() => setHistory([])}
        onDeleteHistoryItem={(id) => setHistory((prev) => prev.filter((h) => h.id !== id))}
        themeStyles={themeStyles}
      />

      {/* Keyboard Shortcuts Modal */}
      <KeyboardModal
        isOpen={isKeyboardModalOpen}
        onClose={() => setIsKeyboardModalOpen(false)}
      />
    </div>
  );
}
