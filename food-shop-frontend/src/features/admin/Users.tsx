import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { adminApi } from "../../api";
interface User {
  _id:string,
  username: string;
  login: string;
  deviceInfo: {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    browser: string;
    platform: string;
    screenResolution: string;
  };
  isAdmin: boolean;
  location: {
    country: string;
  };
  createdAt: string; // ISO date string
}

const Users = () => {
  const [percentage,setPercentage] = useState(25);
  const [ users,setUsers] =useState<User[]>([]);
  const [loading,setLoading] = useState(false);

  const toogglePercentage =(value:number):void =>{
      setPercentage(value)
  }
  const handleUsers =  async ()=>{
    setLoading(true)
    try {
      const response = await adminApi.getUsers(percentage)
      setUsers(response.data.data)
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching users:", error);
    }finally{
      setTimeout(()=>{setLoading(false)},2000)
    }
  }
  return (
    <div className='users-container'>
      {/* Search part of the users */}
      <div className='user-custom-search'>
        <h1>Give percentage of total users </h1>
        <div>
          <CiSearch  className="button-search-user" onClick={handleUsers}/>
          <ul>
            <li>
              <button className={`percentage-button ${percentage === 100? "active" : "" }`} onClick={()=>(toogglePercentage(100))}>100%</button>
            </li>
            <li>
              <button className={`percentage-button ${percentage === 75? "active" : "" }`} onClick={()=>(toogglePercentage(75))}>75%</button>
            </li>
            <li>
              <button className={`percentage-button ${percentage === 50? "active" : "" }`} onClick={()=>(toogglePercentage(50))}>50%</button>
            </li>
            <li>
              <button className={`percentage-button ${percentage === 25? "active" : "" }`} onClick={()=>(toogglePercentage(25))}>25%</button>
            </li>
          </ul>
          <input
            placeholder="Other"
            value={percentage || ""}
            onChange={(event) => {
              const value = event.target.value;
              const parsedValue = parseInt(value);
              setPercentage(isNaN(parsedValue) ? 0 : parsedValue); // Use 0 instead of NaN
            }}
            className="percentage-input"
          />

      </div>
      </div>
      <table className="user-data">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Device Info</th>
              <th>Browser</th>
              <th>Platform</th>
              <th>Screen Resolution</th>
              <th>Admin</th>
              <th>Country</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
          {loading ? (
              "Loading..."
            ) : users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id}>
                  <th>{user.username}</th>
                  <th>{user.login}</th>
                  <th>
                    {user.deviceInfo.isMobile
                      ? "Mobile"
                      : user.deviceInfo.isTablet
                      ? "Tablet"
                      : user.deviceInfo.isDesktop
                      ? "Desktop"
                      : "Unknown"}
                  </th>
                  <th>{user.deviceInfo.browser}</th>
                  <th>{user.deviceInfo.platform}</th>
                  <th>{user.deviceInfo.screenResolution}</th>
                  <th>{user.isAdmin ? "Yes" : "No"}</th> {/* Convert boolean to Yes/No */}
                  <th>{user.location.country}</th>
                  <th>{new Date(user.createdAt).toLocaleDateString()}</th> {/* Format date */}
                </tr>
              ))
            ) : (
              "User not found"
            )}
         
          </tbody>
      </table>

      {/*Table show the information  */}
    </div>
  )
}

export default Users