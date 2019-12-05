const express = require('express');

const app = express();
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');


// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join('../Logging', 'access.log'), { flags: 'a' });

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }));

const movieRoutes = require('../routes/movies');
const directorRoutes = require('../routes/director');

const { logger } = require('../Logging/winston');

app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: false })); // support encoded bodies

app.get('/api/movies', (req, res) => {
  movieRoutes.getAllMovies().then((returnAllMovies) => {
    // console.log(returnAllMovies);
    res.status(200).send(returnAllMovies);
  }).catch((error) => {
    logger.error(`request not processed${error}`);
  });
});

app.get('/api/movies/:movieId', (req, res) => {
  movieRoutes.getMovieWithId(req.params.movieId).then((returnMovieById) => {
    // console.log(returnMovieById.dataValues);
    movieRoutes.checkMovieId(req.params.movieId).then((data) => {
      // console.log(data);
      if (data === false) {
        logger.error('request not processed movie not present'); res.sendStatus(400);
      } else {
        res.status(200).send(returnMovieById);
      }
    });
  }).catch((error) => {
    logger.error(`wrong entry${error}`); res.sendStatus(404);
  });
});

app.post('/api/movies/', (req, res) => {
  const { body } = req;
  const newMovie = {
    Title: body.title,
    Description: body.desc,
    Runtime: body.runtime,
    Genre: body.genre,
    Rate: body.rate,
    Metascore: body.metascore,
    Votes: body.votes,
    Gross: body.gross,
    Dir: body.dir,
    Actor: body.actor,
    Year: body.year,
  };
  movieRoutes.addNewMovie(newMovie).then((returnnewMovie) => {
    const { id } = returnnewMovie;
    res.status(201).send(`Movie added successfully at ${id}`);
  }).catch((error) => {
    logger.error(`field error/error at data entry${error}`);
    res.status(400).send('Bad Request');
  });
});

app.put('/api/movies/:movieId', (req, res) => {
  const id = req.params.movieId;
  const { body } = req;
  const values = {
    Title: body.title,
    Description: body.desc,
    Runtime: body.runtime,
    Genre: body.genre,
    Rate: body.rate,
    Metascore: body.metascore,
    Votes: body.votes,
    Gross: body.gross,
    Dir: body.dir,
    Actor: body.actor,
    Year: body.year,
  };
  console.log(values);
  movieRoutes.checkMovieId(id).then((data) => {
    console.log(data);
    if (data === true) {
      movieRoutes.updateMovies(id, values).then((returnedUpdatedMovie) => {
        console.log(returnedUpdatedMovie);
        res.status(202).send(`Movie updated successfully at ${id} Status Code:${res.statusCode}`);
      });
    } else {
      logger.error('movie not present/entry deleted');
      res.status(400).send(' Bad request id not present');
    }
  }).catch((error) => {
    logger.error(`wrong entry${error}`);
    res.sendStatus(404);
  });
});


app.delete('/api/movies/:movieId', (req, res) => {
  const id = req.params.movieId;
  movieRoutes.checkMovieId(id).then((data) => {
    // console.log(data);
    if (data === true) {
      movieRoutes.deleteMovie(req.params.movieId).then((deletedMovie) => {
        console.log(deletedMovie);
        res.status(410).send(`Movie deleted at ${id} Status Code:${res.statusCode}`);
      }).catch((error) => {
        logger.error(error);
        res.sendStatus(404);
      });
    } else {
      logger.error('movie not present/entry deleted');
      res.status(400).send(`id ${id} does not exists  Status Code:${res.statusCode}`);
    }
  });
});

//------------------------------------------------------------------------------


app.get('/api/directors', (req, res) => {
  directorRoutes.getAllDirectors().then((returnAllDirectors) => {
    res.status(200).send(returnAllDirectors);
  }).catch((error) => {
    logger.error(`request not processed${error}`);
  });
});

app.get('/api/directors/:directorId', (req, res) => {
  directorRoutes.getDirectorWithId(req.params.directorId).then((returnDirectorById) => {
    directorRoutes.checkDirectorId(req.params.directorId).then((data) => {
      // console.log(data);
      if (data === false) {
        logger.error(' director not present');
        res.sendStatus(400);
      } else {
        res.status(200).send(returnDirectorById);
      }
    }).catch((error) => {
      logger.error(`wrong entry${error}`); res.sendStatus(404);
      res.sendStatus(404);
    });
  });
});


app.post('/api/directors/', (req, res) => {
  const { body } = req;
  const newDirector = {
    Director: body.Director,
  };
  directorRoutes.addNewDirector(newDirector).then((returnnewDirector) => {
    const { id } = returnnewDirector.dataValues;
    res.status(201).send(`Director added successfully at ${id} Status Code:${res.statusCode}`);
  }).catch((error) => {
    logger.error(`field error/error at data entry${error}`);
    res.statusCode(404);
  });
});

app.put('/api/directors/:directorId', (req, res) => {
  const id = req.params.directorId;
  const { body } = req;
  const values = {
    Director: body.Director,
  };
  // console.log(`${id  } ${ values.Director}`);
  directorRoutes.checkDirectorId(id).then((data) => {
    // console.log(data);
    if (data === true) {
      directorRoutes.updateDirector(id, values).then((returnedUpdatedDirector) => {
        console.log(returnedUpdatedDirector);
        res.status(202).send(`Director ${values.Director} updated successfully at ${id} Status Code:${res.statusCode}`);
        // logger.info(`${req.ip} data updated request processed successfully`);
      });
    } else {
      res.status(400).send(' Bad request id not present');
      logger.error('Director not present/entry deleted');
    }
  }).catch((error) => {
    logger.error(`wrong entry${error}`);
    res.sendStatus(404);
  });
});

app.delete('/api/directors/:directorId', (req, res) => {
  const id = req.params.directorId;
  directorRoutes.checkDirectorId(id).then((data) => {
    // console.log(data);
    if (data === true) {
      directorRoutes.deleteDirector(id).then(() => {
        res.status(410).send(`Director deleted at ${id} Status Code:${res.statusCode}`);
      }).catch((error) => {
        logger.error(`wrong entry${error}`);
        res.sendStatus(404);
      });
    } else {
      res.status(400).send(`id ${id} does not exists  Status Code:${res.statusCode}`);
      logger.error('data not present');
    }
  });
});


app.listen(8081);
