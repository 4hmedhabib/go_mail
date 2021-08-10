import React from 'react';

const MessageBoxHeader = ({ state }) => {
	return (
		<div className="d-flex align-items-center">
			<img
				className="img-circle me-2"
				src={`https://ui-avatars.com/api/?background=fff&color=000&name=${state.name}`}
				alt=""
			/>
			<h5>{state.name}</h5>
		</div>
	);
};

export default MessageBoxHeader;
