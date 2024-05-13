import React, { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import signinImage from "../assets/signup.jpg";

const cookies = new Cookies();

const initialState = {
	fullname: "",
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
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
		//console.log(form);
	}

	async function handleSubmit(e) {
		e.preventDefault();

		const { fullname, username, password, phoneNumber, avatarURL } = form;

		const { VITE_BACK_URL } = import.meta.env;
		const URL = `${VITE_BACK_URL}/auth`;

		const {
			data: { token, userId, hashedPassword }
		} = await axios.post(`${URL}/${isSignup ? "signup" : "login"}`, {
			username,
			password,
			fullname,
			phoneNumber,
			avatarURL
		});

		cookies.set("token", token);
		cookies.set("username", username);
		cookies.set("fullname", fullname);
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
								<label htmlFor="fullname">Full Name</label>
								<input
									type="text"
									name="fullname"
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
									type="text"
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
