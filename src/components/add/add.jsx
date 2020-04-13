import React, { useState, useContext, useEffect } from "react";
import useInputState from "../../hooks/useInputState";
import { AuthContext, DispatchContext } from "../../contexts/userContext";
import axios from "axios";
import { add } from "../../utils/routes";
import styles from "./add.module.css";
import CreatableSelect from "react-select/creatable";
import Input from "./../common/input";
import { toast } from "react-toastify";
import { profile } from "../../utils/routes";
import { MdVerifiedUser } from "react-icons/md";

const defaultOptions = [
	{ value: "Web", label: "Web" },
	{ value: "Mobile", label: "Mobile" },
	{ value: "ML", label: "ML" },
	{ value: "Cloud", label: "Cloud" },
	{ value: "Ar/Vr", label: "Ar/Vr" }
];
export default function AddForm(props) {
	let Data = useContext(AuthContext);
	const Dispatch = useContext(DispatchContext);
	const [name, handleName] = useInputState("");
	const [city, handleCity] = useInputState("");
	const [state, handleState] = useInputState("");
	const [country, handleCountry] = useInputState("");
	const [size, handleSize] = useInputState("");
	const [webLink, handleWeb] = useInputState("");
	const [fbLink, handleFB] = useInputState("");
	const [instaLink, handleInsta] = useInputState("");
	const [twitterLink, handleTwitter] = useInputState("");
	const [mediumLink, handleMedium] = useInputState("");
	const [githubLink, handleGit] = useInputState("");
	const [youtubeLink, handleYT] = useInputState("");
	const [linkedinLink, handleIN] = useInputState("");
	const [option, setOption] = useState({ selectedOption: [] });
	const [verify, setVerify] = useState(false);
	const [isLoading, setLoading] = useState(false);
	useEffect(() => {
		setLoading(true);
		const fetchData = async () => {
			try {
				const token = Data.token;
				let user = await axios.get(profile, {
					headers: {
						"x-auth-token": token
					}
				});
				setVerify(user.data.data.isVerified);
				setLoading(false);
			} catch (error) {
				console.log(error.response);
			}
		};
		fetchData();
	}, []);

	const handleChangeDomain = option => {
		console.log(option);
		setOption({ selectedOption: option });
	};

	const handleSubmit = async e => {
		e.preventDefault();
		let domains = [];
		let all = option.selectedOption;
		all.map(item => {
			return domains.push(item.value);
		});
		let body = {
			name,
			city,
			state,
			country,
			domains,
			size,
			webLink,
			fbLink,
			instaLink,
			twitterLink,
			linkedinLink,
			mediumLink,
			githubLink,
			youtubeLink
		};
		console.log(body);
		try {
			const token = Data.token;
			await axios.post(add, body, {
				headers: {
					"x-auth-token": token
				}
			});
			let user = await axios.get(profile, {
				headers: { "x-auth-token": token }
			});
			console.log(user);
			Dispatch({
				type: "ADD",
				user: {
					id: user.data.data._id,
					isAdmin: user.data.data.isAdmin,
					isSubmitted: user.data.data.isSubmitted,
					name: user.data.data.name,
					email: user.data.data.email
				},
				token: Data.token
			});
			props.history.push("/profile");
			toast.success("DSC added successfully");
		} catch (error) {
			toast.error(error.response.data.message);
		}
	};

	console.log(Data);

	return (
		<div className="fluid-conatiner">
			{isLoading ? (
				<div className={`col-12 text-center ${styles.load}`}>
					<img
						className="img-fluid"
						src="./assets/images/load.gif"
						alt=""
					/>
				</div>
			) : (
				<div className="container">
					{verify ? (
						<div className="col-lg-8 mx-auto">
							<div className="card mt-5">
								<div
									className={`card-header p-3 ${styles.head}`}
								>
									Community Details
								</div>
								<div className="card-body">
									<form>
										<div className="form-group">
											<Input
												name="Name"
												value={name}
												onChange={handleName}
												placeholder="Name"
											/>
										</div>
										<div className="form-row">
											<div className="col-md-6">
												<Input
													name="City"
													value={city}
													onChange={handleCity}
													placeholder="City"
												/>
											</div>
											<div className="col-md-6">
												<Input
													name="State"
													value={state}
													onChange={handleState}
													placeholder="State"
												/>
											</div>
										</div>
										<div className="form-row">
											<div className="col-md-6">
												<Input
													name="Country"
													value={country}
													onChange={handleCountry}
													placeholder="Country"
												/>
											</div>
											<div className="col-md-6">
												<Input
													name="Size"
													value={size}
													onChange={handleSize}
													type="number"
													placeholder="Size"
												/>
											</div>
										</div>
										<div
											className="col-10 mx-auto mb-3"
											styles={styles.domain}
										>
											<CreatableSelect
												value={option.selectedOption}
												isMulti
												onChange={handleChangeDomain}
												options={defaultOptions}
												closeMenuOnSelect={false}
												placeholder="Domain"
											/>
										</div>
										<div className="form-group">
											<div className="form-row">
												<div className="col-md-6">
													<Input
														name="Website"
														value={webLink}
														onChange={handleWeb}
														placeholder="Website "
													/>
												</div>
												<div className="col-md-6">
													<Input
														name="Facebook"
														value={fbLink}
														onChange={handleFB}
														placeholder="Facebook"
													/>
												</div>
												<div className="col-md-6">
													<Input
														name="Instagram"
														value={instaLink}
														onChange={handleInsta}
														placeholder="Instagram"
													/>
												</div>
												<div className="col-md-6">
													<Input
														name="Twitter"
														value={twitterLink}
														onChange={handleTwitter}
													/>
												</div>
												<div className="col-md-6">
													<Input
														name="Linked In"
														value={linkedinLink}
														onChange={handleIN}
													/>
												</div>
												<div className="col-md-6">
													<Input
														name="Medium"
														value={mediumLink}
														onChange={handleMedium}
													/>
												</div>
												<div className="col-md-6">
													<Input
														name="Github"
														value={githubLink}
														onChange={handleGit}
													/>
												</div>
												<div className="col-md-6">
													<Input
														name="YouTube"
														value={youtubeLink}
														onChange={handleYT}
													/>
												</div>
											</div>
										</div>
										<div className="text-center">
											<button
												type="submit"
												className={`col-lg-6 col-sm-6 col-md-6 btn btn-primary mx_auto ${styles.add}`}
												onClick={handleSubmit}
											>
												Add Community
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					) : (
						<div className="text-center mt-5">
							<MdVerifiedUser
								style={{ fontSize: 120, color: "#F9C836" }}
							/>
							<br />
							<br />
							<h2>Please verify your account.</h2>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
