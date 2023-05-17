import logoImage from "../images/Screen Shot 2023-05-16 at 11.45.49 AM.png";
const Header = () => {
  return (
    <header className="flex flex-col flex-wrap content-center">
      <img src={logoImage} alt="logo" className="max-w-xs " />
    </header>
  );
};

export default Header;
