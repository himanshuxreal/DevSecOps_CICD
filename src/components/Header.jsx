import React, { useState, useRef, useEffect } from 'react';
import { 
  Calculator, 
  FlaskConical, 
  ArrowLeftRight, 
  Volume2, 
  VolumeX, 
  History, 
  Keyboard, 
  Palette, 
  Check,
  Sparkles
} from 'lucide-react';
import { THEMES } from '../utils/themes';

export default function Header({
  mode,
  setMode,
  theme,
  setTheme,
  soundEnabled,
  setSoundEnabled,
  toggleHistory,
  historyCount,
  toggleKeyboardModal
}) {
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setThemeDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentThemeObj = THEMES.find(t => t.id === theme) || THEMES[0];

  return (
    <header className="w-full flex items-center justify-between gap-3 px-4 py-3 border-b border-white/10 select-none">
      {/* Brand & Logo */}
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
          <Calculator className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="font-bold text-base md:text-lg tracking-tight leading-none text-white">
              Pro<span className="text-cyan-400">Calc</span>
            </h1>
            <span className="text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              v2.0
            </span>
          </div>
          <p className="text-[11px] text-slate-400 font-medium">Next-Gen React Calculator</p>
        </div>
      </div>

      {/* Mode Selector Tabs */}
      <div className="hidden sm:flex items-center bg-black/30 p-1 rounded-xl border border-white/10 text-xs font-medium backdrop-blur-md">
        <button
          onClick={() => setMode('standard')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
            mode === 'standard'
              ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <Calculator className="w-3.5 h-3.5" />
          Standard
        </button>
        <button
          onClick={() => setMode('scientific')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
            mode === 'scientific'
              ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <FlaskConical className="w-3.5 h-3.5" />
          Scientific
        </button>
        <button
          onClick={() => setMode('converter')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
            mode === 'converter'
              ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <ArrowLeftRight className="w-3.5 h-3.5" />
          Converter
        </button>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Mobile Mode Switch Dropdown/Toggle */}
        <div className="sm:hidden flex bg-black/40 rounded-lg p-0.5 border border-white/10">
          <button
            onClick={() => setMode(mode === 'standard' ? 'scientific' : mode === 'scientific' ? 'converter' : 'standard')}
            title={`Mode: ${mode}`}
            className="p-2 text-cyan-400 text-xs font-medium flex items-center gap-1"
          >
            {mode === 'standard' && <Calculator className="w-4 h-4" />}
            {mode === 'scientific' && <FlaskConical className="w-4 h-4" />}
            {mode === 'converter' && <ArrowLeftRight className="w-4 h-4" />}
            <span className="capitalize">{mode}</span>
          </button>
        </div>

        {/* Theme Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
            title="Change Visual Theme"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/15 text-slate-300 hover:text-white transition-all border border-white/10 flex items-center gap-1.5 text-xs"
          >
            <Palette className="w-4 h-4 text-cyan-400" />
            <span className="hidden md:inline font-medium">{currentThemeObj.name}</span>
          </button>

          {themeDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 p-2 rounded-2xl bg-slate-900/95 border border-slate-700 shadow-2xl backdrop-blur-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2.5 py-1 mb-1 border-b border-slate-800">
                Select Theme
              </div>
              <div className="space-y-1">
                {THEMES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setTheme(t.id);
                      setThemeDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-medium transition-all ${
                      theme === t.id
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-white/30 shadow-inner"
                        style={{ backgroundColor: t.previewColor }}
                      />
                      <span>{t.name}</span>
                    </div>
                    {theme === t.id && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sound Toggle */}
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          title={soundEnabled ? 'Mute Sounds' : 'Enable Audio Feedback'}
          className={`p-2 rounded-xl transition-all border ${
            soundEnabled
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/30'
              : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10'
          }`}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* History Drawer Toggle */}
        <button
          onClick={toggleHistory}
          title="Calculation History"
          className="relative p-2 rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/15 text-slate-300 hover:text-white transition-all border border-white/10"
        >
          <History className="w-4 h-4 text-indigo-400" />
          {historyCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cyan-500 text-slate-950 font-bold text-[10px] flex items-center justify-center shadow-md animate-pulse">
              {historyCount > 9 ? '9+' : historyCount}
            </span>
          )}
        </button>

        {/* Keyboard Shortcuts Info */}
        <button
          onClick={toggleKeyboardModal}
          title="Keyboard Shortcuts"
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all border border-white/10 hidden md:block"
        >
          <Keyboard className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
