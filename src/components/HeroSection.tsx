import backgroundImage from "../images/andy-vult-zwZpdhoTbU0-unsplash.jpg";

const HeroSection = () => {
  return (
    <>
      <section
        style={{
          backgroundImage: `url(${backgroundImage})`,
          height: "400px",
        }}
        className="bg-cover bg-center w-full mt-10 max-w-screen-lg"
      >
        <h1
          className=" text-center font-bold text-5xl font-mono pt-10"
          style={{ textShadow: "1px 1px 0 rgb(153 153 153)" }}
        >
          Find A Provider Near You
        </h1>{" "}
      </section>
      <h2
        className="bg-brand_green text-white text-3xl text-center py-10 px-2  max-w-screen-lg"
        style={{ textShadow: "1px 1px 0 rgb(153 153 153)" }}
      >
        Please allow access to your location, or enter the city where you want
        to find drug test providers.
      </h2>
    </>
  );
};

export default HeroSection;
