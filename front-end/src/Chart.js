import * as d3 from "d3";
import Box from '@mui/material/Box';
import LineChart from "./linechart.js"
import * as React from 'react';

export default class Chart extends React.Component {
  componentDidMount() {
    this.drawChart();
  }
  componentDidUpdate() {
    this.drawChart();
  }

  drawChart() {
    const {data} = this.props;
    const div = d3.select("#chart");
    const width = div.node().clientWidth;
    const height = div.node().clientHeight;
    const blue = d3.schemeTableau10[0];
    const red = d3.schemeTableau10[2];
    const svg = LineChart(data, {
      x: d => d.date,
      y: d => d.temperature,
      z: d => d.variant,
      yLabel: "Temperature",
      width: width,
      height: height,
      color: (variant) => variant == "max" ? red : blue,
      title: (d) => `${d.temperature} °C @ ${d.date.toLocaleDateString("se-SE")}`,
    });
    const existingSvg = div.select("svg");
    if (existingSvg.size() == 0) {
      div.node().appendChild(svg);
    }
    else {
      div.node().replaceChild(svg, existingSvg.node());
    }
  }

  render() {
    return (
      <React.Fragment>
        <Box
          id="chart"
          sx={{width: "calc(100vw - 24px)", height: "calc(100vh - 174px)"}}
        >
        </Box>
      </React.Fragment>
      );
    }
  }
