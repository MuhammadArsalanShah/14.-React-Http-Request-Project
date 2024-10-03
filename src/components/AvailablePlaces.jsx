import { useState, useEffect } from "react"
;
import Places from "./Places.jsx";
import ErrorPage from "./Error.jsx";

// const places = localStorage.getItem('places');

export default function AvailablePlaces({ onSelectPlace }) {
  // TODO: fetch available places from backend API
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {

    async function fetchPlaces() {
      setIsFetching(true);

      try {
        const response = await fetch("http://localhost:3000/places");
        const resData = await response.json();

        if (!response.ok) {
          // const error = new Error('Failed to fetch places');
          // throw error;

          throw new Error('Failed to fetch places')
        }

      setAvailablePlaces(resData.places);
      } catch (error) {
        setError({ message: error.message || 'Counld not fetch places, please try again later' });
      }
      
      setIsFetching(false);
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

  if (error) {
    return <ErrorPage title="An error occured" message={error.message}/>
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching places data ..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
