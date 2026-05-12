/**
 * Royalty-free background music for PoseArena.
 * All tracks by Kevin MacLeod (incompetech.com)
 * Licensed under Creative Commons: By Attribution 4.0 License
 * http://creativecommons.org/licenses/by/4.0/
 *
 * Attribution: "Track Name" Kevin MacLeod (incompetech.com)
 * Licensed under Creative Commons: By Attribution 4.0
 */

import { useCallback, useEffect, useRef } from "react";

const BASE = "https://incompetech.com/music/royalty-free/mp3-royaltyfree";

export const TRACKS = {
  lobby: {
    url: `${BASE}/Pixelland.mp3`,
    title: "Pixelland",
    artist: "Kevin MacLeod",
    license: "CC BY 4.0",
  },
  statue: {
    url: `${BASE}/Funkorama.mp3`,
    title: "Funkorama",
    artist: "Kevin MacLeod",
    license: "CC BY 4.0",
  },
  boxing: {
    url: `${BASE}/Cloud%20Dancer.mp3`,
    title: "Cloud Dancer",
    artist: "Kevin MacLeod",
    license: "CC BY 4.0",
  },
  yoga: {
    url: `${BASE}/Equatorial%20Complex.mp3`,
    title: "Equatorial Complex",
    artist: "Kevin MacLeod",
    license: "CC BY 4.0",
  },
  squat: {
    url: `${BASE}/Hyperfun.mp3`,
    title: "Hyperfun",
    artist: "Kevin MacLeod",
    license: "CC BY 4.0",
  },
} as const;

export type TrackId = keyof typeof TRACKS;

export interface GameMusicControls {
  play: (id: TrackId) => void;
  stop: () => void;
  fadeOut: (duration?: number) => void;
  setVolume: (vol: number) => void;
}

/**
 * Hook that manages a single HTMLAudioElement for game music.
 * All operations via refs — no React state on hot path.
 */
export function useGameMusic(): GameMusicControls {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeTimerRef = useRef<number | null>(null);

  const play = useCallback((id: TrackId): void => {
    const track = TRACKS[id];

    if (fadeTimerRef.current !== null) {
      clearInterval(fadeTimerRef.current);
      fadeTimerRef.current = null;
    }

    if (!audioRef.current) {
      audioRef.current = new Audio(track.url);
      audioRef.current.loop = true;
    } else if (audioRef.current.src !== track.url) {
      audioRef.current.pause();
      audioRef.current.src = track.url;
    }

    audioRef.current.volume = 0.55;
    audioRef.current.play().catch(() => {
      // Browser autoplay policy — silently ignore
    });
  }, []);

  const stop = useCallback((): void => {
    if (fadeTimerRef.current !== null) {
      clearInterval(fadeTimerRef.current);
      fadeTimerRef.current = null;
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  const fadeOut = useCallback((duration = 1500): void => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    const startVol = audio.volume;
    const steps = 30;
    const step = startVol / steps;
    const interval = Math.round(duration / steps);
    let count = 0;

    if (fadeTimerRef.current !== null) {
      clearInterval(fadeTimerRef.current);
    }

    fadeTimerRef.current = window.setInterval(() => {
      count += 1;
      if (count >= steps) {
        audio.pause();
        audio.currentTime = 0;
        audio.volume = startVol;
        if (fadeTimerRef.current !== null) {
          clearInterval(fadeTimerRef.current);
          fadeTimerRef.current = null;
        }
      } else {
        audio.volume = Math.max(0, audio.volume - step);
      }
    }, interval);
  }, []);

  const setVolume = useCallback((vol: number): void => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, vol));
    }
  }, []);

  useEffect(() => {
    return () => {
      if (fadeTimerRef.current !== null) {
        clearInterval(fadeTimerRef.current);
      }
      audioRef.current?.pause();
    };
  }, []);

  return { play, stop, fadeOut, setVolume };
}
