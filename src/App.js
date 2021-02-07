import { Switch, Route } from 'react-router-dom';
import './App.css';

import MainNav from './components/main-nav/main-nav.component';

import HomePage from './pages/home/home.component';
import AuthPage from './pages/auth-page/auth.component.jsx';
import ManageItemPage from './pages/manage-item-page/manage-item-page.component';

function App() {
  return (
    <div className='App'>
      <MainNav />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/auth' component={AuthPage} />
        <Route exact path='/manage' component={ManageItemPage} />
      </Switch>
    </div>
  );
}

export default App;
