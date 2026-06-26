const express = require('express');
const app = express();
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
//body parser middleware

app.use(morgan('dev'));

//middlewares
app.use(express.json());

app.use((req, res, next) => {
  console.log('hello from middleware');
  next();
});
//

//handler functions

//get all routes

//Routing

//routes
// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

//chaining routes

//mounting of routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.listen(3000, () => {
  console.log('App running on port 3000');
});
