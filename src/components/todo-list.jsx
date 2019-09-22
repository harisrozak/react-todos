import React, { Component } from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';

const SortableItem = SortableElement( ( { indexToHandle, app, todo, onDelete, onCheck } ) => {
	const statusAfterClick = todo.checked ? false : true;
	let className = "alert alert-secondary bg-white todo-list-item";
	className += todo.checked ? ' checked' : '';
		
	return (
		<div className={ className }>
			<FontAwesomeIcon icon={ faGripVertical } className="list-item-grip" />
			<span className="list-item-value">{ todo.value }</span>
			<span className="btn-container">
				<button 
					className = "btn btn-info btn-sm"
					onClick = { onCheck.bind( app, indexToHandle, statusAfterClick ) }
				>SEL</button>
				<button 
					className = "btn btn-danger btn-sm ml-2"
					onClick = { onDelete.bind( app, indexToHandle ) }
				>DEL</button>
			</span>
		</div>
	)
} );

const SortableList = SortableContainer( ( { app, todos, onDelete, onCheck } ) => {
	return (
		<div className="my-3">
			{ todos.map( ( todo, index ) => (
				<SortableItem 
					key = { todo.id }
					index = { index } // for sorting purpose
					indexToHandle = { index } // for action delete and others
					app = { app }
					todo = { todo }
					onDelete = { onDelete }
					onCheck = { onCheck }										
				/>
			) ) }
		</div>
	)
} );

class TodoList extends Component {	
	render() {
		const { app, todos, onDelete, onCheck, onSort } = this.props;
		return (
			<SortableList 
				app = { app } 
				todos = { todos } 
				onDelete = { onDelete } 
				onCheck = { onCheck } 
				onSortEnd = { onSort.bind( app ) } 
			/>
		)
	}
}

export default TodoList;