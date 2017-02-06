import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import MessageList from './Messages/MessageList';
import MessageForm from './Messages/MessageForm';
import UserList from './Users/UserList';
import UserForm from './Users/UserForm';



export default class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			status: 'disconnected',
			messages: [{
				timeStamp: Date.now,
				text: "Welcome to SockChat!"
			}],
			users: [],
			user: ''
		}
	}

	componentWillMount(){
		this.socket = io('http://localhost:3000');
		this.socket.on('connect', this.connect.bind(this));
		this.socket.on('messageAdded', this.onMessageAdded.bind(this));
	}

	connect(){
		this.setState({status: 'connected'});
		console.log('Connected: '+this.socket.id);
	}

	disconnect(){
		this.setState({status: 'disconnected'});
	}

	onMessageAdded(message){
		this.setState({messages: this.state.messages.concat(message)});
	}

	emit(eventName, payload){
		this.socket.emit(eventName, payload);
	}

	render(){
		console.log(this.state.messages);
		return(
			<div className="row">
				<div className="col-md-4">
					<UserList {...this.state} />
				</div>
				<div className="col-md-8">
					<MessageList {...this.state} />
					<MessageForm {...this.state} emit={this.emit.bind(this)} />
				</div>
			</div>
		)
	}
}