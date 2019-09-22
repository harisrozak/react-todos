import React, { Component } from "react";

class Form extends Component {
	constructor( props ) {
		super( props );
		
		// init the state
		this.state = {
			value: ''
		}
		
		// createRef for input
		this.input = React.createRef();
	}	
	
	handleValue( event ) {
		this.setState( { value: event.target.value } );
	}
	
	handleSubmit( event ) {
		const { app, onInsert } = this.props;		
		const doPropsOnInsert = onInsert.bind( app, this.state.value );
		
		// do props onInsert
		doPropsOnInsert();
		
		// do empty value
		this.setState({value: ''});
		
		// set cursor focus on input
		this.input.current.focus();
		
		// prevent reloading after submit
		event.preventDefault();
	}
	
	render() {
		return (
			<form onSubmit={ this.handleSubmit.bind( this ) }>
				<div className="form-row">
					<div className="col-10">
						<input 
							type = "text" 
							className = "form-control" 
							placeholder = "Type your todo here" 
							value = { this.state.value } 
							onChange = { this.handleValue.bind( this ) }
							ref = {this.input}
						/>
					</div>
					<div className="col-2">
						<input type="submit" value="INS" className="btn btn-primary w-100" />
					</div>
				</div>
				{ this.props.alert && (
					<div className="alert alert-danger mt-3">{ this.props.alert }</div>						
				) }
			</form>
		);
	}
}

export default Form;