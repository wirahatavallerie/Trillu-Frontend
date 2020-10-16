import React, { useContext } from 'react'
import {Link, withRouter} from 'react-router-dom'
import {Auth} from './Authorization'
import axios from 'axios'

const Head = ({history}) => {
    const {token} = useContext(Auth)
    const {username} = useContext(Auth)

    const logout = () =>{
        axios({
            method: 'get',
            url: 'http://localhost:8000/v1/auth/logout',
            params: {
                token: `${token}`
            }
        })
        .then(res => {
            localStorage.clear()
            setTimeout(()=>{
                history.push('/login')
            }, 500)
        })
        .catch(err=>{
            if(err.response.status === 401){
                alert(err.response.data.message)
            }
        })
    }
    return(
        <div className="header">
            <div>
                <Link to="/">Home</Link>
            </div>
            <div className="right">
                <span>{username}</span>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span onClick={() => logout()}>Logout</span>
            </div>
        </div>
    )
}

export default withRouter(Head)