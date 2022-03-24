import './App.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, Route, Routes } from 'react-router-dom';
import AuthPage from '../AuthPage/AuthPage';
import SearchPage from '../SearchPage/SearchPage';
import SearchResultsPage from '../SearchResultsPage/SearchResultsPage';
import ProfilePage from '../ProfilePage/ProfilePage';
import SavedTripsPage from '../SavedTripsPage/SavedTripsPage';
import HotelDetailPage from '../HotelDetailPage/HotelDetailPage';
import Login from '../../Components/Login/Login';
import Signup from '../../Components/Signup/Signup';
import TripDetailPage from '../TripDetailPage/TripDetailPage';
import Flights from '../../Components/Flights/Flights';
import RestaurantDetailPage from '../RestaurantDetailPage/RestaurantDetailPage';
const axios = require('axios').default;

export default function App(props) {
	let navigate = useNavigate();
	const [user, setUser] = useState(null);
	const [trips, setTrips] = useState([]);
	const [currentCat, setCurrentCat] = useState('flight');
	const [hotelList, setHotelList] = useState([]);
	const [oneHotel, setOneHotel] = useState({});
	const [hotelPhotos, setHotelPhotos] = useState("");
	const [savedHotel, setSavedHotel] = useState([]);
	const [trip, setTrip] = useState({
		// _id: "623bd557d4bb1e9d4d4fd4b1",
		name: "",
		budget: 0,
		people: 0,
		origin: "",
		destination: "",
		flight: 0,
		accommodation: 0,
		restaurant: 0,
		startDate: "",
		endDate: "",
		// hotel: [],
	});
	const [currentTrip, setCurrentTrip] = useState({});
	const [restaurants, setRestaurants] = useState([]);
	const [flights, setFlights] = useState([]);
	const [carriers, setCarriers] = useState([]);
	const [places, setPlaces] = useState([]);
	const [cityCode, setCityCode] = useState({});
	const [restaurantDetail, setRestaurantDetail] = useState();

	async function setUserInState(incomingUserData) {
		setUser(incomingUserData);
	}

	async function userLogout() {
		let token = localStorage.getItem('token');
		if (token) {
			token = null;
			localStorage.removeItem('token');
			setUser(null);
		}
	}

	async function getCityCode(ori, des) {
		let origin = ori.replace(' ', '%20');
		let fetchOrigin = await fetch('/api/flights/city', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				city: origin,
			}),
		});
		let city1 = await fetchOrigin.json();

		let destination = des.replace(' ', '%20');
		let fetchDestination = await fetch('/api/flights/city', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				city: destination,
			}),
		});
		let city2 = await fetchDestination.json();

		setCityCode({ origin: city1, destination: city2 });
	}

	async function openOneTrip(id) {
		let fetchTrip = await fetch('/api/users/trip/detail', {
			headers: { userId: user._id, tripId: id },
		});
		let response = await fetchTrip.json();

		setSavedHotel(response.hotelArr);
		setCurrentTrip(response.theTrip);
		// console.log(response.hotelArr);
		setTrip(response.theTrip);
		navigate(`/trips/${id}`);
	}

	async function editOneTrip(tripId) {
    let fetchOneTrip = await fetch('/api/users/trip/one', {
      headers: { userId: user._id, tripId: tripId }
    })
    let trip = await fetchOneTrip.json();
		setTrip(trip)
		navigate(`/`);
	}

	async function createTrip(object, userId) {
		// if (!object.id) {
		console.log(object);
		let fetchTrip = await fetch('/api/users/create/trip', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', userId: userId },
			body: JSON.stringify({
				// name: object.name,
				budget: object.budget,
				people: object.people,
				origin: object.origin,
				destination: object.destination,
				flight: object.flight,
				accommodation: object.accommodation,
				restaurant: object.restaurant,
				startDate: object.startDate,
				endDate: object.endDate,
				hotel: [],
			}),
		});
		let user = await fetchTrip.json();
		setUser(user.users);
		setTrip(user.trip);
		console.log(user.trip._id, 'user trip id');
		navigate('/');
		// } else {
		// let fetchTrip = await fetch("/api/users/edit/trip", {
		// 	method: "POST",
		// 	headers: {
		// 	"Content-Type": "application/json",
		// 	userId: userId,
		// 	tripId: object.id,
		// 	},
		// 	body: JSON.stringify({
		// 	name: object.name,
		// 	budget: object.budget,
		// 	people: object.people,
		// 	origin: object.origin,
		// 	destination: object.destination,
		// 	flight: object.flight,
		// 	accommodation: object.accommodation,
		// 	restaurant: object.restaurant,
		// 	startDate: object.startDate,
		// 	endDate: object.endDate,
		// 	hotel: [],
		// 	}),
		// });
		// let user = await fetchTrip.json();
		// setUser(user.users);
		// setTrip(user.trip);
		// navigate("/");
		// }
	}

  // for hotels
  async function findHotels() {
    setCurrentCat("hotel");
    try {
      let fetchHotelList = await fetch("/api/hotels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          budget: trip.budget,
          people: trip.people,
          destination: trip.destination,
          accommodation: trip.accommodation,
          startDate: trip.startDate,
          endDate: trip.endDate,
        }),
      });
      let hotels = await fetchHotelList.json();
      setHotelList(hotels);
    } catch (err) {
      console.log(err);
    }
  }

	async function findOneHotel(id) {
		try {
			let fetchOneHotel = await fetch('/api/hotels/one', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					id: id,
					people: 2,
					startDate: '2022-03-25',
					endDate: '2022-03-27',
				}),
			});
			let hotel = await fetchOneHotel.json();
			console.log(hotel);
			setOneHotel(hotel);
		} catch (err) {
			console.log(err);
		}
	}

	async function createNewTrip(id) {
		setTrip({});
		navigate(`/create`);
	}

  async function getHotelPhotos(id) {
    try {
      let fetchHotelPhotos = await fetch("/api/hotels/photos", {
        headers: { id: id },
      });
      let photos = await fetchHotelPhotos.json();
      console.log(photos)
      setHotelPhotos(photos);
    } catch (err) {
      console.log(err);
    }
  }

	async function openHotelDetail(id) {
		console.log(id);
		await findOneHotel(id);
		await getHotelPhotos(id);
		navigate(`/hotel/${id}`);
	}

	async function saveHotel(id) {
		try {
			let fetchResponse = await fetch('/api/users/trip/save/hotel', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					hotelId: id,
					userId: user._id,
					tripId: trip._id,
				}),
			});
			let response = await fetchResponse.json();
			setUser(response.user);
			setTrip(response.trip);
			console.log(response.trip);
		} catch (err) {
			console.log(err);
		}
	}

	const restaurantPrice = () => {
		const date1 = new Date(trip.startDate);
		const date2 = new Date(trip.endDate);
		const diffTime = date2.getTime() - date1.getTime();
		const diffDays = diffTime / (1000 * 3600 * 24);
		const dailyPrice = trip.restaurant / diffDays;

		if (dailyPrice > 60) return '4,3,2,1';
		if (dailyPrice < 60 && dailyPrice > 31) return '3,2,1';
		if (dailyPrice < 31 && dailyPrice > 10) return '2,1';
		if (dailyPrice <= 10) return '1';
	};

	async function getRestaurants(params) {
		setCurrentCat('rest');
		axios
			.get('/api/foods', {
				params: {
					latitude: 43.6532,
					longitude: 79.3832,
					price: restaurantPrice(),
				},
			})
			.then((res) => {
				setRestaurants(res.data.businesses);
			})
			.catch((err) => console.log(err, 'this is a restaurant finder error'));
	}

	async function getRestaurantDetail(params) {
		console.log(params);
		axios
			.get(`/api/foods/detail/${params}`, {
				params: {
					id: params,
				},
			})
			.then((res) => {
				setRestaurantDetail(res.data);
				navigate('/restaurant/:id');
			})
			.catch((err) => console.log(err, 'this is a restaurant finder error'));
	}

	async function getFlights(params) {
		setCurrentCat('flight');
		axios
			.get('/api/flights', {
				params: {
					country: 'CA',
					currency: 'cad',
					locale: 'en-US',
					originPlace: 'YYZ',
					destinationPlace: 'YVR',
					outboundPartialDate: '2022-04',
					inboundPartialDate: '2022-06',
				},
			})
			.then((result) => {
				setCarriers(result.data.Carriers);
				setFlights(result.data.Quotes);
				setPlaces(result.data.Places);
			})
			.catch((err) => console.log(err, 'flight result error'));
	}

	async function saveFlight(object) {
		axios
			.post('/api/users/trip/save/flight', {
				data: object,
				userId: user._id,
				tripId: trip._id,
			})
			.then((result) => {
				console.log(result, 'result');
			})
			.catch((err) => console.log(err, 'save flight error'));
	}

	useEffect(async () => {
		let token = localStorage.getItem('token');
		if (token) {
			const payload = await JSON.parse(atob(token.split('.')[1]));
			if (payload.exp < Date.now() / 1000) {
				localStorage.removeItem('token');
				token = null;
				navigate('/account/login');
			} else {
				try {
					let fetchUser = await fetch('/api/users/', {
						headers: { userId: payload.user._id },
					});
					let user = await fetchUser.json();
					setUser(user);
					if (user.trip.length) {
						setTrips(user.trip);
					} else {
						setTrips([]);
					}
				} catch (err) {
					console.log('home page error: ', err);
				}
			}
		} else {
			navigate('/account/login');
		}
	}, []);

	return (
		<div className='App'>
			<Routes>
				<Route path='/account' element={<AuthPage />}>
					<Route path='login' element={<Login setUserInState={setUserInState} />} />
					<Route
						path='signup'
						element={<Signup setUserInState={setUserInState} />}
					/>
				</Route>
				<Route
					path='/'
					element={
						<SearchResultsPage
							findHotels={findHotels}
							hotels={hotelList}
							currentCat={currentCat}
							trip={trip}
							openHotelDetail={openHotelDetail}
							getRestaurants={getRestaurants}
							restaurantPrice={restaurantPrice}
							restaurants={restaurants}
							getFlights={getFlights}
							flights={flights}
							carriers={carriers}
							places={places}
							user={user}
							saveHotel={saveHotel}
							saveFlight={saveFlight}
              hotelPhotos={hotelPhotos}
              getHotelPhotos={getHotelPhotos}
						/>
					}
				/>

				<Route
					path='/create'
					element={
						<SearchPage
							user={user}
							createTrip={createTrip}
							trip={trip}
							getCityCode={getCityCode}
						/>
					}
				/>
				<Route path='/profile' element={<ProfilePage />} />
				<Route
					path='/trips'
					element={
						<SavedTripsPage
							user={user}
							trips={trips}
							openOneTrip={openOneTrip}
							createNewTrip={createNewTrip}
						/>
					}
				/>
				<Route
					path='/trips/:id'
					element={
						<TripDetailPage
							user={user}
							trip={trip}
							editOneTrip={editOneTrip}
							savedHotel={savedHotel}
              openHotelDetail={openHotelDetail}
              saveHotel={saveHotel}
              hotelPhotos={hotelPhotos}
              getHotelPhotos={getHotelPhotos}
						/>
					}
				/>
				<Route
					path='/hotel/:id'
					element={<HotelDetailPage oneHotel={oneHotel} hotelPhotos={hotelPhotos} />}
				/>
				<Route path='/flights' element={<Flights flights={flights} />} />
			</Routes>
		</div>
	);
}
