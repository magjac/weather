import * as d3 from "d3";
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
    const svg = LineChart(data, {
      x: d => d.date,
      y: d => d.temperature,
      z: d => d.variant,
      yLabel: "Temperature",
      width: 800,
      height: 500,
      color: "steelblue",
    });
    const div = d3.select("#chart");
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
        <div id="chart"></div>
      </React.Fragment>
      );
    }
  }
