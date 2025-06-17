import { useEffect, useState, useRef } from 'react';
import axiosInstance from '../api/axios';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

const useTaskTimer = (taskId) => {
    const [seconds, setSeconds] = useState(0);
    const [isTiming, setIsTiming] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        const fetchTime = async () => {
            try {
                const res = await axiosInstance.get(`/tasks/${taskId}/time`);
                const { time_spent, start_time } = res.data;

                let total = time_spent || 0;

                if (start_time) {
                    const startedAt = dayjs(start_time);
                    const now = dayjs();
                    const elapsed = now.diff(startedAt, 'second');
                    total += elapsed;
                    setIsTiming(true); // auto resume
                }

                setSeconds(total);
            } catch (err) {
                console.error('Error fetching timer:', err);
            }
        };

        if (taskId) fetchTime();
    }, [taskId]);

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

    const startTimer = async () => {
        try {
            const res = await axiosInstance.put(`/tasks/${taskId}/start`);
            console.log('Timer started and start_time saved:', res.data);
            toast.success("Timer started!");
            window.location.reload(); // ✅ reload page after starting
        } catch (err) {
            console.error('Failed to start timer:', err);
        }
    };

    const stopTimer = async () => {
        try {
            const res = await axiosInstance.put(`/tasks/${taskId}/stop`, { time_spent: seconds });
            console.log('Timer stopped and time saved:', res.data);
            toast.error("Timer stopped!");
            window.location.reload(); // ✅ reload page after starting
        } catch (err) {
            console.error('Failed to stop timer:', err);
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
        startTimer,
        stopTimer,
        formatTime
    };
};

export default useTaskTimer;
