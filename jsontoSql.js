/* eslint-disable no-restricted-syntax */
const fs = require('fs');

const rawdata = fs.readFileSync('movies.json');
const movies = JSON.parse(rawdata);
const moviesObject = [];
function NAremover(obj) {
  for (const k of Object.keys(obj)) {
    if (obj[k] === 'NA') {
      // eslint-disable-next-line no-param-reassign
      obj[k] = 0;
    }
  }
  return obj;
}

for (let i of movies) {
  if (Object.values(i).includes('NA')) {
    i = NAremover(i);
    moviesObject.push({
      Title: i.Title,
      Description: i.Description,
      Runtime: i.Runtime,
      Genre: i.Genre,
      Rating: i.Rating,
      Metascore: i.Metascore,
      Votes: i.Votes,
      Gross_Earning_in_Mil: i.Gross_Earning_in_Mil,
      Director: i.Director,
      Actor: i.Actor,
      Year: i.Year,
    });
  } else {
    moviesObject.push({
      Title: i.Title,
      Description: i.Description,
      Runtime: i.Runtime,
      Genre: i.Genre,
      Rating: i.Rating,
      Metascore: i.Metascore,
      Votes: i.Votes,
      Gross_Earning_in_Mil: i.Gross_Earning_in_Mil,
      Director: i.Director,
      Actor: i.Actor,
      Year: i.Year,
    });
  }
}
const d = [];
const director = [];
// eslint-disable-next-line no-restricted-syntax
for (const i of movies) {
  if (!d.includes(i.Director)) {
    d.push(i.Director);
    director.push({
      Director: i.Director,
    });
  }
}

module.exports = {
  moviesObject, director,
};
