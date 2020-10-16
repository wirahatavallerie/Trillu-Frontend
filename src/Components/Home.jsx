import React, { useContext, useEffect, useState } from 'react'
import Head from './Head'
import axios from 'axios'
import {Auth} from './Authorization'
import '../home.css'

const Home = ({history}) => {
    const {token} = useContext(Auth)
    const [createBoardData, setCreateBoardData] = useState({
        name: ''
    })
    const [isCreate, setIsCreate] = useState(false)
    const [boardID, setBoardID] = useState(false)
    const [boardValue, setBoardValue] = useState(0)
    const [updateBoardData, setUpdateBoardData] = useState({
        name: ''
    })
    const [boardData, setBoardData] = useState([]);
    const board = () => {
        axios({
            method: 'get',
            url: 'http://localhost:8000/v1/board',
            params: {
                token: `${token}`
            }
        })
        .then(res=>{
            setBoardData(res.data.boards)
        })
        .catch(err=>{
            if(err.response.status === 401 || err.response.status === 422){
                alert(err.response.data.message)
            }
        })
    }

    const createBoard = () => {
        axios({
            method: 'post',
            url: 'http://localhost:8000/v1/board',
            params: {
                token: `${token}`
            },
            data: {
                name: createBoardData.name
            }
        })
        .then(res=>{
            setIsCreate(false)
        })
        .catch(err=>{
            if(err.response.status === 401 || err.response.status === 422){
                alert(err.response.data.message)
            }
        })
    }

    const updateBoard = () => {
        axios({
            method: 'put',
            url: `http://localhost:8000/v1/board/${boardID}`,
            params: {
                token: `${token}`
            }
        })
        .then(res=>{
            setBoardID(false)
            setBoardValue(0)
        })
        .catch(err=>{
            if(err.response.status === 401 || err.response.status === 422){
                alert(err.response.data.message)
            }
        })
    }

    const deleteBoard = () => {
        axios({
            method: 'delete',
            url: `http://localhost:8000/v1/board/${boardID}`,
            params: {
                token: `${token}`
            },
            data: {
                name: updateBoardData.name
            }
        })
        .then(res=>{
            setBoardID(false)
            setBoardValue(0)
        })
        .catch(err=>{
            if(err.response.status === 401 || err.response.status === 422){
                alert(err.response.data.message)
            }
        })
    }

    useEffect(() => {
        board()
    }, [token, isCreate, boardID])

    const createHandler = event => {
        setCreateBoardData({
            ...createBoardData,
            [event.target.name]: event.target.value
        })
    }

    const boardCreateComplete = e => {
        if(e.key === 'Enter'){
            createBoard()
        }
    }

    const boardFeature = e => {
        if(e.key === 'Enter'){
            if(e.target.value === ''){
                deleteBoard();
            }else{
                updateBoard()
            }
        }
    }

    const updateHandler = e => {
        setBoardValue(e.target.value)
        setUpdateBoardData({
            ...updateBoardData,
            [e.target.name]: e.target.value
        })
    }
    return(
        <>
            <Head />
            <div className="container" onDoubleClick={() => {
                setIsCreate(false)
                setBoardID(false)
                setBoardValue(0)
            }}>
                <div className="board-container">
                    {
                        Object.assign(boardData).map((el, key) => {
                            return(
                                boardID !== el.id? (
                                    <div key={key} className="board-wrapper" onDoubleClick={() => history.push(`/board/${el.id}`)}>
                                        <div className="board">
                                            <span onClick={() => setBoardID(el.id)}>{el.name}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div key={key} className="board-wrapper">
                                        <div className="board">
                                            <input type="text" name="name" value={ boardValue === 0 ? el.name : boardValue} 
                                            placeholder="Are you sure want to delete?" onChange={(e) => updateHandler(e)} autoFocus
                                            onKeyUp={e => boardFeature(e)}
                                            />
                                        </div>
                                    </div>
                                )
                            )
                        })
                    }
                    <div className="board-wrapper">
                        {
                            isCreate ? (
                                <div className="board new-board">
                                    <input type="text" name="name" onKeyUp={(e) => boardCreateComplete(e)}
                                    onChange={(event) => createHandler(event)} placeholder="New Board Name" autoFocus />
                                </div>
                            ) : (
                                <>
                                    <div className="board new-board" onClick={() => setIsCreate(true)}>Create new board...</div>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home