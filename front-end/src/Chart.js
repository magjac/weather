import Box from '@mui/material/Box';
import * as React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Scatter } from "react-chartjs-2";
import 'chartjs-adapter-luxon';

ChartJS.register(TimeScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default class Chart extends React.Component {
  render() {
    const options = {
      maintainAspectRatio: false,
      scales: {
        x: {
          type: 'time',
          time: {
            // Luxon format string
            tooltipFormat: 'DD T',
            unit: 'month',
          },
        },
        y: {
          beginAtZero: true,
          min: -25,
          max: 35,
          ticks: {
            stepSize: 5,
          },
        },
      },
    };

    const meanData = this.props.data.filter((d) => d.variant == 'mean');
    const minData = this.props.data.filter((d) => d.variant == 'min');
    const maxData = this.props.data.filter((d) => d.variant == 'max');
    const data = {
      datasets: [
        {
          label: 'min',
          data: minData.map((d) => ({ x: d.date.getTime(), y: d.temperature })),
          pointStyle: false,
          showLine: true,
          backgroundColor: '#4e79a7',
          borderColor: '#4e79a7', // blue
          borderWidth: 1,
        },
        {
          label: 'mean',
          data: meanData.map((d) => ({ x: d.date.getTime(), y: d.temperature })),
          pointStyle: false,
          showLine: true,
          backgroundColor: '#59a14f',
          borderColor: '#59a14f', // green
          borderWidth: 1,
        },
        {
          label: 'max',
          data: maxData.map((d) => ({ x: d.date.getTime(), y: d.temperature })),
          pointStyle: false,
          showLine: true,
          backgroundColor: '#e15759',
          borderColor: '#e15759', // red
          borderWidth: 1,
        },
      ],
    };

    return (
      <React.Fragment>
        <Box
          id="chart"
          sx={{width: "calc(100vw - 24px)", height: "calc(100vh - 174px)"}}
        >
          <Scatter
            options={options}
            data={data}
          >
          </Scatter>

        </Box>
      </React.Fragment>
      );
    }
  }
