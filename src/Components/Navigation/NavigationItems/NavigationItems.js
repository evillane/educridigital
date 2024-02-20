import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
//import {fnGetValidateRol} from '../../../Shared/utility';
//import { VpnKeyRounded,LockOpenRounded,WcOutlined,PermContactCalendarOutlined} from '@mui/material';

const navigationItems = ( props ) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link='/About'><p>Acerca de Nosotros</p></NavigationItem>
  { !props.isAuthenticated ? <NavigationItem link='/' exact="true"><p>  Autenticar</p></NavigationItem>
  :<NavigationItem link='/logout'><p>Cerrar Sesión</p></NavigationItem>
  } 
  { props.isAuthenticated ? <NavigationItem link='/CartView'><p>Productos</p></NavigationItem> : null}
  </ul>
  )
}
export default navigationItems
