import React from 'react';
import MuniLogo from '../../Assets/img/Logo.png';
import classes from './Logo.module.css';

const logo = () => (
<div className= {classes.Logo} >
    <img src={MuniLogo} alt="Municipalidad Porvenir"/>
</div>
) 

export default logo;