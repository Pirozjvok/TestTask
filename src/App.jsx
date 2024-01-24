import { useEffect, useMemo, useState } from 'react'
import './App.css'
import UsersService from './api/usersService'
import Search from './components/UI/search/Search'
import { useLoading } from './hooks/useLoading'
import UserInfoModal from './components/userInfoModal/UserInfoModal'
import Alert from './components/UI/alert/Alert'
import Loader from './components/UI/loader/Loader'
import UserTable from './components/userTable/UserTable'
import Pagination from './components/UI/pagination/Pagination'
import { useSortedUsers } from './hooks/useSortedUsers'
import UserSort from './components/userSort/userSort'

function App() {
  const [users, setUsers] = useState([])
  const [modalUser, setModalUser] = useState()
  const [error, setError] = useState()
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)
  const [sort, setSort] = useState({sort: 'name', order: 'default'})

  const [isUsersLoading, loadUsers] = useLoading(async () => {
    const data = await UsersService.getAll(30, 30 * page)
    setUsers(data.users)
    setTotal(data.total)
  }, error => setError(error.message))

  const [isUsersSearching, searchUsers] = useLoading(async (query) => {
    const data = await UsersService.search(query, 30, 30 * page)
    setUsers(data.users)
    setTotal(data.total)
  }, error => setError(error.message))

  const isLoading = isUsersLoading || isUsersSearching

  useEffect(() => {
    loadUsers()
  }, [page])
  
  const onRowClick = (id) => {
    setModalUser(users.find(x => x.id === id))
  }

  const usersData = useMemo(() => users.map(user => ({...user, name: `${user.lastName} ${user.firstName} ${user.maidenName}`, address: user.address.address})), [users, sort])
  const sortedUsers = useSortedUsers(usersData, sort)

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
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <UserSort sort={sort} setSort={setSort}/>
        <Pagination total={total} limit={30} page={page} setPage={setPage}/>
      </div>
      <UserTable users={sortedUsers} onRowClick={onRowClick} className='user-table'/>
      {isLoading && <Loader/>}
    </div>
  )
}

export default App
