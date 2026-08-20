import React, { useState } from 'react';
import { 
  ArrowLeftRight, 
  Ruler, 
  Scale, 
  Thermometer, 
  HardDrive, 
  Gauge, 
  Clock, 
  Square,
  Copy,
  Check
} from 'lucide-react';

const CATEGORIES = [
  { id: 'length', name: 'Length', icon: Ruler },
  { id: 'weight', name: 'Weight', icon: Scale },
  { id: 'temperature', name: 'Temperature', icon: Thermometer },
  { id: 'storage', name: 'Data', icon: HardDrive },
  { id: 'speed', name: 'Speed', icon: Gauge },
  { id: 'time', name: 'Time', icon: Clock },
  { id: 'area', name: 'Area', icon: Square },
];

const UNITS = {
  length: [
    { id: 'm', name: 'Meter (m)', rate: 1 },
    { id: 'km', name: 'Kilometer (km)', rate: 1000 },
    { id: 'cm', name: 'Centimeter (cm)', rate: 0.01 },
    { id: 'mm', name: 'Millimeter (mm)', rate: 0.001 },
    { id: 'mi', name: 'Mile (mi)', rate: 1609.344 },
    { id: 'yd', name: 'Yard (yd)', rate: 0.9144 },
    { id: 'ft', name: 'Foot (ft)', rate: 0.3048 },
    { id: 'in', name: 'Inch (in)', rate: 0.0254 },
  ],
  weight: [
    { id: 'kg', name: 'Kilogram (kg)', rate: 1 },
    { id: 'g', name: 'Gram (g)', rate: 0.001 },
    { id: 'mg', name: 'Milligram (mg)', rate: 0.000001 },
    { id: 'lb', name: 'Pound (lb)', rate: 0.45359237 },
    { id: 'oz', name: 'Ounce (oz)', rate: 0.028349523125 },
    { id: 't', name: 'Metric Ton (t)', rate: 1000 },
  ],
  temperature: [
    { id: 'c', name: 'Celsius (°C)' },
    { id: 'f', name: 'Fahrenheit (°F)' },
    { id: 'k', name: 'Kelvin (K)' },
  ],
  storage: [
    { id: 'b', name: 'Bytes (B)', rate: 1 },
    { id: 'kb', name: 'Kilobytes (KB)', rate: 1024 },
    { id: 'mb', name: 'Megabytes (MB)', rate: 1024 * 1024 },
    { id: 'gb', name: 'Gigabytes (GB)', rate: 1024 * 1024 * 1024 },
    { id: 'tb', name: 'Terabytes (TB)', rate: 1024 * 1024 * 1024 * 1024 },
  ],
  speed: [
    { id: 'mps', name: 'Meters / second (m/s)', rate: 1 },
    { id: 'kmh', name: 'Kilometers / hour (km/h)', rate: 0.277777778 },
    { id: 'mph', name: 'Miles / hour (mph)', rate: 0.44704 },
    { id: 'knot', name: 'Knots (kn)', rate: 0.514444 },
  ],
  time: [
    { id: 's', name: 'Seconds (s)', rate: 1 },
    { id: 'min', name: 'Minutes (min)', rate: 60 },
    { id: 'hr', name: 'Hours (hr)', rate: 3600 },
    { id: 'day', name: 'Days (d)', rate: 86400 },
    { id: 'wk', name: 'Weeks (wk)', rate: 604800 },
    { id: 'yr', name: 'Years (yr)', rate: 31536000 },
  ],
  area: [
    { id: 'sqm', name: 'Square Meter (m²)', rate: 1 },
    { id: 'sqkm', name: 'Square Kilometer (km²)', rate: 1000000 },
    { id: 'sqft', name: 'Square Foot (ft²)', rate: 0.092903 },
    { id: 'acre', name: 'Acre (ac)', rate: 4046.8564224 },
    { id: 'ha', name: 'Hectare (ha)', rate: 10000 },
  ]
};

export default function UnitConverter({ themeStyles }) {
  const [category, setCategory] = useState('length');
  const [fromUnit, setFromUnit] = useState('km');
  const [toUnit, setToUnit] = useState('m');
  const [fromVal, setFromVal] = useState('1');
  const [copied, setCopied] = useState(false);

  const unitsList = UNITS[category] || [];

  // Convert function
  const calculateConversion = (val, from, to, cat) => {
    const num = parseFloat(val);
    if (isNaN(num)) return '';

    if (cat === 'temperature') {
      let celsius = 0;
      if (from === 'c') celsius = num;
      else if (from === 'f') celsius = (num - 32) * (5 / 9);
      else if (from === 'k') celsius = num - 273.15;

      let result = 0;
      if (to === 'c') result = celsius;
      else if (to === 'f') result = (celsius * 9) / 5 + 32;
      else if (to === 'k') result = celsius + 273.15;

      return Number(result.toFixed(6)).toString();
    }

    const uFrom = unitsList.find(u => u.id === from);
    const uTo = unitsList.find(u => u.id === to);
    if (!uFrom || !uTo) return '';

    // Convert from unit to base, then base to target
    const baseValue = num * uFrom.rate;
    const result = baseValue / uTo.rate;

    // Smart format
    if (Math.abs(result) < 1e-6 && result !== 0) {
      return result.toExponential(4);
    }
    return Number(result.toFixed(8)).toString();
  };

  const toVal = calculateConversion(fromVal, fromUnit, toUnit, category);

  const handleSwap = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  const handleCategoryChange = (newCat) => {
    setCategory(newCat);
    const list = UNITS[newCat] || [];
    if (list.length >= 2) {
      setFromUnit(list[0].id);
      setToUnit(list[1].id);
    }
  };

  const handleCopy = () => {
    if (!toVal) return;
    navigator.clipboard.writeText(toVal).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="w-full flex flex-col gap-4 py-2">
      {/* Category Icons Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map(cat => {
          const Icon = cat.icon;
          const isActive = category === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Converter Inputs Card */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-3 items-center">
        {/* From Input Section */}
        <div className="p-4 rounded-2xl bg-black/30 border border-white/10 flex flex-col gap-2">
          <label className="text-xs font-semibold text-slate-400">From</label>
          <input
            type="number"
            value={fromVal}
            onChange={(e) => setFromVal(e.target.value)}
            placeholder="0"
            className="w-full bg-transparent font-code text-2xl font-bold text-white focus:outline-none placeholder-slate-600"
          />
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs font-medium text-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            {unitsList.map(u => (
              <option key={u.id} value={u.id} className="bg-slate-900 text-white">
                {u.name}
              </option>
            ))}
          </select>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSwap}
            title="Swap Units"
            className="p-3 rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/40 shadow-lg active:scale-95 transition-all"
          >
            <ArrowLeftRight className="w-4 h-4" />
          </button>
        </div>

        {/* To Input Section */}
        <div className="p-4 rounded-2xl bg-black/30 border border-white/10 flex flex-col gap-2 relative">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-400">To (Result)</label>
            <button
              onClick={handleCopy}
              title="Copy Result"
              className="p-1 rounded-md bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
          <div className="w-full font-code text-2xl font-bold text-cyan-300 overflow-x-auto select-all min-h-[36px] flex items-center">
            {toVal || '0'}
          </div>
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs font-medium text-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            {unitsList.map(u => (
              <option key={u.id} value={u.id} className="bg-slate-900 text-white">
                {u.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Formula Summary Box */}
      <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs font-medium text-cyan-200 flex items-center justify-between">
        <span>Quick conversion active</span>
        <span className="font-code font-bold">
          1 {unitsList.find(u => u.id === fromUnit)?.name.split(' ')[0]} = {calculateConversion('1', fromUnit, toUnit, category)} {unitsList.find(u => u.id === toUnit)?.name.split(' ')[0]}
        </span>
      </div>
    </div>
  );
}
