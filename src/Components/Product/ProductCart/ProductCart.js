import React from 'react';
import classes from './ProductCart.module.css';
//import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
//import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded';

const productCart = (props) =>{
    let productCart = null;
    if(props.cantidad){
      productCart = (<div key={Math.random()} className={classes.ProductCart} >
        <span className={classes.Cursor} hidden={props.hiddenIcon}>
          <button  color="primary" onClick={props.removeProduct} style={{fontSize: '42px'}}  />
        </span>
        <span hidden={!props.hiddenIcon}>
          <button  color="primary" onClick={props.removeProduct} style={{fontSize: '42px'}}  />
        </span>
        <span key={Math.random()} className={classes.Descripcion}>{props.cantidad} x {props.nombre}</span>
      <span key={Math.random()} className={classes.Importe}>{props.moneda} {props.importe.toFixed(2)}</span>
      </div>);
    }
    return (
        productCart
      )
    }
export default productCart;