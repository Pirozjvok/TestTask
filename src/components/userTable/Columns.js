export const COLUMNS = [
    {
      Header: 'ФИО',
      accessor: 'fullName',
      width: 100,
    },
    {
      Header: 'Возраст',
      accessor: user => user.age + ' лет',
      width: 50
    },
    {
      Header: 'Пол',
      accessor: 'gender',
      width: 50
    },
    {
      Header: 'Номер телефона',
      accessor: 'phone',
      width: 50
    },
    {
      Header: 'Адрес',
      accessor: 'shortAddress',
      width: 300,
      disableResizing: true,
    }
  ];