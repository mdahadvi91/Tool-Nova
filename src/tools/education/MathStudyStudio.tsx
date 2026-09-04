import React, { useState, useMemo } from 'react';
import { GraduationCap, Calculator, BookOpen, Layers, CheckCircle2, RotateCw } from 'lucide-react';

export const MathStudyStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'quadratic' | 'fractions' | 'flashcards'>('quadratic');

  // Quadratic solver state: ax^2 + bx + c = 0
  const [coeffA, setCoeffA] = useState(1);
  const [coeffB, setCoeffB] = useState(-5);
  const [coeffC, setCoeffC] = useState(6);

  // Fraction state: (n1/d1) op (n2/d2)
  const [num1, setNum1] = useState(2);
  const [den1, setDen1] = useState(3);
  const [num2, setNum2] = useState(3);
  const [den2, setDen2] = useState(4);
  const [fracOp, setFracOp] = useState<'+' | '-' | '*' | '/'>('+');

  // Flashcards state
  const [cards, setCards] = useState([
    { q: 'What is the Pythagorean Theorem?', a: 'a² + b² = c² (for right triangles)', mastered: false },
    { q: 'What is the derivative of sin(x)?', a: 'cos(x)', mastered: false },
    { q: 'What is Euler\'s formula?', a: 'e^(iπ) + 1 = 0', mastered: false }
  ]);
  const [currentCardIdx, setCurrentCardIdx] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  // Quadratic computation
  const quadraticResult = useMemo(() => {
    if (coeffA === 0) return { error: 'Coefficient "a" cannot be 0 in a quadratic equation.' };

    const discriminant = coeffB * coeffB - 4 * coeffA * coeffC;

    if (discriminant > 0) {
      const x1 = (-coeffB + Math.sqrt(discriminant)) / (2 * coeffA);
      const x2 = (-coeffB - Math.sqrt(discriminant)) / (2 * coeffA);
      return {
        discriminant,
        roots: `Two distinct real roots: x₁ = ${Math.round(x1 * 1000) / 1000}, x₂ = ${Math.round(x2 * 1000) / 1000}`,
        nature: 'Real & Distinct'
      };
    } else if (discriminant === 0) {
      const x = -coeffB / (2 * coeffA);
      return {
        discriminant,
        roots: `One repeated real root: x = ${Math.round(x * 1000) / 1000}`,
        nature: 'Real & Equal'
      };
    } else {
      const real = -coeffB / (2 * coeffA);
      const imag = Math.sqrt(-discriminant) / (2 * coeffA);
      return {
        discriminant,
        roots: `Complex roots: ${real.toFixed(2)} ± ${imag.toFixed(2)}i`,
        nature: 'Complex Conjugates'
      };
    }
  }, [coeffA, coeffB, coeffC]);

  // Fraction arithmetic
  const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));

  const fractionResult = useMemo(() => {
    if (den1 === 0 || den2 === 0) return { error: 'Denominator cannot be 0' };

    let resNum = 0;
    let resDen = 1;

    if (fracOp === '+') {
      resNum = num1 * den2 + num2 * den1;
      resDen = den1 * den2;
    } else if (fracOp === '-') {
      resNum = num1 * den2 - num2 * den1;
      resDen = den1 * den2;
    } else if (fracOp === '*') {
      resNum = num1 * num2;
      resDen = den1 * den2;
    } else if (fracOp === '/') {
      if (num2 === 0) return { error: 'Cannot divide by 0 fraction' };
      resNum = num1 * den2;
      resDen = den1 * num2;
    }

    const divisor = gcd(resNum, resDen);
    const simpNum = resNum / divisor;
    const simpDen = resDen / divisor;

    return {
      raw: `${resNum}/${resDen}`,
      simplified: `${simpNum}/${simpDen}`,
      decimal: (simpNum / simpDen).toFixed(4)
    };
  }, [num1, den1, num2, den2, fracOp]);

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-cyan-400" />
            STEM Mathematics & Study Flashcards Studio
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Quadratic polynomial solvers, step-by-step fraction reductions, and interactive study flashcards.
          </p>
        </div>
      </div>

      <div className="flex gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('quadratic')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            activeTab === 'quadratic'
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Calculator className="w-4 h-4" />
          Quadratic Solver
        </button>
        <button
          onClick={() => setActiveTab('fractions')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            activeTab === 'fractions'
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          Fraction Reducer
        </button>
        <button
          onClick={() => setActiveTab('flashcards')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            activeTab === 'flashcards'
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Study Flashcards
        </button>
      </div>

      {activeTab === 'quadratic' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-5 bg-slate-950/80 border border-slate-800 rounded-xl space-y-4">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Equation: ax² + bx + c = 0
            </span>
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-xs text-slate-400 font-mono">a (x²)</label>
                <input
                  type="number"
                  value={coeffA}
                  onChange={(e) => setCoeffA(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm font-mono text-cyan-400"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-400 font-mono">b (x)</label>
                <input
                  type="number"
                  value={coeffB}
                  onChange={(e) => setCoeffB(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm font-mono text-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-400 font-mono">c (const)</label>
                <input
                  type="number"
                  value={coeffC}
                  onChange={(e) => setCoeffC(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm font-mono text-white"
                />
              </div>
            </div>
          </div>

          <div className="p-5 bg-slate-950/80 border border-slate-800 rounded-xl space-y-4 flex flex-col justify-center">
            {quadraticResult.error ? (
              <p className="text-xs text-rose-400 font-semibold">{quadraticResult.error}</p>
            ) : (
              <div className="space-y-3">
                <div>
                  <span className="text-xs text-slate-500 uppercase">Discriminant (Δ = b² - 4ac)</span>
                  <div className="text-xl font-bold font-mono text-cyan-400">{quadraticResult.discriminant}</div>
                </div>
                <div className="p-4 bg-slate-900 rounded-lg border border-slate-800">
                  <span className="text-xs text-slate-400">Solution Roots</span>
                  <div className="text-base font-bold font-mono text-emerald-400 mt-1">
                    {quadraticResult.roots}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'fractions' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-5 bg-slate-950/80 border border-slate-800 rounded-xl flex items-center justify-between gap-4">
            {/* Fraction 1 */}
            <div className="space-y-2 w-20 text-center">
              <input
                type="number"
                value={num1}
                onChange={(e) => setNum1(parseInt(e.target.value) || 0)}
                className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-center font-mono text-white"
              />
              <div className="h-0.5 bg-slate-700 w-full" />
              <input
                type="number"
                value={den1}
                onChange={(e) => setDen1(parseInt(e.target.value) || 1)}
                className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-center font-mono text-white"
              />
            </div>

            {/* Operator */}
            <div className="flex flex-col gap-1">
              {(['+', '-', '*', '/'] as const).map((op) => (
                <button
                  key={op}
                  onClick={() => setFracOp(op)}
                  className={`w-8 h-8 rounded text-sm font-bold ${
                    fracOp === op ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
                  }`}
                >
                  {op}
                </button>
              ))}
            </div>

            {/* Fraction 2 */}
            <div className="space-y-2 w-20 text-center">
              <input
                type="number"
                value={num2}
                onChange={(e) => setNum2(parseInt(e.target.value) || 0)}
                className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-center font-mono text-white"
              />
              <div className="h-0.5 bg-slate-700 w-full" />
              <input
                type="number"
                value={den2}
                onChange={(e) => setDen2(parseInt(e.target.value) || 1)}
                className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-center font-mono text-white"
              />
            </div>
          </div>

          <div className="p-5 bg-slate-950/80 border border-slate-800 rounded-xl flex items-center justify-center">
            {fractionResult.error ? (
              <p className="text-xs text-rose-400 font-semibold">{fractionResult.error}</p>
            ) : (
              <div className="text-center space-y-2">
                <span className="text-xs text-slate-500 uppercase">Simplified Fraction</span>
                <div className="text-4xl font-extrabold font-mono text-cyan-400">{fractionResult.simplified}</div>
                <span className="text-xs text-slate-400 font-mono">≈ {fractionResult.decimal}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'flashcards' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>
              Card {currentCardIdx + 1} of {cards.length}
            </span>
            <span>Click card to reveal solution</span>
          </div>

          <div
            onClick={() => setIsCardFlipped(!isCardFlipped)}
            className="w-full h-56 bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 rounded-2xl flex flex-col items-center justify-center p-8 cursor-pointer shadow-2xl transition-all hover:border-cyan-500/40 text-center"
          >
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-3">
              {isCardFlipped ? 'Answer & Explanation' : 'Study Prompt / Question'}
            </span>
            <p className="text-lg font-bold text-white max-w-md">
              {isCardFlipped ? cards[currentCardIdx].a : cards[currentCardIdx].q}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                setIsCardFlipped(false);
                setCurrentCardIdx((prev) => (prev > 0 ? prev - 1 : cards.length - 1));
              }}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white"
            >
              Previous Card
            </button>
            <button
              onClick={() => setIsCardFlipped(!isCardFlipped)}
              className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs font-semibold text-white flex items-center gap-1.5"
            >
              <RotateCw className="w-3.5 h-3.5" />
              Flip Card
            </button>
            <button
              onClick={() => {
                setIsCardFlipped(false);
                setCurrentCardIdx((prev) => (prev < cards.length - 1 ? prev + 1 : 0));
              }}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white"
            >
              Next Card
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
