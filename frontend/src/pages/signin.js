import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import UserForm from '../components/UserForm';
import { auth } from '../store/actions/auth';

const SignIn = props => {
  const { replace } = useHistory();
  const { loading, error, onSignIn, isAuthenticated } = props;
  useEffect(() => {
    document.title = 'Sign In — Pendemic desease';
    if (isAuthenticated) {
      replace('/news');
    }
  }, [isAuthenticated, replace]);

  const signIn = async (action) => {
    await onSignIn(action.variables, replace);
  }

  return (
    <React.Fragment>
      {loading && <p>Loading...</p>}
      {error && <p>Error signing in!</p>}
      <UserForm action={signIn} formType="signIn" />
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
    onSignIn: (data, cb) => dispatch( auth(data, cb, false,) )
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( SignIn );
