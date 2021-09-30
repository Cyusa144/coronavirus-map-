import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UserForm = props => {
  const [values, setValues] = useState();

  const onChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <div className="flex space-y-6 flex-col items-center md:my-6 p-4 bg-gray-300 md:rounded shadow mx-auto w-full md:w-1/2">
      {props.formType === 'signup' ? <div>
        <h2 className="text-xl font-medium text-center text-blue-700">Create a New Account</h2>
        <p className="mt-2 text-sm">Come to get news about the pandemic. Already have an account? <Link className="text-blue-600" to="/signin">Sign in here</Link></p>
      </div> : <div>
        <h2 className="text-xl font-medium text-center text-blue-700">Welcome</h2>
        <p className="mt-2 text-sm">First time? <Link className="text-blue-600" to="/signup">Join</Link></p>
        </div>}
      <form className="space-y-4 w-full"
        onSubmit={event => {
          event.preventDefault();
          props.action({
            variables: {
              ...values
            }
          });
        }}
      >
        {props.formType === 'signup' && (
          <React.Fragment>
            <div className="flex space-y-1 flex-col items-start w-full">
              <label htmlFor="">First Name</label>
              <input placeholder="first name" className="py-2 px-1 rounded-sm focus:outline-none w-full" onChange={onChange} required type="text" name="firstName" />
            </div>
            <div className="flex space-y-1 flex-col items-start w-full">
              <label htmlFor="">Last Name</label>
              <input placeholder="last name" className="py-2 px-1 rounded-sm focus:outline-none w-full" onChange={onChange} required type="text" name="lastName" />
            </div>
            <div className="flex space-y-1 flex-col items-start w-full">
              <label htmlFor="username">Username:</label>
              <input className="py-2 px-1 rounded-sm focus:outline-none w-full"
                required
                type="text"
                name="username"
                placeholder="username"
                onChange={onChange}
              />
            </div>
          </React.Fragment>
        )}
        <div className="flex space-y-1 flex-col items-start w-full">
          <label htmlFor="email">Email{props.formType !== 'signup' && ' or Username'}:</label>
          <input className="py-2 px-1 rounded-sm focus:outline-none w-full"
            required
            type={props.formType !== 'signup' ? 'text' : 'email'}
            name={props.formType !== 'signup' ? 'login' : 'email'}
            placeholder="Email"
            onChange={onChange}
          />
        </div>
        <div className="flex space-y-1 flex-col items-start w-full">
          <label htmlFor="password">Password:</label>
          <input className="py-2 px-1 rounded-sm focus:outline-none w-full"
            required
            type="password"
            name="password"
            placeholder="Password"
            onChange={onChange}
          />
        </div>
        <button className="bg-blue-600 px-16 rounded text-gray-200 font-medium text-xl tracking-wide hover:opacity-75 py-4" type="submit">{props.formType === 'signup' ? 'Join' : 'Sign In'}</button>
      </form>
    </div>
  );
};

export default UserForm;
