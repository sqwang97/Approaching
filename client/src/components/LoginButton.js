import React,{Component} from 'react';
import FacebookLogin from 'react-facebook-login';
import '../css/Header.css';
import autumn from './autumn.jpg';
import {insertUser} from '../Request.js';
import {connect} from 'react-redux';
import * as actions from '../actions';

 /**
  * @classdesc Create a login button that get user logged in with facebook.
  */
class LoginButton extends Component{
    constructor(props){
        super(props);
        this.responseFacebook = this.responseFacebook.bind(this);
    }

    /**
     * This function gets the response from the facebook, stores user information in Redux, and redirect to the dashboard page
     * @param {JsonObject} response response sent back by facebook, contains information such as userId,email,name....
     * @return {void}
     */
    responseFacebook (response)  {
        console.log(response);
        this.setState({
            isLoggedIn:true,
            userId:response.userID,
            name:response.name,
            email:response.email,
            accessToken:response.accessToken
        });
        insertUser(response);
        this.props.fetchUser({userId:response.userID,name:response.name,email:response.email});
        this.props.history.push('/dashboard?id=catdog');
    }

    render(){
        let content;
        if(this.props.user != null && this.props.user != null){
            content = this.props.user.email;
        }

        

        return (                 
                    <div className="login">
                        <div className="login-btn">                                           
                            <FacebookLogin
                                appId="300879247180866"
                                autoLoad={false}
                                fields="name,email,picture"
                                callback={this.responseFacebook}
                            />
                        </div>
                    </div>
                
        );
    }
}

function mapStateToProps(state){
    return {
        user:state.auth
    }
}

export default connect(mapStateToProps,actions)(LoginButton);

/*let content;
        if(this.props.user != null && this.props.user!=false){
            content = (
                <div className="login">
                    <FacebookLogin
                        appId="300879247180866"
                        autoLoad
                        fields="name,email,picture"
                        callback={this.responseFacebook}
                    />
                </div>
            );
        }
        else{
            content = (
                <div style={{textAlign:'center'}}>
                    Welcome back
                </div>
            );
        }*/