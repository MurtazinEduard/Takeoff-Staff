import { Input } from '@mui/material';
import { FC, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { selectIsAuth } from '../store/slices/auth';
import style from '../styles/Main.module.sass';
import ContactItem from './ContactItem';
import MyInput from './MyInput';

const MainPage: FC = () => {
  const isAuth = useTypedSelector(selectIsAuth);
  const contacts = useTypedSelector((state) => state.contacts.contacts);
  const [searchInput, setSearchInput] = useState('')
  const felteredContacts = contacts.filter(item => {
    return item.name.toLowerCase().includes(searchInput.toLowerCase())})
  if (!isAuth && !window.localStorage.getItem('token')) {
    return <Navigate to="/login" />;
  }
  return (
    <div className={style.main}>
      <h1 className={style.main_title}>Контакты</h1>
      <MyInput />

      <div className={style.contacts}>
        <Input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} className={style.contacts_search} placeholder="ПОИСК ПО ИМЕНИ" />
        <div className={style.contacts_description}>
          <div>Имя</div>
          <div>Номер</div>
          <div>Edit/Del</div>
        </div>
        {felteredContacts.map(item => <ContactItem key={item.id} {...item}/>)}
      </div>
    </div>
  );
};

export default MainPage;
