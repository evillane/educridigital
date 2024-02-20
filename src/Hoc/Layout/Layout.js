import React,{Component} from 'react';
import {connect} from 'react-redux';
import Aux from '../Aux2/Aux_';
import classes from "./Layout.module.css";
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';
import ToolbarVertical from '../../Components/Navigation/ToolBarVertical/ToolbarVertical';
import SlideDrawer from '../../Components/Navigation/SlideDrawer/SlideDrawer';
import withRouter from '../../Hoc/withRouter/withRouter';
import * as action from '../../Stored/Actions/index';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

class Layout extends Component{
    state = {
        showSideDrawer:false
    }

    sideDrawerClosedHandler = () =>{
        this.setState({showSideDrawer:false});
    }

    sideDrawerToggledHanlder = () => {
        this.setState((prevState) => {
           return {showSideDrawer : !prevState.showSideDrawer}
        });
    }

    typeButtonHandler = () => {
            this.props.history.push('/auth')
    }

//#region ciclo de vida
  componentDidMount = ()=>{
 
} 

componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    
  }

//#endregion

    render(){
        return (
            <Aux>
                 <div>
                  <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={this.props?.loading}
                    >
                    <CircularProgress color="inherit" />
                  </Backdrop>
                </div>
            <Toolbar isAuth= {this.props.isAuthenticated} Email = {this.props.email}
            drawerToggledClick = {this.sideDrawerToggledHanlder}
            fullName = {this.props.fullName}
            ></Toolbar>
            <ToolbarVertical
            isAuth= {this.props.isAuthenticated}
            PerfilRoles = {this.props.PerfilRoles}>
            </ToolbarVertical>
            <SlideDrawer isAuth= {this.props.isAuthenticated}
                        Email = {this.props.email}
            PerfilRoles = {this.props.PerfilRoles}
            open={this.state.showSideDrawer} closed= {this.sideDrawerClosedHandler}
            fullName = {this.props.fullName}></SlideDrawer>
            <main className= {classes.Content}>
                {this.props.children}
            </main>
            <br/>
            <br/>
            <br/>
            </Aux>
        )
    }
}
          /*
          shouldShowDialog = "true"
          */
const mapStateProps = (state) =>{
    return {
        isAuthenticated:state.auth.token !== null,
        token: state.auth.token,
        email: state?.auth?.email,
        loading: state?.perfilrol?.loading,
        fullName: state?.auth?.fullName,
    }
}

const mapDispatchedProps = dispatch =>{
    return{
        onAuthRedirectPath: (path) => dispatch(action.setAuthRedirectPath(path)),
        //onGetUsuarioByEmailExterno: (searchModel)=> dispatch(action.getUsuarioByEmailExterno(searchModel)),
        //onGetUsuarioByEmail: (searchModel)=> dispatch(action.getUsuarioByEmail(searchModel))  
    }
}

export default withRouter(connect(mapStateProps,mapDispatchedProps)(Layout));