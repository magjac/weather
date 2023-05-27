import * as React from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function TimeRangeSelector(props) {
  const { beginDate } = props;
  const { endDate } = props;
  const { onBeginDateChange } = props;
  const { onEndDateChange } = props;

  const handleBeginDateChange = (dateStr) => {
    const date = new Date(dateStr);
    onBeginDateChange(date);
  }

  const handleEndDateChange = (dateStr) => {
    const date = new Date(dateStr);
    onEndDateChange(date);
  }

  const beginDateStr = beginDate.toLocaleDateString("se-SE")
  const endDateStr = endDate.toLocaleDateString("se-SE")

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Start"
        value={dayjs(beginDateStr)}
        onChange={handleBeginDateChange}
      >
      </DatePicker>
      <DatePicker
        label="End"
        value={dayjs(endDateStr)}
        onChange={handleEndDateChange}
      >
      </DatePicker>
    </LocalizationProvider>
  );
}