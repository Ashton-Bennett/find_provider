import React, { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { provider } from "../types";

interface userLocationProps {
  setUserLocation: React.Dispatch<
    React.SetStateAction<null | google.maps.LatLngLiteral>
  >;
  setProviders: React.Dispatch<
    React.SetStateAction<null | provider[] | string>
  >;
}

const UserLocationForm: React.FC<userLocationProps> = ({
  setUserLocation,
  setProviders,
}) => {
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  const onLoad = (autocomplete: any) => {
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      setUserLocation({
        lat: place.geometry?.location?.lat() || 0,
        lng: place.geometry?.location?.lng() || 0,
      });
      setProviders("loading");
    }
  };

  return (
    <form
      className="max-w-screen-lg pt-16 px-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <section className="group relative mt-10 w-full h-32 pt-4 bg-slate-100 border-slate-100 rounded-2xl border-2 shadow-xl">
        <h3 className="text-xl pl-4 pb-2">Change Location</h3>
        <svg
          width="20"
          height="20"
          fill="currentColor"
          className="absolute left-6 top-1/2  text-slate-400 pointer-events-none group-focus-within:text-brand_blue"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          />
        </svg>
        <label htmlFor="location input">
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <input
              id="location input"
              name="location"
              placeholder="enter location"
              type="text"
              aria-label="enter location"
              className=" ml-4 w-4/5 focus:ring-2 focus:ring-brand_blue focus:outline-none appearance-none text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm"
            />
          </Autocomplete>
        </label>
      </section>
    </form>
  );
};

export default UserLocationForm;
