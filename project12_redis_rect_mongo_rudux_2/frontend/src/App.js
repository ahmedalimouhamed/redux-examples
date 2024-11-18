import './App.css';
import UserList from './components/UserList';
import StatisticsChart from './components/StatisticsChart';

function App() {
  return (
    <div className="App">
      <h1>User Management</h1>
      <UserList/>
      <h2>Statistics</h2>
      <StatisticsChart/>
    </div>
  );
}

export default App;
