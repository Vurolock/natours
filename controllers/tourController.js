const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.validateId = (req, res, next) => {
  if (parseInt(req.params.id, 10) > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  next();
};

exports.validateBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Not enough tour info'
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    time: req.time,
    data: {
      tours
    }
  });
};

exports.getTour = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const tour = tours.find(tour => tour.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
};

exports.createTour = (req, res) => {
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

exports.updateTour = (req, res) => {
  // update logic here
  res.status(200).json({
    status: 'success',
    data: {
      tour: 'patch placeholder'
    }
  });
};

exports.deleteTour = (req, res) => {
  // delete logic here
  res.status(204).json({
    status: 'success',
    data: null
  });
};
