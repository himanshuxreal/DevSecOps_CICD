import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Copy, 
  Check, 
  RotateCcw, 
  FileText, 
  Download, 
  History as HistoryIcon,
  CornerUpLeft
} from 'lucide-react';

export default function HistoryDrawer({
  isOpen,
  onClose,
  history,
  onSelectCalculation,
  onClearHistory,
  onDeleteHistoryItem,
  themeStyles
}) {
  const [copiedId, setCopiedId] = useState(null);
  const [copyAllFeedback, setCopyAllFeedback] = useState(false);

  if (!isOpen) return null;

  const handleCopySingle = (id, result) => {
    navigator.clipboard.writeText(String(result).replace(/,/g, '')).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    });
  };

  const handleCopyAll = () => {
    if (history.length === 0) return;
    const text = history
      .map(item => `${item.equation} = ${item.result}   [${new Date(item.timestamp).toLocaleTimeString()}]`)
      .join('\n');
    navigator.clipboard.writeText(text).then(() => {
      setCopyAllFeedback(true);
      setTimeout(() => setCopyAllFeedback(false), 2000);
    });
  };

  const handleExportTxt = () => {
    if (history.length === 0) return;
    const content = "=== ProCalc Calculation History ===\n\n" + history
      .map(item => `[${new Date(item.timestamp).toLocaleString()}]\n${item.equation} = ${item.result}\n`)
      .join('\n');
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `procalc-history-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Click outside to close */}
      <div className="flex-1" onClick={onClose} />

      {/* Drawer Body */}
      <aside className={`w-full max-w-md h-full flex flex-col shadow-2xl border-l z-10 animate-in slide-in-from-right duration-200 ${themeStyles.drawer}`}>
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <HistoryIcon className="w-5 h-5 text-indigo-400" />
            <h2 className="font-bold text-base">Calculation History</h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold">
              {history.length}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action toolbar */}
        {history.length > 0 && (
          <div className="flex items-center justify-between px-4 py-2 bg-black/20 border-b border-white/5 text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyAll}
                className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all"
              >
                {copyAllFeedback ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copyAllFeedback ? 'Copied!' : 'Copy All'}
              </button>
              <button
                onClick={handleExportTxt}
                className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                Export
              </button>
            </div>

            <button
              onClick={onClearHistory}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md text-rose-400 hover:bg-rose-500/10 transition-all font-medium"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear
            </button>
          </div>
        )}

        {/* History List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {history.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <HistoryIcon className="w-12 h-12 mb-3 stroke-[1.2] opacity-30 text-indigo-400" />
              <p className="font-medium text-slate-300">No calculation history yet</p>
              <p className="text-xs text-slate-500 mt-1 max-w-xs">
                Your past equations and results will automatically appear here as you calculate.
              </p>
            </div>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                className="group relative p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-cyan-500/30 transition-all duration-150"
              >
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                  <span>{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                  <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleCopySingle(item.id, item.result)}
                      title="Copy result"
                      className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white"
                    >
                      {copiedId === item.id ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                    <button
                      onClick={() => onDeleteHistoryItem(item.id)}
                      title="Delete entry"
                      className="p-1 rounded hover:bg-rose-500/20 text-slate-400 hover:text-rose-400"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Equation Expression */}
                <div 
                  onClick={() => onSelectCalculation(item, 'equation')}
                  title="Click to load equation into calculator"
                  className="font-code text-xs text-slate-300 cursor-pointer hover:text-cyan-300 transition-colors break-all"
                >
                  {item.equation} =
                </div>

                {/* Result */}
                <div 
                  onClick={() => onSelectCalculation(item, 'result')}
                  title="Click to insert result into calculator"
                  className="font-code text-lg font-bold text-white cursor-pointer hover:text-cyan-400 transition-colors mt-0.5"
                >
                  {item.result}
                </div>
              </div>
            ))
          )}
        </div>
      </aside>
    </div>
  );
}
