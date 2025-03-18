import { Outlet } from 'react-router-dom'
import AsideCrud from '../components/adminCrudAside/AsideCrud'
const CrudLayout = () => {
  return (
    <div className='aside-action'>
        <div className='aside'>
          <AsideCrud/>
        </div>
        <div className='content'>
          <Outlet /> 
        </div>
    </div>
  )
}

export default CrudLayout