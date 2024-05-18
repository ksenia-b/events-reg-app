import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const postData = (dataF) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataF),
    };
    fetch("http://localhost:4000/auth/register", requestOptions)
      .then((response) => {
        console.log("response = ", response);
        navigate("/login");
        return response;
      })
      .catch((e) => setError("error" + e));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords did not match!");
      return;
    }

    postData(formData);
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} method="POST">
      <div>
        <span>Registration details</span>
        <ul>
          <li>
            <p>Name</p>
            <input
              placeholder={"Enter your usernname"}
              onChange={handleInputChange}
              name="username"
            />
          </li>
          <li>
            <p>E-Mail *</p>
            <input
              placeholder={"Enter email"}
              type="email"
              name="email"
              value={formData.email}
              required
              onChange={handleInputChange}
            />
          </li>
          <li>
            <p>Password</p>
            <input
              placeholder={"Enter password"}
              type="password"
              name="password"
              value={formData.password}
              required
              onChange={handleInputChange}
            />
          </li>
          <li>
            <p>Repeat password *</p>
            <input
              placeholder={"Repeat password"}
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              required
              onChange={handleInputChange}
            />
          </li>
        </ul>
      </div>
      <button>Register</button>
      <p>{error}</p>
    </form>
  );
};
export default Signup;
