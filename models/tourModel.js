const mongoose = require('mongoose');
const slugify = require('slugify');
// const valid = require('validator');
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'], //type of data validator
      unique: true,
      maxlength: [40, 'Tour name length cannot be more than 40'],
      minlength: [10, 'Tour name must have more or equal than 10 '],
      // validate: [valid.isAlpha, 'The input must be a alphabet'], //this checks if a string contains alphabets only
    },

    slug: {
      type: String,
    },
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'hard'],
        message: 'Difficulty is either easy , medium or hard',
      },
    },

    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be atleast 1 '],
      max: [5, 'Ratings cannot be mor ethan 5'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },

    price: { type: Number, required: [true, 'A tour must have a rating'] },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price; //this is going to work only when we create a new document and wont work for update route
        },
        message: 'Discount price ({VALUE}) should be lower than regular price', //weird behaviour of mongoose
      },
    },
    summary: {
      type: String,
      trim: true, //remove all white spaces in end and beginning will be cut
      required: [true, 'A summary must be present'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A image must be present'],
    },
    images: [String], // an array of Strings
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true }, //when data is sent to the user and we want to convert mongo document to json
    toObject: { virtuals: true }, //convert mongoose document to plain js object
  },
);

//mongoose middlewares

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7; //we use regular function because in a arrow function the this points towards its lexical parent , so in a regular fn if it points to the parent object in the arrow fn it points to the outer function if there is no outer function then this=undefined and also objects do not create a this variable
});

//document middleware: runs before .save() and .create()
tourSchema.pre('save', function () {
  this.slug = slugify(this.name, { lower: true }); //wheneever a save or create command is used we get access to the document being created , i.e the object , runs before the document is saved to the the db
});

tourSchema.post('save', function (doc) {
  console.log(doc);
});
//model out of the schema

//Query middleware
// tourSchema.pre('find', function () {
//   this.find({ secretTour: { $ne: true } });
// });
tourSchema.pre(/^find/, function () {
  //this regex code will work for anything starting with find so , find, findone,findAndDelete
  this.find({ secretTour: { $ne: true } });
});

tourSchema.post(/^find/, function (docs) {
  console.log(docs);
});

//aggregation middleware
tourSchema.pre('aggregate', function () {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } }); //unshift adds something to strt of an array
});

//tour model
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
