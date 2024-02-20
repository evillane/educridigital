import React, { Component } from 'react';
import {Route, Routes,Navigate} from 'react-router-dom'
import {connect} from 'react-redux';
import * as actions from './Stored/Actions/index';
import asyncComponent from './Hoc/asyncComponent/asyncComponent';
import Logout from './Containers/Auth/Logout/Logout';
import withRouter from './Hoc/withRouter/withRouter';
import Layout from '../src/Hoc/Layout/Layout';

const AsyncCartView = asyncComponent(() => {
  return import('../src/Containers/CartView/CartView');
});

const AsyncAuth = asyncComponent(() => {
  return import('../src/Containers/Auth/Auth');
});


const AsyncAbout = asyncComponent(() => {
  return import('../src/Containers/About/About');
});


class App extends Component {

  componentDidMount(){
    this.props.onCheckAuthState();
  }

  render() {
    let routes = (
      <Routes>
          <Route path='/About' element={<AsyncAbout/>}></Route>
          <Route path='/logout' element={<Logout/>}></Route>
          <Route path='/' exact element={<AsyncAuth/>}></Route>
          <Route path="/" element={<Navigate replace to="/auth" />} />
        </Routes>
    );

    if (this.props.isAuthenticated){
      routes = (
        <Routes>  
          <Route path='/CartView' element={<AsyncCartView/>}></Route>     
          <Route path='/About' element={<AsyncAbout/>}></Route>
          <Route path='/logout' element={<Logout/>}></Route>
          <Route path='/' exact element={<AsyncAuth/>}></Route>
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      )
    }


    return (
      <div >
        <Layout>
        {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    isAuthenticated: state.auth.token !==null,
    PerfilRoles: state?.perfilrol?.PerfilRoles
  }  
}
const mapDispatchToProps = dispatch => {
  return {
    onCheckAuthState: () => dispatch(actions.checkAuthState())
  }
}

// eslint-disable-next-line no-undef
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));