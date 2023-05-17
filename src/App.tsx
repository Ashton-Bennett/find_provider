import { useState } from "react";
import UserLocationForm from "./components/UserLocationForm";
import ProviderFinder from "./components/ProviderFinder";
import { provider } from "./types";
import HeroSection from "./components/HeroSection";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [userLocation, setUserLocation] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [providers, setProviders] = useState<provider[] | null | string>([]);

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
        />
      </main>
      <Footer />
    </>
  );
}

export default App;
