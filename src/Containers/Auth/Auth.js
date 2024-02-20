import React,{Component} from 'react';
import {connect} from 'react-redux';
import Input from '../../Components/UI/Input/Input';
import Button from '../../Components/UI/Button/Button';
import classes from './Auth.module.css';
import * as action from '../../Stored/Actions/index';
import Spinner from '../../Components/UI/Spinner/Spinner';
import { Navigate } from 'react-router';
import {updateObject, checkValidaty} from '../../Shared/utility';
import {googleAuthProvider} from '../../firebaseconfig';
import Gmail from '../../Assets/img/Google.svg';
import ResetPassword from '../../Components/UI/Reset/ResetPassword/ResetPassword';
import Aux from '../../Hoc/Aux2/Aux_';

class Auth extends Component{

    state = {
        controls:{
             email:{
                 elementType:'input',
                 elementConfig: {
                     id: 'txtEmail',
                     type: 'email',
                     placeholder: 'Ingresa Email'
                 },
                 value:'',
                 validation: {
                     required:true,
                     isEmail: true
                 },
                 valid:false,
                 touched: false
             },
             password:{
                elementType:'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Ingresa Password'
                },
                value:'',
                validation: {
                    required:true,
                    minLength: 6
                },
                valid:false,
                touched: false
            }
            },
            isSignup : false,
            isReset: false
        }
        
        inputChangeHandler = (event, idElement) =>{

            const control = updateObject(this.state.controls[idElement],{
                value:event.target.value,
                valid: checkValidaty(event.target.value, this.state.controls[idElement].validation),
                touched:true
            });

            const updateControls= updateObject(this.state.controls,{
                [idElement]:control
            });
            
            this.setState({controls: updateControls});
           
        }

        onSubmitHandler = (event) =>{
            event.preventDefault();
            //this.props.onClearIncident();
            //this.props.onClearPerfilRoles();
            this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
        }

        swithAuthModeHandler = () => {
            this.setState(prevState =>{
                return {isSignup : !prevState.isSignup }
            });
        }

        onClickProviderHandler= (event,provider) => {
            event.preventDefault();
            this.props.onAuthSocialLogin(provider);
        }

        componentDidMount(){
            if(this.props.authRedirectPath !== '/'){
                this.props.onSetAuthRedirectPath('/');
            }
        }

        onClickReset= (reset) => {
            this.setState(
                 {isReset : reset });
        }

    render() {

        const  formElement = [];

        for (let key in this.state.controls){
            formElement.push({
                id:key,
                config: this.state.controls[key]
            });
        }

        let formLogueo = (formElement.map(element => {
            return <Input key = {element.id}
                        elementType = {element.config.elementType} 
                        elementConfig = {element.config.elementConfig}
                        value = {element.config.value}
                        changed= {(event) => this.inputChangeHandler(event, element.id)}
                        invalid = {!element.config.valid}
                        shouldValidate ={element.config.validation}
                        touched = {element.config.touched}
            ></Input>
        }));

        if(this.props.loading){
            formLogueo = <Spinner></Spinner>
        }

        let errorMessage = null;
        if(this.props.error){
            errorMessage = (
            <p>{this.props.error ? this.props.error.message : null}</p>
            );
        }

        let authRedirect = null;
        if(this.props.isAuthenticated){
            //const email = localStorage.getItem('email');
            //this.props.onGetPerfilRol(email);
            authRedirect = <Navigate to='/About'></Navigate>
        }
   
        let bodyAuth = (
            <div id='divContact' className = {classes.Auth}>
            {authRedirect}
            <form id='frmLogin' onSubmit={this.onSubmitHandler}>
            <br/>
            <Button id='btnGmail' className = {classes.Button} btnType='Success' clicked = {(event)=>this.onClickProviderHandler(event,googleAuthProvider)} ><img className={classes.iconSocial} src={Gmail} alt="Gmail" /><span className={classes.Social}>Iniciar Sesión en Google</span></Button><br/>
                {formLogueo}
                {errorMessage}
                <Button id='btnEntrar' className = {classes.Button} btnType='Success'>Entrar</Button>
            </form>
            <p className = {classes.AuthLink} onClick={() => this.onClickReset(true)}>¿Olvidó la Contraseña?</p>
            <Button id='btnsesion' className = {classes.Button}
            clicked = {this.swithAuthModeHandler}
            btnType='danger'>
                Dar clic en: {this.state.isSignup ? 'Iniciar Sesion' : 'Registrarse' }
            </Button>
           
        </div>
        );

        if(this.state.isReset){
            bodyAuth = <ResetPassword onResetPassword = {this.props.onResetPassword}
            clicked = {this.onClickReset}
            ></ResetPassword>
        }

        return (
            <Aux>
            {bodyAuth}
        </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading:state?.auth?.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onAuth: (email, password, isSignup) => dispatch(action.auth(email, password, isSignup)),
        onSetAuthRedirectPath: (path) => dispatch(action.setAuthRedirectPath(path)),
        onAuthSocialLogin: (provider) => dispatch(action.authSocialLogin(provider)),
        onResetPassword: (email) => dispatch(action.resetPassword(email)),
        //onGetPerfilRol: (email) => dispatch(action.getPerfil_Rol(email)),
        //onClearPerfilRoles: () => dispatch(action.clearPerfilRoles()),
        //onClearIncident: () => dispatch(action.clearIncident())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);