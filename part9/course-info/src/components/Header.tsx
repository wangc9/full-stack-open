import {HeaderInput} from "../types";

const Header = (props: HeaderInput) => {
  return (
    <h1>{props.name}</h1>
  );
}

export default Header;
