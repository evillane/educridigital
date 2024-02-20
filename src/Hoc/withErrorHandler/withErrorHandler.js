import React, { Component } from 'react';
import Aux from '../Aux2/Aux_';
import Modal from '../../Components/UI/Modal/Modal';

const withErroHandler= (WrapperComponent, axios) => {
    return class extends Component{

        state = {
            error:null
        }

        componentWillMount(){
            this.reqInterceptor = axios ? axios.interceptors.request.use(req => {
                this.setState({error:null});
                return req;
            }) : null;
            this.resInterceptor = axios ? axios.interceptors.response.use(resp => resp, error => {
                this.setState({error:error});
            }) : null;
        }

        componentWillUnmount(){
            if(axios){ axios.interceptors.request.eject(this.reqInterceptor);}
            if (axios) {axios.interceptors.response.eject(this.resInterceptor);}
        }

        errorConfirmHanlder = () => {
            this.setState({error:null});
        }

        render(){
            return  (
                <Aux>
                    <Modal show={this.state.error}
                    modalClose = {this.errorConfirmHanlder}
                    >{this.state.error? this.state.error.message : null}</Modal>
                    <WrapperComponent {...this.props}></WrapperComponent>
                </Aux>
            );
        }
    } 
}

export default withErroHandler;