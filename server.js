const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' }); // it brings the value of the env files which we will use in our app, os declaring it after app makes no sense , all the env variable in app would be undefined
const app = require('./app');
//saves env from our file and saves it for nodeks
// console.log(process.env);
const DB = process.env.DB.replace('<PASSWORD>', process.env.DB_PASSWORD);
mongoose.connect(DB).then((con) => {
  console.log(con.connections);
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('App running on port 3000');
});
