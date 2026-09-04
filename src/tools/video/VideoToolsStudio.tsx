import React, { useState, useRef, useEffect } from 'react';
import { Video, Camera, Download, Upload, Play, Pause, RotateCw, SkipForward, SkipBack } from 'lucide-react';
import { downloadCanvas } from '../../utils/download';

export const VideoToolsStudio: React.FC = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);
  const [capturedFrames, setCapturedFrames] = useState<string[]>([]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Handle video upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
    }

    const url = URL.createObjectURL(file);
    setVideoFile(file);
    setVideoUrl(url);
    setCurrentTime(0);
    setCapturedFrames([]);
  };

  useEffect(() => {
    return () => {
      if (videoUrl) URL.revokeObjectURL(videoUrl);
    };
  }, [videoUrl]);

  const onLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setDimensions({
        width: videoRef.current.videoWidth,
        height: videoRef.current.videoHeight
      });
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const stepFrame = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, Math.min(duration, videoRef.current.currentTime + seconds));
    }
  };

  const captureFrame = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/png');
    setCapturedFrames((prev) => [dataUrl, ...prev.slice(0, 5)]);
  };

  const downloadFrame = (dataUrl: string, idx: number) => {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `toolnova-frame-${currentTime.toFixed(2)}s-${idx + 1}.png`;
    a.click();
  };

  // Aspect ratio helper
  const getAspectRatio = (w: number, h: number): string => {
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const divisor = gcd(w, h);
    const rw = w / divisor;
    const rh = h / divisor;
    if (Math.abs(w / h - 16 / 9) < 0.05) return '16:9 (Widescreen)';
    if (Math.abs(w / h - 9 / 16) < 0.05) return '9:16 (Vertical / Reels)';
    if (Math.abs(w / h - 4 / 3) < 0.05) return '4:3 (Standard)';
    if (Math.abs(w / h - 1) < 0.05) return '1:1 (Square)';
    return `${rw}:${rh}`;
  };

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Video className="w-5 h-5 text-cyan-400" />
            Video Frame Grabber & Aspect Studio
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Extract pixel-perfect, uncompressed full-resolution still frames from video files entirely in your browser.
          </p>
        </div>
      </div>

      {!videoUrl ? (
        <div className="relative border-2 border-dashed border-slate-700/80 hover:border-cyan-500/50 transition-colors rounded-2xl p-10 text-center bg-slate-950/40 group">
          <input
            type="file"
            accept="video/mp4,video/webm,video/ogg,video/quicktime"
            onChange={handleFileUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div className="flex flex-col items-center justify-center pointer-events-none">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-3 group-hover:scale-110 transition-transform">
              <Upload className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-slate-200 mb-1">Upload video file to extract frames</p>
            <p className="text-xs text-slate-500">Supports MP4, WebM, OGG, and MOV up to 2GB locally</p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Player Container */}
            <div className="lg:col-span-2 space-y-4">
              <div className="relative bg-black rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center max-h-[420px]">
                <video
                  ref={videoRef}
                  src={videoUrl}
                  onLoadedMetadata={onLoadedMetadata}
                  onTimeUpdate={() => {
                    if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
                  }}
                  onEnded={() => setIsPlaying(false)}
                  className="w-full h-full max-h-[420px] object-contain"
                />
              </div>

              {/* Player Controls */}
              <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={0}
                    max={duration || 100}
                    step={0.01}
                    value={currentTime}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      setCurrentTime(val);
                      if (videoRef.current) videoRef.current.currentTime = val;
                    }}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                  <span className="text-xs font-mono text-cyan-400 whitespace-nowrap">
                    {currentTime.toFixed(2)}s / {duration.toFixed(2)}s
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={togglePlay}
                      className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      {isPlaying ? 'Pause' : 'Play'}
                    </button>
                    <button
                      onClick={() => stepFrame(-1 / 30)}
                      title="Step back 1 frame (1/30 sec)"
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                    >
                      <SkipBack className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => stepFrame(1 / 30)}
                      title="Step forward 1 frame (1/30 sec)"
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                    >
                      <SkipForward className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={captureFrame}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg transition-transform active:scale-95"
                  >
                    <Camera className="w-4 h-4" />
                    Capture Full-Res Frame
                  </button>
                </div>
              </div>
            </div>

            {/* Video Metadata Inspector */}
            <div className="space-y-4">
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Video Inspector</h4>
                {dimensions && (
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-900">
                      <span className="text-slate-500">Dimensions:</span>
                      <span className="font-mono text-cyan-400">
                        {dimensions.width} x {dimensions.height} px
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-900">
                      <span className="text-slate-500">Aspect Ratio:</span>
                      <span className="font-mono text-white">
                        {getAspectRatio(dimensions.width, dimensions.height)}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-900">
                      <span className="text-slate-500">Duration:</span>
                      <span className="font-mono text-white">{duration.toFixed(2)} seconds</span>
                    </div>
                    {videoFile && (
                      <div className="flex justify-between py-1">
                        <span className="text-slate-500">File Size:</span>
                        <span className="font-mono text-slate-300">
                          {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Captured Frames Gallery */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Captured Frames ({capturedFrames.length})
                </h4>
                {capturedFrames.length === 0 ? (
                  <p className="text-xs text-slate-500 italic">Click "Capture Full-Res Frame" to grab stills.</p>
                ) : (
                  <div className="space-y-2 max-h-[220px] overflow-y-auto">
                    {capturedFrames.map((frame, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between gap-2 p-2 bg-slate-900 rounded-lg border border-slate-800"
                      >
                        <img src={frame} alt="Captured frame" className="w-16 h-10 object-cover rounded" />
                        <button
                          onClick={() => downloadFrame(frame, idx)}
                          className="px-2.5 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-white text-[11px] font-semibold flex items-center gap-1"
                        >
                          <Download className="w-3 h-3" />
                          Download
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hidden offscreen canvas for frame capture */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};
