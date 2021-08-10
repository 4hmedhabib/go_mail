import React from 'react';

const MessageBox = ({ chat, state }) => {
	return chat.map(({ name, message }, index) => (
		<div key={index} className={`relativer d-flex mb-2 w-100 ${name === state.name ? '' : 'flex-row-reverse'} `}>
			<div className="me-2">
				<img
					className="img-circle"
					src={`https://ui-avatars.com/api/?name=${message && name === state.message && state.name
						? state.name
						: name}background=0D8ABC&color=fff`}
					alt=""
				/>
			</div>
			<div className={`card  w-50 me-2 ${name === state.name ? 'bg-light' : 'bg-primary text-light'}`}>
				<div className="card-body ">
					<p className="card-text">{message} </p>
				</div>
			</div>
		</div>
	));
};

export default MessageBox;
