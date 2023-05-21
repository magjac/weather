import * as d3 from "d3";
import LineChart from "./linechart.js"
import * as React from 'react';

const data = [
  {
    variant: "min",
    date: new Date("2023-02-15"),
    temperature: 2.6,
  },
  {
    variant: "min",
    date: new Date("2023-02-16"),
    temperature: 2.9,
  },
  {
    variant: "min",
    date: new Date("2023-02-17"),
    temperature: 3.9,
  },
  {
    variant: "max",
    date: new Date("2023-02-15"),
    temperature: 6.6,
  },
  {
    variant: "max",
    date: new Date("2023-02-16"),
    temperature: 11.7,
  },
  {
    variant: "max",
    date: new Date("2023-02-17"),
    temperature: 12.9,
  },
];

export default class Chart extends React.Component {
  componentDidMount() {
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
    div.node().appendChild(svg);
  }

  render() {
    return (
      <React.Fragment>
        <div id="chart"></div>
      </React.Fragment>
      );
    }
  }
