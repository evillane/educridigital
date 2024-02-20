import React, {Component} from 'react';
import classes from './Message.css';
import ThumbUpAltRoundedIcon from '@material-ui/icons/ThumbUpAltRounded';
import Aux from '../../../Hoc/Aux2/Aux_';
import {connect} from 'react-redux';
import * as actions from '../../../Stored/Actions/index';

class Message extends Component{

    componentDidMount(){
        this.props.onCleanCartBuilder();
        this.props.onCleanOrder();
    }

render(){
    return (
        <Aux><ThumbUpAltRoundedIcon color="primary" style={{fontSize: '256px'}}></ThumbUpAltRoundedIcon>
        <p className={classes.Success}>Gracias por su preferencia, se ha generado el codigo de pedido <br/><br/><b>{this.props.orderId.name}</b><br/><br/>Puede hacer seguimiento entrando a la opción de <span onClick={this.props.redirectPathHandler}>Pedidos</span></p>
        <p><a href="/">Seguir Comprando</a></p>
        </Aux>
      );
    }
}

const mapStateToProps = (state) =>{
    return {
        error: state.order.error,
        orderId: state.order.orderid
    }
}

const mapDispatchToProps = dispatch => {
    return {
    onCleanCartBuilder:()=> dispatch(actions.cleanCartBuilder()),
    onCleanOrder: () => dispatch(actions.cleanOrder),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Message);
    