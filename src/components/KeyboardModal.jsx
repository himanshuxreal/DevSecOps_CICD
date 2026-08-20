import React from 'react';
import { X, Keyboard, Command } from 'lucide-react';

export default function KeyboardModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const shortcuts = [
    { key: '0 - 9', desc: 'Input digits' },
    { key: '+  -  *  /', desc: 'Arithmetic operations' },
    { key: 'Enter  or  =', desc: 'Evaluate calculation' },
    { key: 'Backspace', desc: 'Delete last character' },
    { key: 'Escape  or  C', desc: 'Clear all (Reset)' },
    { key: '(', desc: 'Open parenthesis' },
    { key: ')', desc: 'Close parenthesis' },
    { key: '%', desc: 'Percentage' },
    { key: '^', desc: 'Power / Exponent' },
    { key: 'H', desc: 'Toggle history drawer' },
    { key: 'S', desc: 'Toggle scientific mode' },
    { key: 'M', desc: 'Toggle sound effects' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-5 relative animate-in zoom-in-95 duration-150 text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Keyboard className="w-5 h-5 text-cyan-400" />
            <h2 className="font-bold text-base">Keyboard Shortcuts</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-2.5 max-h-[60vh] overflow-y-auto pr-1">
          {shortcuts.map((s, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5 text-xs"
            >
              <span className="text-slate-300">{s.desc}</span>
              <kbd className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 font-mono text-cyan-300 font-semibold shadow-inner">
                {s.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800 text-center text-xs text-slate-400">
          Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200">Esc</kbd> anytime to close this modal
        </div>
      </div>
    </div>
  );
}
