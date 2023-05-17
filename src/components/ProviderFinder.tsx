import { provider } from "../types";
import { useLoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { libraries } from "../types";
import genericPic1 from "../images/genericPics/jc-gellidon-xX0NVbJy8a8-unsplash.jpg";
import genericPic2 from "../images/genericPics/national-cancer-institute-aelk4Tn0vlI-unsplash.jpg";
import genericPic3 from "../images/genericPics/national-cancer-institute-oCLuFi9GYNA-unsplash.jpg";
import genericPic4 from "../images/genericPics/sam-moghadam-khamseh-2rrsfMN4hn8-unsplash.jpg";
import genericPic5 from "../images/genericPics/testalize-me-9xHsWmh3m_4-unsplash.jpg";

interface providerProps {
  userLocation: google.maps.LatLngLiteral | null;
  setUserLocation: React.Dispatch<
    React.SetStateAction<null | google.maps.LatLngLiteral>
  >;
  providers: provider[];
  setProviders: React.Dispatch<
    React.SetStateAction<null | provider[] | string>
  >;
}
const ProviderFinder: React.FC<providerProps> = ({
  userLocation,
  setUserLocation,
  providers,
  setProviders,
}) => {
  const [noResultsFound, setNoResultsFound] = useState<boolean>(false);
  // Hook to connect to google API
  const { isLoaded, loadError } = useLoadScript({
    // @ts-ignore
    // If api key is undefined error handling below will let us know.
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_TOKEN,
    libraries,
  });

  // Get the users location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          console.log("Unable to get user location");
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser");
    }
  }, []);

  // Grab provider data from the google API
  useEffect(() => {
    if (isLoaded && userLocation) {
      const service = new google.maps.places.PlacesService(
        new google.maps.Map(document.createElement("div"))
      );

      service.nearbySearch(
        {
          location: userLocation,
          radius: 15000, // 15km radius
          keyword: "Drug testing",
        },
        (results, status) => {
          if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            results !== null
          ) {
            let providersPlaceIds = results.map((result) => ({
              name: result.name,
              rating: result.rating,
              placeId: result.place_id,
            }));

            providersPlaceIds = providersPlaceIds.filter((provider) => {
              if (
                provider.rating !== undefined &&
                provider.rating > 2 &&
                provider.name?.includes("TestUtah") === false &&
                provider.name?.includes("COVID") === false
              ) {
                return provider;
              }
              return null;
            });
            if (providersPlaceIds.length === 0) {
              setNoResultsFound(true);
            }
            providersPlaceIds.forEach((provider) => {
              const request = {
                placeId: provider.placeId || "",
                fields: [
                  "name",
                  "rating",
                  "formatted_phone_number",
                  "formatted_address",
                  "photos",
                  "website",
                  "opening_hours",
                ],
              };
              // eslint-disable-next-line no-loop-func
              const callback = (
                place: any,
                status: google.maps.places.PlacesServiceStatus
              ) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                  setProviders((prevProviders) => {
                    if (prevProviders === null || prevProviders === "loading") {
                      setNoResultsFound(false);
                      return [place];
                    }

                    return [...prevProviders, place];
                  });
                }
              };
              service.getDetails(request, callback);
            });
          }
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, userLocation]);

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  // Pictures for businesses that did not provide one to google
  const genericPhotos = [
    genericPic1,
    genericPic2,
    genericPic3,
    genericPic4,
    genericPic5,
  ];

  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 5); // Generates a random number from 0 to 4
  };

  return (
    <div className="max-w-screen-lg px-4">
      <ul className="pt-20">
        {noResultsFound && (
          <h3 className="h-48">
            Sorry no providers in that area. Please try another.
          </h3>
        )}
        {providers.length > 0 && typeof providers !== "string" ? (
          <>
            {providers.map((provider, index) => {
              return (
                <section
                  key={index}
                  className=" sm:flex sm:justify-between mb-8 py-4 pl-4 bg-slate-100 border-slate-100 rounded-2xl border-2 shadow-xl"
                >
                  <div>
                    {provider.photos ? (
                      <img
                        src={provider.photos[0].getUrl()}
                        alt="store front"
                        style={{ maxWidth: "200px", maxHeight: "200px" }}
                        className="mb-2"
                      />
                    ) : (
                      <>
                        {" "}
                        <img
                          src={genericPhotos[generateRandomNumber()]}
                          alt="store front"
                          style={{ maxWidth: "200px", maxHeight: "200px" }}
                          className="mb-2"
                        />
                      </>
                    )}
                  </div>
                  <div>
                    <h4 className="text-brand_blue text-lg  pb-2">
                      {provider.name}{" "}
                    </h4>
                    <p className="mb-2">{provider.formatted_address}</p>
                    <p className="mb-2">{provider?.formatted_phone_number}</p>
                  </div>
                  <br></br>
                  <div className="pr-4 flex sm:flex-col  justify-between max-w-xl">
                    <a
                      className="transition duration-300 ease-in-out hover:opacity-60"
                      href={`tel:=${provider?.formatted_phone_number}`}
                    >
                      <button className="rounded-full flex justify-center items-center bg-brand_green w-10 h-10 drop-shadow-lg">
                        {" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="white"
                            d="M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.609-8.994l2.083-1.026-3.493-6.817-2.106 1.039c-7.202 3.755 4.233 25.982 11.6 22.615.121-.055 2.102-1.029 2.11-1.033z"
                          />
                        </svg>
                      </button>
                    </a>
                    <a
                      className="transition duration-300 ease-in-out hover:opacity-60"
                      href={`https://www.google.com/maps/dir/?api=1&destination=${provider.formatted_address}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <button className="rounded-full flex justify-center items-center bg-brand_orange w-10 h-10 drop-shadow-lg">
                        {" "}
                        <svg
                          fill="white"
                          clipRule="evenodd"
                          fillRule="evenodd"
                          strokeLinejoin="round"
                          strokeMiterlimit="2"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="m14.523 18.787s4.501-4.505 6.255-6.26c.146-.146.219-.338.219-.53s-.073-.383-.219-.53c-1.753-1.754-6.255-6.258-6.255-6.258-.144-.145-.334-.217-.524-.217-.193 0-.385.074-.532.221-.293.292-.295.766-.004 1.056l4.978 4.978h-14.692c-.414 0-.75.336-.75.75s.336.75.75.75h14.692l-4.979 4.979c-.289.289-.286.762.006 1.054.148.148.341.222.533.222.19 0 .378-.072.522-.215z"
                            fillRule="nonzero"
                          />
                        </svg>
                      </button>
                    </a>
                    {provider.website && (
                      <a
                        className="transition duration-300 ease-in-out hover:opacity-60"
                        href={provider.website}
                      >
                        <button className="rounded-full flex justify-center items-center bg-brand_blue w-10 h-10 drop-shadow-lg">
                          {" "}
                          <svg
                            fill="white"
                            width="24"
                            height="24"
                            xmlns="http://www.w3.org/2000/svg"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          >
                            <path d="M12.02 0c6.614.011 11.98 5.383 11.98 12 0 6.623-5.376 12-12 12-6.623 0-12-5.377-12-12 0-6.617 5.367-11.989 11.981-12h.039zm3.694 16h-7.427c.639 4.266 2.242 7 3.713 7 1.472 0 3.075-2.734 3.714-7m6.535 0h-5.523c-.426 2.985-1.321 5.402-2.485 6.771 3.669-.76 6.671-3.35 8.008-6.771m-14.974 0h-5.524c1.338 3.421 4.34 6.011 8.009 6.771-1.164-1.369-2.059-3.786-2.485-6.771m-.123-7h-5.736c-.331 1.166-.741 3.389 0 6h5.736c-.188-1.814-.215-3.925 0-6m8.691 0h-7.685c-.195 1.8-.225 3.927 0 6h7.685c.196-1.811.224-3.93 0-6m6.742 0h-5.736c.062.592.308 3.019 0 6h5.736c.741-2.612.331-4.835 0-6m-12.825-7.771c-3.669.76-6.671 3.35-8.009 6.771h5.524c.426-2.985 1.321-5.403 2.485-6.771m5.954 6.771c-.639-4.266-2.242-7-3.714-7-1.471 0-3.074 2.734-3.713 7h7.427zm-1.473-6.771c1.164 1.368 2.059 3.786 2.485 6.771h5.523c-1.337-3.421-4.339-6.011-8.008-6.771" />
                          </svg>
                        </button>
                      </a>
                    )}
                  </div>
                </section>
              );
            })}
          </>
        ) : noResultsFound ? null : (
          <div className="h-48">Searching...</div>
        )}
      </ul>
    </div>
  );
};

export default ProviderFinder;
