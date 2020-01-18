import React, { Component } from 'react';
import { Switch, Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import './App.css';
import Layout from './Components/Layout'
import ScrollToTop from './Components/scrollToTop'
import LoginPage from './Pages/LoginPage/index';
import SignupPage from './Pages/SignupPage/index';
import ProfilePage from './Pages/ProfilePage';



class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <ScrollToTop>
          <Switch>
            <Layout>
              <Route exact path="/"><LoginPage/></Route>
            <Route  path="/login"><LoginPage /></Route>
            <Route exact path="/signup"><SignupPage /></Route>
            <Route exact path="/profile"><ProfilePage /></Route>
            </Layout>
          </Switch>
        </ScrollToTop>
      </BrowserRouter>
    )
  }
}

export default App;
