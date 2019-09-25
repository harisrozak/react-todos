import React, { Component } from "react";
import arrayMove from "array-move";
import Navbar from "./components/navbar.jsx";
import Form from "./components/form.jsx";
import TodoList from "./components/todo-list.jsx";
import config from "./config";
import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// main app class
class App extends Component {
	state = {
		appTitle: config.appTitle,
		alert: false,
		isLoggedIn: false,
		firestoreData: false,
		todos: [],
	};
	
	constructor( props ) {
		super( props );
		
		// set the main ref
		const db = firebaseApp.firestore();
		this.todosRef = db.collection( 'todos' );
	}
	
	componentDidUpdate( prevProps, prevState ) {		
		// if user has logged in to google
		if( prevProps.user !== this.props.user && this.props.user !== null ) {
			const userKey = this.props.user.email;
			const isLoggedIn = true;
			let alert = false;
			
			// do loading
			this.setState( { alert: config.loadingMessage } );
			
			// get the firestore data
			this.todosRef.doc( userKey ).get().then( doc => {
				const data = doc.data();				
				
				if( typeof data !== "undefined" ) {
					const todos = JSON.parse( data.content );
					const firestoreData = data;
					this.setState( { todos, alert, isLoggedIn, firestoreData } );	
				}
				else {
					// sync the existing todos if not empty
					if( this.state.todos.length === 0 ) {
						alert = config.noDataMessage;	
					}
					else {
						const dataToInsert = JSON.stringify( this.state.todos );
						const currentDate = this.getCurrentDate();
						
						this.pushToFirestore( {
							createdAt: currentDate,
							updatedAt: currentDate,
							content: dataToInsert,
						} );
					}
					
					this.setState( { alert, isLoggedIn } );						
				}
			} )
			.catch( error => {
				this.setState( { alert: config.errorFirebaseMessage } );
			} );		
		}
		
		// if user has logged out from google
		if( prevProps.user !== this.props.user && this.props.user === null  ) {
			const todos = config.defaultData;
			const isLoggedIn = false;
			const alert = false;
			
			this.setState( { todos, isLoggedIn, alert } );
		}
		
		// if state todos has updated while user has logged in
		if( prevState.todos !== this.state.todos && this.state.isLoggedIn === true ) {
			const dataToInsert = JSON.stringify( this.state.todos );
			const currentDate = this.getCurrentDate();
			let data = false;
			let prevContent = false;
			
			// it has the firestore data or not
			if( this.state.firestoreData ) {
				prevContent = this.state.firestoreData.content;
				data = {
					createdAt: this.state.firestoreData.createdAt,
					updatedAt: currentDate,
					content: dataToInsert,
				};
			}
			else {
				data = {
					createdAt: currentDate,
					updatedAt: currentDate,
					content: dataToInsert,
				};
			}
			
			// push to firestore 
			// only IF the local and the cloud data is different
			if( data.content !== prevContent ) {
				this.pushToFirestore( data );
			}
		}
		
		// do notification if currently has no todos
		if( prevState.todos !== this.state.todos && this.state.todos.length === 0 ) {
			this.setState( { alert: config.noDataMessage } );
		}
	}
	
	pushToFirestore( data ) {
		this.todosRef.doc( this.props.user.email ).set( data )
			.then(function() {
				console.log("Document successfully written!");
			})
			.catch(function(error) {
				console.error("Error writing document: ", error);
			});
	}
	
	getCurrentDate() {
		var currentDate = new Date();
		var date = currentDate.getDate();
		var month = currentDate.getMonth(); //Be careful! January is 0 not 1
		var year = currentDate.getFullYear();

		return date + "-" +(month + 1) + "-" + year;
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
		const { user, signInWithGoogle, signOut } = this.props;
		
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
					
					{
						user 
						? <p>Hello, { user.displayName }</p>
						: <p>Please sign in.</p>
					}
					{
						this.props.user 
						? <button onClick={ signOut }>Sign out</button>
						: <button onClick={ signInWithGoogle }>Sign in with Google</button>
					}
	  
				</div>
				
				
			</React.Fragment>	
		);
	}
}

// init the firebase
const firebaseApp = firebase.initializeApp( config.firebase );
const firebaseAppAuth = firebaseApp.auth();
const providers = {	googleProvider: new firebase.auth.GoogleAuthProvider() };

// export with firebase auth
export default withFirebaseAuth( { providers, firebaseAppAuth } ) ( App );