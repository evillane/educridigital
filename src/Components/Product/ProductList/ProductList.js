import React from 'react';
import classes from './ProductList.module.css';
import ProductCart from '../ProductCart/ProductCart';
import Aux from '../../../Hoc/Aux2/Aux_';
//import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
//import KeyboardBackspaceRoundedIcon from '@material-ui/icons/KeyboardBackspaceRounded';
import {Navigate} from 'react-router-dom';

const productList = ( props ) => {

  let _productList = <Navigate to="/"></Navigate>;
//      <span className={classes.Tittle}>Atras</span>
  if (props.productsCart){
    const _productCart = props.productsCart.find(X => X.cantidad > 0);
    if (_productCart){
    const money = props.productsCart[0].Moneda;
    _productList = (<Aux>
    <div onClick = {props.goBack} className = {classes.goBack}>
      <button color="primary" style={{fontSize: '38px'}}></button>
      <span className={classes.Tittle}>Regresar</span>
    </div>
    <br></br>
    <div className={classes.ProductList}>
        {props.productsCart.map((item, index) => {
       return (
          <ProductCart 
          key = {index}
          nombre ={item.nombre}
          cantidad = {item.cantidad}
          moneda = {item.Moneda}
          importe = {item.precio * item.cantidad}
          removeProduct = {() => props.removeProduct(item.nombre)}
          hiddenIcon = {false}>
          </ProductCart>
        
       );
     })}
    </div>
    <span className={classes.TotalList}>Total: {money} {props.totalPrecio.toFixed(2)}</span><br/><br/><br/>
    <span className={classes.IconLeft} onClick={props.goBack}><div className={classes.Img}><button color="primary" style={{fontSize: '38px'}}></button><div className={classes.LetterDiv}>Ir a Atras</div></div></span>
    </Aux>);
    }
  }

  return (
    _productList
  )
}
export default productList