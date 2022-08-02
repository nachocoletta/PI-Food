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
        <Route path='/recipes' component={RecipeCreate} /> 
        {/* <Route path='/recipes/:idReceta' component={Detail} /> */}

      </Switch>
    </BrowserRouter>
  );
}

export default App;
