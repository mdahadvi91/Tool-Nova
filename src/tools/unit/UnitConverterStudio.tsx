import React, { useState, useMemo } from 'react';
import { Scale, ArrowRightLeft, Info } from 'lucide-react';

type Dimension = 'length' | 'mass' | 'storage' | 'temperature' | 'speed';

export const UnitConverterStudio: React.FC = () => {
  const [dimension, setDimension] = useState<Dimension>('length');
  const [inputValue, setInputValue] = useState<number>(100);
  const [fromUnit, setFromUnit] = useState<string>('m');
  const [toUnit, setToUnit] = useState<string>('ft');

  // Conversion definitions normalized to base units
  const UNITS: Record<Dimension, { base: string; units: Record<string, { name: string; factor?: number }> }> = {
    length: {
      base: 'm',
      units: {
        m: { name: 'Meters (m)', factor: 1 },
        km: { name: 'Kilometers (km)', factor: 1000 },
        cm: { name: 'Centimeters (cm)', factor: 0.01 },
        mm: { name: 'Millimeters (mm)', factor: 0.001 },
        mi: { name: 'Miles (mi)', factor: 1609.344 },
        yd: { name: 'Yards (yd)', factor: 0.9144 },
        ft: { name: 'Feet (ft)', factor: 0.3048 },
        in: { name: 'Inches (in)', factor: 0.0254 },
      },
    },
    mass: {
      base: 'kg',
      units: {
        kg: { name: 'Kilograms (kg)', factor: 1 },
        g: { name: 'Grams (g)', factor: 0.001 },
        mg: { name: 'Milligrams (mg)', factor: 0.000001 },
        lb: { name: 'Pounds (lbs)', factor: 0.45359237 },
        oz: { name: 'Ounces (oz)', factor: 0.0283495231 },
        ton: { name: 'Metric Ton (t)', factor: 1000 },
      },
    },
    storage: {
      base: 'B',
      units: {
        B: { name: 'Bytes (B)', factor: 1 },
        KB: { name: 'Kilobytes (KB)', factor: 1024 },
        MB: { name: 'Megabytes (MB)', factor: 1024 ** 2 },
        GB: { name: 'Gigabytes (GB)', factor: 1024 ** 3 },
        TB: { name: 'Terabytes (TB)', factor: 1024 ** 4 },
      },
    },
    temperature: {
      base: 'C',
      units: {
        C: { name: 'Celsius (°C)' },
        F: { name: 'Fahrenheit (°F)' },
        K: { name: 'Kelvin (K)' },
      },
    },
    speed: {
      base: 'mps',
      units: {
        mps: { name: 'Meters per second (m/s)', factor: 1 },
        kph: { name: 'Kilometers per hour (km/h)', factor: 0.27777778 },
        mph: { name: 'Miles per hour (mph)', factor: 0.44704 },
        knot: { name: 'Knots (kn)', factor: 0.514444 },
      },
    },
  };

  // Ensure valid selected units when dimension changes
  const handleDimensionChange = (newDim: Dimension) => {
    setDimension(newDim);
    const keys = Object.keys(UNITS[newDim].units);
    setFromUnit(keys[0]);
    setToUnit(keys[1] || keys[0]);
  };

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  const convertedResult = useMemo(() => {
    if (isNaN(inputValue)) return 0;

    if (dimension === 'temperature') {
      let celsius = inputValue;
      if (fromUnit === 'F') celsius = ((inputValue - 32) * 5) / 9;
      if (fromUnit === 'K') celsius = inputValue - 273.15;

      let result = celsius;
      if (toUnit === 'F') result = (celsius * 9) / 5 + 32;
      if (toUnit === 'K') result = celsius + 273.15;
      return Number(result.toFixed(4));
    }

    const currentUnits = UNITS[dimension].units;
    const fromFactor = currentUnits[fromUnit]?.factor || 1;
    const toFactor = currentUnits[toUnit]?.factor || 1;

    const baseVal = inputValue * fromFactor;
    const targetVal = baseVal / toFactor;
    return Number(targetVal.toFixed(6));
  }, [inputValue, fromUnit, toUnit, dimension]);

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>Universal Unit & Measurement Converter</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Metric & Imperial
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">High-precision scientific and everyday measurement conversions</p>
        </div>
      </div>

      {/* Dimension Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
        {(['length', 'mass', 'storage', 'temperature', 'speed'] as const).map((dim) => (
          <button
            key={dim}
            onClick={() => handleDimensionChange(dim)}
            className={`py-2 text-xs font-semibold rounded-xl uppercase tracking-wider transition-all ${
              dimension === dim
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            {dim}
          </button>
        ))}
      </div>

      {/* Converter Dual Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-slate-950/70 p-6 rounded-2xl border border-slate-800 mb-6">
        {/* FROM */}
        <div className="sm:col-span-5 space-y-3">
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
            From
          </label>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(Number(e.target.value))}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-lg font-mono text-white focus:outline-none focus:border-cyan-400"
          />
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200"
          >
            {Object.entries(UNITS[dimension].units).map(([key, item]: [string, { name: string; factor?: number }]) => (
              <option key={key} value={key}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* SWAP BUTTON */}
        <div className="sm:col-span-2 flex justify-center py-2 sm:py-0">
          <button
            onClick={swapUnits}
            className="p-3 bg-slate-800 hover:bg-slate-700 text-cyan-400 hover:text-cyan-300 rounded-full border border-slate-700 shadow-md transition-transform active:scale-95"
            title="Swap Units"
          >
            <ArrowRightLeft className="w-5 h-5" />
          </button>
        </div>

        {/* TO */}
        <div className="sm:col-span-5 space-y-3">
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
            To (Calculated)
          </label>
          <div className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-3 text-lg font-mono text-cyan-300 overflow-x-auto">
            {convertedResult}
          </div>
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200"
          >
            {Object.entries(UNITS[dimension].units).map(([key, item]: [string, { name: string; factor?: number }]) => (
              <option key={key} value={key}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="p-3.5 bg-blue-950/20 border border-blue-800/40 rounded-xl text-xs text-slate-300 flex items-center gap-2.5">
        <Info className="w-4 h-4 text-cyan-400 flex-shrink-0" />
        <span>
          <strong>Exact Ratio:</strong> 1 {UNITS[dimension].units[fromUnit]?.name} ={' '}
          {(convertedResult / (inputValue || 1)).toFixed(6)} {UNITS[dimension].units[toUnit]?.name}
        </span>
      </div>
    </div>
  );
};
