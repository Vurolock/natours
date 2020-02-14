const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  req.time = new Date().toISOString();
  next();
});

const toursEndpoint = '/api/v1/tours';

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    time: req.time,
    data: {
      tours
    }
  });
};

const getTour = (req, res) => {
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
};

const createTour = (req, res) => {
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
};

const updateTour = (req, res) => {
  // update logic here
  res.status(200).json({
    status: 'success',
    data: {
      tour: 'patch placeholder'
    }
  });
};

const deleteTour = (req, res) => {
  // delete logic here
  res.status(204).json({
    status: 'success',
    data: null
  });
};

app
  .route(toursEndpoint)
  .get(getAllTours)
  .post(createTour);
app
  .route(`${toursEndpoint}/:id`)
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

const port = 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
