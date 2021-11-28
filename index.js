// THIS IS A NEAR COMPLETED TEMPLATE FOR YOUR CA1
// Everything is commented and explained step by step
// If there are any questions, please let me know
// EDIT/UPDATE and DELETE is not finished yet
// Make sure to also check the "film.js" file


//declarations 
//express for server and routes
const express = require('express')
//bodyParser for x-www-urlencoded (html form like) variables
const bodyParser = require('body-parser')
// defining the actual app to handle the requests (e.g. push, get, etc.)
const app = express()
const port = 3000
// require the driver to connect to the database
const mongoose = require('mongoose')
// require the class constructor from different file
const Movie = require('./movie.js')
//defining one object using our new constructor
//only as a testing purpose, this code should be deleted after testing is completed
//let film = new Dog({age:5, name: "Boris", breed: "Golden Retriever", isNeutred: false})


//make the app use the bodyParser
app.use(bodyParser.urlencoded({
  extended: false
}))

//API ROUTES
//show all dogs from the database using GET request
app.get('/movie', (req, res) => {
  //find all dogs in the database and store them in the "result" variable
  //use the Model created in the film.js file to retrieve all film entries from the database
  Movie.find((err, movies) => {
    //in case there is an error with our Dog model, we we will send it to the user(postman)
    if (err) {
      res.send("Error occured no movies retrieved")
      return
    }
    //if no error send the array conting dogs to the user/postman
    res.send(movies)
    //log the result in the console as well
    console.log(movies)
  })
})
// FIND ONE BY ID, using a GET REQUEST and A PARAMETER (id)
app.get('/movie/:id', (req, res) => {
  const id = req.params.id;
  // we use the findById query, details on https://mongoosejs.com/docs/queries.html
  // this query only returns one element
  // you can also use findOneById
  // you can also use findOne({_id:req.paramas.id}) - this query will find depending on other properties,
  //                                    e.g. breed, name
  //                                    will only return first element found
  // to return more then 1 element use find({}) // see previous request
  Movie.findById(id, (err, movie) => {
    if (err) {
      res.send("Movie not found")
      return
    }
    //"film" is an object file retrieved from the database
    //"film" will only be defined if there is a film with the specific id
    // inside the Database
    // for a wrong ID, "film" will be undefined

    //we will send it back to the user/postman
    res.send(movie)
    console.log(movie)
  })
})

//insert request using POST to add a film into the database
app.post('/movie', (req, res) => {
  console.log("Inserting a movie in the database")
  //inser the film into the database
  // film.save() // insert the film into the database

  let isNeutred = false;
  if (req.body.isNeutred === 'true') {
    isNeutred = true;
  }
  let movie = new Movie({
    rating: req.body.rating || "No rating inserted", //Number
    name: req.body.name || "No name inserted", //String
    director: req.body.director || "No director inserted", //String
    time: req.body.time || "No time inserted",//String
    DateOfRelease: req.body.DateOfRelease || "No date of release inserted", //String
  });
  //inserting a film and checking to see if any errors occured
  movie.save(err => {
    if (err) {
      // if error send a message to let the user know
      res.send(`Movie not inserted into the database, error is: ${err}`)
      //return to be used in order to not send to res.send and crash the program
      return
    }
    //send a message to the user with the result
    res.send("Movie inserted into the database")
    console.log("Movie is in the database")
  })

  //if return runs, code will start from here
  return
})
// -->
// PUT request to update or modify one film from the database
app.put('/movie/:id', (req, res) => {
  // you can use fineOneAndUpdate() see https://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate
  // or
  // you can use findByIdAndUpdate() see https://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate
  // You can use req.params.id to send the _id and req.body for your new variables
  // or you can send all variables, including id, in req.body
  console.log("Trying to edit movie")
  console.log(parseInt(req.body.age))


  Movie.findByIdAndUpdate(req.params.id, {
    rating: req.body.rating, 
    name: req.body.name, 
    director: req.body.director, 
    time: req.body.time,
    DateOfRelease: req.body.DateOfRelease,
  }, err => {
    if (err) {
      res.send("It didn't edit. The error is: " + err)
      return;
    }
    res.send("It did edit")
  })
})


//delete request using DELETE and a PARAMETER (id)
app.delete('/movie/:id', (req, res) => {

  // You can use findOneAndDelete({_id:})
  // or
  // You can use findByIdAndDelete(id)
  //see https://mongoosejs.com/docs/api.html#model_Model.findByIdAndDelete
  Movie.findByIdAndDelete(req.params.id, err => {
    if (err) {
      res.send("Movie did not delete")
      return
    }
    res.send("Movie deleted")
    console.log(`Movie with id ${req.params.id} is now deleted`)
    // console.log("Dog with id "+req.params.id + "is now deleted")
  })
})

//start the server
app.listen(port, () => {
  //change the link to your database
  mongoose.connect('mongodb+srv://thibault:thibault1@cluster0.di94a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority').
  catch(error => console.log(error));
  console.log(`Example app listening at http://localhost:${port}`)
})