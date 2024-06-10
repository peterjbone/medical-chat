import React, { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import signinImage from "../assets/signup.jpg";

const cookies = new Cookies();

const initialState = {
	fullName: "",
	username: "",
	password: "",
	confirmPassword: "",
	phoneNumber: "",
	avatarURL: ""
};

const Auth = () => {
	const [form, setForm] = useState(initialState);
	const [isSignup, setIsSignup] = useState(false);

	function handleChange(e) {
		setForm({ ...form, [e.target.name]: e.target.value });
	}

	async function handleSubmit(e) {
		e.preventDefault();

		const { username, password, phoneNumber, avatarURL } = form;
		//console.log(form);

		//? LAS .ENV NO FUNCIONABAN EN PRODUCCION, POR ESO HICE ESTO
		//const { VITE_BACK_URL } = import.meta.env;
		const SERVER_URL = ""; //!CAMBIAR POR RAILWAY (con ruta /auth)
		//todo: Tambien Cambiar la ruta del back en getstream donde dice: "Webhook URL"
		//todo: Agg las 6 .env en railway

		const {
			data: { token, userId, hashedPassword, fullName }
		} = await axios.post(`${SERVER_URL}${isSignup ? "signup" : "login"}`, {
			username,
			password,
			fullName: form.fullName,
			phoneNumber,
			avatarURL
		});

		cookies.set("token", token);
		cookies.set("username", username);
		cookies.set("fullName", fullName);
		cookies.set("userId", userId);

		if (isSignup) {
			cookies.set("phoneNumber", phoneNumber);
			cookies.set("avatarURL", avatarURL);
			cookies.set("hashedPassword", hashedPassword);
		}

		window.location.reload();
	}

	function switchMode() {
		setIsSignup((prevIsSignup) => !prevIsSignup);
	}

	//prettier-ignore
	return (
		<div className="auth__form-container">
			<div className="auth__form-container_fields">
				<div className="auth__form-container_fields-content">
					<p>{isSignup ? "Sign up" : "Sign in"}</p>
					<form onSubmit={handleSubmit}>
						{isSignup && (
							<div className="auth__form-container_fields-content_input">
								<label htmlFor="fullName">Full Name</label>
								<input
									type="text"
									name="fullName"
									placeholder="Full name"
									onChange={handleChange}
									required
								/>
							</div>
						)}
						<div className="auth__form-container_fields-content_input">
							<label htmlFor="username">Username</label>
							<input
								type="text"
								name="username"
								placeholder="Username"
								onChange={handleChange}
								required
							/>
						</div>
						{isSignup && (
							<div className="auth__form-container_fields-content_input">
								<label htmlFor="phoneNumber">Phone number</label>
								<input
									type="text"
									name="phoneNumber"
									placeholder="Phone Number"
									onChange={handleChange}
									required
								/>
							</div>
						)}
						{isSignup && (
							<div className="auth__form-container_fields-content_input">
								<label htmlFor="avatarURL">Avatar URL</label>
								<input
									type="text"
									name="avatarURL"
									placeholder="Avatar URL"
									onChange={handleChange}
									required
								/>
							</div>
						)}
						<div className="auth__form-container_fields-content_input">
							<label htmlFor="password">Password</label>
							<input
								type="password"
								name="password"
								placeholder="Password"
								onChange={handleChange}
								required
							/>
						</div>
						{isSignup && (
							<div className="auth__form-container_fields-content_input">
								<label htmlFor="confirmPassword">Confirm password</label>
								<input
									type="password"
									name="confirmPassword"
									placeholder="Confirm password"
									onChange={handleChange}
									required
								/>
							</div>
            )}
            <div className="auth__form-container_fields-content_button">
              <button>{ isSignup ? "Sign up" : "Sign in"}</button>
            </div>
          </form>
          <div className="auth__form-container_fields-account">
            <p>
              {isSignup
                ? "Already have an account?"
                : "Don’t have an account?"
              }
              <span onClick={switchMode}>
                {isSignup ? "Sign in" : "Sign up"}
              </span>
            </p>
          </div>
				</div>
      </div>
      <div className="auth__form-container_image">
        <img src={signinImage} alt="sign in" />
      </div>
		</div>
	);
};

export default Auth;
