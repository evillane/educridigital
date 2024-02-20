import * as actionTypes from '../Actions/actionTypes';
import {updateObject} from '../../Shared/utility';
import TypeButton from  '../../Shared/TypeButton';

const initialState={
    products : null,
    totalCantidad:0,
    totalPrice:0,
    moneda:"",
    error:false,
    building: false,
    hiddenBotonOrder:false,
    isValid:true
}

const addProduct = (state, action) => {
            ///const updateProduct = {[action.productName]: state.products[action.productName] +1}
            let productCart = state.productsCart ? state.productsCart.find(X => X.nombre === action.productName): null;
            let updateState=null;
            if(productCart)
            {
                productCart.cantidad += 1;
                updateState = {
                    products:state.products,
                    productsCart: state.productsCart,
                    totalCantidad: state.totalCantidad +1,
                    totalPrice: state.totalPrice + productCart.precio,
                    moneda : productCart.Moneda,
                    building: true
                }
            }
            else{
                productCart  = state.products.find(X => X.nombre === action.productName);
                productCart.cantidad += 1;
                updateState = {
                    products:state.products,
                    productsCart: state.productsCart ? [...state.productsCart,  productCart] : [productCart],
                    totalCantidad: state.totalCantidad +1,
                    totalPrice: state.totalPrice + productCart.precio,
                    moneda : productCart.Moneda,
                    building: true
                }
            }
        
            //const updateProducts = updateObject(state.productCart, product);
            return updateObject(state, updateState);
}

const removeProduct = (state, action) => {

    let productCart = state.productsCart ? state.productsCart.find(X => X.nombre === action.productName): null;
    let updateState = null;
    if(productCart)
    {
        const Remove =  productCart.cantidad === 0 ? true : false;

        if(!Remove){
            updateState = {
                products:state.products,
                productsCart: state.productsCart,
                totalCantidad: state.totalCantidad === 0 ? 0 : state.totalCantidad  - 1,
                totalPrice: state.totalPrice === 0 ? 0 : state.totalPrice - productCart.precio,
                moneda : productCart.moneda,
            };        
            productCart.cantidad -= productCart.cantidad === 0 ? 0 : 1;
         }

    }

    return updateObject(state, updateState);
}

const removeProductList = (state, action) => {
    let productCart = state.productsCart ? state.productsCart.find(X => X.nombre === action.productName): null;
    let updateState = null;
    if(productCart)
    {
        const Remove =  productCart.cantidad === 0 ? true : false;

        if(!Remove){
            updateState = {
                products:state.products,
                productsCart: state.productsCart,
                totalCantidad: state.totalCantidad === 0 ? 0 : state.totalCantidad  - productCart.cantidad,
                totalPrice: state.totalPrice === 0 ? 0 : state.totalPrice - (productCart.cantidad*productCart.precio)
            };        
            productCart.cantidad -= productCart.cantidad === 0 ? 0 : productCart.cantidad;
         }

    }
    return updateObject(state, updateState);
}

const setProduct = (state, action) => {
    return updateObject(state,{
        products:action.products,
        error:false,
        building: false,
        hiddenBotonOrder:false,
        typeButton:TypeButton.viewCart,
        isValid:true
    } ) ;
}

const typeOrderBoton = (state, action) => {
    return updateObject(state,{
        typeButton:action.typeButton
    } ) ;
}

const validFooterCart = (state, action) => {
    return updateObject(state,{
        isValid: action.isValid
    } ) ;
}

const cleanCartBuilder = (state, action) => {
    return updateObject(state,{
        typeButton:TypeButton.viewCart,
        products:null,
        error:false,
        building: false,
        productsCart:null,
        totalCantidad:0,
        totalPrice:0,
        moneda : "",
        hiddenBotonOrder:true,
        isValid:true
    } ) ;
}

const fetchProductFail = (state, action) => {
    return updateObject(state, {error:true});
}

const removeProductEspecific = (state, action) => {
    let updateState = null;
   state.products = state.products ? state.products.filter(X => X.id !== action.productName): null;
   

           updateState = {
               products:state.products,
               productsCart: null,
               totalCantidad: 0,
               totalPrice: 0
           };        

   return updateObject(state, updateState);
}

const reducer = (state= initialState, action) =>{
    switch(action.type){
        case (actionTypes.ADD_PRODUCT): return addProduct(state, action);
        case (actionTypes.REMOVE_PRODUCT): return removeProduct(state, action);
        case (actionTypes.REMOVE_PRODUCTLIST): return removeProductList(state, action);
        case (actionTypes.SET_PRODUCT): return setProduct(state, action);
        case (actionTypes.FETCH_PRODUCT_FAIL): return fetchProductFail(state, action);
        case(actionTypes.ACTIVATE_ORDER) : return typeOrderBoton(state,action);
        case(actionTypes.CLEAN_CARTBUILDER) : return cleanCartBuilder(state,action);
        case(actionTypes.VALID_FORMCONTACT) : return validFooterCart(state,action);
        case (actionTypes.REMOVE_PRODUCT_ESPECIFIC): return removeProductEspecific(state, action);
        default: return state;
    }
}

export default reducer;