import './App.css';
import { Provider } from 'react-redux';
import store from './store/store';
import AuthStatus from './components/AuthStatus';
import ProjectList from './components/ProjectList';

function App() {
  return (
    <Provider store={store}>
      <div style={{ padding:'20px' }}>
        <h1>Project Management Dashboard</h1>
        <AuthStatus/>
        <ProjectList/>
      </div>
    </Provider>
  );
}

export default App;
