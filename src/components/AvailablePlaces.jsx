import { useState, useEffect } from "react";
import Places from "./Places.jsx";

// const places = localStorage.getItem('places');

export default function AvailablePlaces({ onSelectPlace }) {
  // TODO: fetch available places from backend API
  const [availablePlaces, setAvailablePlaces] = useState([]);

  useEffect(() => {

    async function fetchPlaces() {
      const response = await fetch("http://localhost:3000/places");
      const resData = await response.json();
      setAvailablePlaces(resData.places);
    }

    // fetch("http://localhost:3000/places")
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((resData) => {
    //     setAvailablePlaces(resData.places);
    //   });

    fetchPlaces();
  }, []);

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
