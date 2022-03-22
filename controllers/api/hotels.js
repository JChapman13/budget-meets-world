const UserModel = require('../../models/User.js');
const rootURL = 'https://hotels4.p.rapidapi.com/';
const axios = require('axios').default;
const XRapidAPIKey = process.env.X_RapidAPI_Key;

module.exports = {
    getHotels,
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
        var hotels = {
          method: 'GET',
          url: 'https://hotels4.p.rapidapi.com/properties/list',
          params: {
            destinationId: locationId,
            pageNumber: '1',
            pageSize: '10',
            checkIn: req.body.startDate,
            checkOut: req.body.endDate,
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