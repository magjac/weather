import * as d3 from "d3";
import * as React from 'react';
import Chart from "./Chart.js"
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

async function fetchData() {
  const data = await d3.dsv(",", "http://localhost:8000/Utomhus_2023-05-15_min_max3.csv", (d) => {
    return {
      date: new Date(d.date),
      variant: d.variant,
      temperature: d.temperature,
    };
  });
  return data;
}

let initialized = false;

export default function App() {
  let [temp, setTemp] = React.useState([]);
  let [dummy, setDummy] = React.useState(1);

  if (!initialized) {
    fetchData().then((data) => {
      setTemp(data);
      setDummy(dummy + 1);
    });
    initialized = true;
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Emil´s Weather Station @ bergetvidhandfatet
        </Typography>
        <Chart
          data={temp}
          dummy={dummy}
        />
      </Box>
    </Container>
  );
}
