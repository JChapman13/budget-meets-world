import "./App.css";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, Route, Routes } from "react-router-dom";
import AuthPage from "../AuthPage/AuthPage";
import SearchPage from "../SearchPage/SearchPage";
import SearchResultsPage from "../SearchResultsPage/SearchResultsPage";
import ProfilePage from "../ProfilePage/ProfilePage";
import SavedTripsPage from "../SavedTripsPage/SavedTripsPage";
import HotelDetailPage from "../HotelDetailPage/HotelDetailPage";
import Login from "../../Components/Login/Login";
import Signup from "../../Components/Signup/Signup";
import TripDetailPage from "../TripDetailPage/TripDetailPage";
import Flights from "../../Components/Flights/Flights";

export default function App(props) {
  let navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [trips, setTrips] = useState([]);

  const [currentCat, setCurrentCat] = useState("flight");

  const [trip, setTrip] = useState({
    name: "la la la",
    budget: 5000,
    people: 1,
    origin: "Toronto",
    destination: "New York City, NY",
    flight: 200,
    accommodation: 500,
    restaurant: 1000,
    startDate: "04/25/2022",
    endDate: "04/27/2022",
  });

  const [hotelList, setHotelList] = useState([]);

  const [oneHotel, setOneHotel] = useState({});

  const [hotelPhotos, setHotelPhotos] = useState({});

  const [restaurants, setRestaurants] = useState([]);

  const [flights, setFlights] = useState([]);

  const [carriers, setCarriers] = useState([]);

  async function setUserInState(incomingUserData) {
    setUser(incomingUserData);
  }

  async function userLogout() {
    let token = localStorage.getItem("token");
    if (token) {
      token = null;
      localStorage.removeItem("token");
      setUser(null);
    }
  }

  async function findHotels() {
    setCurrentCat("hotel");
    try {
      let fetchHotelList = await fetch("/api/hotels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          budget: 2000,
          people: 2,
          destination: "New York City, NY",
          accommodation: 500,
          startDate: "2022-03-25",
          endDate: "2022-03-27",
        }),
      });
      let hotels = await fetchHotelList.json();
      setHotelList(hotels);
    } catch (err) {
      console.log(err);
    }
  }

  async function createTrip(object, userId) {
    if (!object.id) {
      let fetchTrip = await fetch("/api/users/create/trip", {
        method: "POST",
        headers: { "Content-Type": "application/json", userId: userId },
        body: JSON.stringify({
          name: object.name,
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
      navigate("/");
    } else {
      let fetchTrip = await fetch("/api/users/edit/trip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          userId: userId,
          tripId: object.id,
        },
        body: JSON.stringify({
          name: object.name,
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
      navigate("/");
    }
  }

  async function findOneHotel(id) {
    try {
      let fetchOneHotel = await fetch("/api/hotels/one", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: id,
          people: 2,
          startDate: "2022-03-25",
          endDate: "2022-03-27",
        }),
      });
      let hotel = await fetchOneHotel.json();
      console.log(hotel);
      setOneHotel(hotel);
    } catch (err) {
      console.log(err);
    }
  }

  async function getHotelPhotos(id) {
    try {
      let fetchHotelPhotos = await fetch("/api/hotels/photos", {
        headers: { id: id },
      });
      let photos = await fetchHotelPhotos.json();
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

  const restaurantPrice = () => {
    const date1 = new Date(trip.startDate);
    const date2 = new Date(trip.endDate);
    const diffTime = date2.getTime() - date1.getTime();
    const diffDays = diffTime / (1000 * 3600 * 24);
    const dailyPrice = trip.restaurant / diffDays;

    if (dailyPrice > 60) return "4,3,2,1";
    if (dailyPrice < 60 && dailyPrice > 31) return "3,2,1";
    if (dailyPrice < 31 && dailyPrice > 10) return "2,1";
    if (dailyPrice <= 10) return "1";
  };

  async function getRestaurants(params) {
    setCurrentCat("rest");
    axios
      .get("/api/foods", {
        params: {
          latitude: 43.6532,
          longitude: 79.3832,
          price: restaurantPrice(),
        },
      })
      .then((res) => {
        setRestaurants(res.data.businesses);
      })
      .catch((err) => console.log(err, "this is a restaurant finder error"));
  }

  async function getFlights(params) {
    setCurrentCat("flight");
    axios
      .get("/api/flights", {
        params: {
          country: "CA",
          currency: "cad",
          locale: "en-US",
          originPlace: "YYZ",
          destinationPlace: "YVR",
          outboundPartialDate: "2022-04",
          inboundPartialDate: "2022-06",
        },
      })
      .then((result) => {
        setCarriers(result.data.Carriers);
        setFlights(result.data.Quotes);
      })
      .catch((err) => console.log(err, "flight result error"));
  }

  useEffect(async () => {
    let token = localStorage.getItem("token");
    if (token) {
      const payload = await JSON.parse(atob(token.split(".")[1]));
      if (payload.exp < Date.now() / 1000) {
        localStorage.removeItem("token");
        token = null;
        navigate("/account/login");
      } else {
        try {
          let fetchUser = await fetch("/api/users/", {
            headers: { userId: payload.user._id },
          });
          let user = await fetchUser.json();
          setUser(user);
          setTrips(user.trip);
        } catch (err) {
          console.log("home page error: ", err);
        }
      }
    } else {
      navigate("/account/login");
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/account" element={<AuthPage />}>
          <Route
            path="login"
            element={<Login setUserInState={setUserInState} />}
          />
          <Route
            path="signup"
            element={<Signup setUserInState={setUserInState} />}
          />
        </Route>
        <Route
          path="/"
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
            />
          }
        />
        <Route
          path="/create"
          element={
            <SearchPage user={user} createTrip={createTrip} trip={trip} />
          }
        />
        <Route path="/profile" element={<ProfilePage />} />
        <Route
          path="/trips"
          element={<SavedTripsPage user={user} trips={trips} />}
        />
        <Route
          path="/trips/:id"
          element={<TripDetailPage user={user} trip={trip} />}
        />
        <Route
          path="/hotel/:id"
          element={
            <HotelDetailPage oneHotel={oneHotel} hotelPhotos={hotelPhotos} />
          }
        />
        <Route path="/flights" element={<Flights />} />
      </Routes>
    </div>
  );
}
