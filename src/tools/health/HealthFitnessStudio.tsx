import React, { useState, useMemo } from 'react';
import { Heart, Activity, Droplets, Flame, Scale, ShieldCheck } from 'lucide-react';

export const HealthFitnessStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bmi' | 'bmr-tdee' | 'water'>('bmi');
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');

  // Parameters
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number>(30);
  const [weightKg, setWeightKg] = useState<number>(75);
  const [heightCm, setHeightCm] = useState<number>(175);

  // Imperial
  const [weightLbs, setWeightLbs] = useState<number>(165);
  const [heightFeet, setHeightFeet] = useState<number>(5);
  const [heightInches, setHeightInches] = useState<number>(9);

  // Activity level for TDEE
  const [activityFactor, setActivityFactor] = useState<number>(1.375); // Light exercise

  // Computed Height in meters and Weight in kg
  const { currentKg, currentMeters } = useMemo(() => {
    if (unitSystem === 'metric') {
      return { currentKg: weightKg, currentMeters: heightCm / 100 };
    }
    const totalInches = heightFeet * 12 + heightInches;
    return {
      currentKg: weightLbs * 0.453592,
      currentMeters: (totalInches * 2.54) / 100
    };
  }, [unitSystem, weightKg, heightCm, weightLbs, heightFeet, heightInches]);

  // BMI Calculation
  const bmiResult = useMemo(() => {
    if (currentMeters <= 0) return { bmi: 0, category: 'N/A', color: 'text-slate-400' };
    const bmi = currentKg / (currentMeters * currentMeters);
    const rounded = Math.round(bmi * 10) / 10;

    let category = 'Normal Weight';
    let color = 'text-emerald-400';
    if (rounded < 18.5) {
      category = 'Underweight (< 18.5)';
      color = 'text-amber-400';
    } else if (rounded >= 30) {
      category = 'Obese Class (30+)';
      color = 'text-rose-400';
    } else if (rounded >= 25) {
      category = 'Overweight (25 - 29.9)';
      color = 'text-orange-400';
    }

    return { bmi: rounded, category, color };
  }, [currentKg, currentMeters]);

  // BMR & TDEE (Mifflin-St Jeor Formula)
  const bmrTdeeResult = useMemo(() => {
    const cm = currentMeters * 100;
    // Mifflin-St Jeor: 10*kg + 6.25*cm - 5*age + s (s=+5 male, -161 female)
    const s = gender === 'male' ? 5 : -161;
    const bmr = 10 * currentKg + 6.25 * cm - 5 * age + s;
    const tdee = bmr * activityFactor;

    return {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee)
    };
  }, [currentKg, currentMeters, age, gender, activityFactor]);

  // Daily Water Intake (approx 35ml per kg + activity bonus)
  const waterIntakeResult = useMemo(() => {
    const baseLiters = (currentKg * 35) / 1000;
    const activityBonus = (activityFactor - 1.2) * 1.5;
    const total = Math.max(1.5, baseLiters + activityBonus);
    return {
      liters: Math.round(total * 10) / 10,
      glasses: Math.round(total / 0.25)
    };
  }, [currentKg, activityFactor]);

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-400" />
            Health & Caloric Fitness Calculator Studio
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Calculate accurate BMI, Mifflin-St Jeor BMR, TDEE caloric maintenance, and hydration requirements.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setUnitSystem('metric')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold ${
              unitSystem === 'metric' ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-slate-400'
            }`}
          >
            Metric (kg, cm)
          </button>
          <button
            onClick={() => setUnitSystem('imperial')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold ${
              unitSystem === 'imperial' ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-slate-400'
            }`}
          >
            Imperial (lbs, ft-in)
          </button>
        </div>
      </div>

      <div className="flex gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('bmi')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            activeTab === 'bmi'
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Scale className="w-4 h-4" />
          Body Mass Index (BMI)
        </button>
        <button
          onClick={() => setActiveTab('bmr-tdee')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            activeTab === 'bmr-tdee'
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Flame className="w-4 h-4" />
          BMR & TDEE Calories
        </button>
        <button
          onClick={() => setActiveTab('water')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            activeTab === 'water'
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Droplets className="w-4 h-4" />
          Hydration Intake
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Universal Inputs */}
        <div className="p-5 bg-slate-950/80 border border-slate-800 rounded-xl space-y-4">
          <div className="flex items-center gap-4">
            <label className="text-xs font-semibold text-slate-300">Gender:</label>
            <div className="flex gap-2">
              <button
                onClick={() => setGender('male')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                  gender === 'male' ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-slate-400'
                }`}
              >
                Male
              </button>
              <button
                onClick={() => setGender('female')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                  gender === 'female' ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-slate-400'
                }`}
              >
                Female
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm font-mono text-white"
            />
          </div>

          {unitSystem === 'metric' ? (
            <>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Weight (kg)</label>
                <input
                  type="number"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Math.max(1, parseFloat(e.target.value) || 1))}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm font-mono text-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Height (cm)</label>
                <input
                  type="number"
                  value={heightCm}
                  onChange={(e) => setHeightCm(Math.max(10, parseFloat(e.target.value) || 10))}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm font-mono text-white"
                />
              </div>
            </>
          ) : (
            <>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Weight (lbs)</label>
                <input
                  type="number"
                  value={weightLbs}
                  onChange={(e) => setWeightLbs(Math.max(1, parseFloat(e.target.value) || 1))}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm font-mono text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Height (Feet)</label>
                  <input
                    type="number"
                    value={heightFeet}
                    onChange={(e) => setHeightFeet(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm font-mono text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Inches</label>
                  <input
                    type="number"
                    value={heightInches}
                    onChange={(e) => setHeightInches(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm font-mono text-white"
                  />
                </div>
              </div>
            </>
          )}

          {activeTab === 'bmr-tdee' && (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Weekly Activity Level</label>
              <select
                value={activityFactor}
                onChange={(e) => setActivityFactor(parseFloat(e.target.value))}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
              >
                <option value={1.2}>Sedentary (Little or no exercise)</option>
                <option value={1.375}>Light Exercise (1-3 days/week)</option>
                <option value={1.55}>Moderate Exercise (3-5 days/week)</option>
                <option value={1.725}>Very Active (6-7 days/week)</option>
                <option value={1.9}>Extremely Active / Athlete</option>
              </select>
            </div>
          )}
        </div>

        {/* Results Panels */}
        <div className="p-5 bg-slate-950/80 border border-slate-800 rounded-xl flex flex-col justify-center space-y-4">
          {activeTab === 'bmi' && (
            <div className="space-y-4 text-center">
              <span className="text-xs text-slate-500 uppercase tracking-wider">Your Body Mass Index</span>
              <div className="text-5xl font-black font-mono text-cyan-400">{bmiResult.bmi}</div>
              <div className={`text-sm font-bold ${bmiResult.color}`}>{bmiResult.category}</div>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Standard World Health Organization (WHO) reference scale for adult men and women.
              </p>
            </div>
          )}

          {activeTab === 'bmr-tdee' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800/80">
                <span className="text-xs text-slate-400">Basal Metabolic Rate (BMR)</span>
                <div className="text-3xl font-extrabold font-mono text-cyan-400 mt-1">
                  {bmrTdeeResult.bmr.toLocaleString()} kcal / day
                </div>
                <span className="text-[11px] text-slate-500">Base calories burned at complete rest</span>
              </div>

              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800/80">
                <span className="text-xs text-slate-400">Total Daily Energy Expenditure (TDEE)</span>
                <div className="text-3xl font-extrabold font-mono text-emerald-400 mt-1">
                  {bmrTdeeResult.tdee.toLocaleString()} kcal / day
                </div>
                <span className="text-[11px] text-slate-500">Calories required to maintain current body weight</span>
              </div>
            </div>
          )}

          {activeTab === 'water' && (
            <div className="space-y-4 text-center">
              <span className="text-xs text-slate-500 uppercase tracking-wider">Recommended Daily Hydration</span>
              <div className="text-5xl font-black font-mono text-cyan-400">{waterIntakeResult.liters} L</div>
              <div className="text-sm font-bold text-slate-300">
                Approximately {waterIntakeResult.glasses} standard glasses (250ml)
              </div>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Adjusted for your body mass and physical activity expenditure.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
