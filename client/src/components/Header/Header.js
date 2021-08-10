import React, { Fragment } from 'react';

const Header = () => {
	return (
		<Fragment>
			<nav className=" navbar-dark bg-dark  p-3">
				<div className="container text-light text-center fw-bold">
					<h2>
						<i class="bi bi-chat-right-text" /> Tiigsi Dev Chat
					</h2>
				</div>
			</nav>
		</Fragment>
	);
};

export default Header;
