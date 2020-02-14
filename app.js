const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());

// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'server says hi', app: 'natours' });
// });

// app.post('/', (req, res) => {
//   res.send('post here!');
// });

const toursEndpoint = '/api/v1/tours';

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get(toursEndpoint, (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  });
});

app.get(`${toursEndpoint}/:id`, (req, res) => {
  const id = parseInt(req.params.id, 10);
  const tour = tours.find(tour => tour.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
});

app.post(toursEndpoint, (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        }
      });
    }
  );
});

const port = 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
