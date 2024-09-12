import Nav from "./Nav";
import ThemeSwitcher from "./ThemeSwitcher";

const Header = () => {
  return (
    <header className="text-center pt-5 flex flex-col justify-center">
      <ThemeSwitcher />
      <Nav />
    </header>
  );
};

export default Header;
