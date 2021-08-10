import React, { Fragment } from 'react';

const Profile = ({ state, onTextChange, onMessageSubmit }) => {
	return (
		<Fragment>
			<form onSubmit={onMessageSubmit}>
				<h1>Your Profile</h1>
				{state.name && (
					<img
						className="w-50 mb-2 img-thumbnail"
						src={`https://ui-avatars.com/api/${state.name}?background=0D8ABC&color=fff`}
						alt=""
					/>
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
		</Fragment>
	);
};

export default Profile;
