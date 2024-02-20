import React from 'react';
import classes from './ProductItem.module.css';
//import AddCircleIcon from '@material-ui/icons/AddCircle';
//import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
//import { Tooltip } from '@material-ui/core';

const productItem = (props) =>{

    return (
      <div key={Math.random()} className={classes.ProductItem}>
      <img key={Math.random()} onClick={props.onRemoveEspecific} className={classes.Boton}
        src = {props.foto}
        alt = {props.nombre} width= '150px' height = '150px'
        />
      <div key={Math.random()} className={classes.bodyProduct}>
      <span className={classes.bodyProductName} key={Math.random()}>{props.nombre}</span>
      <br/>
      <span key={Math.random()}>{props.moneda} {props.Precio.toFixed(2)}</span>
      </div>
      <div key={Math.random()} className = {classes.Boton}>
      
            <span key={Math.random()} onClick={props.onRemove}>
            </span>
            <span  key={Math.random()} onClick={props.onAdd}>
            </span>
      </div>
    </div>
      )
    }
export default productItem;