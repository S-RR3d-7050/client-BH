import * as React from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

const Calendar = ({ width }) => {

    const today = new Date();
    const [selectedDate, setSelectedDate] = React.useState(dayjs(today));

    console.log('Date -> ' + selectedDate.toISOString());
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar value={selectedDate} onChange={(val) => setSelectedDate(val)}/>
    </LocalizationProvider>
  );
}

export default Calendar;
