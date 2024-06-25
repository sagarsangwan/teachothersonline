import moment from 'moment';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { useState, useEffect } from 'react';

function calculateRemainingTime(startTime) {
    const now = moment();
    const start = moment(startTime);
    const duration = moment.duration(start.diff(now));
    return duration.asSeconds()
}


function TimerComponent({ starttime }) {
    const [remainingTime, setRemainingTime] = useState(calculateRemainingTime(starttime))
    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime(calculateRemainingTime(starttime))
        }, 1000);
        return () => clearInterval(interval)
    }, [starttime])


    return (
        <CountdownCircleTimer
            isPlaying
            duration={remainingTime}
            colors={[['#004777', 0.33], ['#F7B801', 0.33], ['#A30000']]}
        >
            {({ remainingTime }) => remainingTime}
        </CountdownCircleTimer>
    )

}

export default TimerComponent