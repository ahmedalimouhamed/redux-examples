import { Provider } from 'react-redux';
import store from './store';
import Navbar from './components/Navbar';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CustomerManagement from './pages/CustomerManagement';
import Auth from './pages/Auth';
import SalesManagement from './pages/SalesManagement';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar/> 
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/auth" element={<Auth/>}/>
          <Route path="/customers" element={<CustomerManagement/>}/>
          <Route path="/sales" element={<SalesManagement/>}/>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
