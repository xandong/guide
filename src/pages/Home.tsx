import React, { useEffect, useState } from "react";
import CardsList from "../components/Home/CardsList";
import PageWrapper from "../components/Layout";
import MapFloat from "../components/Layout/MapFloat";

type Coords = {
  lat: number;
  lng: number;
}

const Home: React.FC = () => {
  document.title = "Home";
  const [coords, setCoords] = useState<Coords>()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((e) => {
      setCoords({
        lat: e.coords.latitude,
        lng: e.coords.longitude,
      })
    });
  }, [])

  console.log({coords})

  return (
    <React.Fragment>
      <PageWrapper>
        <CardsList />
      </PageWrapper>

      {/* Google Maps */}
      <MapFloat />
    </React.Fragment>
  );
};

export default Home;