import React, { FC, useState } from 'react';
import style from '../styles/ContactItem.module.sass';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Modal } from '@mui/material';
import { Contact, deleteContact } from '../store/slices/contacts';
import { AppDispatch } from '../store/store';
import { useDispatch } from 'react-redux';
import MyInput from './MyInput';

const ContactItem: FC<Contact> = ({ id, phone, name }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [modal, setModal] = useState(false);
  const handleDeleteContact = () => {
    dispatch(deleteContact(id));
  };
  const handleModal = () => {
    setModal(!modal)
  }

  return (
    <div className={style.main}>
      <div>{name}</div>
      <div>{phone}</div>
      <div className={style.main_buttons}>
        <Button onClick={() => setModal(!modal)}>
          <EditIcon />
        </Button>
        <Button
          onClick={handleDeleteContact}
          className={style.main_buttons__delete}>
          <DeleteForeverIcon />
        </Button>
      </div>
      <Modal
        open={modal}
        onClose={() => setModal(!modal)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
          <div className={style.modal}>
            <MyInput id={id} modal={true} changeModal={handleModal}/>
          </div>
      </Modal>
    </div>
  );
};

export default ContactItem;
