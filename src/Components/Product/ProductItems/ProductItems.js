import React from 'react';
import classes from './ProductItems.module.css';
import ProductItem from '../ProductItem/ProductItem';

  
const productItems = ( props ) => {
  return (
    <div key={Math.random()} className={classes.ProductItems}>
        {props.products.map((item, index) => {
       return (
        <ProductItem 
        key={index}
        foto = {item.foto}
        nombre ={item.nombre}
        Precio = {item.precio}
        moneda = {item.Moneda}
        onAdd = {() => props.addProduct(item.nombre)}
        onRemove = {() => props.removeProduct(item.nombre)}
        onRemoveEspecific ={() => props.removeProductEspecific(item.id)}
        >
        </ProductItem>
       )
     })}
    </div>
  )
}
export default productItems