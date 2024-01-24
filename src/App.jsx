import { useEffect, useMemo, useState } from 'react'
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

function App() {
  const [users, setUsers] = useState([])
  const [modalUser, setModalUser] = useState()
  const [error, setError] = useState()
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)
  const [sort, setSort] = useState({sort: 'name', order: 'default'})
  const [query, setQuery] = useState('')

  const [isLoading, loadUsers] = useLoading(async (page) => {
    let data;
    if (query) {
      data = await UsersService.search(query, 30, 30 * page)
    } else {
      data = await UsersService.getAll(30, 30 * page)
    }
    setUsers(data.users)
    setTotal(data.total)
  }, error => setError(error.message))

  useEffect(() => {
    loadUsers(0)
  }, [])
  
  const onSearch = () => {
    setPage(0)
    loadUsers(0)
  }

  const onRowClick = (id) => {
    setModalUser(users.find(x => x.id === id))
  }

  const changePage = (page) => {
    setPage(page)
    loadUsers(page)
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
      <Search className='search' onSearch={onSearch} query={query} setQuery={setQuery}/>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <UserSort sort={sort} setSort={setSort}/>
        <Pagination total={total} limit={30} page={page} setPage={changePage}/>
      </div>
      <UserTable users={sortedUsers} onRowClick={onRowClick} className='user-table'/>
      {isLoading && <Loader/>}
    </div>
  )
}

export default App
