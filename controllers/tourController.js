const express = require('express');
const fs = require('fs');
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
);

exports.checkBody = (req, res, next) => {
  if (!req.body.name && !req.body.price) {
    return res.status(400).send('Enter name to continue');
  }
  next();
};
exports.checkID = (req, res, next, val) => {
  if (val > tours.length) {
    return res.status(404).json({
      status: 'failed',
      message: 'could not find id',
    });
  }
  next();
};
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

//get a specific route
exports.getTour = (req, res) => {
  console.log(req.params);
  // console.log(req.query);
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  //id passed in the route is actually a string , so by doing this we convert it into a number

  res.status(200).json({
    status: 'success',
    data: {
      tours: tour,
    },
  });
};

// create a route
exports.createTour = (req, res) => {
  console.log(req.body);
  //jo json is page pe arhi hoti hai usko hum Express.json ke help se req ki body pe attach kar dete hai
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body); // this merges object so basically we are merging value of id and data of the user
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    },
  );
};

//update a tour
exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<updated tour here>',
    },
  });
};

//delete a tour
exports.deleteTour = (req, res) => {
  res.status(204).json({
    //204 means no content to display
    status: 'success',
    data: {
      tour: 'null',
    },
  });
};
