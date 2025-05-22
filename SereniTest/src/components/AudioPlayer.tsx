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
  
  // Mettre à jour le volume lorsqu'il change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);
  
  // Gérer la lecture/pause et arrêter complètement lorsque isPlaying devient false
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error("Erreur de lecture audio:", error);
        });
      } else {
        audioRef.current.pause();
        // Réinitialiser la position de lecture à 0 pour un arrêt complet
        audioRef.current.currentTime = 0;
      }
    }
  }, [isPlaying]);

  // Recharger l'audio si la source change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error("Erreur de lecture audio:", error);
        });
      }
    }
  }, [audioSrc, isPlaying]);

  // Nettoyer l'audio lors du démontage du composant
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.src = '';
      }
    };
  }, []);

  return (
    <audio 
      ref={audioRef} 
      src={audioSrc} 
      loop={loop}
      onEnded={onEnded}
      style={{ display: 'none' }} // Masquer l'élément audio
      preload="auto"
    />
  );
};

export default AudioPlayer;
