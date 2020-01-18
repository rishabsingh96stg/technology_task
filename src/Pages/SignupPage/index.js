import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import { withRouter, Link } from 'react-router-dom'
import './signup.css'
import swal from 'sweetalert';

class SignupPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                name: '',
                email: '',
                reemail: '',
                password: '',
            }, email: '',
            valid_email: false

        }
    }
    handleChangeInput = (e) => {
        console.log(e.target.id);
        console.log(e.target.value);
        let { fields } = this.state
        fields[e.target.id] = e.target.value
        this.setState({ fields })
    }
    validateEmail = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            this.setState({
                email: text,
                valid_email: false
            })
            return false;
        }
        else {
            this.setState({
                email: text,
                valid_email: true
            })
        }
    }
    addUser = (e) => {
        
        e.preventDefault();
        if (this.state.email.length == 0) {
            swal("Please enter email !", "", "info")
        }
        else if (this.state.valid_email == false) {
            console.log(this.state.email, 'iii')

            swal("Please enter valid email !", "", "warning")
        }
        else {
            if (this.state.email == this.state.fields.reemail) {
                let data = { ...this.state.fields }
                data.email = this.state.email
                // window.localStorage.removeItem('userdata')
                window.localStorage.setItem('userdata', JSON.stringify(data))
                this.confirmSignup()
                this.props.history.push('/')
            }
            else {
                swal("Please enter valid email !", "", "warning")
            }
        }
    }
    confirmSignup = () => {
        console.log(this.props)
        swal({
            title: "Thank you for SignIn",
            text: '',
            icon: "success",
            button: true,
            cancel:false,
            successMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    this.props.history.push('/')
                } else return
            });

    }

    render() {
        return (
            <MDBRow className="blue-gradient color-block-5 mb-3 mx-auto  z-depth-1" style={{height:'auto'}}>
            <MDBContainer>
                <MDBRow className='form'>
                    <MDBCol md="5">
                        <MDBCard>
                            <MDBCardBody>
                                <form>
                                    <div className="blue-gradient color-block-5 mb-3 mx-auto  z-depth-1"> <p className="h4 text-center py-4" style={{ color: 'white' }}>Sign up</p></div>
                                    <div className="grey-text pt-2">
                                        <MDBInput
                                            label="Your name"
                                            icon="user"
                                            id='name'
                                            group
                                            type="text"
                                            validate
                                            error="wrong"
                                            success="right"
                                            value={this.state.fields.name}
                                            onChange={this.handleChangeInput}
                                        />
                                        <MDBInput
                                            label="Your email"
                                            icon="envelope"
                                            id='email'
                                            group
                                            type="email"
                                            validate
                                            error="wrong"
                                            success="right"
                                            value={this.state.email}
                                            onChange={(e) => this.validateEmail(e.target.value)}
                                        />
                                        <MDBInput
                                            label="Confirm your email"
                                            icon="exclamation-triangle"
                                            id='reemail'
                                            group
                                            type="text"
                                            validate
                                            error="wrong"
                                            success="right"
                                            value={this.state.fields.reemail}
                                            onChange={this.handleChangeInput}
                                        />
                                        <MDBInput
                                            label="Your password"
                                            icon="lock"
                                            id='password'
                                            group
                                            type="password"
                                            validate
                                            value={this.state.fields.password}
                                            onChange={this.handleChangeInput}
                                        />
                                    </div>
                                    <div className="text-center py-4 mt-3">
                                        <MDBBtn gradient='blue' rounded type="submit" onClick={(e) => this.addUser(e)}>
                                            Register
                                        </MDBBtn>
                                    </div>
                                </form>
                                <MDBRow className='sign' >
                                    <p className="font-weight-light">Back to login ?</p><Link to='/'><span> Log In</span></Link>

                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            </MDBRow>
        );
    };
}

export default withRouter(SignupPage);