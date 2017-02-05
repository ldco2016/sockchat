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

		}
	}

	componentWillMount(){
		this.socket = io('http://localhost:3000');
		this.socket.on('connect', this.connect.bind(this));
	}

	connect(){
		this.setState({status: 'connected'});
		console.log('Connected: '+this.socket.id);
	}

	render(){
		return(
			<div className="row">
				<div className="col-md-4">
					<UserList />
				</div>
				<div className="col-md-8">
					<MessageList />
					<MessageForm />
				</div>
			</div>
		)
	}
}