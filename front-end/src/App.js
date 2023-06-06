import * as d3 from "d3";
import * as React from 'react';
import Chart from "./Chart.js"
import Container from '@mui/material/Container';
import TimeRangeSelector from "./TimeRangeSelector.js";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

async function fetchData(beginDate, endDate) {
  //const url = 'https://app.netatmo.net/api/getmeasure'
  const baseUrl = process.env.NODE_ENV == "production" ? "api/" : "http://localhost:8080";
  const dateBegin = new Date(2023, 0, 1)
  const request = {
    "date_begin": beginDate.getTime() / 1000,
    "date_end": endDate.getTime() / 1000,
    "scale": "1day",
    "device_id": "70:ee:50:3f:2f:d0",
    "module_id": "02:00:00:3e:e3:70",
    "type": "min_temp,max_temp",
    "real_time": true,
  }
  const urlSearchparams = new URLSearchParams(request);
  const url = `${baseUrl}?${urlSearchparams}`;
  const data = await d3.json(url);
  return data;
}

let initialized = false;

export default function App() {
  let [temp, setTemp] = React.useState([]);
  let [dummy, setDummy] = React.useState(1);
  let [beginDate, setBeginDate] = React.useState(new Date(2023, 0, 1));
  let [endDate, setEndDate] = React.useState(new Date());

  React.useEffect(() => {
    fetchAndShowData();
  }, [beginDate, endDate]);

  const handleBeginDateChange = (date) => {
    setBeginDate(date);
  }

  const handleEndDateChange = (date) => {
    setEndDate(date);
  }

  const fetchAndShowData = () => {
    fetchData(beginDate, endDate).then((d) => {
      const chunks = d.body;
      let data = [];
      for (const chunk of chunks) {
        const begTime = new Date(chunk.beg_time * 1000);
        const stepTime = chunk.step_time * 1000;
        const values = chunk.value;
        let currentTime = begTime;
        for (const [minTemp, maxTemp] of values) {
          currentTime = new Date(currentTime.getTime() + stepTime);
          const minItem = {
            date: currentTime,
            variant: "min",
            temperature: minTemp,
          }
          data.push(minItem);
          const maxItem = {
            date: currentTime,
            variant: "max",
            temperature: maxTemp,
          }
          data.push(maxItem);
        }
      }
      setTemp(data);
      setDummy(dummy + 1);
    });
  }

  if (!initialized) {
    initialized = true;
    fetchAndShowData();
  }

  return (
    <Container maxWidth={false}>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Emil´s Weather Station @ bergetvidhandfatet
        </Typography>
        <TimeRangeSelector
          beginDate={beginDate}
          endDate={endDate}
          onBeginDateChange={handleBeginDateChange}
          onEndDateChange={handleEndDateChange}
        />
        <Chart
          data={temp}
          dummy={dummy}
        />
      </Box>
    </Container>
  );
}
