import React,{Component} from 'react';
import classes from './About.module.css';
import Aux from '../../Hoc/Aux2/Aux_';
import {connect} from 'react-redux';

class About extends Component{

    render(){
        const autenticado = this.props?.isAuthenticated ? "Autenticado":  "";
        return (<Aux>
            <div className = {classes.About}>
            <span className = {classes.Letter}>
            Educri {autenticado}</span>
        </div></Aux>);
    }

}

const mapStateToProps = state => {
    return {
        PerfilRoles: state?.perfilrol?.PerfilRoles,
        isAuthenticated: state.auth.token !== null,
    }
}

export default connect(mapStateToProps, null)(About);