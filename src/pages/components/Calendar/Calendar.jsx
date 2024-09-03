import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const HotelCalendar = () => {
    const [date, setDate] = useState(new Date());

    const handleDateChange = (newDate) => {
        setDate(newDate);
        // Aquí puedes añadir la lógica para manejar la reserva de recursos o bloqueos de fechas
    };

    return (
        <div>
            <h1>Gestión de Recursos del Hotel</h1>
            <Calendar
                onChange={handleDateChange}
                value={date}
                minDate={new Date()} // Puedes configurar la fecha mínima
            />
        </div>
    );
};

export default HotelCalendar;
