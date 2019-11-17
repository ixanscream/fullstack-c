import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import ResultForm from './components/ResultForm';
import ListResults from './components/ListResults';
import ListFindings from './components/ListFindings'

function App() {
  return (
    <Router>   
        <div className="App container">
          <header className="navStyle">
            <Link className="btn" to="/">Scan Result Form</Link>&nbsp;<Link className="btn" to="/list">List Scan Result</Link>
          </header>
          <Route exact path='/' component={ResultForm} />
          <Route exact path="/list" component={ListResults}/>
          <Route exact path="/detail/:id" render={props => (
            <ListFindings id={props.match.params.id} {...props}/>      
          )}/>
        </div>   
    </Router>
  );
}

export default App;
