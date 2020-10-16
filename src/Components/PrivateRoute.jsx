import React from 'react'
import {Redirect, Route} from 'react-router-dom'

const PrivateRoute = ({component: Component, ...rest}) => {
    const token = localStorage.getItem('token')

    return(
        <Route {...rest} Component={
            () => !token || token === '' ? <Component /> : <Redirect to="/" />
        }
        />
    )
}

export default PrivateRoute