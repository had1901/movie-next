/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';

type Source = { label: string; src: string; type?: string };
type Subtitle = { label: string; src: string; srclang: string; default?: boolean };

interface CustomVideoProps {
  sources: Source[]
  poster?: string
  subtitles?: Subtitle[]
  className?: string
  initialQuality?: string
}

export default function CustomVideo({
  sources,
  poster,
  subtitles = [],
  className = '',
  initialQuality,
}: CustomVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setPlaying] = useState(false);
  const [isMuted, setMuted] = useState(false);
  const [vol, setVol] = useState(1);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [bufferedEnd, setBufferedEnd] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [quality, setQuality] = useState<string>(
    initialQuality ?? (sources[0]?.label ?? 'Default')
  );
  const [activeTrack, setActiveTrack] = useState<string | 'off'>(
    subtitles.find(s => s.default)?.label ?? 'off'
  );

  const sourceMap = useMemo(() => {
    const map = new Map<string, Source>();
    sources.forEach(s => map.set(s.label, s));
    return map;
  }, [sources]);

  const currentSrc = sourceMap.get(quality) || sources[0];
  const fmt = (s = 0) => {
    const m = Math.floor(s / 60);
    const ss = Math.floor(s % 60).toString().padStart(2, '0');
    return `${m}:${ss}`;
  };

  const togglePlay = async () => {
    const v = videoRef.current!;
    if (v.paused) {
      await v.play();
    } else {
      v.pause();
    }
  };

  const seekBy = (delta: number) => {
    const v = videoRef.current!;
    v.currentTime = Math.max(0, Math.min(v.currentTime + delta, v.duration || Infinity));
  };

  const requestPiP = async () => {
    const v = videoRef.current as any;
    if (document.pictureInPictureElement) {
      await document.exitPictureInPicture();
    } else if (v?.requestPictureInPicture) {
      await v.requestPictureInPicture();
    }
  };

  const requestFS = async () => {
    const wrapper = containerRef.current!;
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await wrapper.requestFullscreen();
    }
  };

  const onChangeVolume = (value: number) => {
    const v = videoRef.current!;
    v.muted = false;
    setMuted(false);
    v.volume = value;
    setVol(value);
  };

  const changeQuality = (newLabel: string) => {
    const v = videoRef.current!;
    const wasPlaying = !v.paused && !v.ended;
    const t = v.currentTime;
    const s = sourceMap.get(newLabel);
    if (!s) return;

    const canPlay = () => {
      v.currentTime = Math.min(t, v.duration || t);
      v.playbackRate = speed;
      if (wasPlaying) v.play();
      v.removeEventListener('loadedmetadata', canPlay);
    };

    v.pause();
    v.src = s.src;
    v.load();
    v.addEventListener('loadedmetadata', canPlay);
    setQuality(newLabel);
  };

  const enableTrack = (label: string | 'off') => {
    const v = videoRef.current!;
    const tracks = v.textTracks;
    for (let i = 0; i < tracks.length; i++) {
      tracks[i].mode = 'disabled';
    }
    if (label !== 'off') {
      const wanted = Array.from(tracks).find(t => t.label === label);
      if (wanted) wanted.mode = 'showing';
    }
    setActiveTrack(label);
  };

  useEffect(() => {
    const v = videoRef.current!;
    const onLoaded = () => setDuration(v.duration || 0);
    const onTime = () => setTime(v.currentTime || 0);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onProg = () => {
      try {
        const end = v.buffered.length ? v.buffered.end(v.buffered.length - 1) : 0;
        setBufferedEnd(end);
      } catch {}
    };

    v.addEventListener('loadedmetadata', onLoaded);
    v.addEventListener('timeupdate', onTime);
    v.addEventListener('play', onPlay);
    v.addEventListener('pause', onPause);
    v.addEventListener('progress', onProg);

    v.volume = vol;
    v.muted = isMuted;
    v.playbackRate = speed;

    const tDefault = subtitles.find(s => s.default)?.label;
    if (tDefault) enableTrack(tDefault);

    return () => {
      v.removeEventListener('loadedmetadata', onLoaded);
      v.removeEventListener('timeupdate', onTime);
      v.removeEventListener('play', onPlay);
      v.removeEventListener('pause', onPause);
      v.removeEventListener('progress', onProg);
    };
  }, []);

  useEffect(() => {
    const v = videoRef.current!;
    v.playbackRate = speed;
  }, [speed]);

  useEffect(() => {
    const v = videoRef.current!;
    v.muted = isMuted;
  }, [isMuted]);

  const percentage = duration ? (time / duration) * 100 : 0;
  const bufferedPct = duration ? (bufferedEnd / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-2xl overflow-hidden bg-black/80 ${className}`}
    >
      {/* VIDEO */}
      <div className="relative aspect-video">
        <video
          ref={videoRef}
          poster={poster}
          className="h-full w-full object-contain bg-black"
        //   src={currentSrc?.src}
          src={sources[0].src}
          
          preload="metadata"
          playsInline
        >
          {subtitles.map((s, i) => (
            <track
              key={i}
              kind="subtitles"
              srcLang={s.srclang}
              label={s.label}
              src={s.src}
              default={s.default}
            />
          ))}
        </video>
      </div>

      {/* CONTROLS BAR */}
      <div className="absolute inset-x-0 bottom-0">
        {/* progress bar */}
        <div className="px-4">
          <div className="relative h-1.5 mb-2">
            <div
              className="absolute inset-y-0 left-0 bg-white/30 rounded-full"
              style={{ width: `${bufferedPct}%` }}
            />
            <div
              className="absolute inset-y-0 left-0 bg-indigo-400 rounded-full"
              style={{ width: `${percentage}%` }}
            />
            <input
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={time}
              onChange={(e) => (videoRef.current!.currentTime = +e.target.value)}
              className="absolute inset-0 w-full opacity-0 cursor-pointer"
            />
          </div>
        </div>

        {/* bottom controls */}
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-t from-black/70 to-black/0">
          {/* left */}
          <div className="flex items-center gap-3 text-white">
            {/* play/pause */}
            <button
              onClick={togglePlay}
              className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 grid place-items-center"
            >
              {isPlaying ? (
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M8 5h3v14H8zM13 5h3v14h-3z"/></svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              )}
            </button>

            {/* -10s */}
            <button onClick={() => seekBy(-10)} className="text-white/90 hover:text-white" title="Lùi 10s">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M12 5V1L7 6l5 5V7a5 5 0 1 1-5 5H5c0 3.866 3.134 7 7 7s7-3.134 7-7-3.134-7-7-7z"/></svg>
            </button>

            {/* +10s */}
            <button onClick={() => seekBy(10)} className="text-white/90 hover:text-white" title="Tua 10s">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" style={{transform:'scaleX(-1)'}}><path d="M12 5V1L7 6l5 5V7a5 5 0 1 1-5 5H5c0 3.866 3.134 7 7 7s7-3.134 7-7-3.134-7-7-7z"/></svg>
            </button>

            <div className="text-sm tabular-nums text-white/90 min-w-[80px]">{fmt(time)} / {fmt(duration)}</div>

            {/* mute */}
            <button
              onClick={() => setMuted(m => !m)}
              className="text-white/90 hover:text-white"
              title={isMuted ? 'Bật tiếng' : 'Tắt tiếng'}
            >
              {isMuted || vol === 0 ? (
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M5 9v6h4l5 5V4L9 9H5zM16.5 12c0-1.77-.77-3.36-2-4.47v8.94c1.23-1.1 2-2.69 2-4.47z"/></svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M5 9v6h4l5 5V4L9 9H5z"/></svg>
              )}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.02}
              value={isMuted ? 0 : vol}
              onChange={(e) => onChangeVolume(+e.target.value)}
              className="w-28 accent-white"
            />
          </div>

          {/* right */}
          <div className="flex items-center gap-3 text-white">
            {/* CC */}
            <button
              onClick={() => enableTrack(activeTrack === 'off' ? (subtitles[0]?.label ?? 'off') : 'off')}
              className={`px-2 py-1 rounded text-sm ${
                activeTrack === 'off' ? 'bg-white/10 hover:bg-white/20' : 'bg-white/20 hover:bg-white/30'
              }`}
            >
              CC
            </button>

            {/* Settings */}
            <div className="relative">
              <button
                onClick={() => setShowSettings(s => !s)}
                className="h-9 w-9 grid place-items-center rounded bg-white/10 hover:bg-white/20"
              >
                ⚙
              </button>

              {showSettings && (
                <div
                  className="absolute right-0 bottom-11 w-64 rounded-2xl bg-black/70 backdrop-blur text-white shadow-lg p-3 space-y-2"
                  onMouseLeave={() => setShowSettings(false)}
                >
                  <div className="text-sm font-semibold px-2 py-1">Cài đặt</div>

                  {/* Quality */}
                  <div className="px-2 py-1">
                    <div className="text-xs text-white/70 mb-1">Chất lượng</div>
                    <div className="flex flex-wrap gap-2">
                      {sources.map(s => (
                        <button
                          key={s.label}
                          onClick={() => changeQuality(s.label)}
                          className={`px-2.5 py-1 rounded-lg text-sm ${
                            quality === s.label ? 'bg-white/20' : 'bg-white/10 hover:bg-white/20'
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Subtitles */}
                  <div className="px-2 py-1">
                    <div className="text-xs text-white/70 mb-1">Phụ đề</div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => enableTrack('off')}
                        className={`px-2.5 py-1 rounded-lg text-sm ${
                          activeTrack === 'off' ? 'bg-white/20' : 'bg-white/10 hover:bg-white/20'
                        }`}
                      >
                        Tắt
                      </button>
                      {subtitles.map(s => (
                        <button
                          key={s.label}
                          onClick={() => enableTrack(s.label)}
                          className={`px-2.5 py-1 rounded-lg text-sm ${
                            activeTrack === s.label ? 'bg-white/20' : 'bg-white/10 hover:bg-white/20'
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Speed */}
                  <div className="px-2 py-1">
                    <div className="text-xs text-white/70 mb-1">Tốc độ</div>
                    <div className="flex flex-wrap gap-2">
                      {[0.5, 0.75, 1, 1.25, 1.5, 2].map(v => (
                        <button
                          key={v}
                          onClick={() => setSpeed(v)}
                          className={`px-2.5 py-1 rounded-lg text-sm ${
                            speed === v ? 'bg-white/20' : 'bg-white/10 hover:bg-white/20'
                          }`}
                        >
                          {v}x
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* PiP */}
            <button onClick={requestPiP} className="h-9 w-9 grid place-items-center rounded bg-white/10 hover:bg-white/20">
              ⧉
            </button>

            {/* Fullscreen */}
            <button onClick={requestFS} className="h-9 w-9 grid place-items-center rounded bg-white/10 hover:bg-white/20">
              ⛶
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
