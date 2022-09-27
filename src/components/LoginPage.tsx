import { Button, TextField } from '@mui/material';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import style from '../styles/Login.module.sass'

import { useForm } from 'react-hook-form';
import { AppDispatch } from '../store/store'; 
import {
  fetchAuth,
  selectIsAuth,
} from '../store/slices/auth';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { IUserData } from '../store/types';


type IValidation = {
  email: string;
  password: string;
};
const LoginPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const isAuth = useTypedSelector(selectIsAuth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: 'edward@test.ru',
      password: '123456',
    },
    mode: 'onChange',
  });

  async function onSubmitlogin(values: IValidation): Promise<void> {
    const data = await dispatch(fetchAuth(values));
    const payload = data.payload as IUserData;
    if (!data.payload) {
      return alert('Не удалось войти');
    }
    if ('token' in payload) {
      window.localStorage.setItem('token', payload.token);
    }
  }

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className={style.wrapper}>
      <div>
        <form onSubmit={handleSubmit(onSubmitlogin)} className={style.Login}>
          <div className={style.Login_title}>Авторизация</div>
          <TextField
            className={style.Login_textfield}
            helperText={errors.email?.message}
            label="Ваш логин"
            type={'email'}
            error={Boolean(errors.email?.message)}
            {...register('email', { required: 'Укажите почту' })}
          />
          <TextField
            className={style.Login_textfield}
            helperText={errors.password?.message}
            label="Пароль"
            error={Boolean(errors.password?.message)}
            type={'password'}
            margin="normal"
            {...register('password', { required: 'Укажите пароль' })}
          />
          <div className={style.Login_buttons}>

            <Button type="submit" variant="contained">
              Войти
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
