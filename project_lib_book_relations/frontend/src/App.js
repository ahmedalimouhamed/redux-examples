import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import AddAuthor from './components/AddAuthor';
import AuthorList from './components/AuthorList';
import AddPublisher from './components/AddPublisher';
import PublisherList from './components/PublisherList';
import AddBook from './components/AddBook';
import BookList from './components/BookList';
import AddReader from './components/AddReader';
import ReaderList from './components/ReaderList';
import AdminLogin from './components/AdminLogin';
import { isTokenValid } from './utils/tokenUtils';
import { useEffect } from 'react';
import { logout, setToken } from './features/authSlice';

function App() {

  const dispatch = useDispatch();
  const {isAuthenticated} = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && isTokenValid(token)) {
      dispatch(setToken(token));
    } else {
      dispatch(logout());
    }
  }, [dispatch]);
  
  const AdminProtected = ({children}) => {
    
    return isAuthenticated ? children : <AdminLogin/>;
  }


  return (
    <div>
      <h1>Library Management System</h1>
      <AdminProtected>
        <AddAuthor/>
        <AuthorList/>
        <AddPublisher/>
        <PublisherList/>
        <AddBook/>
        <BookList/>
        <AddReader/>
        <ReaderList/>
      </AdminProtected>
    </div>
  );
}

export default App;
