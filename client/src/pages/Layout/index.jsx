import { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import MainNavigation from "../../components/MainNavigation";
import { AuthContext } from "../../auth/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.js";

function Layout() {
  const { currentUser } = useContext(AuthContext);
  console.log("cur user: ", currentUser);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log("Error while signed out = ", error);
      });
  };

  return (
    <div className="container mx-auto">
      <div>
        <h1 className="text-4xl font-bold">Events</h1>
        <h2>Web application for events managenent</h2>
      </div>
      <div className="flex row justify-between border-b-2 items-center">
        <MainNavigation />

        {currentUser ? (
          <div>
            <p>User: {currentUser.email} </p>
            <button onClick={handleLogout}>Log out</button>
          </div>
        ) : (
          <div className="flex row">
            <Link to="/login">Login</Link> | <Link to="/signup">Sign up</Link>
          </div>
        )}
      </div>
      <Outlet />
    </div>
  );
}

export default Layout;
