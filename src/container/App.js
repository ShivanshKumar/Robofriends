import React, { Component } from 'react';
import CardList from '../component/CardList';
import SearchBox from '../component/SearchBox';
import './App.css';
import Scroll from '../component/Scroll';
import ErrorBoundary from '../component/ErrorBoundary';

class App extends Component{
	constructor(){
		super();
		this.state = {
			robots: [],
			searchfield: ''
		}
	}
	
	onSearchBox=(event)=>{
		this.setState({searchfield: event.target.value});
	}

	componentDidMount(){
		fetch(`https://jsonplaceholder.typicode.com/users`)
		.then(response=> response.json())
		.then(user=>this.setState({robots: user}))
	}

	render(){	
		const {robots, searchfield} = this.state;
		const filteredRobots = robots.filter( robot =>{
		return robot.name.toLowerCase().includes(searchfield.toLowerCase())
		});		
		return (!robots.length)?
			(<h1>Loading</h1>)
			:
			(<div className = 'tc'>
				<h1 className='f1'>RoboFriends</h1>
				<SearchBox  searchvalue = {this.onSearchBox}/>
				<Scroll>
					<ErrorBoundary>
						<CardList robots = {filteredRobots} />
					</ErrorBoundary>
				</Scroll>
			</div>
		);

	};

}

export default App;