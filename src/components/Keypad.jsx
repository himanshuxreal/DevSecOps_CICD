import React, { useState } from 'react';
import { 
  Divide, 
  X as Multiply, 
  Minus, 
  Plus, 
  Equal
} from 'lucide-react';

export default function Keypad({
  mode,
  themeStyles,
  onDigit,
  onOperator,
  onEquals,
  onClear,
  onClearEntry,
  onPercent,
  onToggleSign,
  onScientificFunc,
  onMemoryAction,
  memoryValue,
  angleMode,
  toggleAngleMode,
  pressedKey
}) {
  const [secondFunc, setSecondFunc] = useState(false);

  // Common button styling helper
  const baseBtn = "relative overflow-hidden font-semibold select-none rounded-xl sm:rounded-2xl transition-all duration-100 active:scale-95 flex items-center justify-center shadow-sm text-sm sm:text-base cursor-pointer focus:outline-none";

  return (
    <div className="w-full flex flex-col gap-2 sm:gap-3 mt-3">
      {/* Memory Bar */}
      <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
        <button
          onClick={() => onMemoryAction('MC')}
          title="Memory Clear"
          className={`${baseBtn} py-1.5 text-xs ${
            memoryValue !== 0 
              ? 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40' 
              : 'bg-white/5 text-slate-500 hover:bg-white/10 hover:text-slate-300'
          }`}
        >
          MC
        </button>
        <button
          onClick={() => onMemoryAction('MR')}
          title="Memory Recall"
          className={`${baseBtn} py-1.5 text-xs ${
            memoryValue !== 0 
              ? 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40' 
              : 'bg-white/5 text-slate-500 hover:bg-white/10 hover:text-slate-300'
          }`}
        >
          MR
        </button>
        <button
          onClick={() => onMemoryAction('M+')}
          title="Memory Add"
          className={`${baseBtn} py-1.5 text-xs bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/5`}
        >
          M+
        </button>
        <button
          onClick={() => onMemoryAction('M-')}
          title="Memory Subtract"
          className={`${baseBtn} py-1.5 text-xs bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/5`}
        >
          M−
        </button>
        <button
          onClick={() => onMemoryAction('MS')}
          title="Memory Store"
          className={`${baseBtn} py-1.5 text-xs bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/5`}
        >
          MS
        </button>
      </div>

      {/* Scientific Extension Pad (Displayed when in scientific mode) */}
      {mode === 'scientific' && (
        <div className="grid grid-cols-5 gap-1.5 sm:gap-2 p-2 sm:p-2.5 rounded-2xl bg-black/20 border border-white/5">
          {/* Row 1: 2nd, sin/asin, cos/acos, tan/atan, deg/rad */}
          <button
            onClick={() => setSecondFunc(!secondFunc)}
            className={`${baseBtn} py-2 text-xs font-bold ${
              secondFunc ? 'bg-cyan-500 text-black' : themeStyles.btnScientific
            }`}
          >
            2nd
          </button>
          <button
            onClick={() => onScientificFunc(secondFunc ? 'asin' : 'sin')}
            className={`${baseBtn} py-2 text-xs ${themeStyles.btnScientific}`}
          >
            {secondFunc ? 'sin⁻¹' : 'sin'}
          </button>
          <button
            onClick={() => onScientificFunc(secondFunc ? 'acos' : 'cos')}
            className={`${baseBtn} py-2 text-xs ${themeStyles.btnScientific}`}
          >
            {secondFunc ? 'cos⁻¹' : 'cos'}
          </button>
          <button
            onClick={() => onScientificFunc(secondFunc ? 'atan' : 'tan')}
            className={`${baseBtn} py-2 text-xs ${themeStyles.btnScientific}`}
          >
            {secondFunc ? 'tan⁻¹' : 'tan'}
          </button>
          <button
            onClick={toggleAngleMode}
            className={`${baseBtn} py-2 text-xs font-bold ${themeStyles.btnScientific}`}
          >
            {angleMode}
          </button>

          {/* Row 2: ln/e^x, log/10^x, x^y, x^2, x^3 */}
          <button
            onClick={() => onScientificFunc(secondFunc ? 'exp' : 'ln')}
            className={`${baseBtn} py-2 text-xs ${themeStyles.btnScientific}`}
          >
            {secondFunc ? 'eˣ' : 'ln'}
          </button>
          <button
            onClick={() => onScientificFunc(secondFunc ? 'pow10' : 'log')}
            className={`${baseBtn} py-2 text-xs ${themeStyles.btnScientific}`}
          >
            {secondFunc ? '10ˣ' : 'log'}
          </button>
          <button
            onClick={() => onScientificFunc('pow')}
            className={`${baseBtn} py-2 text-xs ${themeStyles.btnScientific}`}
          >
            xʸ
          </button>
          <button
            onClick={() => onScientificFunc('sqr')}
            className={`${baseBtn} py-2 text-xs ${themeStyles.btnScientific}`}
          >
            x²
          </button>
          <button
            onClick={() => onScientificFunc('cube')}
            className={`${baseBtn} py-2 text-xs ${themeStyles.btnScientific}`}
          >
            x³
          </button>

          {/* Row 3: sqrt/cbrt, 1/x, n!, pi, e */}
          <button
            onClick={() => onScientificFunc(secondFunc ? 'cbrt' : 'sqrt')}
            className={`${baseBtn} py-2 text-xs ${themeStyles.btnScientific}`}
          >
            {secondFunc ? '∛x' : '√x'}
          </button>
          <button
            onClick={() => onScientificFunc('recip')}
            className={`${baseBtn} py-2 text-xs ${themeStyles.btnScientific}`}
          >
            1/x
          </button>
          <button
            onClick={() => onScientificFunc('fact')}
            className={`${baseBtn} py-2 text-xs ${themeStyles.btnScientific}`}
          >
            n!
          </button>
          <button
            onClick={() => onScientificFunc('pi')}
            className={`${baseBtn} py-2 text-xs ${themeStyles.btnScientific}`}
          >
            π
          </button>
          <button
            onClick={() => onScientificFunc('e')}
            className={`${baseBtn} py-2 text-xs ${themeStyles.btnScientific}`}
          >
            e
          </button>
        </div>
      )}

      {/* Main Standard Keypad Grid */}
      <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
        {/* Row 1: Clear, Parentheses, Divide */}
        <button
          onClick={onClear}
          className={`${baseBtn} py-3.5 sm:py-4 ${themeStyles.btnAction} font-bold text-rose-400`}
        >
          AC
        </button>
        <button
          onClick={() => onDigit('(')}
          className={`${baseBtn} py-3.5 sm:py-4 ${themeStyles.btnAction}`}
        >
          (
        </button>
        <button
          onClick={() => onDigit(')')}
          className={`${baseBtn} py-3.5 sm:py-4 ${themeStyles.btnAction}`}
        >
          )
        </button>
        <button
          onClick={() => onOperator('÷')}
          className={`${baseBtn} py-3.5 sm:py-4 ${themeStyles.btnOperator} text-lg sm:text-xl`}
        >
          <Divide className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Row 2: 7, 8, 9, Multiply */}
        <button
          onClick={() => onDigit('7')}
          className={`${baseBtn} py-3.5 sm:py-4 ${themeStyles.btnNumber} text-lg sm:text-xl`}
        >
          7
        </button>
        <button
          onClick={() => onDigit('8')}
          className={`${baseBtn} py-3.5 sm:py-4 ${themeStyles.btnNumber} text-lg sm:text-xl`}
        >
          8
        </button>
        <button
          onClick={() => onDigit('9')}
          className={`${baseBtn} py-3.5 sm:py-4 ${themeStyles.btnNumber} text-lg sm:text-xl`}
        >
          9
        </button>
        <button
          onClick={() => onOperator('×')}
          className={`${baseBtn} py-3.5 sm:py-4 ${themeStyles.btnOperator} text-lg sm:text-xl`}
        >
          <Multiply className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Row 3: 4, 5, 6, Subtract */}
        <button
          onClick={() => onDigit('4')}
          className={`${baseBtn} py-3.5 sm:py-4 ${themeStyles.btnNumber} text-lg sm:text-xl`}
        >
          4
        </button>
        <button
          onClick={() => onDigit('5')}
          className={`${baseBtn} py-3.5 sm:py-4 ${themeStyles.btnNumber} text-lg sm:text-xl`}
        >
          5
        </button>
        <button
          onClick={() => onDigit('6')}
          className={`${baseBtn} py-3.5 sm:py-4 ${themeStyles.btnNumber} text-lg sm:text-xl`}
        >
          6
        </button>
        <button
          onClick={() => onOperator('−')}
          className={`${baseBtn} py-3.5 sm:py-4 ${themeStyles.btnOperator} text-lg sm:text-xl`}
        >
          <Minus className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Row 4: 1, 2, 3, Add */}
        <button
          onClick={() => onDigit('1')}
          className={`${baseBtn} py-3.5 sm:py-4 ${themeStyles.btnNumber} text-lg sm:text-xl`}
        >
          1
        </button>
        <button
          onClick={() => onDigit('2')}
          className={`${baseBtn} py-3.5 sm:py-4 ${themeStyles.btnNumber} text-lg sm:text-xl`}
        >
          2
        </button>
        <button
          onClick={() => onDigit('3')}
          className={`${baseBtn} py-3.5 sm:py-4 ${themeStyles.btnNumber} text-lg sm:text-xl`}
        >
          3
        </button>
        <button
          onClick={() => onOperator('+')}
          className={`${baseBtn} py-3.5 sm:py-4 ${themeStyles.btnOperator} text-lg sm:text-xl`}
        >
          <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Row 5: PlusMinus / Percent, 0, Decimal, Equals */}
        <button
          onClick={onToggleSign}
          className={`${baseBtn} py-3.5 sm:py-4 ${themeStyles.btnAction} text-base sm:text-lg`}
        >
          ±
        </button>
        <button
          onClick={() => onDigit('0')}
          className={`${baseBtn} py-3.5 sm:py-4 ${themeStyles.btnNumber} text-lg sm:text-xl`}
        >
          0
        </button>
        <button
          onClick={() => onDigit('.')}
          className={`${baseBtn} py-3.5 sm:py-4 ${themeStyles.btnNumber} text-lg sm:text-xl font-bold`}
        >
          .
        </button>
        <button
          onClick={onEquals}
          className={`${baseBtn} py-3.5 sm:py-4 ${themeStyles.btnEquals} text-lg sm:text-xl font-bold`}
        >
          <Equal className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
