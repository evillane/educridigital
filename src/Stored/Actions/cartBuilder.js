import * as actionTypes from './actionTypes';
import axios from '../../Axios';

export const addProduct = (name)  =>{
    return {
        type:actionTypes.ADD_PRODUCT,
        productName:name
    }
}

export const reomoveProduct = (name)  =>{
    return {
        type:actionTypes.REMOVE_PRODUCT,
        productName:name
    }
}

export const removeProductList = (name) => {
    return{
        type:actionTypes.REMOVE_PRODUCTLIST,
        productName:name
    }
}

export const errorProducts = (error) =>{
    return {
        type: actionTypes.FETCH_PRODUCT_FAIL
        ,error: error
    };
}

export const setProducts = (products) =>{
    return {
        type: actionTypes.SET_PRODUCT,
        products: products
    };
}

export const initProducts = (token = null) =>{
    return dispatch => {
        let queryParams = '';
        if(token){
         queryParams = '?auth=' + token;
        }

        axios.get('https://educri-2f856-default-rtdb.firebaseio.com/products.json' + queryParams)
        .then(response => {
            const fetchProducts = [] ;
            for(let key in response.data){
                fetchProducts.push({...response.data[key], id:key})
            }
            dispatch(setProducts(fetchProducts));
        })
        .catch(error => {dispatch(errorProducts(error))})
    };
}

export const typeOrderBoton = (typeButton) =>{
    return {
        type: actionTypes.ACTIVATE_ORDER,
        typeButton: typeButton
    };
}

export const cleanCartBuilder = () =>{
    return {
        type: actionTypes.CLEAN_CARTBUILDER
    };
}

export const validFooterCart = (valid) => {
    return{
        type: actionTypes.VALID_FORMCONTACT,
        isValid: valid
    }
}

export const removeProductEspecific = (id) =>{
    return dispatch => {
        axios.delete('https://educri-2f856-default-rtdb.firebaseio.com/products/'+ id +'.json')
        .then(response => {
            dispatch(removeProductEspecificExecute(id));
        })
        .catch(error => {dispatch(errorProducts(error))})
    };
}

export const removeProductEspecificExecute = (name) => {
    return{
        type:actionTypes.REMOVE_PRODUCT_ESPECIFIC,
        productName:name
    }
}
