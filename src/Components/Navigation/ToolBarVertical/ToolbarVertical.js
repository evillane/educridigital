import React from 'react';
import classes from './ToolbarVertical.module.css';
import Navigationitems from '../NavigationItems/NavigationItems';

const toolbarVertical = (props) =>
(
    <div className= {classes.ToolbarVertical}>    
        <nav>
            <Navigationitems isAuthenticated = {props.isAuth}
            PerfilRoles = {props.PerfilRoles}
            ></Navigationitems>
        </nav>
    </div>
)

export default toolbarVertical;