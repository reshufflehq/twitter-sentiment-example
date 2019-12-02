import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Admin from './components/Admin/Admin';
import './App.css';

function App() {
  return (
    <Container fluid>
      <Router>
        <Route exact path='/' component={Admin} />
        <Route path='/handle/:id' component={Admin} />
      </Router>
    </Container>
  );
}

export default App;
