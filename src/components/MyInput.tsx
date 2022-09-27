import { Button, Grid, TextField } from '@mui/material';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact, Contact, editContact } from '../store/slices/contacts';
import { AppDispatch } from '../store/store';
import style from '../styles/MyInput.module.sass';

type Props = {
  id?: number,
  modal?: boolean,
  changeModal?: () => void
}
const MyInput: FC<Props> = ({id, modal, changeModal}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const handleAddContact = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const newContact: Contact = {
      id: Date.now(),
      name: name,
      phone: number,
    };
    dispatch(addContact(newContact));
    setName('')
    setNumber('')
  };
  const handleAddEditedContact = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const newEditedContact: Contact = {
      id: id || Date.now(),
      name: name,
      phone: number,
    };
    dispatch(editContact(newEditedContact));
    changeModal?.()
  }
  return (
    <div className={style.main}>
      <TextField
        value={name}
        onChange={(e) => setName(e.target.value)}
        label="Имя"
        fullWidth
        helperText="Мин 3 символа"
        inputProps={{ minLength: 3 }}
        error={name.length < 3}
      />
      <TextField
        value={number}
        type="number"
        sx={{ marginTop: 2 }}
        onChange={(e) => setNumber(e.target.value)}
        label="Номер телефона"
        fullWidth
        inputProps={{ minLength: 5 }}
        helperText="Мин 5 символов"
        error={number.length < 5}
      />
      <Grid sx={{ marginTop: 2 }} container>
        {modal ? <Button
          disabled={name.length < 2 || number.length < 5}
          onClick={handleAddEditedContact}
          variant="contained"
          className={style.main_button}>
          Редактировать
        </Button> : <Button
          disabled={name.length < 2 || number.length < 5}
          onClick={handleAddContact}
          variant="contained"
          className={style.main_button}>
          Добавить
        </Button>}
      </Grid>
    </div>
  );
};

export default MyInput;
