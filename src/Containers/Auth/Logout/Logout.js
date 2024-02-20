import React, { Component } from 'react';
import { Navigate } from 'react-router';
import {connect} from 'react-redux';
import * as actions from '../../../Stored/Actions/index';

class Logout extends Component{

    componentDidMount(){
        //this.props.onclearPerfilRoles();
        this.props.onLogout();
        //this.props.onClearIncident();
    }

    render(){
        return(<Navigate to="/"></Navigate>);
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onLogout: () => dispatch(actions.logout()),
        //onclearPerfilRoles: () => dispatch(actions.clearPerfilRoles()),
        //onClearIncident: () => dispatch(actions.clearIncident())
    }
}

export default connect(null, mapDispatchToProps)(Logout);