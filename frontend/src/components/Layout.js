import React from 'react'
import Footer from './Footer';
import Header from './Header';

const Layout = (props) => {
  return (
    <div className="App text-sm text-justify">
      <Header />
      {props.children}
      <Footer />
    </div>
  )
}

export default Layout;
