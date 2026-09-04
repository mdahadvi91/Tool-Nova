import React, { useState, useEffect } from 'react';
import { Shield, Key, Lock, Copy, Check, RefreshCw } from 'lucide-react';

export const SecurityHashStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'hash' | 'base64' | 'password' | 'uuid'>('hash');

  // Hash State
  const [inputText, setInputText] = useState('Zenith Security Engine 2026');
  const [sha256Hash, setSha256Hash] = useState('');
  const [sha512Hash, setSha512Hash] = useState('');
  const [sha1Hash, setSha1Hash] = useState('');

  // Base64 State
  const [base64Input, setBase64Input] = useState('Hello World! 🚀');
  const [base64Output, setBase64Output] = useState('');
  const [base64Mode, setBase64Mode] = useState<'encode' | 'decode'>('encode');

  // Password State
  const [passLength, setPassLength] = useState(20);
  const [incUpper, setIncUpper] = useState(true);
  const [incLower, setIncLower] = useState(true);
  const [incNumbers, setIncNumbers] = useState(true);
  const [incSymbols, setIncSymbols] = useState(true);
  const [generatedPass, setGeneratedPass] = useState('');

  // UUID State
  const [uuidList, setUuidList] = useState<string[]>([]);

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Compute Hashes using Web Crypto API
  useEffect(() => {
    async function computeHashes() {
      const encoder = new TextEncoder();
      const data = encoder.encode(inputText);

      const bufferToHex = (buffer: ArrayBuffer) =>
        Array.from(new Uint8Array(buffer))
          .map((b) => b.toString(16).padStart(2, '0'))
          .join('');

      try {
        const hash256 = await crypto.subtle.digest('SHA-256', data);
        setSha256Hash(bufferToHex(hash256));

        const hash512 = await crypto.subtle.digest('SHA-512', data);
        setSha512Hash(bufferToHex(hash512));

        const hash1 = await crypto.subtle.digest('SHA-1', data);
        setSha1Hash(bufferToHex(hash1));
      } catch (e) {
        console.error('Hash calculation error:', e);
      }
    }
    computeHashes();
  }, [inputText]);

  // Base64 Transform
  useEffect(() => {
    try {
      if (base64Mode === 'encode') {
        const utf8Bytes = new TextEncoder().encode(base64Input);
        let binary = '';
        utf8Bytes.forEach((b) => (binary += String.fromCharCode(b)));
        setBase64Output(btoa(binary));
      } else {
        const binary = atob(base64Input);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
        setBase64Output(new TextDecoder().decode(bytes));
      }
    } catch {
      setBase64Output('Invalid Base64 string for decoding');
    }
  }, [base64Input, base64Mode]);

  // Generate Cryptographic Password
  const generatePassword = () => {
    let chars = '';
    if (incUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (incLower) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (incNumbers) chars += '0123456789';
    if (incSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!chars) chars = 'abcdefghijklmnopqrstuvwxyz';

    const array = new Uint32Array(passLength);
    crypto.getRandomValues(array);

    let res = '';
    for (let i = 0; i < passLength; i++) {
      res += chars[array[i] % chars.length];
    }
    setGeneratedPass(res);
  };

  useEffect(() => {
    generatePassword();
  }, [passLength, incUpper, incLower, incNumbers, incSymbols]);

  // Generate UUID v4
  const generateUuids = (count = 5) => {
    const list: string[] = [];
    for (let i = 0; i < count; i++) {
      list.push(crypto.randomUUID());
    }
    setUuidList(list);
  };

  useEffect(() => {
    generateUuids(5);
  }, []);

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl shadow-2xl">
      {/* Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('hash')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'hash'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
            }`}
          >
            Cryptographic Hashes
          </button>
          <button
            onClick={() => setActiveTab('base64')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'base64'
                ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg shadow-purple-500/20'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
            }`}
          >
            Base64 Studio
          </button>
          <button
            onClick={() => setActiveTab('password')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'password'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
            }`}
          >
            Password Generator
          </button>
          <button
            onClick={() => setActiveTab('uuid')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'uuid'
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/20'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
            }`}
          >
            UUID v4
          </button>
        </div>

        <span className="text-xs text-cyan-400 bg-cyan-950/40 px-3 py-1.5 rounded-full border border-cyan-800/40">
          Native Web Crypto API
        </span>
      </div>

      {/* HASH VIEW */}
      {activeTab === 'hash' && (
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Input Text</label>
            <textarea
              rows={3}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 font-mono focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div className="space-y-4">
            {/* SHA-256 */}
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-cyan-400">SHA-256 (256-bit)</span>
                <button
                  onClick={() => copyToClipboard(sha256Hash, 'sha256')}
                  className="flex items-center gap-1 text-slate-400 hover:text-slate-200 text-[11px]"
                >
                  {copiedKey === 'sha256' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedKey === 'sha256' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <p className="font-mono text-xs text-slate-300 break-all select-all">{sha256Hash}</p>
            </div>

            {/* SHA-512 */}
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-purple-400">SHA-512 (512-bit)</span>
                <button
                  onClick={() => copyToClipboard(sha512Hash, 'sha512')}
                  className="flex items-center gap-1 text-slate-400 hover:text-slate-200 text-[11px]"
                >
                  {copiedKey === 'sha512' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedKey === 'sha512' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <p className="font-mono text-xs text-slate-300 break-all select-all">{sha512Hash}</p>
            </div>

            {/* SHA-1 */}
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-400">SHA-1 (Legacy 160-bit)</span>
                <button
                  onClick={() => copyToClipboard(sha1Hash, 'sha1')}
                  className="flex items-center gap-1 text-slate-400 hover:text-slate-200 text-[11px]"
                >
                  {copiedKey === 'sha1' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedKey === 'sha1' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <p className="font-mono text-xs text-slate-400 break-all select-all">{sha1Hash}</p>
            </div>
          </div>
        </div>
      )}

      {/* BASE64 VIEW */}
      {activeTab === 'base64' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setBase64Mode('encode')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                base64Mode === 'encode' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400'
              }`}
            >
              Encode to Base64
            </button>
            <button
              onClick={() => setBase64Mode('decode')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                base64Mode === 'decode' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400'
              }`}
            >
              Decode from Base64
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <span className="text-xs text-slate-400 mb-1.5 block">Source Payload</span>
              <textarea
                rows={6}
                value={base64Input}
                onChange={(e) => setBase64Input(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 font-mono"
              />
            </div>
            <div>
              <div className="flex justify-between items-center text-xs text-slate-400 mb-1.5">
                <span>Result</span>
                <button
                  onClick={() => copyToClipboard(base64Output, 'b64')}
                  className="flex items-center gap-1 text-purple-400 hover:text-purple-300"
                >
                  {copiedKey === 'b64' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>Copy</span>
                </button>
              </div>
              <textarea
                readOnly
                rows={6}
                value={base64Output}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-xs text-purple-300 font-mono"
              />
            </div>
          </div>
        </div>
      )}

      {/* PASSWORD VIEW */}
      {activeTab === 'password' && (
        <div className="space-y-6">
          <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl flex items-center justify-between gap-4">
            <div className="font-mono text-lg font-bold text-emerald-400 tracking-wider break-all select-all">
              {generatedPass}
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={generatePassword}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                title="Regenerate Password"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => copyToClipboard(generatedPass, 'pass')}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-emerald-600/20"
              >
                {copiedKey === 'pass' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedKey === 'pass' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 space-y-4">
            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                <span>Password Length</span>
                <span className="font-mono text-cyan-400 font-bold">{passLength} Characters</span>
              </div>
              <input
                type="range"
                min={8}
                max={64}
                value={passLength}
                onChange={(e) => setPassLength(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={incUpper}
                  onChange={(e) => setIncUpper(e.target.checked)}
                  className="rounded border-slate-700"
                />
                <span>Uppercase (A-Z)</span>
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={incLower}
                  onChange={(e) => setIncLower(e.target.checked)}
                  className="rounded border-slate-700"
                />
                <span>Lowercase (a-z)</span>
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={incNumbers}
                  onChange={(e) => setIncNumbers(e.target.checked)}
                  className="rounded border-slate-700"
                />
                <span>Numbers (0-9)</span>
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={incSymbols}
                  onChange={(e) => setIncSymbols(e.target.checked)}
                  className="rounded border-slate-700"
                />
                <span>Symbols (!@#$)</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* UUID VIEW */}
      {activeTab === 'uuid' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-400">Cryptographically Random UUID v4</span>
            <button
              onClick={() => generateUuids(5)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Generate 5 New</span>
            </button>
          </div>

          <div className="space-y-2">
            {uuidList.map((uuid, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 bg-slate-950/60 border border-slate-800 rounded-xl"
              >
                <span className="font-mono text-xs text-cyan-300 select-all">{uuid}</span>
                <button
                  onClick={() => copyToClipboard(uuid, `uuid-${i}`)}
                  className="p-1.5 text-slate-400 hover:text-slate-200"
                >
                  {copiedKey === `uuid-${i}` ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
