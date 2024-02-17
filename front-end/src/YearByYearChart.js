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
import zoomPlugin from 'chartjs-plugin-zoom';
import { Scatter } from "react-chartjs-2";
import 'chartjs-adapter-luxon';
import autocolors from 'chartjs-plugin-autocolors';

ChartJS.register(TimeScale, LinearScale, PointElement, LineElement, Tooltip, Legend, autocolors);
ChartJS.register(zoomPlugin);

export default class YearByYearChart extends React.Component {
  render() {
    const { colorOffset } = this.props;

    const options = {
      maintainAspectRatio: false,
      scales: {
        x: {
          type: 'time',
          time: {
            // Luxon format string
            tooltipFormat: 'MMM d',
            unit: 'month',
            displayFormats: {
              month: 'MMM'
            },
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
      plugins: {
        autocolors: {
          enabled: true,
          offset: colorOffset,
        },
        zoom: {
          zoom: {
            wheel: {
              enabled: true,
            },
            pinch: {
              enabled: true
            },
            mode: 'x',
          },
          pan: {
            enabled: true,
            mode: 'x',
          },
        },
      },
    };

    const {min} = this.props;
    const {mean} = this.props;
    const {max} = this.props;
    const {pointStyle} = this.props;
    const {showLine} = this.props;
    let data2 = {};
    for (const d of this.props.data) {
      const year = d.date.getFullYear();
      const seriesName = `${year} ${d.variant}`;
      if (!min && d.variant == "min") {
        continue;
      }
      if (!mean && d.variant == "mean") {
        continue;
      }
      if (!max && d.variant == "max") {
        continue;
      }
      if (!(seriesName in data2)) {
        data2[seriesName] = [];
      }
      data2[seriesName].push(d);
    }
    const data = {
      datasets: Object.keys(data2).map(seriesName => {
        return {
          label: seriesName,
          data: data2[seriesName].map((d) => {
            let year = new Date(d.date);
            year.setFullYear(1970);
            return { x: year.getTime(), y: d.temperature }
          }),
          pointStyle: pointStyle,
          showLine: showLine,
          borderWidth: 1,
        }
      }),
    };

    return (
      <React.Fragment>
        <Box
          id="chart"
          sx={{width: "calc(100vw - 24px)", height: "calc(100vh - 174px)"}}
        >
          <Scatter
            options={options}
            redraw={true}
            data={data}
          >
          </Scatter>

        </Box>
      </React.Fragment>
      );
    }
  }
