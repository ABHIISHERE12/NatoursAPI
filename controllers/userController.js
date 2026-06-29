const fs = require('fs');
const express = require('express');

users = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/users.json`));

exports.checkID = (req, res, next, val) => {
  if (val > tours.length) {
    return res.status(404).json({
      status: 'failed',
      message: 'could not find id',
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name && !req.body.price) {
    return res.status(400).send('Enter name to continue');
  }
  next();
};
exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    Number: users.length,
    data: {
      users,
    },
  });
};
exports.getUser = (req, res) => {
  const id = req.params.id * 1;
  const data = users.find((user) => user.id == id);
  if (id > users.length) {
    res.status(404).json({
      status: 'failed',
      value: 'Unable to find user',
    });
  }
  res.status(200).json({
    status: 'success',
    value: {
      data,
    },
  });
};

exports.createUser = (req, res) => {
  const length = users[users.length] - 1;
  // const newUser = Object.assign({ id: length }, req.body);
  const newUser = {
    id: length,
    ...req.body,
  }; // new method of merging data
  users.push(newUser);
  fs.writeFile(
    `${__dirname}/dev-data/data/users.json`,
    JSON.stringify(users),
    res.status(201).json({
      status: 'done',
      message: 'new user created',
    }),
  );
};

exports.updateUser = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'failed',
      message: 'could not find id',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<updated tour here>',
    },
  });
};
exports.deleteUser = (req, res) => {
  const id = req.params.id * i;
  const data = users.find((el) => el.id == id);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'failed',
      message: 'could not find id',
    });
  }
  res.status(204).json({
    status: 'success',
    value: {
      data: null,
    },
  });
};
