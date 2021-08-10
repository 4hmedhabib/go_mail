import React, { useState, useEffect, useRef, Fragment } from 'react';
import io from 'socket.io-client';
import Profile from './components/Profile/Profile';
import MessageBox from './components/MessageBox/MessageBox';
import './App.css';

function App() {
	const [ state, setState ] = useState({
		message: '',
		name: ''
	});
	const [ chat, setChat ] = useState([
		{
			message: 'adsffffffff',
			name: 'Ahmed'
		}
	]);

	const socketRef = useRef();

	useEffect(
		() => {
			socketRef.current = io.connect('http://localhost:4000');
			console.log(socketRef.current);
			socketRef.current.on('message', ({ name, message }) => {
				setChat([ ...chat, { name, message } ]);
			});
			return () => socketRef.current.disconnect();
		},
		[ chat ]
	);

	console.log(chat);

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
			<div className="container">
				<div className="row">
					<div className="col-md-4 col-sm-12 text-center">
						<Profile state={state} onTextChange={onTextChange} onMessageSubmit={onMessageSubmit} />
					</div>
					<div className="col-md-7 col-sm-12 p-5">
						<MessageBox chat={chat} state={state} />
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export default App;
