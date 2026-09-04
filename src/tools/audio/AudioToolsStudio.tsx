import React, { useState, useRef, useEffect } from 'react';
import { Volume2, Play, Square, Activity, Radio, Waves, ShieldCheck } from 'lucide-react';

export const AudioToolsStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tone' | 'binaural'>('tone');
  const [isPlaying, setIsPlaying] = useState(false);
  const [frequency, setFrequency] = useState(440); // A4
  const [waveform, setWaveform] = useState<OscillatorType>('sine');
  const [volume, setVolume] = useState(0.5);

  // Binaural Beat state
  const [baseFreq, setBaseFreq] = useState(200);
  const [beatFreq, setBeatFreq] = useState(7); // Theta 7Hz

  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Binaural nodes
  const leftOscRef = useRef<OscillatorNode | null>(null);
  const rightOscRef = useRef<OscillatorNode | null>(null);

  const stopAudio = () => {
    if (oscRef.current) {
      try {
        oscRef.current.stop();
        oscRef.current.disconnect();
      } catch {
        // Ignored
      }
      oscRef.current = null;
    }
    if (leftOscRef.current) {
      try {
        leftOscRef.current.stop();
        leftOscRef.current.disconnect();
      } catch {
        // Ignored
      }
      leftOscRef.current = null;
    }
    if (rightOscRef.current) {
      try {
        rightOscRef.current.stop();
        rightOscRef.current.disconnect();
      } catch {
        // Ignored
      }
      rightOscRef.current = null;
    }
    setIsPlaying(false);
  };

  const startTone = () => {
    stopAudio();
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioContextClass();
    audioCtxRef.current = ctx;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = waveform;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);

    gain.gain.setValueAtTime(volume * 0.3, ctx.currentTime);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    oscRef.current = osc;
    gainNodeRef.current = gain;
    setIsPlaying(true);
  };

  const startBinaural = () => {
    stopAudio();
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioContextClass();
    audioCtxRef.current = ctx;

    // Left channel
    const leftOsc = ctx.createOscillator();
    const leftPanner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
    const gain = ctx.createGain();

    leftOsc.type = 'sine';
    leftOsc.frequency.setValueAtTime(baseFreq, ctx.currentTime);

    // Right channel
    const rightOsc = ctx.createOscillator();
    const rightPanner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;

    rightOsc.type = 'sine';
    rightOsc.frequency.setValueAtTime(baseFreq + beatFreq, ctx.currentTime);

    gain.gain.setValueAtTime(volume * 0.25, ctx.currentTime);

    if (leftPanner && rightPanner) {
      leftPanner.pan.value = -1; // Far left
      rightPanner.pan.value = 1; // Far right
      leftOsc.connect(leftPanner);
      leftPanner.connect(gain);
      rightOsc.connect(rightPanner);
      rightPanner.connect(gain);
    } else {
      leftOsc.connect(gain);
      rightOsc.connect(gain);
    }

    gain.connect(ctx.destination);

    leftOsc.start();
    rightOsc.start();

    leftOscRef.current = leftOsc;
    rightOscRef.current = rightOsc;
    gainNodeRef.current = gain;
    setIsPlaying(true);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAudio();
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  // Update frequency live
  useEffect(() => {
    if (isPlaying && oscRef.current && audioCtxRef.current) {
      oscRef.current.frequency.setValueAtTime(frequency, audioCtxRef.current.currentTime);
    }
  }, [frequency, isPlaying]);

  // Update volume live
  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(volume * 0.3, audioCtxRef.current.currentTime);
    }
  }, [volume]);

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-cyan-400" />
            Web Audio Synthesizer & Tone Studio
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Generate calibrated acoustic audio tones and therapeutic binaural beat frequencies using the Web Audio API.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 text-xs font-medium">
          <ShieldCheck className="w-4 h-4" />
          <span>Native Web Audio API Engine</span>
        </div>
      </div>

      <div className="flex gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => {
            stopAudio();
            setActiveTab('tone');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            activeTab === 'tone'
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Waves className="w-4 h-4" />
          Pure Tone Generator
        </button>
        <button
          onClick={() => {
            stopAudio();
            setActiveTab('binaural');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            activeTab === 'binaural'
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Radio className="w-4 h-4" />
          Binaural Beats Generator
        </button>
      </div>

      {activeTab === 'tone' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Frequency Slider */}
            <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-300">Frequency (Pitch)</span>
                <span className="font-mono text-cyan-400 font-bold text-sm">{frequency} Hz</span>
              </div>
              <input
                type="range"
                min="20"
                max="5000"
                step="1"
                value={frequency}
                onChange={(e) => setFrequency(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex flex-wrap gap-1.5 pt-2">
                {[
                  { name: 'C4 (261 Hz)', f: 261.63 },
                  { name: 'A4 (440 Hz)', f: 440 },
                  { name: '528 Hz (Solfeggio)', f: 528 },
                  { name: '1000 Hz (Test)', f: 1000 }
                ].map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => setFrequency(Math.round(preset.f))}
                    className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-400 hover:text-cyan-400"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Waveform Selector */}
            <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-3">
              <span className="font-semibold text-slate-300 text-xs block">Waveform Shape</span>
              <div className="grid grid-cols-2 gap-2">
                {(['sine', 'square', 'sawtooth', 'triangle'] as OscillatorType[]).map((wf) => (
                  <button
                    key={wf}
                    onClick={() => {
                      setWaveform(wf);
                      if (isPlaying) {
                        stopAudio();
                        setTimeout(startTone, 50);
                      }
                    }}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
                      waveform === wf
                        ? 'bg-cyan-600 text-white'
                        : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {wf}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Volume and Playback */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-slate-950/80 border border-slate-800 rounded-xl">
            <div className="flex items-center gap-3 w-full sm:w-64">
              <Volume2 className="w-4 h-4 text-slate-400" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <span className="text-xs font-mono text-slate-400 w-10">{Math.round(volume * 100)}%</span>
            </div>

            <button
              onClick={isPlaying ? stopAudio : startTone}
              className={`px-8 py-3 rounded-xl text-sm font-bold flex items-center gap-2 transition-transform active:scale-95 shadow-xl ${
                isPlaying
                  ? 'bg-rose-600 hover:bg-rose-500 text-white'
                  : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white'
              }`}
            >
              {isPlaying ? <Square className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
              {isPlaying ? 'Stop Audio Tone' : 'Play Audio Tone'}
            </button>
          </div>
        </div>
      )}

      {activeTab === 'binaural' && (
        <div className="space-y-6">
          <div className="p-4 bg-cyan-950/20 border border-cyan-800/40 rounded-xl text-xs text-cyan-300">
            <p className="font-semibold mb-1">Stereo Headphones Required:</p>
            Binaural beats require stereo headphones. The left ear receives {baseFreq} Hz while the right ear receives{' '}
            {baseFreq + beatFreq} Hz, generating a perceived {beatFreq} Hz mental pulse.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-semibold">Carrier Base Frequency</span>
                <span className="font-mono text-cyan-400 font-bold">{baseFreq} Hz</span>
              </div>
              <input
                type="range"
                min="100"
                max="500"
                value={baseFreq}
                onChange={(e) => setBaseFreq(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-semibold">Target Brainwave Offset</span>
                <span className="font-mono text-emerald-400 font-bold">{beatFreq} Hz (Theta Focus)</span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                value={beatFreq}
                onChange={(e) => setBeatFreq(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={isPlaying ? stopAudio : startBinaural}
              className={`px-8 py-3 rounded-xl text-sm font-bold flex items-center gap-2 transition-transform active:scale-95 shadow-xl ${
                isPlaying
                  ? 'bg-rose-600 hover:bg-rose-500 text-white'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white'
              }`}
            >
              {isPlaying ? <Square className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
              {isPlaying ? 'Stop Binaural Loop' : 'Start Binaural Beat'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
