import React,{Component} from 'react';
import classes from './ResetPassword.module.css';
import Input from '../../Input/Input';
import {connect} from 'react-redux';
import withErrorHandler from '../../../../Hoc/withErrorHandler/withErrorHandler';
import axios from '../../../../Shared/ClientHttp/MyHttpClient';
import Spinner from '../../Spinner/Spinner';
import {updateObject, checkValidaty} from '../../../../Shared/utility';
import Button from '../../../../Components/UI/Button/Button';
import Aux from '../../../../Hoc/Aux2/Aux_';

class resetPassword extends Component{

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
             }
            },isActivate:false
        };

        inputChangeHandler = (event, idElement) =>{

            const control = updateObject(this.state.controls[idElement],{
                value:event.target.value,
                valid: checkValidaty(event.target.value, this.state.controls[idElement].validation),
                touched:true
            });

            const updateControls= updateObject(this.state.controls,{
                [idElement]:control
            });

            let formValid=true;

            for (let element in updateControls){
                formValid = updateControls[element].valid && formValid;
            }
            
            this.setState({controls: updateControls, isActivate:formValid});
           
        }

    render(){
        const formElement = [];
        let formReset = <Spinner></Spinner>;
        for (let key in this.state.controls){
            formElement.push({
                id:key,
                config: this.state.controls[key]
            });
        }

        const spanError = (<p id="spnError" className={classes.Error}>{this.props.error ? "Error al Restablecer Contraseña": null}</p>);

        if(!this.props.loading){
            formReset=  (<Aux>
                <br></br>
                {formElement.map(element => {
                  return  <Input key = {element.id}
                                    elementType = {element.config.elementType} 
                                    elementConfig = {element.config.elementConfig}
                                    value = {element.config.value}
                                    changed= {(event) => this.inputChangeHandler(event, element.id)}
                                    invalid = {!element.config.valid}
                                    shouldValidate ={element.config.validation}
                                    touched = {element.config.touched}
                        ></Input>
            })}
            <Button id='btnReset' disabled = {!this.state.isActivate} btnType='Success' clicked = {() => this.props.onResetPassword(this.state.controls.email.value)} >Restablecer Contraseña</Button>
             {spanError}
            </Aux>);
        }

        if(this.props.mensaje && this.props.mensaje === "OK"){
            formReset = (<p>Se ha enviado correo. Verificar su bandeja.</p>);
        }

        return (
            <Aux>
             <div id="divReset" className={classes.Reset}>
                {formReset}
                <span id="spnAuth" onClick = {() => this.props.clicked(false)}>Auntenticar</span>
             </div>
           </Aux>
        );
    }
}

const mapStateToProps = (state) =>{
    return {
        loading: state.auth.loading,
        mensaje: state.auth.mensaje,
        error: state.auth.error
    }
}

export default connect(mapStateToProps, null)(withErrorHandler(resetPassword),axios);