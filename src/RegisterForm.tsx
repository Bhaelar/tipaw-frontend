import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import axios from "axios";

const RegisterForm = () => {
	const [revealed, setRevealed] = useState(true);
	const [checked, setChecked] = useState(false);
	const [pwdError, setPwdError] = useState("");
	const [pwd1Error, setPwd1Error] = useState("");
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phoneNumber: "",
		password: "",
		password1: "",
	});
	const [submitResponse, setSubmitResponse] = useState("");
	const reveal = () => {
		setRevealed(!revealed);
	};

	const { firstName, lastName, email, phoneNumber, password, password1 } =
		formData;

	const onChange = (e: any) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		if (e.target.name === "password") {
			const pattern =
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
			if (!pattern.test(e.target.value)) {
				setPwdError(
					"Enter a password of Minumum 8 characters, with atleast one uppercase letter, one number and one special character"
				);
			} else {
				setPwdError("");
			}
		}
		if (e.target.name === "password1") {
			if (e.target.value !== password) {
				setPwd1Error("Passwords don't match");
			} else {
				setPwd1Error("");
			}
		}
	};

	const onSelectClick = (e: any) => {
		setChecked(!checked);
		e.target.checked = checked;
	};

	const onSubmit = async (e: any) => {
		e.preventDefault();
		if (pwdError.length < 1 && pwd1Error.length < 1) {
			await axios({
				method: "post",
				url: "https://tipaw-backend.herokuapp.com/api/users",
				headers: {
					"content-type": "application/json",
				},
				data: formData,
			})
				.then(function (response) {
					setSubmitResponse("User registered successfully");
				})
				.catch(function (error) {
					setSubmitResponse("An error occurred");
				});
		}
	};
	return (
		<div className="register">
			<h2
				css={css`
				    font-family: 'zenon','serif';
				    color: #5acee8;
				    font-weight: 500;
				    font-size: 36px;
				    margin-bottom: 15px;
				     }
				`}
			>
				Register
			</h2>
			<h3
				css={css`
				    font-size: 18px;
				    font-weight: 600;
				    margin-top: 10px;
				    margin-bottom: 15px;
				     }
				`}
			>
				Join Tipaw today. It's free !
			</h3>
			<div
				css={css`
				    margin-bottom: 30px;
				     }
				`}
			>
				Are you a shelter, breeder, veterinarian or groomer?
				<a href="#">Click Here</a>
			</div>
			<div className="social-login">
				<button color="medium" type="button" className="google-login">
					<div
						css={css`
					   margin-right: 12px;
					   width: 20px;
					    font-size: 20px;
					    display: flex;
					    justify-content: center;
					     align-items: center;
				     }
				`}
					>
						<img src="https://tipaw.com/assets/google-icon-3SWGK4VN.svg" />
					</div>
					Signup with Google
				</button>
			</div>
			<div className="social-login">
				<button color="blue" type="button" className="facebook-login">
					<div
						css={css`
					   margin-right: 12px;
					   width: 20px;
					    font-size: 20px;
					    display: flex;
					    justify-content: center;
					     align-items: center;
				     }
				`}
					>
						<svg
							stroke="currentColor"
							fill="currentColor"
							stroke-width="0"
							viewBox="0 0 320 512"
							height="1em"
							width="1em"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
						</svg>
					</div>
					Signup with Facebook
				</button>
			</div>
			<div
				css={css`
				    width: 100%;
				    height: 1px;
				    background: #d7dae0;
				    margin: 20px 0;
				     }
				`}
			></div>
			<div
				css={css`
				    margin-top: 20px;
				     }
				`}
			>
				<form onSubmit={onSubmit}>
					<div className="input-field">
						<div className="input-label">
							Your First Name
							<div className="required">*</div>
						</div>
						<div className="text-field">
							<input
								name="firstName"
								className="input-class"
								value={firstName}
								onChange={onChange}
								required
							/>
						</div>
					</div>
					<div className="input-field">
						<div className="input-label">
							Your Last Name
							<div className="required">*</div>
						</div>
						<div className="text-field">
							<input
								name="lastName"
								className="input-class"
								value={lastName}
								onChange={onChange}
								required
							/>
						</div>
					</div>
					<div className="input-field">
						<div className="input-label">
							Your Email
							<div className="required">*</div>
						</div>
						<div className="text-field">
							<input
								name="email"
								type="email"
								className="input-class"
								value={email}
								onChange={onChange}
								required
							/>
						</div>
					</div>
					<div className="input-field">
						<div className="input-label">
							Your Phone Number
							<div className="required">*</div>
						</div>
						<div className="text-field">
							<input
								name="phoneNumber"
								className="input-class"
								value={phoneNumber}
								onChange={onChange}
								required
							/>
						</div>
					</div>
					<div className="input-field">
						<div className="input-label">
							Your Password
							<div className="required">*</div>
						</div>
						<div className="text-field">
							<input
								name="password"
								type={revealed ? "password" : "text"}
								className="input-class"
								value={password}
								onChange={onChange}
								required
							/>
							<div className="reveal-password" onClick={reveal}>
								{revealed ? (
									<svg
										aria-hidden="true"
										focusable="false"
										data-prefix="fas"
										data-icon="eye-slash"
										className="svg-inline--fa fa-eye-slash fa-w-20 "
										role="img"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 640 512"
									>
										<path
											fill="currentColor"
											d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"
										></path>
									</svg>
								) : (
									<svg
										aria-hidden="true"
										focusable="false"
										data-prefix="fas"
										data-icon="eye"
										className="svg-inline--fa fa-eye fa-w-18 "
										role="img"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 576 512"
									>
										<path
											fill="currentColor"
											d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
										></path>
									</svg>
								)}
							</div>
						</div>
						<div className="error">{pwdError}</div>
					</div>
					<div className="input-field">
						<div className="input-label">
							Confirm Your Password
							<div className="required">*</div>
						</div>
						<div className="text-field">
							<input
								name="password1"
								type={revealed ? "password" : "text"}
								className="input-class"
								value={password1}
								onChange={onChange}
								required
							/>
							<div className="reveal-password" onClick={reveal}>
								{revealed ? (
									<svg
										aria-hidden="true"
										focusable="false"
										data-prefix="fas"
										data-icon="eye-slash"
										className="svg-inline--fa fa-eye-slash fa-w-20 "
										role="img"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 640 512"
									>
										<path
											fill="currentColor"
											d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"
										></path>
									</svg>
								) : (
									<svg
										aria-hidden="true"
										focusable="false"
										data-prefix="fas"
										data-icon="eye"
										className="svg-inline--fa fa-eye fa-w-18 "
										role="img"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 576 512"
									>
										<path
											fill="currentColor"
											d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
										></path>
									</svg>
								)}
							</div>
						</div>
						<div className="error">{pwd1Error}</div>
					</div>
					<div className="input-field">
						<input
							type="checkbox"
							id="readTerms"
							name="readTerms"
							checked={checked}
							onChange={onSelectClick}
							required
						/>
						<label
							htmlFor="readTerms"
							className="input-checkbox-label"
						>
							I have read and accepted the{" "}
							<a target="_blank" href="#">
								general conditions of use
							</a>{" "}
							of Tipaw
						</label>
						<br />
					</div>
					<div className="input-field">
						<button color="yellow" type="submit" className="submit">
							Submit
						</button>
					</div>
					<div
						className="input-field"
						css={css`
						    text-align: center;
						    color: #616b77;
							  font-weight: 500;
							  font-size: 14px;
						     }
						`}
					>
						{submitResponse}
					</div>
					<div className="input-field">
						<div
							css={css`
								   width: 100%;
								    text-align: center;
								    margin-top: 12px;
							     }
							`}
						>
							<span>Already have an account?</span>
							<a
								css={css`
								       color: #5acee8;
									    font-weight: 700;
									    margin-left: 12px;
							     }
							`}
								href="#"
							>
								Login
							</a>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default RegisterForm;
