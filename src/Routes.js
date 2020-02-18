import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppliedRoute from './components/AppliedRoute';

// import Home from './containers/Home';
import NotFound from './containers/NotFound';
import Login from './containers/Login';
// import Signup from './containers/Signup';

export default ({ childProps }) => (
	<Switch>
		{/* changing the home route here to the login page */}
		<AppliedRoute path="/" exact component={Login} props={childProps} />
		{/* <AppliedRoute path="/login" exact component={Login} props={childProps} />
		<AppliedRoute path="/signup" exact component={Signup} props={childProps} /> */}
		{/* Finally, catch all unmatched routes */}
		<Route component={NotFound} />
	</Switch>
);
