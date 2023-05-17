import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import UserLocationForm from "./components/UserLocationForm";
import { SetStateAction } from "react";
import { provider } from "./types";
import ProviderFinder from "./components/ProviderFinder";

test("Renders User Location form", () => {
  render(
    <UserLocationForm
      setUserLocation={function (
        value: SetStateAction<google.maps.LatLngLiteral | null>
      ): void {
        throw new Error("Function not implemented.");
      }}
      setProviders={function (
        value: SetStateAction<string | provider[] | null>
      ): void {
        throw new Error("Function not implemented.");
      }}
    />
  );

  waitFor(
    () => {
      const inputBox = screen.getByRole("textbox", {
        name: /location/i,
      });
      expect(inputBox).toBeInTheDocument();
    },
    { timeout: 1000 }
  );
});

test("renders the main element and header", () => {
  render(<App />);
  const header = screen.getByRole("heading", {
    name: /find a provider near you/i,
  });
  expect(header).toBeInTheDocument();

  const main = screen.getByRole("main");
  expect(main).toBeInTheDocument();
});

test("Renders ProviderFinder list", () => {
  render(
    <ProviderFinder
      userLocation={null}
      setUserLocation={function (
        value: SetStateAction<google.maps.LatLngLiteral | null>
      ): void {
        throw new Error("Function not implemented.");
      }}
      providers={[]}
      setProviders={function (
        value: SetStateAction<string | provider[] | null>
      ): void {
        throw new Error("Function not implemented.");
      }}
    />
  );

  waitFor(
    () => {
      const list = screen.getByRole("list");
      expect(list).toBeInTheDocument();
    },
    { timeout: 1000 }
  );
});
