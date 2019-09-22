import React from "react";

const Navbar = ( { appTitle } ) => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<div className="col-md-8 offset-md-2">
					<span className="navbar-brand text-center mb-0 h1">
						{ appTitle }
					</span>					
				</div>
			</div>
		</nav>		
	);
}

export default Navbar;