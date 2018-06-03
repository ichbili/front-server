import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import AboutPage from '../components/AboutPage';
import HomePage from '../components/HomePage';
import ProjectsPage from '../components/ProjectsPage';
import BlogPage from '../components/BlogPage';
import ContactPage from '../components/ContactPage';
import HobbyPage from '../components/HobbyPage';
import NotFoundPage from '../components/NotFoundPage';
import NavHeader from '../components/NavHeader';

export default class AppRouter extends React.Component {
  state = {
    home: {},
    about: {},
    projects: {},
    blog: {},
    hobby: {},
    contact: {}
  };
  componentDidMount() {
    axios.get(`http://localhost:3000/api/getconfig`).then(res => {
      const book = res.data.book;
      this.setState({
        home: book.home,
        about: book.about,
        projects: book.projects,
        blog: book.blog,
        hobby: book.hobby,
        contact: book.contact
      })
    }).catch(function (error) {
      console.log(error + ' Jaya men axios get config.json');
    });
  }
  render() {
    return (
      <BrowserRouter>
      <div>
        <NavHeader />
        <Switch>
          <Route path="/" exact={true} render={(props) => <HomePage {...this.state.home}/>} />
          <Route path="/about" render={(props) => <AboutPage {...this.state.about} />} />
          <Route path="/projects" render={(props) => <ProjectsPage {...this.state.projects} />} />
          <Route path="/blog" render={(props) => <BlogPage {...this.state.blog} />} />
          <Route path="/hobby" render={(props) => <HobbyPage {...this.state.hobby} />} />
          <Route path="/contact" render={(props) => <ContactPage {...this.state.contact} />} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
      </BrowserRouter>
    );
  }
}