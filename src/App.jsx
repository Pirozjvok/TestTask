import { useEffect, useMemo, useState } from 'react'
import './App.css'
import UsersService from './api/usersService'
import Search from './components/UI/search/Search'
import { useLoading } from './hooks/useLoading'
import UserInfoModal from './components/userInfoModal/UserInfoModal'
import Alert from './components/UI/alert/Alert'
import Loader from './components/UI/loader/Loader'
import UserTable from './components/userTable/UserTable'

function App() {
  const [users, setUsers] = useState([])
  const [modalUser, setModalUser] = useState()
  const [error, setError] = useState()

  const [isUsersLoading, loadUsers] = useLoading(async () => {
    const users = await UsersService.getAll()
    setUsers(users)
  }, error => setError(error.message))

  const [isUsersSearching, searchUsers] = useLoading(async (query) => {
    const users = await UsersService.search(query)
    setUsers(users)
  }, error => setError(error.message))

  const isLoading = isUsersLoading || isUsersSearching

  useEffect(() => {
    loadUsers()
  }, [])
  
  const onRowClick = (id) => {
    setModalUser(users.find(x => x.id === id))
  }

  const usersData = useMemo(() => users.map(user => ({...user, name: `${user.lastName} ${user.firstName} ${user.maidenName}`, address: user.address.address})), [users])

  return (
    <div className='app'>
      {modalUser &&
        <UserInfoModal user={modalUser} onClose={() => setModalUser(null)}/>
      }
      {error &&
        <Alert onClose={() => setError(null)} className='alert'>
          {error}
        </Alert>
      }
      <Search className='search' onSearch={query => searchUsers(query)}/>
      <UserTable users={usersData} onRowClick={onRowClick} className='user-table'/>
      {isLoading && 
        <Loader/>
      }
    </div>
  )
}

export default App
