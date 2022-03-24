const UserModel = require('../../models/User.js');
const rootURL = 'https://hotels4.p.rapidapi.com/';
const axios = require('axios').default;
const XRapidAPIKey = process.env.X_RapidAPI_Key;
const moment = require('moment');

module.exports = {
    getHotels,
    getOne,
    getPhotos
}

async function getHotels(req, res) {
    var location = {
        method: 'GET',
        url: 'https://hotels4.p.rapidapi.com/locations/v2/search',
        params: {query: req.body.destination, locale: 'en_US', currency: 'CAD'},
        headers: {
          'X-RapidAPI-Host': 'hotels4.p.rapidapi.com',
          'X-RapidAPI-Key': XRapidAPIKey
        }
      };
      let locationId
      axios.request(location).then(function (response) {
        locationId = response.data.suggestions[0].entities[0].destinationId
        
        let startDate = moment(req.body.startDate).format('YYYY-MM-DD');
        let endDate = moment(req.body.endDate).format('YYYY-MM-DD');
        var hotels = {
          method: 'GET',
          url: 'https://hotels4.p.rapidapi.com/properties/list',
          params: {
            destinationId: locationId,
            pageNumber: '1',
            pageSize: '10',
            checkIn: startDate,
            checkOut: endDate,
            adults1: req.body.people,
            sortOrder: 'PRICE',
            locale: 'en_US',
            currency: 'CAD'
          },
          headers: {
            'X-RapidAPI-Host': 'hotels4.p.rapidapi.com',
            'X-RapidAPI-Key': XRapidAPIKey
          }
        };
          
        axios.request(hotels).then(function (response) {
            console.log(response.data.data.body.searchResults.results);
            res.status(200).json(response.data.data.body.searchResults.results)
        }).catch(function (error) {
            console.error(error);
        });
      }).catch(function (error) {
          console.error(error);
      });
}

async function getOne(req, res) {
  var hotel = {
    method: 'GET',
    url: 'https://hotels4.p.rapidapi.com/properties/get-details',
    params: {
      id: req.body.id,
      checkIn: req.body.startDate,
      checkOut: req.body.endDate,
      adults1: req.body.people,
      currency: 'CAD',
      locale: 'en_US'
    },
    headers: {
      'X-RapidAPI-Host': 'hotels4.p.rapidapi.com',
      'X-RapidAPI-Key': XRapidAPIKey
    }
  };
  
  axios.request(hotel).then(function (response) {
    console.log(response.data.data.body);
    res.status(200).json(response.data.data.body)
  }).catch(function (error) {
    console.error(error);
  });
}

async function getPhotos(req, res) {
  console.log("the id", req.get('id'))
  var photos = {
    method: 'GET',
    url: 'https://hotels4.p.rapidapi.com/properties/get-hotel-photos',
    params: {id: req.get('id')},
    headers: {
      'X-RapidAPI-Host': 'hotels4.p.rapidapi.com',
      'X-RapidAPI-Key': XRapidAPIKey
    }
  };
  
  axios.request(photos).then(function (response) {
    console.log("fdasfasdggs", response.data)
    let photo = response.data.hotelImages[0].baseUrl.replace('_{size}', '')
    console.log("photos", photo)
    res.status(200).json(photo)
  }).catch(function (error) {
    console.error(error);
  });
}