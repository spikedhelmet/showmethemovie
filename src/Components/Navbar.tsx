import { useNavigate, useSearchParams } from "react-router-dom";
import { NavMenu, NavItem } from "../App.styled";
import { Dropdown } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useState } from "react";

function Navbar() {
	const [searchParams] = useSearchParams();
	const [, setNavSelect] = useState(searchParams.get(`navSelect`));
	const navigate = useNavigate();

	const handleSelect = (select: string) => {
		setNavSelect(select);
		searchParams.set(`navSelect`, select);
		navigate(`/navResults?${searchParams.toString()}`);
	};

	return (
		<NavMenu>
			<NavItem
				onClick={() => {
					navigate(`/`);
				}}>
				Home🏠
			</NavItem>
			<DropdownButton variant="dark" menuVariant="dark" id="dropdown-basic-button" title="Movies">
				<Dropdown.Item onClick={() => handleSelect("popular")}>Popular</Dropdown.Item>
				<Dropdown.Item onClick={() => handleSelect("now_playing")}>Now Playing</Dropdown.Item>
				<Dropdown.Item onClick={() => handleSelect("upcoming")}>Upcoming</Dropdown.Item>
				<Dropdown.Item onClick={() => handleSelect("top_rated")}>Top Rated</Dropdown.Item>
			</DropdownButton>
		</NavMenu>
	);
}

export default Navbar;
