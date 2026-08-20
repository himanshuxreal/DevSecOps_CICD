# ProCalc — Ultra Modern React + Vite Calculator

A sleek, responsive, and feature-packed calculator built with **React**, **Vite**, and **Tailwind CSS**.

---

## 🌟 Key Features

1. **Dual Calculation Modes:**
   - **Standard Mode:** Arithmetic operations (`+`, `−`, `×`, `÷`), parentheses `( )`, percentage `%`, sign inversion `±`, and decimal formatting.
   - **Scientific Mode:** Trigonometric functions (`sin`, `cos`, `tan`, `sin⁻¹`, `cos⁻¹`, `tan⁻¹`), logarithmic functions (`log₁₀`, `ln`), exponential functions (`eˣ`, `10ˣ`, `xʸ`), roots (`√x`, `∛x`), powers (`x²`, `x³`), reciprocal (`1/x`), factorial (`n!`), and math constants ($\pi$, $e$).
   - **Angle Modes:** Quick toggle between **DEG** (Degrees) and **RAD** (Radians).

2. **Unit & Measurement Converter:**
   - Real-time conversion across 7 categories:
     - **Length:** Meter, Kilometer, Centimeter, Millimeter, Mile, Yard, Foot, Inch
     - **Weight/Mass:** Kilogram, Gram, Milligram, Pound, Ounce, Metric Ton
     - **Temperature:** Celsius, Fahrenheit, Kelvin
     - **Digital Storage:** Bytes, KB, MB, GB, TB
     - **Speed:** m/s, km/h, mph, knots
     - **Time:** Seconds, Minutes, Hours, Days, Weeks, Years
     - **Area:** Square Meter, Square Km, Square Foot, Acre, Hectare

3. **Calculation History & Memory:**
   - **Interactive History Drawer:** View calculation logs with timestamps, click to reuse equations or results, export logs to `.txt`, or copy all to clipboard.
   - **Memory Operations:** `MC` (Clear), `MR` (Recall), `M+` (Add), `M-` (Subtract), `MS` (Store) with active memory indicators.

4. **Multi-Theme Engine:**
   - 🌙 **Midnight Obsidian** (Default frosted glassmorphism)
   - ⚡ **Cyberpunk 2077** (High-contrast neon yellow & pink)
   - 📟 **Vintage Casio LCD** (Classic 90s retro monochrome dot-matrix)
   - ☀️ **Pure Minimalist** (Clean light neumorphism)
   - 🟩 **Emerald Matrix** (Terminal phosphor glow)
   - 🌅 **Sunset Synthwave** (Vibrant violet & magenta gradient)

5. **Audio Feedback & Full Keyboard Navigation:**
   - Tactile clicks and chime sound effects synthesized with the **Web Audio API** (zero external sound files, ultra-low latency, mute toggle available).
   - Full keyboard shortcuts support (`0-9`, `+ - * /`, `Enter`, `Backspace`, `Esc`, `H` for history, `S` for scientific toggle, `M` for audio mute).

---

## 🚀 Getting Started

### Development Server
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm run preview
```

---

## ⌨️ Keyboard Shortcuts Reference

| Key | Action |
| --- | --- |
| `0` - `9` | Input digits |
| `+`, `-`, `*`, `/` | Standard operators |
| `Enter` or `=` | Calculate result |
| `Backspace` | Delete last digit |
| `Escape` or `C` | Clear all |
| `(` and `)` | Parentheses |
| `^` | Exponent / Power |
| `H` | Toggle History Drawer |
| `S` | Switch Standard / Scientific mode |
| `M` | Toggle Audio clicks |
