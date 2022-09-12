import React, { useState, createContext } from 'react'
export const DataContext = createContext(null);
// export const DataContext = createContext(null);

// export default function DataProvider({children}) {
//     let url = "http://localhost:3001/api/";
//     let imageUrl = "http://localhost:3001/";
//     let [token, setToken] = useState("");

//   return (
//     <DataContext.Provider value={
//         {url,
//         imageUrl,
//         token,
//         setToken,
//         }
//     }>
//         {children}
//     </DataContext.Provider>
//   )
// }
export default function DataProvider({children}){
    let url = "http://127.0.0.1:3001/api/";
    let imageUrl = "http://127.0.0.1:3001/";
    let [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token"): "");
    let [id, setId] = useState(localStorage.getItem("id") ? localStorage.getItem("id") : "");
    const [userInfo, setUserInfo] = useState({
      name: '',
      userName: '',
      email: '',
      phone: '',
      profilePic: '',
      gender: '',
      address: '',
  });

    return(
      <DataContext.Provider value={
        {
          url,
          imageUrl,
          token,
          setToken,
          id,
          setId,
          userInfo,
          setUserInfo,
        }
      }>
        {children}
      </DataContext.Provider>
    )
}
