import React, { useState, useEffect, useRef, Fragment } from 'react';
import io from 'socket.io-client';
import Profile from './components/Profile/Profile';
import { MessageBox, MessageBoxHeader } from './components/MessageBox/';
import './App.css';
import Header from './components/Header/Header';

function App() {
	const [ state, setState ] = useState({
		message: '',
		name: ''
	});
	const [ chat, setChat ] = useState([]);

	const socketRef = useRef();

	useEffect(
		() => {
			socketRef.current = io.connect('http://localhost:4000');

			socketRef.current.on('message', ({ name, message }) => {
				setChat([ ...chat, { name, message } ]);
			});
			return () => socketRef.current.disconnect();
		},
		[ chat ]
	);

	const onTextChange = (e) => {
		setState({ ...state, [e.target.name]: e.target.value });
	};

	const onMessageSubmit = (e) => {
		const { name, message } = state;
		socketRef.current.emit('message', { name, message });
		e.preventDefault();
		setState({ message: '', name });
	};

	return (
		<Fragment>
			<Header />
			<div className="container">
				<div className="row">
					<div className="col-md-4 col-sm-4 col-12 text-center">
						<Profile
							state={state}
							chat={chat}
							onTextChange={onTextChange}
							onMessageSubmit={onMessageSubmit}
						/>
					</div>
					{chat.length > 0 && (
						<div className="col-md-7 col-sm-8 col-12 mt-3">
							<div className="card">
								{state.name && (
									<div className="card-header  bg-secondary text-light">
										<MessageBoxHeader state={state} />
									</div>
								)}
								<div className="card-body">
									<MessageBox chat={chat} state={state} />
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</Fragment>
	);
}

export default App;
