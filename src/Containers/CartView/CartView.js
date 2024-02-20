import React, { Component } from 'react';
import axios from '../../Axios';
import withErrorHanlder from '../../Hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import ProductItems from '../../Components/Product/ProductItems/ProductItems';
import Aux from '../../Hoc/Aux2/Aux_';
import * as action from '../../Stored/Actions/index';
import TypeButton from '../../Shared/TypeButton';

export class CartBuilder extends Component{

componentDidMount(){
    //this.props.onProductInit(this.props.token);
    this.props.onProductInit(null);
    //this.props.onCleanOrder();
    this.props.onTypeOrdenButton(TypeButton.viewCart);
}

render(){

    let productsList =  <p>No se encontraron elementos.</p>;
    if (this.props.products){
        productsList = (<Aux>
        <ProductItems products = {this.props.products}
        addProduct = {this.props.onProductAdded}
        removeProduct = {this.props.onProductRemoved}
        removeProductEspecific = {this.props.onRemoveProductEspecific}
        />
        </Aux>);
    }
            return (
               productsList
            );
        }
}

const mapStateProps = state =>{
    return {
        products:state.cartBuilder.products,
        token: state.auth.token,
        error: state.cartBuilder.error
        ,isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchedProps = dispatch =>{
    return{
        onProductAdded: (productName) => dispatch(action.addProduct(productName)),
        onProductRemoved: (productName) => dispatch(action.reomoveProduct(productName)),
        onTypeOrdenButton: (typeButton) => dispatch(action.typeOrderBoton(typeButton)),
        onProductInit: (token) => dispatch(action.initProducts(token)),
        onRemoveProductEspecific: (key) => dispatch(action.removeProductEspecific(key))
    }
}
export default connect(mapStateProps, mapDispatchedProps)(withErrorHanlder(CartBuilder, axios));