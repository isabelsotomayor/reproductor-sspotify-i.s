import React, { useEffect, useRef, useState } from 'react';

export default function MusicPlayer() {
  const [songs, setSongs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    fetch('/songs.json')
      .then((res) => res.json())
      .then((data) => setSongs(data))
      .catch((err) => console.error('Error al cargar las canciones', err));
  }, []);

  useEffect(() => {
    if (songs.length > 0 && audioRef.current) {
      audioRef.current.src = songs[currentIndex].url;
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [currentIndex, songs]);

  const playSong = (index) => setCurrentIndex(index);

  const playNext = () => setCurrentIndex((i) => (i + 1) % songs.length);
  const playPrevious = () =>
    setCurrentIndex((i) => (i - 1 + songs.length) % songs.length);

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#111',
        color: '#fff',
        height: '100vh',
        padding: '20px',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          maxHeight: '80%',
          overflowY: 'auto',
          marginBottom: '20px',
        }}
      >
        {songs.map((song, index) => (
          <div
            key={index}
            onClick={() => playSong(index)}
            style={{
              padding: '10px',
              backgroundColor: index === currentIndex ? '#444' : 'transparent',
              cursor: 'pointer',
              display: 'flex',
              borderBottom: '1px solid #333',
            }}
          >
            <span style={{ width: '30px' }}>{index + 1}</span>
            <span>{song.title}</span>
          </div>
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '30px',
          alignItems: 'center',
        }}
      >
        <button onClick={playPrevious}>
          <i className="fa-solid fa-backward"></i>
        </button>
        <button onClick={togglePlayPause}>
          <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
        </button>
        <button onClick={playNext}>
          <i className="fa-solid fa-forward"></i>
        </button>
      </div>

      <audio ref={audioRef} style={{ display: 'none' }} />
    </div>
  );
}
