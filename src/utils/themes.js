export const THEMES = [
  {
    id: 'dark',
    name: 'Midnight Obsidian',
    icon: 'Moon',
    previewColor: '#0f172a',
    styles: {
      bg: 'bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950',
      calcContainer: 'bg-slate-900/80 border-slate-800/80 shadow-2xl shadow-indigo-950/40 backdrop-blur-xl',
      displayBg: 'bg-slate-950/70 border-slate-800/60 shadow-inner',
      displayText: 'text-slate-100',
      subText: 'text-slate-400',
      btnNumber: 'bg-slate-800/60 hover:bg-slate-700/80 text-slate-100 active:bg-slate-600/90 border-slate-700/40',
      btnOperator: 'bg-indigo-600/80 hover:bg-indigo-500/90 text-white active:bg-indigo-700 border-indigo-500/30',
      btnAction: 'bg-slate-700/70 hover:bg-slate-600/80 text-cyan-300 active:bg-slate-500 border-slate-600/40',
      btnScientific: 'bg-slate-800/40 hover:bg-slate-700/60 text-indigo-300 active:bg-slate-600 border-slate-700/30',
      btnEquals: 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25 active:brightness-95',
      badge: 'bg-indigo-950/80 text-indigo-300 border-indigo-800/50',
      drawer: 'bg-slate-900/95 border-slate-800 text-slate-100'
    }
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk 2077',
    icon: 'Zap',
    previewColor: '#facc15',
    styles: {
      bg: 'bg-gradient-to-br from-black via-zinc-950 to-neutral-900',
      calcContainer: 'bg-black/90 border-yellow-500/60 shadow-2xl shadow-yellow-500/20 border-2',
      displayBg: 'bg-zinc-950 border-yellow-500/40 shadow-[inset_0_0_15px_rgba(234,179,8,0.15)]',
      displayText: 'text-yellow-400 font-mono drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]',
      subText: 'text-pink-500 font-mono',
      btnNumber: 'bg-zinc-900/90 hover:bg-zinc-800 text-yellow-100 active:bg-zinc-700 border-zinc-800 hover:border-yellow-500/40',
      btnOperator: 'bg-pink-600 hover:bg-pink-500 text-white active:bg-pink-700 border-pink-500 font-bold shadow-[0_0_10px_rgba(236,72,153,0.4)]',
      btnAction: 'bg-cyan-900/50 hover:bg-cyan-800/60 text-cyan-400 active:bg-cyan-700 border-cyan-500/40',
      btnScientific: 'bg-zinc-900 hover:bg-zinc-800 text-cyan-300 border-cyan-900/50',
      btnEquals: 'bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold shadow-[0_0_15px_rgba(250,204,21,0.6)] active:bg-yellow-500',
      badge: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50',
      drawer: 'bg-black/95 border-yellow-500/40 text-yellow-200'
    }
  },
  {
    id: 'retro',
    name: 'Vintage Casio LCD',
    icon: 'Radio',
    previewColor: '#84cc16',
    styles: {
      bg: 'bg-gradient-to-br from-stone-400 via-stone-300 to-stone-500',
      calcContainer: 'bg-stone-300 border-stone-400 shadow-2xl shadow-stone-800/40 rounded-3xl p-5 border-4',
      displayBg: 'bg-[#9ea878] border-[#7a8559] border-4 shadow-inner text-[#1a2113]',
      displayText: 'text-[#1a2113] font-lcd text-5xl tracking-widest',
      subText: 'text-[#38432a] font-lcd text-lg tracking-wider',
      btnNumber: 'bg-stone-100 hover:bg-white text-stone-800 active:bg-stone-200 border-stone-300 shadow-md',
      btnOperator: 'bg-stone-800 hover:bg-stone-700 text-white active:bg-stone-900 border-stone-900 shadow-md',
      btnAction: 'bg-amber-600 hover:bg-amber-500 text-white active:bg-amber-700 border-amber-700 shadow-md',
      btnScientific: 'bg-stone-700 hover:bg-stone-600 text-stone-100 active:bg-stone-800 border-stone-800 text-xs shadow-md',
      btnEquals: 'bg-rose-700 hover:bg-rose-600 text-white font-bold shadow-md active:bg-rose-800',
      badge: 'bg-[#848e5f] text-[#1a2113] border-[#6b764b]',
      drawer: 'bg-stone-200 border-stone-400 text-stone-800'
    }
  },
  {
    id: 'light',
    name: 'Pure Minimalist',
    icon: 'Sun',
    previewColor: '#f8fafc',
    styles: {
      bg: 'bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100',
      calcContainer: 'bg-white/80 border-slate-200 shadow-xl shadow-slate-300/50 backdrop-blur-xl',
      displayBg: 'bg-slate-50/90 border-slate-200/80 shadow-inner',
      displayText: 'text-slate-900',
      subText: 'text-slate-500',
      btnNumber: 'bg-white hover:bg-slate-100 text-slate-800 active:bg-slate-200 border-slate-200/80 shadow-sm',
      btnOperator: 'bg-blue-600 hover:bg-blue-500 text-white active:bg-blue-700 border-blue-600 shadow-sm',
      btnAction: 'bg-slate-200/80 hover:bg-slate-300/90 text-slate-700 active:bg-slate-400 border-slate-300',
      btnScientific: 'bg-slate-100 hover:bg-slate-200 text-blue-700 active:bg-slate-300 border-slate-200',
      btnEquals: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md shadow-blue-500/20 active:brightness-95',
      badge: 'bg-blue-100 text-blue-800 border-blue-200',
      drawer: 'bg-white/95 border-slate-200 text-slate-900'
    }
  },
  {
    id: 'matrix',
    name: 'Emerald Matrix',
    icon: 'Terminal',
    previewColor: '#10b981',
    styles: {
      bg: 'bg-gradient-to-br from-black via-emerald-950 to-black',
      calcContainer: 'bg-zinc-950/90 border-emerald-500/40 shadow-2xl shadow-emerald-950/50 backdrop-blur-xl border',
      displayBg: 'bg-black border-emerald-500/30 shadow-[inset_0_0_15px_rgba(16,185,129,0.15)]',
      displayText: 'text-emerald-400 font-mono drop-shadow-[0_0_6px_rgba(52,211,153,0.6)]',
      subText: 'text-emerald-600 font-mono',
      btnNumber: 'bg-zinc-900/80 hover:bg-emerald-950/50 text-emerald-300 active:bg-zinc-800 border-emerald-900/40 hover:border-emerald-500/40',
      btnOperator: 'bg-emerald-700 hover:bg-emerald-600 text-white active:bg-emerald-800 border-emerald-600 shadow-[0_0_10px_rgba(16,185,129,0.3)]',
      btnAction: 'bg-emerald-950 hover:bg-emerald-900 text-emerald-400 active:bg-emerald-800 border-emerald-800',
      btnScientific: 'bg-zinc-900 hover:bg-zinc-800 text-emerald-400 border-emerald-950',
      btnEquals: 'bg-emerald-500 hover:bg-emerald-400 text-black font-bold shadow-[0_0_15px_rgba(16,185,129,0.5)] active:bg-emerald-600',
      badge: 'bg-emerald-950 text-emerald-400 border-emerald-800',
      drawer: 'bg-zinc-950/95 border-emerald-500/40 text-emerald-300'
    }
  },
  {
    id: 'synthwave',
    name: 'Sunset Synthwave',
    icon: 'Flame',
    previewColor: '#ec4899',
    styles: {
      bg: 'bg-gradient-to-br from-purple-950 via-slate-900 to-rose-950',
      calcContainer: 'bg-slate-950/80 border-pink-500/40 shadow-2xl shadow-pink-950/50 backdrop-blur-xl border',
      displayBg: 'bg-slate-950/80 border-pink-500/30 shadow-inner',
      displayText: 'text-pink-300 drop-shadow-[0_0_8px_rgba(244,114,182,0.5)]',
      subText: 'text-purple-400',
      btnNumber: 'bg-slate-900/80 hover:bg-purple-950/60 text-purple-100 active:bg-slate-800 border-purple-900/40 hover:border-pink-500/30',
      btnOperator: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white border-pink-500/40 shadow-[0_0_10px_rgba(236,72,153,0.3)]',
      btnAction: 'bg-purple-900/60 hover:bg-purple-800 text-cyan-300 active:bg-purple-700 border-purple-700/50',
      btnScientific: 'bg-slate-900 hover:bg-purple-900/40 text-pink-300 border-purple-900/30',
      btnEquals: 'bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-400 hover:to-orange-400 text-white font-bold shadow-lg shadow-pink-500/30',
      badge: 'bg-purple-950/80 text-pink-300 border-pink-800/40',
      drawer: 'bg-slate-950/95 border-pink-500/40 text-pink-200'
    }
  }
];
