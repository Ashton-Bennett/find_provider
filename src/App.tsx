import { useState } from "react";
import UserLocationForm from "./components/UserLocationForm";
import ProviderFinder from "./components/ProviderFinder";
import { provider } from "./types";
import HeroSection from "./components/HeroSection";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useLoadScript } from "@react-google-maps/api";
import { libraries } from "../src/types";

function App() {
  const [userLocation, setUserLocation] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [providers, setProviders] = useState<provider[] | null | string>([]);

  // Hook to connect to google API
  const { isLoaded, loadError } = useLoadScript({
    // @ts-ignore
    // If api key is undefined error handling below will let us know.
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_TOKEN,
    libraries,
  });

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  if (!isLoaded) {
    return <div className="h-48">Loading...</div>;
  }

  return (
    <>
      <Header />
      <main className="flex flex-col flex-wrap content-center font-mono font-family: Consolas, Monaco, Menlo">
        <HeroSection />
        <UserLocationForm
          setUserLocation={setUserLocation}
          setProviders={setProviders}
        />
        <ProviderFinder
          userLocation={userLocation}
          setUserLocation={setUserLocation}
          providers={(providers as provider[]) || []}
          setProviders={setProviders}
          isLoaded={isLoaded}
        />
      </main>
      <Footer />
    </>
  );
}

export default App;
