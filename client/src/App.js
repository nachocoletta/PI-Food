import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LandingPage from './components/LandingPage';
import Home from './components/Home.jsx'
import Detail from './components/Detail.jsx'
import RecipeCreate from './components/RecipeCreate.jsx'

function App() {
  return (
    <BrowserRouter>   
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route path='/home' component={Home} />
        <Route exact path='/recipes/:id' component={(match) => <Detail match={match} />} />
        <Route exact path='/recipes' component={RecipeCreate} /> 

      </Switch>
    </BrowserRouter>
  );
}

export default App;
