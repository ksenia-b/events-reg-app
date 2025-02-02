import { useContext, useState } from "react";
import { auth } from "../../firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Navigate } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";

const Login = () => {
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const handleSetEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleSetPassword = (e) => {
        setPassword(e.target.value);
    };
    const loginWithUsernameAndPassword = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setIsLoading(true);

            navigate("/events");
        } catch (err) {
            setError("You entered a wrong username or password.");
        }
    };
    // setIsLoading(false)
    if (currentUser?.uid) {
        return <Navigate to="/" replace />;
    }

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <form onSubmit={loginWithUsernameAndPassword}>
                    <div>
                        {" "}
                        Login:{" "}
                        <input
                            name="login"
                            placeholder="Login or email"
                            onChange={handleSetEmail}
                        />
                    </div>
                    <div>
                        {" "}
                        Password:{" "}
                        <input
                            name="password"
                            placeholder="Password"
                            onChange={handleSetPassword}
                        />
                    </div>
                    <button type="submit">Submit</button>
                    <div>{error && `Error: ${error}`}</div>
                </form>
            )}
        </>
    );
};

export default Login;
