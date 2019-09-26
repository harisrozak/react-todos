import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStream } from '@fortawesome/free-solid-svg-icons';

class Navbar extends Component {
	render() {
		const { appTitle, user, signInWithGoogle, signOut } = this.props;
		
		return (
			<nav className="navbar navbar-light bg-light">
				<div className="container">
					<div className="col-md-8 offset-md-2">
						<div className="row">
							<div className="col">
								<span className="navbar-brand mb-0 h1">
									<FontAwesomeIcon icon={ faStream } />
									<span className="ml-2">{ appTitle }</span>
								</span>
							</div>					
							<div className="col align-self-end text-right">							
								{
									user 
									? <span className="navbar-text pr-3">Hello, { user.displayName }</span>
									: <span className="navbar-text"></span>
								}
								{
									user 
									? <button className="btn btn-dark" onClick={ signOut }>Sign Out</button>
									: <button className="btn btn-dark" onClick={ signInWithGoogle }>Sign In with Google</button>
								}
							</div>	
									
						</div>
					</div>
					
						
				</div>
			</nav>		
		);
	}
}

export default Navbar;