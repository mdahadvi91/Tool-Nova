import React, { useState, useMemo } from 'react';
import { Plane, Zap, CheckSquare, Clock, Globe, Shield, Sun, Moon } from 'lucide-react';
import { safeStorage } from '../../utils/storage';
import { useTranslation } from '../../i18n/I18nContext';

interface TravelToolsStudioProps {
  initialTab?: 'packing' | 'jetlag' | 'plugs';
}

export const TravelToolsStudio: React.FC<TravelToolsStudioProps> = ({ initialTab = 'packing' }) => {
  const [activeTab, setActiveTab] = useState<'packing' | 'jetlag' | 'plugs'>(initialTab);
  const { t } = useTranslation();

  // --- 1. Packing Checklist State ---
  const [tripType, setTripType] = useState<'international' | 'business' | 'beach' | 'winter'>('international');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    return safeStorage.getJSON('toolnova_packing_checked', {});
  });

  const packingPresets = useMemo(() => {
    const commonDocs = ['Passport / National ID', 'Boarding Passes & Visas', 'Travel Insurance Card', 'Hotel Reservations', 'Credit Cards & Local Currency'];
    const commonTech = ['Universal Power Adapter', 'Phone Charger & Cable', 'Power Bank (Portable Battery)', 'Noise-Cancelling Headphones'];

    let specificClothing: string[] = [];
    if (tripType === 'international') specificClothing = ['Comfortable walking shoes', 'Layered clothing', 'Weather-resistant jacket', 'Daypack / Crossbody bag'];
    else if (tripType === 'business') specificClothing = ['Formal suits / blazers', 'Dress shirts & ties', 'Dress shoes & belt', 'Laptop & presentation clicker'];
    else if (tripType === 'beach') specificClothing = ['Swimwear (2x)', 'Sunglasses & UV Hat', 'Flip-flops & sandals', 'Quick-dry towel', 'Reef-safe Sunscreen'];
    else if (tripType === 'winter') specificClothing = ['Heavy down jacket / parka', 'Thermal base layers', 'Wool socks & winter boots', 'Beanie & insulated gloves', 'Lip balm & moisturizer'];

    return {
      Documents: commonDocs,
      Electronics: commonTech,
      Clothing: specificClothing,
      Toiletries: ['Toothbrush & travel toothpaste', 'Deodorant', 'Prescription medications', 'Travel shampoo & soap']
    };
  }, [tripType]);

  const toggleItem = (itemKey: string) => {
    const updated = { ...checkedItems, [itemKey]: !checkedItems[itemKey] };
    setCheckedItems(updated);
    safeStorage.setJSON('toolnova_packing_checked', updated);
  };

  const clearPacking = () => {
    setCheckedItems({});
    safeStorage.setJSON('toolnova_packing_checked', {});
  };

  // --- 2. Jet Lag Planner State ---
  const [originOffset, setOriginOffset] = useState<number>(-5); // EST (UTC-5)
  const [destOffset, setDestOffset] = useState<number>(4); // UAE (UTC+4)

  const jetLagPlan = useMemo(() => {
    const diff = destOffset - originOffset;
    const direction = diff > 0 ? 'Eastward' : diff < 0 ? 'Westward' : 'Same Time Zone';
    const hours = Math.abs(diff);

    return {
      diff,
      hours,
      direction,
      daysToAdjust: Math.ceil(hours / 1.5),
      advice: diff > 0
        ? 'Traveling East: Advance your sleep schedule 1 hour earlier each night for 3 days before travel. Seek bright light in the morning upon arrival.'
        : 'Traveling West: Delay your bedtime 1 hour later each night before departure. Seek afternoon daylight upon arrival to delay circadian sleep phase.'
    };
  }, [originOffset, destOffset]);

  // --- 3. Electrical Plugs & Voltage Directory ---
  const [countrySearch, setCountrySearch] = useState('');
  const countriesData = [
    { country: 'United Arab Emirates', plugs: 'Type G', voltage: '230V', freq: '50Hz' },
    { country: 'United States', plugs: 'Type A, Type B', voltage: '120V', freq: '60Hz' },
    { country: 'United Kingdom', plugs: 'Type G', voltage: '230V', freq: '50Hz' },
    { country: 'Germany & France (EU)', plugs: 'Type C, Type E, Type F', voltage: '230V', freq: '50Hz' },
    { country: 'Japan', plugs: 'Type A, Type B', voltage: '100V', freq: '50Hz / 60Hz' },
    { country: 'India', plugs: 'Type C, Type D, Type M', voltage: '230V', freq: '50Hz' },
    { country: 'Saudi Arabia', plugs: 'Type G', voltage: '230V', freq: '60Hz' },
    { country: 'Australia & New Zealand', plugs: 'Type I', voltage: '230V', freq: '50Hz' },
    { country: 'Singapore', plugs: 'Type G', voltage: '230V', freq: '50Hz' },
    { country: 'Canada', plugs: 'Type A, Type B', voltage: '120V', freq: '60Hz' },
    { country: 'Brazil', plugs: 'Type C, Type N', voltage: '127V / 220V', freq: '60Hz' },
  ];

  const filteredCountries = countriesData.filter(c =>
    c.country.toLowerCase().includes(countrySearch.toLowerCase()) ||
    c.plugs.toLowerCase().includes(countrySearch.toLowerCase())
  );

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 backdrop-blur-xl">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4">
        <button
          onClick={() => setActiveTab('packing')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'packing'
              ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
              : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
          }`}
        >
          Travel Packing Checklist
        </button>
        <button
          onClick={() => setActiveTab('jetlag')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'jetlag'
              ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
              : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
          }`}
        >
          Jet Lag & Circadian Planner
        </button>
        <button
          onClick={() => setActiveTab('plugs')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'plugs'
              ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
              : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
          }`}
        >
          Universal Electrical Plug Directory
        </button>
      </div>

      {/* 1. Packing Checklist */}
      {activeTab === 'packing' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-2">
              {(['international', 'business', 'beach', 'winter'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setTripType(type)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium capitalize ${
                    tripType === type ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            <button
              onClick={clearPacking}
              className="text-xs text-slate-400 hover:text-red-400 transition-colors"
            >
              Reset Checklist
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(packingPresets).map(([category, items]) => (
              <div key={category} className="bg-slate-950/70 border border-slate-800 p-4 rounded-2xl space-y-3">
                <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">{category}</h4>
                <ul className="space-y-2">
                  {(items as string[]).map(item => {
                    const key = `${tripType}_${category}_${item}`;
                    const isChecked = Boolean(checkedItems[key]);
                    return (
                      <li
                        key={item}
                        onClick={() => toggleItem(key)}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-900 cursor-pointer select-none text-xs"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="w-4 h-4 rounded border-slate-700 text-cyan-500 focus:ring-cyan-500 cursor-pointer"
                        />
                        <span className={isChecked ? 'line-through text-slate-500' : 'text-slate-200'}>
                          {item}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Jet Lag Planner */}
      {activeTab === 'jetlag' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Departure Timezone (UTC Offset)</label>
              <select
                value={originOffset}
                onChange={e => setOriginOffset(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              >
                <option value={-8}>UTC-8 (PST - US Pacific)</option>
                <option value={-5}>UTC-5 (EST - US Eastern)</option>
                <option value={0}>UTC+0 (GMT - London)</option>
                <option value={1}>UTC+1 (CET - Paris, Berlin)</option>
                <option value={4}>UTC+4 (GST - Dubai, UAE)</option>
                <option value={5.5}>UTC+5:30 (IST - India)</option>
                <option value={6}>UTC+6 (BST - Bangladesh)</option>
                <option value={9}>UTC+9 (JST - Tokyo)</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Destination Timezone (UTC Offset)</label>
              <select
                value={destOffset}
                onChange={e => setDestOffset(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              >
                <option value={-8}>UTC-8 (PST - US Pacific)</option>
                <option value={-5}>UTC-5 (EST - US Eastern)</option>
                <option value={0}>UTC+0 (GMT - London)</option>
                <option value={1}>UTC+1 (CET - Paris, Berlin)</option>
                <option value={4}>UTC+4 (GST - Dubai, UAE)</option>
                <option value={5.5}>UTC+5:30 (IST - India)</option>
                <option value={6}>UTC+6 (BST - Bangladesh)</option>
                <option value={9}>UTC+9 (JST - Tokyo)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl text-center">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Time Difference</span>
              <div className="text-2xl font-black text-cyan-400 font-mono mt-1">
                {jetLagPlan.hours} Hours
              </div>
              <span className="text-[11px] text-slate-400">({jetLagPlan.direction})</span>
            </div>
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl text-center">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Est. Recovery Duration</span>
              <div className="text-2xl font-black text-amber-400 font-mono mt-1">
                ~{jetLagPlan.daysToAdjust} Days
              </div>
              <span className="text-[11px] text-slate-400">To fully align body clock</span>
            </div>
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl flex flex-col justify-center">
              <span className="text-[10px] text-slate-500 uppercase font-semibold block mb-1">Circadian Strategy</span>
              <p className="text-xs text-slate-300 leading-relaxed">{jetLagPlan.advice}</p>
            </div>
          </div>
        </div>
      )}

      {/* 3. Plugs Directory */}
      {activeTab === 'plugs' && (
        <div className="space-y-4">
          <input
            type="text"
            value={countrySearch}
            onChange={e => setCountrySearch(e.target.value)}
            placeholder="Search country (e.g. UAE, USA, Japan)..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-[10px] text-slate-500 uppercase">
                  <th className="pb-2.5">Country / Region</th>
                  <th className="pb-2.5">Socket Plug Types</th>
                  <th className="pb-2.5">Standard Voltage</th>
                  <th className="pb-2.5">Frequency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {filteredCountries.map(c => (
                  <tr key={c.country} className="hover:bg-slate-900/40">
                    <td className="py-2.5 font-semibold text-cyan-300 font-sans">{c.country}</td>
                    <td className="py-2.5 text-slate-200">{c.plugs}</td>
                    <td className="py-2.5 text-amber-400">{c.voltage}</td>
                    <td className="py-2.5 text-slate-400">{c.freq}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
