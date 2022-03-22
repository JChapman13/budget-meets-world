const UserModel = require('../../models/User.js');
const rootURL = 'https://hotels4.p.rapidapi.com/';
const axios = require('axios').default;

module.exports = {
    getHotels,
}

async function getHotels(req, res) {
    var location = {
        method: 'GET',
        url: 'https://hotels4.p.rapidapi.com/locations/v2/search',
        params: {query: 'new york', locale: 'en_US', currency: 'USD'},
        headers: {
          'X-RapidAPI-Host': 'hotels4.p.rapidapi.com',
          'X-RapidAPI-Key': '0681b94e85mshd675df0a523e004p1c5f2fjsn2bf580d60c4d'
        }
      };
      
      axios.request(location).then(function (response) {
          console.log(response.data);
      }).catch(function (error) {
          console.error(error);
      });

    var hotels = {
        method: 'GET',
        url: 'https://hotels4.p.rapidapi.com/properties/list',
        params: {
          destinationId: '1506246',
          pageNumber: '1',
          pageSize: '25',
          checkIn: '2020-01-08',
          checkOut: '2020-01-15',
          adults1: '1',
          sortOrder: 'PRICE',
          locale: 'en_US',
          currency: 'USD'
        },
        headers: {
          'X-RapidAPI-Host': 'hotels4.p.rapidapi.com',
          'X-RapidAPI-Key': '0681b94e85mshd675df0a523e004p1c5f2fjsn2bf580d60c4d'
        }
      };
      
      axios.request(hotels).then(function (response) {
          console.log(response.data);
      }).catch(function (error) {
          console.error(error);
      });
}