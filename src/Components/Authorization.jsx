import React, {useState, createContext, useEffect} from 'react'

export const Auth = createContext({
    token: '',
    username: ''
})

const Authorization = ({children}) => {
    const [token] = useState(localStorage.getItem('token'))
    const [username] = useState(localStorage.getItem('username'))

    useEffect(() => {
        if(!token){
            window.location.replace('/login')
        }
    }, [token])
    return(
        <Auth.Provider value={{ token: token, username: username}}>
            {children}
        </Auth.Provider>
    )
}

export default Authorization