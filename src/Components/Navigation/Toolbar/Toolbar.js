import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import DrawerToggle from '../SlideDrawer/DrawerToogle/DrawerToggle';
import Avatar from '@mui/material/Avatar';

const toolbar = (props) =>
(
    <header className= {classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggledClick}></DrawerToggle>
        <div className = {classes.LogoMobile}>
            <div className = {classes.Logo}>
            <Logo></Logo>
            </div>
        </div>
        <nav className = {classes.Desktop} hidden = {!props.isAuth} >
            <div className= {classes.UserPhoto }>
                <div className = {classes.Foto}>
                    <Avatar 
                    alt="Usuario"
                    sx={{ width: 64, height: 64}}
                    src={ null }
                    />
                </div>
                <div className = {classes.User}>
                { props.fullName}
                </div>
            </div>
        </nav>
    </header>
)

export default toolbar;