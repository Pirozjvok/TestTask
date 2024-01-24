import React from 'react';
import Modal from '../UI/modal/Modal';

const UserInfoModal = ({user, onClose}) => {
  return ( 
    <Modal onClose={onClose}>
      <h3>Информация о пользователе.</h3>
      <p>Фамилия: {user.lastName}</p>
      <p>Имя: {user.firstName}</p>
      <p>Отчество: {user.maidenName}</p>
      <p>Возраст: {user.age} лет</p>
      <p>Адрес: {user.address.address}</p>
      <p>Рост: {user.height}</p>
      <p>Вес: {user.weight}</p> 
      <p>Номер телефона: {user.phone}</p> 
      <p>Email: {user.email}</p> 
    </Modal>
  )
}
 
export default UserInfoModal;