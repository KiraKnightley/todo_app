import React from 'react';

import './TaskTimer.css';

export default function TaskTimer(props) {
  const formatTime = (timeState) => {
    const getPadTime = (time) => time.toString().padStart(2, '0');
    const minutes = getPadTime(Math.floor(timeState / 60));
    const seconds = getPadTime(timeState - minutes * 60);
    return `${minutes}:${seconds}`;
  };

  const { onPlay, onPause, timeInSec } = props;
  const formattedTime = formatTime(timeInSec);
  return (
    <span className="timer-container">
      <button type="button" className="icon icon-play" aria-label="play" onClick={onPlay} />
      <button type="button" className="icon icon-pause" aria-label="pause" onClick={onPause} />
      <div className="timer">{formattedTime}</div>
    </span>
  );
}
