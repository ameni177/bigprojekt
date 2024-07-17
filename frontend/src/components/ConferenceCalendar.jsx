import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const ConferenceCalendar = ({ data, userEmail, selectedDate, setSelectedDate, handleEventClick }) => {
  const onChangeDate = date => {
    setSelectedDate(date);
  };

  return (
    <div className="calendar-container">
      <Calendar
        onChange={onChangeDate}
        value={selectedDate}
        tileClassName={({ date }) =>
          data.some(item => item.participant_email === userEmail && date >= new Date(item.startdate) && date <= new Date(item.enddate))
            ? 'calendar-event'
            : null
        }
        tileContent={({ date, view }) =>
          view === 'month' &&
          data.some(item => item.participant_email === userEmail && date >= new Date(item.startdate) && date <= new Date(item.enddate)) && (
            <p>Event</p>
          )
        }
        onClickDay={(value, event) => {
          const eventsOnDay = data.filter(
            item =>
              item.participant_email === userEmail &&
              value >= new Date(item.startdate) &&
              value <= new Date(item.enddate)
          );
          if (eventsOnDay.length > 0) {
            handleEventClick(eventsOnDay[0]);
          }
        }}
        className="calendar"
      />
    </div>
  );
};

export default ConferenceCalendar;
