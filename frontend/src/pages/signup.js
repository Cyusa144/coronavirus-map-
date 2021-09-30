import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

import UserForm from '../components/UserForm';
import { auth } from '../store/actions/auth';

const SignUp = props => {
  const { replace } = useHistory();
  const { loading, error, isAuthenticated } = props;
  useEffect(() => {
    document.title = 'Sign Up — Pandemic desease';
    if(isAuthenticated) {
      replace('/news')
    }
  }, [isAuthenticated, replace]);

  const signUp = async (action) => {
    await props.onSignUp(action.variables, replace, true);
  } 

  return (
    <React.Fragment>
      {loading && <p>Loading...</p>}
      {error && <p>Error creating an account!</p>}
      <UserForm action={signUp} formType="signup" />
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    loading: state.auth.loading,
    error: state.auth.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSignUp: (data, cb, isSignup) => dispatch( auth(data, cb, isSignup) )
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( SignUp );
