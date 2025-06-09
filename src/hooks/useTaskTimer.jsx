import { useEffect, useState, useRef } from 'react';
import axiosInstance from '../api/axios';

const useTaskTimer = (taskId) => {
    const [seconds, setSeconds] = useState(0);
    const [initialSeconds, setInitialSeconds] = useState(0); // store backend time
    const [isTiming, setIsTiming] = useState(false);
    const intervalRef = useRef(null);

    // ✅ Fetch existing time from backend
    useEffect(() => {
        const fetchTime = async () => {
            try {
                const res = await axiosInstance.get(`/tasks/${taskId}/time`);
                const backendTime = res.data?.time_spent || 0;
                setSeconds(backendTime);
                setInitialSeconds(backendTime);
            } catch (err) {
                console.error('Error fetching time:', err);
            }
        };

        if (taskId) fetchTime();
    }, [taskId]);

    // ✅ Timer logic
    useEffect(() => {
        if (isTiming) {
            intervalRef.current = setInterval(() => {
                setSeconds((prev) => prev + 1);
            }, 1000);
        } else {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);
    }, [isTiming]);

    // ✅ Periodically update backend every 60s with *new time only*
    useEffect(() => {
        if (!isTiming) return;

        const saveInterval = setInterval(() => {
            const delta = seconds - initialSeconds;
            if (delta >= 60) {
                saveTimeToBackend(seconds); // send full latest value
                setInitialSeconds(seconds); // update base reference
            }
        }, 60000);

        return () => clearInterval(saveInterval);
    }, [isTiming, seconds, initialSeconds]);

    const saveTimeToBackend = async (time) => {
        try {
            await axiosInstance.put(`/tasks/${taskId}/time`, { time_spent: time });
        } catch (err) {
            console.error('Failed to auto-save task time:', err);
        }
    };

    const formatTime = (totalSeconds) => {
        const h = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
        const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
        const s = String(totalSeconds % 60).padStart(2, '0');
        return `${h}:${m}:${s}`;
    };

    return {
        seconds,
        isTiming,
        setIsTiming,
        formatTime,
    };
};

export default useTaskTimer;
