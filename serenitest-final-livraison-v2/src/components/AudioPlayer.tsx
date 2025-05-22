import React, { useState, useRef, useEffect } from 'react';

interface AudioPlayerProps {
  audioSrc: string;
  volume: number;
  isPlaying: boolean;
  loop?: boolean;
  onEnded?: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ 
  audioSrc, 
  volume, 
  isPlaying, 
  loop = true,
  onEnded 
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);
  
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error("Erreur de lecture audio:", error);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, audioSrc]);

  useEffect(() => {
    // Recharger l'audio si la source change
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error("Erreur de lecture audio:", error);
        });
      }
    }
  }, [audioSrc]);

  return (
    <audio 
      ref={audioRef} 
      src={audioSrc} 
      loop={loop}
      onEnded={onEnded}
      style={{ display: 'none' }} // Masquer l'élément audio
    />
  );
};

export default AudioPlayer;
