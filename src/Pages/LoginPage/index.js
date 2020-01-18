import React from "react";
import { Link } from 'react-router-dom'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import './Login.css'
import swal from 'sweetalert'
import { withRouter } from 'react-router-dom'

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loginData: {}

        }
    }

    componentWillMount() {
        let userData = {}
        userData = window.localStorage.getItem('userdata')
        if (userData != null) {
            this.setState({ loginData: JSON.parse(userData) })
        }
        else{
            this.props.history.push('/signup')
        }
        console.log(userData, 'pppaddad')
    }

    userLogin =(e) =>{
        e.preventDefault();
        console.log('nnn',this.state.loginData.email,this.state.email)
        if(this.state.email.length===0 || this.state.password.length===0){
                    swal("Warning!", "Please fill all fields !", "warning");
         }
               
        else if(this.state.email == this.state.loginData.email && this.state.password == this.state.loginData.password) {
            window.localStorage.setItem('loginData',JSON.stringify({user:1}))
            this.props.history.push('/profile')
            console.log("jjj")
        }
        else{
           
                    swal("Warning!", "Please login with right credentials or sign up !", "warning"); 
        }
    }
    render() {
        return (
        <div className="aqua-gradient color-block-5 mb-3 mx-auto  z-depth-1">                        
            <MDBContainer>
                <MDBRow className='form'>
                    <MDBCol md="5">
                        <MDBCard>
                            <MDBCardBody>
                                <MDBCol>
                                    <div className="aqua-gradient color-block-5 mb-3 mx-auto  z-depth-1"> <p className="h4 text-center py-4" style={{ color: 'white' }}>Login</p></div>
                                    <div className="grey-text pt-2">
                                        <MDBInput
                                            label="Your email"
                                            icon="user"
                                            group
                                            type="text"
                                            validater
                                            error="wrong"
                                            success="right"
                                            value={this.state.email}
                                            onChange={(e) => this.setState({ email: e.target.value })}
                                        />
                                        <MDBInput
                                            label="Your password"
                                            icon="lock"

                                            group
                                            type="password"
                                            validate
                                            value={this.state.password}
                                            onChange={(e) => this.setState({ password: e.target.value })}
                                        />
                                    </div>
                                    <div className="text-center py-4 mt-3">
                                        <MDBBtn gradient='aqua' rounded  onClick={(e) => this.userLogin(e)}>
                                            Login
                  </MDBBtn>
                                    </div>
                                </MDBCol>
                                <MDBRow className='sign' >
                                    <p className="font-weight-light">Not a member?</p><Link to='/signup'><span> Sign Up</span></Link>

                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            </div>
        );
    };
}

export default withRouter(LoginPage);