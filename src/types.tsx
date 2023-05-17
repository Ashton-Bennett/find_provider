export const libraries: (
  | "places"
  | "drawing"
  | "geometry"
  | "localContext"
  | "visualization"
)[] = ["places"];

export interface provider {
  name: string;
  formatted_address: string | undefined;
  location: google.maps.LatLngLiteral | undefined;
  rating: number | undefined;
  formatted_phone_number: string | undefined;
  photos: google.maps.places.PlacePhoto[] | undefined;
  opening_hours: google.maps.places.PlaceOpeningHours | undefined;
  website: string;
}
