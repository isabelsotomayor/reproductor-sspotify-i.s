import React, { useState } from 'react';
import YouTube from 'react-youtube';

export default function MusicPlayer() {
  const videos = [
    { title: "Dillom - Cirugia", videoId: "WsvYPRqSH28" },
    { title: "Twenty one pilots: Tear In My Heart", videoId: "nky4me4NP70" },
    { title: "MILO J - Tus vueltas", videoId: "SOXYr6CsUJU" },
    { title: "MILO J - Cuando estas vos", videoId: "p8TSxlxvTMc" },
    { title: "Tan Biónica - Loca", videoId: "xRaNtoiUkjQ" },
    { title: "El Cuarteto de Nos -Enamorada tuya", videoId: "R5cbxTPZNL0" },
    { title: "Tan Biónica - Beautiful", videoId: "icJWvnwZh6U" },
    { title: "MILO J - Deseo perder", videoId: "-zxlKAR5e2w" },
    { title: "WOS - Okupa", videoId: "MA5v9VNJ-2Q" },
    { title: "Tan Biónica - La Melodía de Dios", videoId: "txZw4iMtgJo" },
    { title: "Indios - Jullie", videoId: "1klKhwAa3jY" },
    { title: "Charly garcia - Seminare", videoId: "z6uZpam-3Pg" },
    { title: "Twenty One Pilots -  We Don't Believe What's on tv", videoId: "zZEumf7RowI" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [player, setPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };

  const onPlayerReady = (event) => {
    setPlayer(event.target);
    event.target.playVideo();
  };

  const togglePlayPause = () => {
    if (!player) return;

    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }

    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    const nextIndex = (currentIndex + 1) % videos.length;
    setCurrentIndex(nextIndex);
    setIsPlaying(true);
  };

  const playPrevious = () => {
    const prevIndex = (currentIndex - 1 + videos.length) % videos.length;
    setCurrentIndex(prevIndex);
    setIsPlaying(true);
  };

  const playSong = (index) => {
    setCurrentIndex(index);
    setIsPlaying(true);
  };

  return (
    <div
      style={{
        backgroundColor: '#111',
        color: '#fff',
        minHeight: '100vh',
        padding: '20px',
        fontFamily: 'sans-serif',
      }}
    >
      <h1>Reproductor de YouTube</h1>

      <div style={{ marginBottom: '20px' }}>
        <YouTube
          key={videos[currentIndex].videoId} // 👈 fuerza recarga del video
          videoId={videos[currentIndex].videoId}
          opts={opts}
          onReady={onPlayerReady}
        />
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '30px',
          alignItems: 'center',
          marginBottom: '20px',
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

      <div
        style={{
          maxHeight: '300px',
          overflowY: 'auto',
          borderTop: '1px solid #444',
          paddingTop: '10px',
        }}
      >
        {videos.map((video, index) => (
          <div
            key={index}
            onClick={() => playSong(index)}
            style={{
              padding: '10px',
              backgroundColor: index === currentIndex ? '#444' : 'transparent',
              cursor: 'pointer',
              borderBottom: '1px solid #333',
            }}
          >
            {index + 1}. {video.title}
          </div>
        ))}
      </div>
    </div>
  );
}
