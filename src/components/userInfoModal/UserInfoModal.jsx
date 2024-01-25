import React from 'react';
import Modal from '../UI/modal/Modal';
import Button from '../UI/button/Button';

const UserInfoModal = ({user, onClose}) => {
  return ( 
    <Modal onClose={onClose}>
      <h3>Информация о пользователе.</h3>
      <p>Фамилия: {user.lastName}</p>
      <p>Имя: {user.firstName}</p>
      <p>Отчество: {user.maidenName}</p>
      <p>Возраст: {user.age} лет</p>
      <p>Адрес: {user.address.city + ', ' + user.address.address}</p>
      <p>Рост: {user.height}</p>
      <p>Вес: {user.weight}</p> 
      <p>Номер телефона: {user.phone}</p> 
      <p>Email: {user.email}</p> 
      <Button onClick={onClose} style={{padding: '8px 12px', width: '100%', marginTop: '8px'}}>Закрыть</Button>
    </Modal>
  )
}
 
export default UserInfoModal;