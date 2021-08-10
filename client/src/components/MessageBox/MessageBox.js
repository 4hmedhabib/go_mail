import React, { Fragment, useState } from 'react';

const MessageBox = ({ chat, state }) => {
	return chat.map(({ name, message }, index) => (
		<Fragment>
			<div key={index} className={`d-flex mb-2 w-100 ${name === state.name ? '' : 'flex-row-reverse'} `}>
				<div className="me-2">
					<img
						className="img-circle"
						src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff`}
						alt=""
					/>
				</div>
				<div className={`card  w-50 me-2 ${name === state.name ? 'bg-light' : 'bg-primary text-light'}`}>
					<div className="card-body ">
						<p className="card-text">{message}</p>
					</div>
				</div>
			</div>
		</Fragment>
	));
};

export default MessageBox;
