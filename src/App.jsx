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
import UserSort from './components/userSort/userSort'
import { useUsers } from './hooks/useUsers'

function App() {
  const [users, setUsers] = useState([])
  const [modalUser, setModalUser] = useState()
  const [error, setError] = useState()
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)
  const [limit, setLimit] = useState(30)
  const [sort, setSort] = useState({sort: 'name', order: 'default'})
  const [query, setQuery] = useState('')

  const [isLoading, loadUsers] = useLoading(async (limit, page) => {
    setError(null)
    let data;
    if (query) {
      data = await UsersService.search(query, limit, page)
    } else {
      data = await UsersService.getAll(limit, page)
    }
    setUsers(data.users)
    setTotal(data.total)  
  }, error => setError(error.message))

  useEffect(() => { 
    loadUsers(limit, 0) 
  }, [])
  
  const changePage = page => {
    setPage(page)
    loadUsers(limit, page)
  }

  const onRowClick = id => setModalUser(users.find(x => x.id === id))

  const usersData = useUsers(users)
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
      <Search className='search' onSearch={() => changePage(0)} query={query} setQuery={setQuery}/>
      <div className='sortpag'>
        <UserSort sort={sort} setSort={setSort}/>
        <Pagination total={total} limit={limit} page={page} setPage={changePage}/>
      </div>
      <UserTable users={sortedUsers} onRowClick={onRowClick} className='user-table'/>
      {isLoading && <Loader text="Загрузка"/>}
    </div>
  )
}

export default App
