import React, { useState } from 'react';
import { Copy, Check, Delete, CornerDownLeft } from 'lucide-react';

export default function Display({
  equation,
  currentInput,
  activeOperator,
  angleMode,
  toggleAngleMode,
  memoryValue,
  themeStyles,
  onBackspace,
  onClear,
  error
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = currentInput || equation || '0';
    // Strip commas for raw copy
    const rawVal = textToCopy.replace(/,/g, '');
    navigator.clipboard.writeText(rawVal).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  // Compute font size based on input length
  const getFontSize = (str = '') => {
    const len = str.length;
    if (len > 18) return 'text-xl sm:text-2xl';
    if (len > 13) return 'text-2xl sm:text-3xl';
    if (len > 9) return 'text-3xl sm:text-4xl';
    return 'text-4xl sm:text-5xl';
  };

  return (
    <div className={`w-full rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 relative border ${themeStyles.displayBg} ${error ? 'border-red-500/80 ring-2 ring-red-500/20' : ''}`}>
      {/* Top Status & Badges Bar */}
      <div className="flex items-center justify-between text-xs mb-2">
        <div className="flex items-center gap-1.5 font-mono">
          {/* Deg / Rad toggle badge */}
          <button
            onClick={toggleAngleMode}
            title="Toggle Angle Mode (DEG/RAD)"
            className={`px-2 py-0.5 rounded-md text-[11px] font-bold border transition-all ${
              angleMode === 'DEG'
                ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40'
                : 'bg-purple-500/20 text-purple-400 border-purple-500/40'
            }`}
          >
            {angleMode}
          </button>

          {/* Memory Active Badge */}
          {memoryValue !== 0 && (
            <span
              title={`Memory Stored: ${memoryValue}`}
              className="px-1.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse"
            >
              M ({memoryValue})
            </span>
          )}

          {/* Active Operator Badge */}
          {activeOperator && (
            <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
              {activeOperator}
            </span>
          )}
        </div>

        {/* Action buttons on display: Copy & Backspace */}
        <div className="flex items-center gap-1">
          <button
            onClick={handleCopy}
            title="Copy Result"
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 active:scale-95 text-slate-400 hover:text-white transition-all relative group"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-green-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            {copied && (
              <span className="absolute -top-7 right-0 text-[10px] bg-green-500 text-slate-950 font-bold px-1.5 py-0.5 rounded shadow-md whitespace-nowrap">
                Copied!
              </span>
            )}
          </button>

          <button
            onClick={onBackspace}
            title="Backspace (Delete single digit)"
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 active:scale-95 text-slate-400 hover:text-white transition-all"
          >
            <Delete className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Equation / History Expression Preview */}
      <div className={`min-h-[24px] text-right font-code text-xs sm:text-sm overflow-x-auto whitespace-nowrap transition-colors mb-1 pr-1 ${themeStyles.subText}`}>
        {equation || <span className="opacity-0">0</span>}
      </div>

      {/* Main Big Number / Result */}
      <div className="w-full text-right overflow-x-auto whitespace-nowrap scrollbar-none select-text py-1 pr-1">
        <span
          className={`font-semibold font-code tracking-tight transition-all duration-150 inline-block ${getFontSize(
            currentInput
          )} ${error ? 'text-red-400 animate-bounce' : themeStyles.displayText}`}
        >
          {error || currentInput || '0'}
        </span>
      </div>
    </div>
  );
}
