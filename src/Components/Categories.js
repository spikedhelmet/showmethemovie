import { NavMenu, NavItem } from "../App.styled";

function Navbar({ onDisplayed }) {
  return (
    <NavMenu>
      <NavItem onClick={() => onDisplayed("popular")}>Popular</NavItem>
      <NavItem onClick={() => onDisplayed("top_rated")}>Top Rated</NavItem>
      <NavItem onClick={() => onDisplayed("now_playing")}>Now Playing</NavItem>
      <NavItem onClick={() => onDisplayed("upcoming")}>Upcoming</NavItem>
    </NavMenu>
  );
}

export default Navbar;
