import React, { useState, useMemo } from 'react';
import { Share2, Hash, Image, Copy, Check, Sparkles, AlertCircle } from 'lucide-react';
import { useTranslation } from '../../i18n/I18nContext';

interface SocialMediaStudioProps {
  initialTab?: 'counter' | 'dimensions' | 'hashtags';
}

export const SocialMediaStudio: React.FC<SocialMediaStudioProps> = ({ initialTab = 'counter' }) => {
  const [activeTab, setActiveTab] = useState<'counter' | 'dimensions' | 'hashtags'>(initialTab);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const { t } = useTranslation();

  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // --- 1. Character Counter State ---
  const [postText, setPostText] = useState('Supercharge your workflow with ToolNova! 35 specialized workspaces with 100% private browser processing. #tech #productivity #webdev');

  const charCount = postText.length;
  const wordCount = postText.trim() ? postText.trim().split(/\s+/).length : 0;

  const platforms = [
    { name: 'X / Twitter Post', max: 280, count: charCount, color: 'text-sky-400' },
    { name: 'LinkedIn Post', max: 3000, count: charCount, color: 'text-blue-400' },
    { name: 'Instagram Caption', max: 2200, count: charCount, color: 'text-pink-400' },
    { name: 'TikTok Caption', max: 2200, count: charCount, color: 'text-cyan-400' },
    { name: 'YouTube Video Title', max: 100, count: charCount, color: 'text-red-400' },
    { name: 'YouTube Description', max: 5000, count: charCount, color: 'text-amber-400' },
  ];

  // --- 2. Hashtag Extractor State ---
  const [hashtagInput, setHashtagInput] = useState('Boost productivity with #AI #coding and #webdev tools! Check out #ToolNova for all #tech utilities.');

  const extractedTags = useMemo(() => {
    const matches = hashtagInput.match(/#[a-zA-Z0-9_\u0980-\u09FF\u0600-\u06FF]+/g) || [];
    const unique = Array.from(new Set(matches));
    return {
      all: matches,
      unique: unique,
      count: matches.length
    };
  }, [hashtagInput]);

  // --- 3. Dimensions Guide ---
  const dimensions = [
    { platform: 'Instagram', type: 'Square Post', size: '1080 x 1080 px', ratio: '1:1' },
    { platform: 'Instagram', type: 'Portrait Post', size: '1080 x 1350 px', ratio: '4:5' },
    { platform: 'Instagram / TikTok', type: 'Story / Reel', size: '1080 x 1920 px', ratio: '9:16' },
    { platform: 'X / Twitter', type: 'Post Image', size: '1200 x 675 px', ratio: '16:9' },
    { platform: 'X / Twitter', type: 'Header Banner', size: '1500 x 500 px', ratio: '3:1' },
    { platform: 'LinkedIn', type: 'Shared Image', size: '1200 x 627 px', ratio: '1.91:1' },
    { platform: 'LinkedIn', type: 'Company Cover', size: '1128 x 191 px', ratio: '5.9:1' },
    { platform: 'YouTube', type: 'Thumbnail', size: '1280 x 720 px', ratio: '16:9' },
    { platform: 'YouTube', type: 'Channel Banner', size: '2560 x 1440 px', ratio: '16:9' },
    { platform: 'Facebook', type: 'Landscape Post', size: '1200 x 630 px', ratio: '1.91:1' },
  ];

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 backdrop-blur-xl">
      {/* Tab Controls */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4">
        <button
          onClick={() => setActiveTab('counter')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'counter'
              ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
              : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
          }`}
        >
          Character Limit Counter
        </button>
        <button
          onClick={() => setActiveTab('dimensions')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'dimensions'
              ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
              : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
          }`}
        >
          Image Dimensions Guide
        </button>
        <button
          onClick={() => setActiveTab('hashtags')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'hashtags'
              ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
              : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
          }`}
        >
          Hashtag Extractor & Counter
        </button>
      </div>

      {/* 1. Character Counter */}
      {activeTab === 'counter' && (
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <label className="font-semibold text-slate-200">Post Draft Content</label>
              <span>
                <strong>{charCount}</strong> characters | <strong>{wordCount}</strong> words
              </span>
            </div>
            <textarea
              rows={4}
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder="Type or paste your social media update here..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {platforms.map((plat) => {
              const remaining = plat.max - plat.count;
              const isOver = remaining < 0;
              const percent = Math.min(100, Math.round((plat.count / plat.max) * 100));

              return (
                <div
                  key={plat.name}
                  className={`bg-slate-950/60 border rounded-2xl p-4 space-y-2 transition-all ${
                    isOver ? 'border-red-500/50 bg-red-950/10' : 'border-slate-800/80'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-200">{plat.name}</span>
                    <span className={`font-mono text-xs ${isOver ? 'text-red-400 font-bold' : plat.color}`}>
                      {remaining} left
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        isOver ? 'bg-red-500' : percent > 85 ? 'bg-amber-400' : 'bg-cyan-500'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-[10px] text-slate-500 font-mono pt-1">
                    <span>Used: {plat.count}</span>
                    <span>Max: {plat.max}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Dimensions Guide */}
      {activeTab === 'dimensions' && (
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-[10px] text-slate-500 uppercase">
                  <th className="pb-2.5">Platform</th>
                  <th className="pb-2.5">Asset Type</th>
                  <th className="pb-2.5">Optimal Resolution</th>
                  <th className="pb-2.5">Aspect Ratio</th>
                  <th className="pb-2.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {dimensions.map((dim, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/40">
                    <td className="py-3 font-semibold text-cyan-400">{dim.platform}</td>
                    <td className="py-3 text-slate-200">{dim.type}</td>
                    <td className="py-3 font-mono text-slate-300">{dim.size}</td>
                    <td className="py-3 font-mono text-slate-400">{dim.ratio}</td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => copy(`${dim.platform} ${dim.type}: ${dim.size}`, `dim-${idx}`)}
                        className="text-[11px] text-slate-400 hover:text-white px-2 py-1 bg-slate-800 rounded-lg"
                      >
                        {copiedText === `dim-${idx}` ? t('copied') : t('copy')}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. Hashtag Extractor */}
      {activeTab === 'hashtags' && (
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-200">Paste Text with Hashtags</label>
            <textarea
              rows={4}
              value={hashtagInput}
              onChange={(e) => setHashtagInput(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-200">
                Extracted Tags ({extractedTags.unique.length} unique / {extractedTags.count} total)
              </span>
              {extractedTags.unique.length > 0 && (
                <button
                  onClick={() => copy(extractedTags.unique.join(' '), 'tags')}
                  className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  {copiedText === 'tags' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedText === 'tags' ? t('copied') : 'Copy All Tags'}</span>
                </button>
              )}
            </div>

            {extractedTags.unique.length === 0 ? (
              <p className="text-xs text-slate-500 italic">No hashtags found in input text.</p>
            ) : (
              <div className="flex flex-wrap gap-2 pt-1">
                {extractedTags.unique.map((tag, idx) => (
                  <span
                    key={idx}
                    onClick={() => copy(tag, `tag-${idx}`)}
                    className="px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono cursor-pointer hover:bg-cyan-500/20 transition-colors"
                    title="Click to copy"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
