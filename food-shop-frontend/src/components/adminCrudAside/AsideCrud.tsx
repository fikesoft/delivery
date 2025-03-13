import { Link } from 'react-router-dom'
const AsideCrud = () => {
  return (
    <div className='menu'>
      <Link to="/admin/pizza-crud/create">Create</Link>
      <Link to="/admin/pizza-crud/read">Read</Link>
      <Link to="/admin/pizza-crud/update">Update && Delete</Link>
    </div>
   
  )
}

export default AsideCrud