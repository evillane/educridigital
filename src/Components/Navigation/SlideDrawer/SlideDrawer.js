import React from 'react';
import Navigationitems from '../NavigationItems/NavigationItems';
import classes from './SlideDrawer.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../Hoc/Aux2/Aux_';
import Avatar from '@mui/material/Avatar';

const slideDrawer = (props) => {
    let atachedClass = [classes.SideDrawer, classes.Close];

    if (props.open){
        atachedClass = [classes.SideDrawer, classes.open];
    }

    return(
        <Aux>
            <Backdrop show ={props.open} clicked = {props.closed}></Backdrop>
            <div className= {atachedClass.join(' ')} onClick = {props.closed}> 
                <div hidden = {!props.isAuth}>
                <div className = {classes.Logo}>
                    <Avatar 
                    alt="Usuario"
                    sx={{ width: 64, height: 64}}
                    src={  null  }
                    />
                <div className={classes.User}>
                { props.fullName}
                </div>
                </div>
                </div>
                <a className={classes.Facebook} href='https://www.facebook.com/Gerencia-de-Seguridad-Ciudadana-El-Porvenir-121442471952001/' target="_blank" rel="noopener noreferrer">
                </a>
                <br></br>
                <nav>
                    <Navigationitems isAuthenticated = {props.isAuth}
                    PerfilRoles = {props.PerfilRoles}></Navigationitems>
                </nav>
            </div>
        </Aux>
    );
}

export default slideDrawer;
 
