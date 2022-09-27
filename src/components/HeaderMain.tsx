import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { logout, selectIsAuth } from '../store/slices/auth';
import { AppDispatch } from '../store/store';
import style from '../styles/Header.module.sass';
const HeaderMain = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuth = useTypedSelector(selectIsAuth);
  const onClickLogout = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
    }
  };
  return (
    <div className={style.main}>
      <h1>Takeoff Staff</h1>
      {(isAuth || window.localStorage.getItem('token')) && (
        <Button variant="outlined" color='inherit' onClick={onClickLogout}>Выйти</Button>
      )}
    </div>
  );
};

export default HeaderMain;
