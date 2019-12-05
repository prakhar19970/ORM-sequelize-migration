// const Sequelize = require('sequelize');

const db = require('../models');

const { movies } = db;

function getAllMovies() {
  return new Promise((resolve, reject) => {
    movies.findAll()
      .then((data) => resolve((data)))
      .catch((error) => reject(error));
  });
}


function getMovieWithId(id) {
  // console.log(id);
  return new Promise((resolve, reject) => {
    movies.findByPk(id).then((data) => {
      //  console.log(data)
      resolve(data);
    })
      .catch((error) => reject(error));
  });
}

function addNewMovie(newmovie) {
  // console.log(newmovie);
  return new Promise((resolve, reject) => {
    movies.create({
      Title: newmovie.Title,
      Description: newmovie.Description,
      Runtime: newmovie.Runtime,
      Genre: newmovie.Genre,
      Rating: newmovie.Rate,
      Metascore: newmovie.Metascore,
      Votes: newmovie.Votes,
      Gross_Earning_in_Mil: newmovie.Gross,
      Director: newmovie.Dir,
      Actor: newmovie.Actor,
      Year: newmovie.Year,
    }).then((data) => {
      resolve(data.dataValues);
    }).catch((error) => { reject(error); });
  });
}

function checkMovieId(id) {
  // console.log(id);
  return new Promise((resolve, reject) => {
    movies.count({ where: { id } }).then((count) => {
      if (count !== 0) {
        return true;
      }
      return false;
    }).then((data) => {
      resolve(data);
    }).catch((error) => { reject(error); });
  });
}

function updateMovies(id, values) {
  return new Promise((resolve, reject) => {
    // console.log(values);
    movies.update({
      Title: values.Title,
      Description: values.Description,
      Runtime: values.Runtime,
      Genre: values.Genre,
      Rate: values.Rate,
      Metascore: values.Metascore,
      Votes: values.Votes,
      Gross_Earning_in_Mil: values.Gross,
      Director: values.Dir,
      Actor: values.Actor,
      Year: values.Year,
    },
    { where: { id } }).then((data) => {
      resolve(data);
    }).catch((error) => { reject(error); });
  });
}


function deleteMovie(id) {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line max-len
    movies.destroy({ where: { id } }).then((data) => { resolve(data); }).catch((error) => { reject(error); });
  });
}

module.exports = {
  getAllMovies, getMovieWithId, addNewMovie, deleteMovie, updateMovies, checkMovieId,
};
