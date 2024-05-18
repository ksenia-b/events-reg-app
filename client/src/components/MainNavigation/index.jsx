import { NavLink } from "react-router-dom";

function MainNavigation() {
  return (
    <div>
      <nav>
        <ul className="flex row gap-2">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/events">Events</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default MainNavigation;
