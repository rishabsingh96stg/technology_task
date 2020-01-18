import React, { Component } from 'react'
import {
  MDBCard, MDBCardBody, MDBCardTitle, MDBModal, MDBModalBody, MDBModalHeader, MDBCardText, MDBAnimation, MDBContainer, MDBCardHeader,
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBIcon
} from "mdbreact";
import './profile.css'
import { withRouter } from 'react-router-dom'
import { FulfillingBouncingCircleSpinner } from 'react-epic-spinners';
import { Form, Col, Button } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import swal from 'sweetalert'

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [], modal: false, loading: false,
      fields: {
        address: '',
        designation: '',
        employer: '',
        state: '',
        city: '',
        pincode:'',
        picture: null
      }, profileData:null, image: null, userInfo: null
    }
  }
  logout() {
    window.localStorage.clear('loginData')
    this.props.history.push('/login')
    window.location.reload()
  }

  componentWillMount() {
    let userData = {}
    userData = window.localStorage.getItem('userdata')
    if (userData != null) {
      this.setState({ userInfo: JSON.parse(userData) })
    }
    this.getDetails()
  }
  getDetails() {
    var loginData = window.localStorage.getItem('loginData')
    if (loginData == null) {
      this.props.history.push('/login')
      window.location.reload()

    }
  }
  componentDidMount() {

    let profileData = {}
    profileData = window.localStorage.getItem('profileData')
    if (profileData != null) {

      this.setState({ loading: true })
      this.setState({ profileData: JSON.parse(profileData), loading: false })
    }
  }

  handleChangeInput = (e) => {
    let { fields } = this.state
    fields[e.target.id] = e.target.value
    this.setState({ fields })
  }

  userInfoSubmit = () => {
    if(this.state.fields.designation.length===0 || this.state.fields.address=='' || this.state.fields.pincode=='' 
    || this.state.fields.city=='' || this.state.fields.state=='' || this.state.fields.employer==''){
              swal("Warning!", "Please fill all fields !", "warning");
   }
    let data = {...this.state.fields}
    data.picture = this.state.image
    console.log(data)
    window.localStorage.removeItem('profileData')
    window.localStorage.setItem('profileData', JSON.stringify(data))
    this.setState({ profileData: data, modal:false })
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }
  addUserinfoRender = () => {
    return (
      <MDBContainer>
        <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
          <MDBModalHeader toggle={this.toggle}>Personal Info</MDBModalHeader>
          <MDBModalBody>
            <Form>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Designation</Form.Label>
                  <Form.Control type="text" placeholder="" value={this.state.fields.designation} id='designation' onChange={this.handleChangeInput} />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Organisation Name</Form.Label>
                  <Form.Control type="text" placeholder="" value={this.state.fields.employer} id='employer' onChange={this.handleChangeInput} />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <Form.Control type='textarea' placeholder="" value={this.state.fields.address} id='address' onChange={this.handleChangeInput} />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Pincode</Form.Label>
                  <Form.Control type='text' placeholder='' value={this.state.fields.pincode} id='pincode' onChange={this.handleChangeInput} />
                </Form.Group>

              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>City</Form.Label>
                  <Form.Control type='text' placeholder='' value={this.state.fields.city} id='city' onChange={this.handleChangeInput} />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>State</Form.Label>
                  <Form.Control type='text' value={this.state.fields.state} id='state' onChange={this.handleChangeInput} />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Picture</Form.Label>
                  {this.renderImage()}
                </Form.Group>
              </Form.Row>
              <Button variant="primary" type="submit" onClick={this.userInfoSubmit}>
                Submit
              </Button>
            </Form>
          </MDBModalBody>
        </MDBModal>
      </MDBContainer>
    );
  }
  renderImage() {
    let image1Url = ''
    if (this.state.image == null) {
      return (<div className="input-group">
        <div className="custom-file">
          <input
            type="file"
            className="custom-file-input"
            id="inputGroupFile01"
            aria-describedby="inputGroupFileAddon01"
            onChange={(event) => this.setState({ image: event.target.files[0], image1Url: (URL.createObjectURL(event.target.files[0])) })}
          />
          <label className="custom-file-label" htmlFor="inputGroupFile01">
            Black Icon
              </label>
        </div>

      </div>)
    }
    else {
      return (
        <div style={{ cursor: 'pointer', display: 'flex', justifyContent: 'flex-start', margin: '0 10px', width: '100%', alignItems: 'center' }} className='show_image'>
          <img src={this.state.image1Url} className="slider_div_image" style={{ margin: '0', width: 50, border: '1px solid #d2d2d2' }} alt="news_image" />
          <MDBIcon className='cross_icon' onClick={() => this.setState({ image: null })} icon="times-circle" />
        </div>
      )
    }
  }

  render() {
    if (this.state.loading) {
      return (<div className='loadingSpin'><FulfillingBouncingCircleSpinner color="#FF6600" /></div>)
    }
    else {
      return (
        <React.Fragment>
          <div className="aqua-gradient color-block-5 mb-3 mx-auto  z-depth-1" style={{height:'100vh'}}>
          <MDBContainer className='pt-4'>
            <MDBCard className="w-100 h-100 mt-4 ">
            <MDBNavbar className="aqua-gradient" dark expand="md">
              <MDBNavbarBrand>
                <strong >Profile</strong>
              </MDBNavbarBrand>
              <MDBNavItem onClick={this.toggle} style={{ listStyle: 'none' }}>
                <MDBIcon icon="user-plus" />
              </MDBNavItem>
              <MDBNavbarNav right>
                <MDBNavItem className="waves-effect waves-light" onClick={() => this.logout()}>
                  <a data-tip="logout" style={{ display: 'block' }}><MDBIcon icon="sign-out-alt" size="lg" /> </a>
                  <ReactTooltip />
                </MDBNavItem>
              </MDBNavbarNav>
            </MDBNavbar>
              <MDBCardHeader className=' text-center'>
                <MDBAnimation type="rotateInDownLeft">
                  <img className="img-fluid imageRound" alt="" src='Images/download.jpeg' />
                </MDBAnimation>
              </MDBCardHeader>
              <MDBCardBody>
                <MDBCardTitle className=' text-center'>{this.state.userInfo.name.toUpperCase()}</MDBCardTitle>
                {
                  this.state.profileData !==null ? (
                    <MDBCardText>
                      <h4 className=' text-center'>{this.state.profileData.designation}</h4>
                      <Form className='pt-4'>
                        <Form.Row>
                          <Form.Group as={Col}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" value={this.state.userInfo.email} />
                          </Form.Group>

                          <Form.Group as={Col}>
                            <Form.Label>Organisation Name</Form.Label>
                            <Form.Control type="text" value={this.state.profileData.employer} />
                          </Form.Group>
                        </Form.Row>

                        <Form.Row>
                          <Form.Group as={Col}>
                            <Form.Label>Address</Form.Label>
                            <Form.Control type='text' value={this.state.profileData.address} />
                          </Form.Group>
                          <Form.Group as={Col}>
                            <Form.Label>Pincode</Form.Label>
                            <Form.Control type='text' value={this.state.profileData.pincode} />
                          </Form.Group>

                        </Form.Row>
                        <Form.Row>
                          <Form.Group as={Col}>
                            <Form.Label>City</Form.Label>
                            <Form.Control type='text' placeholder='' value={this.state.profileData.city} />
                          </Form.Group>
                          <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>State</Form.Label>
                            <Form.Control type='text' value={this.state.profileData.state} />
                          </Form.Group>
                        </Form.Row>
                      </Form>
                    </MDBCardText>
                  ) : (
                      <div className='text-center'>
                        <h4>Please Enter your details
                          <MDBIcon icon="user-plus" className='pl-1' onClick={this.toggle} /></h4>
                        
                      </div>
                    )
                }
              </MDBCardBody>
            </MDBCard>
            {this.addUserinfoRender()}
          </MDBContainer>
          </div>
        </React.Fragment>
      )
    }
  }
}
export default withRouter(ProfilePage)