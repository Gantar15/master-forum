import './App.scss';

import { Route, BrowserRouter as Router } from 'react-router-dom';

import AuthenticatedRoute from './shared/infra/router/AuthenticatedRoute';
import CommentPage from './pages/comment';
import DiscussionPage from './pages/discussion';
import IndexPage from './pages';
import JoinPage from './pages/join';
import LoginPage from './pages/login';
import MemberPage from './pages/member';
import React from 'react';
import SearchPage from './pages/search';
import SubmitPage from './pages/submit';

const App: React.FC = () => {
  return (
    <Router>
      <Route path="/" exact component={IndexPage} />
      <Route path="/discuss/:slug" component={DiscussionPage} />
      <Route path="/comment/:commentId" component={CommentPage} />
      <Route path="/member/:username" component={MemberPage} />
      <Route path="/search/:searchString" component={SearchPage} />
      {/* <Route path="/category/:category" component={CategoryPage} /> */}
      <AuthenticatedRoute path="/submit" component={SubmitPage} />
      <Route path="/join" component={JoinPage} />
      <Route path="/login" component={LoginPage} />
    </Router>
  );
};

export default App;
