import { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';

const useTaskTimer = (taskId) => {
  const { employee } = useUser();
  const empId = employee?.id;
  const timerKey = `${empId}-${taskId}`;

  const [seconds, setSeconds] = useState(0);
  const [isTiming, setIsTiming] = useState(false);

  // Load saved timer when empId is ready
  useEffect(() => {
    if (!empId || !taskId) return;

    const stored = localStorage.getItem('timers');
    if (stored) {
      const allTimers = JSON.parse(stored);
      const saved = allTimers[timerKey];
      if (saved) {
        setSeconds(saved.seconds || 0);
        setIsTiming(saved.isTiming || false);
      }
    }
  }, [empId, taskId]);

  // Timer running effect
  useEffect(() => {
    let timer;
    if (isTiming) {
      timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTiming]);

  // Save to localStorage whenever timer state changes
  useEffect(() => {
    if (!empId || !taskId) return;
    const stored = localStorage.getItem('timers');
    const allTimers = stored ? JSON.parse(stored) : {};
    allTimers[timerKey] = { seconds, isTiming };
    localStorage.setItem('timers', JSON.stringify(allTimers));
  }, [seconds, isTiming, empId, taskId]);

  const formatTime = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const resetTimer = () => {
    setSeconds(0);
    setIsTiming(false);
    const stored = localStorage.getItem('timers');
    const allTimers = stored ? JSON.parse(stored) : {};
    delete allTimers[timerKey];
    localStorage.setItem('timers', JSON.stringify(allTimers));
  };

  return {
    seconds,
    isTiming,
    formatTime,
    setIsTiming,
    resetTimer,
  };
};

export default useTaskTimer;
