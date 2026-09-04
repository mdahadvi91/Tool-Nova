import React, { useState, useEffect, useMemo } from 'react';
import { Calendar, Clock, Globe, Copy, Check, ShieldCheck } from 'lucide-react';
import { copyToClipboard as copyTextToClipboard } from '../../utils/clipboard';

export const DateTimeStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'age' | 'business-days' | 'timestamp' | 'world-clock'>('age');

  // Age Calculator
  const [birthDate, setBirthDate] = useState('1995-06-15');

  // Business Days
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );

  // Timestamp
  const [unixInput, setUnixInput] = useState(Math.floor(Date.now() / 1000).toString());
  const [copied, setCopied] = useState(false);

  // World Clock current time
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Age computation
  const ageResults = useMemo(() => {
    const birth = new Date(birthDate);
    const today = now;
    if (isNaN(birth.getTime())) return null;

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDaysLived = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    const daysUntilNext = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    return { years, months, days, totalDaysLived, daysUntilNext };
  }, [birthDate, now]);

  // Business days computation
  const businessDaysResults = useMemo(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start > end) return null;

    let workingDays = 0;
    let weekendDays = 0;
    const cur = new Date(start);

    while (cur <= end) {
      const day = cur.getDay();
      if (day === 0 || day === 6) {
        weekendDays++;
      } else {
        workingDays++;
      }
      cur.setDate(cur.getDate() + 1);
    }

    const totalCalendarDays = workingDays + weekendDays;
    return { workingDays, weekendDays, totalCalendarDays };
  }, [startDate, endDate]);

  const copyToClipboard = (text: string) => {
    void copyTextToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-cyan-400" />
            Date, Time & Working Days Studio
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Calculate exact chronological age, business working days, epoch timestamps, and live world clocks.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
        {[
          { id: 'age', label: 'Chronological Age', icon: Calendar },
          { id: 'business-days', label: 'Business Days Calculator', icon: Clock },
          { id: 'timestamp', label: 'Epoch Timestamp', icon: Clock },
          { id: 'world-clock', label: 'World Timezones', icon: Globe }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === tab.id
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'age' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-5 bg-slate-950/80 border border-slate-800 rounded-xl space-y-4">
            <label className="text-xs font-semibold text-slate-300">Select Date of Birth</label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-cyan-500/50"
            />
          </div>

          {ageResults && (
            <div className="p-5 bg-slate-950/80 border border-slate-800 rounded-xl space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold font-mono text-cyan-400">{ageResults.years}</span>
                <span className="text-sm font-bold text-slate-300">years,</span>
                <span className="text-2xl font-bold font-mono text-emerald-400">{ageResults.months}</span>
                <span className="text-sm font-bold text-slate-300">months,</span>
                <span className="text-2xl font-bold font-mono text-white">{ageResults.days}</span>
                <span className="text-sm font-bold text-slate-300">days</span>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-900">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800/80">
                  <span className="text-[11px] text-slate-500 uppercase">Total Days Lived</span>
                  <p className="text-lg font-bold font-mono text-white mt-1">
                    {ageResults.totalDaysLived.toLocaleString()}
                  </p>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800/80">
                  <span className="text-[11px] text-slate-500 uppercase">Days to Next Birthday</span>
                  <p className="text-lg font-bold font-mono text-cyan-400 mt-1">{ageResults.daysUntilNext} days</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'business-days' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-5 bg-slate-950/80 border border-slate-800 rounded-xl space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm font-mono text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm font-mono text-white"
              />
            </div>
          </div>

          {businessDaysResults && (
            <div className="p-5 bg-slate-950/80 border border-slate-800 rounded-xl space-y-4 flex flex-col justify-center">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">Total Business Working Days:</span>
                <span className="text-3xl font-extrabold font-mono text-emerald-400">
                  {businessDaysResults.workingDays} days
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-900">
                <span className="text-xs text-slate-400">Weekend Days (Sat/Sun):</span>
                <span className="text-lg font-mono text-slate-300">{businessDaysResults.weekendDays} days</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-900">
                <span className="text-xs text-slate-400">Total Calendar Days Span:</span>
                <span className="text-lg font-mono text-cyan-400">
                  {businessDaysResults.totalCalendarDays} days
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'timestamp' && (
        <div className="p-5 bg-slate-950/80 border border-slate-800 rounded-xl space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Unix Epoch Timestamp (Seconds)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={unixInput}
                onChange={(e) => setUnixInput(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm font-mono text-cyan-400"
              />
              <button
                onClick={() => setUnixInput(Math.floor(Date.now() / 1000).toString())}
                className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200"
              >
                Set Current Time
              </button>
            </div>
          </div>

          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800/80 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Human UTC Time:</span>
              <span className="font-mono text-white font-semibold">
                {new Date(parseInt(unixInput) * 1000).toUTCString()}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs pt-2 border-t border-slate-800">
              <span className="text-slate-400">Local Browser Time:</span>
              <span className="font-mono text-emerald-400 font-semibold">
                {new Date(parseInt(unixInput) * 1000).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs pt-2 border-t border-slate-800">
              <span className="text-slate-400">ISO 8601 String:</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-cyan-400 font-semibold">
                  {new Date(parseInt(unixInput) * 1000).toISOString()}
                </span>
                <button
                  onClick={() => copyToClipboard(new Date(parseInt(unixInput) * 1000).toISOString())}
                  className="text-slate-400 hover:text-white"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'world-clock' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { city: 'UTC / GMT', tz: 'UTC', flag: '🌐' },
            { city: 'London', tz: 'Europe/London', flag: '🇬🇧' },
            { city: 'New York (EST)', tz: 'America/New_York', flag: '🇺🇸' },
            { city: 'Dubai (GST)', tz: 'Asia/Dubai', flag: '🇦🇪' },
            { city: 'Tokyo (JST)', tz: 'Asia/Tokyo', flag: '🇯🇵' },
            { city: 'Sydney (AEST)', tz: 'Australia/Sydney', flag: '🇦🇺' }
          ].map((item) => (
            <div key={item.city} className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-slate-300">
                  {item.flag} {item.city}
                </span>
                <span className="text-[11px] text-slate-500 font-mono">{item.tz}</span>
              </div>
              <div className="text-xl font-bold font-mono text-cyan-400">
                {now.toLocaleTimeString('en-US', { timeZone: item.tz, hour12: false })}
              </div>
              <div className="text-[11px] text-slate-500">
                {now.toLocaleDateString('en-US', { timeZone: item.tz, weekday: 'short', month: 'short', day: 'numeric' })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
