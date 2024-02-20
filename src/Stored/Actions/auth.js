import * as actionTypes from './actionTypes';
import axios from 'axios';
import 'firebase/auth';
import {app} from '../../firebaseconfig';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId, fullName) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
        fullName: fullName,
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const resetSuccess = (mensaje) => {
    return {
        type: actionTypes.RESET_SUCCESS,
        mensaje: mensaje
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expireData');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authExpire = (expireTime) => {
    return dispatch =>{
        setTimeout(() => {
            dispatch(logout());
        }, expireTime * 1000);
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email:email,
            password: password,
            returnSecureToken: true
        }

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDAxpkfHOEr2rJf3h_Bfpb-E5R6c4tsRaY';
        if (!isSignUp){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDAxpkfHOEr2rJf3h_Bfpb-E5R6c4tsRaY'
        }

        axios.post(url, authData)
        .then(response => {
            if(response.data){
            const expireData = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem("token", response.data.idToken);
            localStorage.setItem("expireData", expireData);
            localStorage.setItem("userId", response.data.localId);
            dispatch(authSuccess(response.data.idToken, response.data.localId,email));
            dispatch(authExpire(response.data.expiresIn));
            }
            else{
                dispatch(authFail("Error al Autenticarse. Volver a Intentar."))
            }
        }).catch(error => {
            dispatch(authFail(error.response.data.error));
        })
    }
}

export const authSocialLogin = (provider)=>{
    return dispatch => {
        dispatch(authStart());
        app
        .auth()
        .signInWithPopup(provider)
        .then(result => {
            if(result){
                const data ={postBody: 'access_token='+result.credential.accessToken+'&providerId='+result.credential.providerId
                ,requestUri:'http://localhost:3000'
                ,returnIdpCredential:true
                ,returnSecureToken:true}
                const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key=AIzaSyDAxpkfHOEr2rJf3h_Bfpb-E5R6c4tsRaY';
                axios.post(url,data)
                .then(response => {
                    if(response.data){
                        console.log(response.data);
                        const expireData = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                        localStorage.setItem("token", response.data.idToken);
                        localStorage.setItem("expireData", expireData);
                        localStorage.setItem("userId", response.data.localId);
                        dispatch(authSuccess(response.data.idToken, response.data.localId,  response.data?.fullName ));
                        dispatch(authExpire(response.data.expiresIn));
                        }
                        else{
                            dispatch(authFail("Error al Autenticarse. Volver a Intentar."))
                        }
                }).catch(error => {
                    dispatch(authFail(error));
                });
            }
        }).catch(error => {
            dispatch(authFail(error));
        });
    }
}

export const setAuthRedirectPath=(path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const checkAuthState= () =>{
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token){
            dispatch(logout());
        } else {
            const expireDate = new Date(localStorage.getItem('expireData'));
            if(expireDate <= new Date()){
                dispatch(logout());
            }else{
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(authExpire((expireDate.getTime() - new Date().getTime())/1000))
            }
        }
    }
}

export const resetPassword = (email) => {
    return dispatch => {
        dispatch(authStart());
        const data ={requestType: "PASSWORD_RESET",
        email: email}
        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDAxpkfHOEr2rJf3h_Bfpb-E5R6c4tsRaY';
        axios.post(url,data)
        .then(response => {
            if(response.data){
                dispatch(resetSuccess("OK"));
                }
                else{
                    dispatch(authFail("Error al Restablecer Contraseña."))
                }
        }).catch(error => {
            dispatch(authFail(error));
        });
    }
}