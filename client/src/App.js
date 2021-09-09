import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from './pages/Register';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { user } = useAuth(); 
  return (
    <Router>
      <Switch>
        <Route path="/login">
          { user ? <Redirect to='/'/> : <Login />}
        </Route>
        <Route path="/" exact>
          {user ? <Home /> : <Redirect to='/register'/>}
        </Route>
        <Route path='/register'>
          <Register/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
