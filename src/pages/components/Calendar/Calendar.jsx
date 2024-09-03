import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const HotelCalendar = () => {
    const [date, setDate] = useState(new Date());

    const handleDateChange = (newDate) => {
        setDate(newDate);
    };

    return (
        <div>
            <h1>Recent Booking Schedule</h1>
            <Calendar
                onChange={handleDateChange}
                value={date}
                minDate={new Date()}
            />
        </div>
    );
};

export default HotelCalendar;
