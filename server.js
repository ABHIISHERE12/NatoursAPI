const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' }); // it brings the value of the env files which we will use in our app, os declaring it after app makes no sense , all the env variable in app would be undefined
const app = require('./app');
//saves env from our file and saves it for nodeks
// console.log(process.env);
const DB = process.env.DB.replace('<PASSWORD>', process.env.DB_PASSWORD);
mongoose.connect(DB).then(console.log('connection to DB succesfull🚀✅'));
const port = process.env.PORT || 3000;

//database schema
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: { type: Number, default: 4.5 },
  price: { type: Number, required: [true, 'A tour must have a rating'] },
});
//model out of the schema
const Tour = mongoose.model('Tour', tourSchema);

//creating a basic tour
const testTour = new Tour({
  name: 'Pacific crest trail',
  rating: 4.7,
  price: 497,
});
//adding document to the model
testTour
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log('App running on port 3000');
});
