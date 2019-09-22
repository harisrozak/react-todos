import React, { Component } from "react";
import arrayMove from "array-move";
import Navbar from "./components/navbar.jsx";
import Form from "./components/form.jsx";
import TodoList from "./components/todo-list.jsx";

class App extends Component {
	state = {
		appTitle: "To Do List",
		alert: false,
		todos: [],
	};
	
	componentDidMount() {
		// set the todos
		const todos = [
			{ id: 0, value: "You can begin with inserting a new item", checked: false },	
			{ id: 1, value: "Or just delete this line :)", checked: true },
		];
		
		this.setState( { todos } );
	}
	
	handleInsert( dataToHandle ) {
		// must be contains any string
		if( dataToHandle !== '' ) {
			const newId = this.generateRamdomId( this.state.todos );
			const newData = [ { id: newId, value: dataToHandle, checked: false } ];
			const todos = newData.concat( this.state.todos );
			const alert = false;
			this.setState( { todos, alert } );
		}
		else {
			this.setState( { alert: "The item can't be empty, please insert the new one!" } );
		}	
	}
	
	handleDelete( indexToHandle ) {
		console.log(indexToHandle);
		const todos = this.state.todos.filter( ( item, index ) => index !== indexToHandle );
		this.setState( { todos } );
	}
	
	handleCheck( indexToHandle, statusAfterClick ) {
		const todos = [ ...this.state.todos ];
		const value = todos[ indexToHandle ].value;
		todos[ indexToHandle ] = { value: value, checked: statusAfterClick };
		this.setState( { todos } );
	}
	
	handleSort( sortedAttributes ) {
		const oldIndex = sortedAttributes.oldIndex;
		const newIndex = sortedAttributes.newIndex;
		const todos = arrayMove( this.state.todos, oldIndex, newIndex );
		this.setState( { todos } );
	}
	
	generateRamdomId( data ) {
		const id = '_' + Math.random().toString(36).substr(2, 9);
		const checkData = data.filter( item => id === item.id );
		const isUnique = checkData.length === 0 ? true : false;
		
		// return the id or do search again
		return isUnique ? id : this.generateRamdomId( data );
	}
	
	render() {
		return (
			<React.Fragment>
				<Navbar appTitle = { this.state.appTitle } />
				<div className="container my-3">
					<div className="col-md-8 offset-md-2">
						<Form 
							app = { this }
							onInsert = { this.handleInsert } 
							alert = { this.state.alert }
						/>
						<TodoList 
							app = { this }
							todos={ this.state.todos } 
							onDelete = { this.handleDelete }
							onCheck = { this.handleCheck }	
							onSort = { this.handleSort }
						/>						
					</div>
				</div>
			</React.Fragment>	
		);
	}
}

export default App;