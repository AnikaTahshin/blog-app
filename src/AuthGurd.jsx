import React from 'react'
import { useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { DataContext } from './DataProvider'

export default function AuthGurd({children}) {
    let {token} = useContext(DataContext);
    let history = useHistory();

    if (token) {
        return children;
    }
    else {
        return history.push("/login");
    }
 
}
