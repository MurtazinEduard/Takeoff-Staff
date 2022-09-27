import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import HeaderMain from './components/HeaderMain';
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';
import NotFound from './components/NotFound';
import WrapperPage from './components/WrapperPage';
import { useTypedSelector } from './hooks/useTypedSelector';
import { fetchAuthMe } from './store/slices/auth';
import { AppDispatch } from './store/store';

const App: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { contacts } = useTypedSelector(state => state.contacts)
  const isMounted = React.useRef(false);

  React.useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(contacts);
      localStorage.setItem('contacts', json);
    }
    isMounted.current = true;
  }, [contacts]);
  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);
  return (
    <div className="App">
      <WrapperPage>
        <HeaderMain />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </WrapperPage>
    </div>
  );
};

export default App;
