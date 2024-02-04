import * as d3 from "d3";
import * as React from 'react';
import Chart from "./Chart.js"
import YearByYearChart from "./YearByYearChart.js"
import Container from '@mui/material/Container';
import TimeRangeSelector from "./TimeRangeSelector.js";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import Input from '@mui/material/Input';
import MenuItem from '@mui/material/MenuItem';

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
    "type": "temperature,min_temp,max_temp",
    "real_time": true,
  }
  const urlSearchparams = new URLSearchParams(request);
  const url = `${baseUrl}?${urlSearchparams}`;
  const data = await d3.json(url);
  return data;
}

let initialized = false;
const temperatureMode = 'Temperature';
const temperatureYearByYearMode = 'Temperature year by year';
const modes = [
  temperatureMode,
  temperatureYearByYearMode,
]

export default function App() {
  let [temp, setTemp] = React.useState([]);
  let [dummy, setDummy] = React.useState(1);
  let [beginDate, setBeginDate] = React.useState(new Date(2010, 0, 1));
  let [endDate, setEndDate] = React.useState(new Date());
  let [mode, setMode] = React.useState(temperatureYearByYearMode);

  React.useEffect(() => {
    fetchAndShowData();
  }, [beginDate, endDate, mode]);

  const handleModeSelectChange = (event) => {
    setMode(event.target.value);
  };

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
        for (const [meanTemp, minTemp, maxTemp] of values) {
          const meanItem = {
            date: currentTime,
            variant: "mean",
            temperature: meanTemp,
          }
          data.push(meanItem);
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
          currentTime = new Date(currentTime.getTime() + stepTime);
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
        <Select
          variant="standard"
          id="mode-selector"
          value={mode}
          onChange={handleModeSelectChange}
          input={<Input name="mode" id="mode-helper" />}>
          {modes.map((mode) =>
            <MenuItem
              id={mode}
              key={mode}
              value={mode}
            >
              {mode}
            </MenuItem>
          )}
        </Select>
        {mode == temperatureMode && (
          <TimeRangeSelector
            beginDate={beginDate}
            endDate={endDate}
            onBeginDateChange={handleBeginDateChange}
            onEndDateChange={handleEndDateChange}
          />
        )}
        {mode == temperatureMode && (
            <Chart
            data={temp}
            dummy={dummy}
          />
        )}
        {mode == temperatureYearByYearMode && (
          <YearByYearChart
            data={temp}
            dummy={dummy}
          />
        )}
      </Box>
    </Container>
  );
}
