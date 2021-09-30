import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Layout from '../components/Layout';
import { authCheckState } from '../store/actions/auth';
import LandingPage from './landing';
import NewsPage from './news';
import MyNews from './mynews';
import SignUp from './signup';
import SignIn from './signin';
import Favorites from './favorites';
import AddNews from './add';
import SingleNews from './single';
import EditNews from './edit';
import CovidDataForm from '../components/CovidDataForm';

const Pages = (props) => {
  const { onTryAutoSignup, isAuthenticated } = props;
  useEffect(() => {
    onTryAutoSignup();
  })
  return (
    <Router>
      <Layout>
        <Route exact path="/" component={LandingPage} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <PrivateRoute isAuthenticated={isAuthenticated} exact path="/news" component={NewsPage} />
        <PrivateRoute isAuthenticated={isAuthenticated} path="/mynews" component={MyNews} />
        <PrivateRoute isAuthenticated={isAuthenticated} path="/favorites" component={Favorites} />
        <PrivateRoute isAuthenticated={isAuthenticated} path="/news/:id" component={SingleNews} />        
        <PrivateRoute isAuthenticated={isAuthenticated} path="/add" component={AddNews} />
        <PrivateRoute isAuthenticated={isAuthenticated} path="/edit/:id" component={EditNews} />
        <PrivateRoute isAuthenticated={isAuthenticated} path="/today" component={CovidDataForm} />
      </Layout>
    </Router>
  )
}

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( authCheckState() )
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( Pages );
