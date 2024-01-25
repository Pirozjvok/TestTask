import { useEffect, useState } from 'react'
import './App.css'
import UsersService from './api/usersService'
import Search from './components/userSearch/UserSearch'
import { useLoading } from './hooks/useLoading'
import UserInfoModal from './components/userInfoModal/UserInfoModal'
import Alert from './components/UI/alert/Alert'
import Loader from './components/UI/loader/Loader'
import UserTable from './components/userTable/UserTable'
import Pagination from './components/UI/pagination/Pagination'
import { useSortedUsers } from './hooks/useSortedUsers'
import { usePagedUsers } from './hooks/usePagedUsers'
import UserSort from './components/userSort/userSort'

function App() {
  const [users, setUsers] = useState([])
  const [modalUser, setModalUser] = useState()
  const [error, setError] = useState()
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(30)
  const [sort, setSort] = useState({sort: 'name', order: 'default'})

  const [isLoading, loadUsers] = useLoading(async () => {
    setError(null)
    setUsers(await UsersService.getAll())
  }, error => setError(error.message))

  const [isSearching, searchUsers] = useLoading(async (query) => {
    setError(null)
    setUsers(await UsersService.search(query))
  }, error => setError(error.message))

  useEffect(() => { 
    loadUsers() 
  }, [])

  const onRowClick = id => setModalUser(users.find(x => x.id === id))

  const sortedUsers = useSortedUsers(users, sort)
  const pagedUsers = usePagedUsers(sortedUsers, page, limit)

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
      <div className='sortpag'>
        <UserSort sort={sort} setSort={setSort}/>
        <Pagination total={users.length} limit={limit} page={page} setPage={setPage}/>
      </div>
      <UserTable users={pagedUsers} onRowClick={onRowClick} className='user-table'/>
      {isLoading && <Loader text="Загрузка"/>}
      {isSearching && <Loader text="Поиск"/>}
    </div>
  )
}

export default App
