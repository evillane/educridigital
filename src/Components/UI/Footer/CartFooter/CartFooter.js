import React from 'react';
import classes from './CartFooter.css';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Tooltip } from '@material-ui/core';

const cartFooter = (props) =>{
  let asignedClass = null;
  if (props.Cantidad > 0 && props.isValid)
  {
    asignedClass = classes.CartFooter;
  } 
  /*
  else if(props.Cantidad > 0){
    asignedClass = classes.CartFooter;
  }*/
  else { asignedClass = classes.CartFooterDisabled;}

    return (
        <Tooltip title={props.order ? "Solicitar Pedido" : "Ver Pedido"}>
        <div onClick={props.viewCart} hidden={props.hiddenBotonOrder} className={asignedClass}>
          <span hidden={props.order} className = {classes.ColorIcon}>
          <ShoppingCartOutlinedIcon fontSize="large"/>
          </span>
    <span className={classes.Cantidad}>{props.Cantidad} ART. ({props.Moneda} {props.Total.toFixed(2)})</span>
          <span className = {classes.Next}>
          <NavigateNextIcon fontSize="large"/>
          </span>
        </div>
        </Tooltip>
      );
    }
    
export default cartFooter;