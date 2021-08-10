import React, { Fragment } from 'react';

const Profile = ({ state, onTextChange, onMessageSubmit }) => {
	return (
		<div className="card  mt-3">
			<div className="card-header bg-secondary rou" />
			<div className="card-body">
				<form onSubmit={onMessageSubmit}>
					{!state.name && <h1>Your Profile</h1>}
					{state.name && (
						<Fragment>
							<img
								className="w-70  mb-2 img-thumbnail"
								src={`https://ui-avatars.com/api/?name=${state.name}?background=0D8ABC&color=fff`}
								alt={state.name}
							/>
							<p className="fw-bold">{state.name}</p>
						</Fragment>
					)}

					<div className="mb-3">
						<input
							type="text"
							className="form-control"
							id="name"
							name="name"
							value={state.name}
							onChange={(e) => onTextChange(e)}
							placeholder="Full Name"
							required
						/>
					</div>

					<div className="mb-3">
						<input
							type="text"
							className="form-control"
							id="message"
							name="message"
							placeholder="Message"
							required
							value={state.message}
							onChange={(e) => onTextChange(e)}
						/>
					</div>
					<button type="submit" className="btn btn-primary">
						Send Message
					</button>
				</form>
			</div>
		</div>
	);
};

export default Profile;
