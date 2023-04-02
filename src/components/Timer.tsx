import { useState, useEffect } from 'react';

type TimerProps = {
  millis: number;
  onTimerEnd: () => void;
};

export default function Timer({ millis, onTimerEnd }: TimerProps) {
  const [remainingMillis, setRemainingMillis] = useState<number>(millis);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let intervalId: any;
    if (isRunning) {
      intervalId = setInterval(() => {
        setRemainingMillis((prevRemainingMillis) => prevRemainingMillis - 1000);
       
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);

  useEffect(() => {
    if (remainingMillis <= 0) {
       setRemainingMillis(millis)
      setIsRunning(false);
      onTimerEnd();
    }
  }, [remainingMillis, onTimerEnd]);

  let minutes = Math.floor(remainingMillis / 60000);
  let seconds = Math.floor((remainingMillis % 60000) / 1000);

  function handleStartStopClick() {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  }

  return (
    <div
      style={{
      marginTop:"2rem",
      marginBottom:"2rem"
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          padding: '1rem',
          borderRadius: '1rem',
        }}
      >
        <button style={{ margin: '2 0.5rem' }} onClick={handleStartStopClick}>
          {isRunning ? (
            <svg viewBox="0 0 20 20" width="40" height="40">
            <path fill="white" d="M4,4 L4,16 L7,16 L7,4 Z M13,4 L13,16 L16,16 L16,4 Z"></path>
          </svg>
            
          ) : (
            <svg viewBox="0 0 20 20" width="40" height="40">
              <path fill="white" d="M4,4 L4,16 L16,10 L4,4 Z"></path>
            </svg>
          )}
        </button>
        <div style={{ color: 'white', fontWeight: 'bolder',fontSize:'1.5rem' }}>
          {minutes<0?0:minutes}:{seconds<0?0:seconds.toString().padStart(2, '0')}
        </div>
      </div>
    </div>
  );
}