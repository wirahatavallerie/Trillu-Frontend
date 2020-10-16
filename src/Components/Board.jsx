import React, {useEffect, useContext, useState} from 'react'
import {withRouter} from 'react-router-dom'
import Head from './Head'
import '../board.css'
import axios from 'axios'
import { Auth } from './Authorization'

const Board = ({match}) => {
    const {token} = useContext(Auth)
    const [boardData, setBoardData] = useState([])
    const [listData, setListData] = useState([])
    const [memberData, setMemberData] = useState([])
    const [isAddMember, setIsAddMember] = useState(false)
    const [isCreateList, setIsCreateList] = useState(false)
    const [isRemoveMember, setIsRemoveMember] = useState(false)
    const [listCardID, setListCardID] = useState(false)
    const [updateListValue, setUpdateListValue] = useState(0)
    const [updateCardValue, setUpdateCardValue] = useState(0)
    const [listID, setListID] = useState(false)
    const [cardID, setCardID] = useState(false)
    const [moveCardID, setMoveCardID] = useState(false)
    const [moveListCardID, setMoveListCardID] = useState(false)
    const [moveID, setMoveID] = useState(false)
    const [addMemberData, setAddMemberData] = useState({username: ''})
    const [createListData, setCreateListData] = useState({name: ''})
    const [updateListData, setUpdateListData] = useState({name: ''})
    const [createCardData, setCreateCardData] = useState({task: ''})
    const [updateCardData, setUpdateCardData] = useState({task: ''})
    const list = () => {
        axios({
            method: 'get',
            url: `http://localhost:8000/v1/board/${match.params.id}`,
            params: {
                token: `${token}`
            }
        })
        .then(res=>{
            setBoardData(res.data)
            setListData(res.data.lists)
            setMemberData(res.data.members)
        })
        .catch(err=>{
            if(err.response.status === 401 || err.response.status === 422){
                alert(err.response.data.message)
            }
        })
    }

    const addMember = () => {
        axios({
            method: 'post',
            url: `http://localhost:8000/v1/board/${match.params.id}/member`,
            params: {
                token: `${token}`
            },
            data: {
                username: addMemberData.username
            }
        })
        .then(res=>{
            setIsAddMember(false)
        })
        .catch(err=>{
            if(err.response.status === 401 || err.response.status === 422){
                alert(err.response.data.message)
            }
        })
    }

    const deleteMember = (id) => {
        axios({
            method: 'delete',
            url: `http://localhost:8000/v1/board/${match.params.id}/member/${id}`,
            params: {
                token: `${token}`
            }
        })
        .then(res=>{
            setIsAddMember(false)
            setIsRemoveMember(false)
        })
        .catch(err=>{
            if(err.response.status === 401 || err.response.status === 422){
                alert(err.response.data.message)
            }
        })
    }

    const createList = () => {
        axios({
            method: 'post',
            url: `http://localhost:8000/v1/board/${match.params.id}/list`,
            params: {
                token: `${token}`
            },
            data: {
                name: createListData.name
            }
        })
        .then(res=>{
            setIsCreateList(false)
        })
        .catch(err=>{
            if(err.response.status === 401 || err.response.status === 422){
                alert(err.response.data.message)
            }
        })
    }

    const updateList = () => {
        axios({
            method: 'put',
            url: `http://localhost:8000/v1/board/${match.params.id}/list/${listID}`,
            params: {
                token: `${token}`
            },
            data: {
                name: updateListData.name
            }
        })
        .then(res=>{
            setListID(false)
            setUpdateListValue(0)
        })
        .catch(err=>{
            if(err.response.status === 401 || err.response.status === 422){
                alert(err.response.data.message)
            }
        })
    }

    const deleteList = () => {
        axios({
            method: 'delete',
            url: `http://localhost:8000/v1/board/${match.params.id}/list/${listID}`,
            params: {
                token: `${token}`
            }
        })
        .then(res=>{
            setListID(false)
            setUpdateListValue(0)
        })
        .catch(err=>{
            if(err.response.status === 401 || err.response.status === 422){
                alert(err.response.data.message)
            }
        })
    }

    const moveRight = (id) => {
        setMoveID(id)
        axios({
            method: 'post',
            url: `http://localhost:8000/v1/board/${match.params.id}/list/${id}/right`,
            params: {
                token: `${token}`
            }
        })
        .then(res=>{
            setMoveID(false)
        })
        .catch(err=>{
            if(err.response.status === 401 || err.response.status === 422){
                alert(err.response.data.message)
            }
        })
    }

    const moveLeft = (id) => {
        setMoveID(id)
        axios({
            method: 'post',
            url: `http://localhost:8000/v1/board/${match.params.id}/list/${id}/left`,
            params: {
                token: `${token}`
            }
        })
        .then(res=>{
            setMoveID(false)
        })
        .catch(err=>{
            if(err.response.status === 401 || err.response.status === 422){
                alert(err.response.data.message)
            }
        })
    }

    const createCard = () => {
        axios({
            method: 'post',
            url: `http://localhost:8000/v1/board/${match.params.id}/list/${listCardID}/card`,
            params: {
                token: `${token}`
            },
            data: {
                task: createCardData.task
            }
        })
        .then(res=>{
            setListCardID(false)
        })
        .catch(err=>{
            if(err.response.status === 401 || err.response.status === 422){
                alert(err.response.data.message)
            }
        })
    }

    const updateCard = () => {
        axios({
            method: 'put',
            url: `http://localhost:8000/v1/board/${match.params.id}/list/${listCardID}/card/${cardID}`,
            params: {
                token: `${token}`
            },
            data: {
                task: updateCardData.task
            }
        })
        .then(res=>{
            setCardID(false)
            setUpdateCardValue(0)
        })
        .catch(err=>{
            if(err.response.status === 401 || err.response.status === 422){
                alert(err.response.data.message)
            }
        })
    }

    const deleteCard = () => {
        axios({
            method: 'delete',
            url: `http://localhost:8000/v1/board/${match.params.id}/list/${listCardID}/card/${cardID}`,
            params: {
                token: `${token}`
            }
        })
        .then(res=>{
            setCardID(false)
            setUpdateCardValue(0)
        })
        .catch(err=>{
            if(err.response.status === 401 || err.response.status === 422){
                alert(err.response.data.message)
            }
        })
    }

    const moveUp = (id) => {
        axios({
            method: 'post',
            url: `http://localhost:8000/v1/card/${id}/up`,
            params: {
                token: `${token}`
            }
        })
        .then(res=>{
            setMoveCardID(false)
            setMoveListCardID(false)
        })
        .catch(err=>{
            if(err.response.status === 401 || err.response.status === 422){
                alert(err.response.data.message)
            }
        })
    }

    const moveAnotherList = (id) => {
        axios({
            method: 'post',
            url: `http://localhost:8000/v1/card/${moveListCardID}/move/${id}`,
            params: {
                token: `${token}`
            }
        })
        .then(res=>{
            setMoveListCardID(false)
        })
        .catch(err=>{
            if(err.response.status === 401 || err.response.status === 422){
                alert(err.response.data.message)
            }
        })
    }

    const moveDown = (id) => {
        setMoveID(id)
        axios({
            method: 'post',
            url: `http://localhost:8000/v1/card/${id}/down`,
            params: {
                token: `${token}`
            }
        })
        .then(res=>{
            setMoveID(false)
            setMoveListCardID(false)
        })
        .catch(err=>{
            if(err.response.status === 401 || err.response.status === 422){
                alert(err.response.data.message)
            }
        })
    }

    const addMemberHandler = e => {
        setAddMemberData({
            ...addMemberData,
            [e.target.name]: e.target.value
        })
    }

    const memberFeature = (e, id) =>{
        if(e.key === 'Enter'){
            if(e.target.value !== ''){
                addMember()
            }
        }
    }

    const removeMemberConfirm = (id) => {
        if(window.confirm('Delete Team Member?') === true){
            setIsRemoveMember(true)
            deleteMember(id)
        }
    }

    const createListHandler = (e) => {
        setCreateListData({
            ...createList,
            [e.target.name]: e.target.value
        })
    }

    const createListComplete = e => {
        if(e.key === 'Enter'){
            createList()
        }
    }

    const updateListHandler = e => {
        setUpdateListValue(e.target.value)
        setUpdateListData({
            ...updateListData,
            [e.target.name]: e.target.value
        })
    }

    const listFeature = e => {
        if(e.key === 'Enter'){
            if(e.target.value === ''){
                deleteList()
            }else{
                updateList()
            }
        }
    }

    const createCardHandler = e => {
        setCreateCardData({
            ...createCardData,
            [e.target.name]: e.target.value
        })
    }

    const createCardComplete = e => {
        if(e.key === 'Enter'){
            createCard()
        }
    }

    const updateCardHandler = e =>{
        setUpdateCardValue(e.target.value)
        setUpdateCardData({
            ...updateCardData,
            [e.target.name]: e.target.value
        })
    }

    const cardFeature = e => {
        if(e.key === 'Enter'){
            if(e.target.value === ''){
                deleteCard()
            }else{
                updateCard()
            }
        }
    }

    useEffect(()=>{
        list()
    }, [token, isAddMember, isRemoveMember, isCreateList, listID, moveID, listCardID, cardID, moveCardID, moveListCardID])

    return(
        <>
        <Head />
        <div className="container-board" onDoubleClick={() => {
            setIsAddMember(false)
            setIsCreateList(false)
            setListID(false)
            setCardID(false)
            setListID(false)
            setListCardID(false)
        }}>
            <div className="team-container">
                <div className="board-name">{boardData.name}</div>
                {
                    Object.assign(memberData).map((el, key) => {
                        return(
                            <div className="member" key={key} onClick={(id) => removeMemberConfirm(el.id)} title={el.first_name+ ' '+ el.last_name}>{el.initial}</div>
                        )
                    })
                }
                <span className="button">
                    {
                        isAddMember ? (
                            <input type="text" name="username" onKeyUp={e=> memberFeature(e)}
                            onChange={e=> addMemberHandler(e)} placeholder="Username" autoFocus />
                        ) : (
                            <span onClick={() => setIsAddMember(true)} >+ Add member</span>
                        )
                    }
                </span>
            </div>
            <div className="card-container">
                <div className="content">
                    {
                        Object.assign(listData).map((el, key)=>{
                            return(
                                <div className="list" key={key} onClick={() => moveAnotherList(el.id)}>
                                    <header>
                                        {
                                            listID === el.id ? (
                                                <input type="text" name="name" value={updateListValue === 0 ? el.name : updateListValue} 
                                                placeholder="Are you sure want to delete?" onChange={(e) => updateListHandler(e)} 
                                                onKeyUp={e=> listFeature(e)} autoFocus />
                                            ) : (
                                                <span onClick={() => setListID(el.id)}>{el.name}</span>
                                            )
                                        }
                                    </header>
                                    <div className="cards">
                                        {
                                            Object.assign(el.cards).map((el,key) =>{
                                                return(
                                                    <div className="card" key={key} onClick={() => setMoveListCardID(el.id)}>
                                                        <div className="card-content">
                                                            {
                                                                cardID === el.id ? (
                                                                    <input type="text" name="task" value={updateCardValue === 0 ? el.task : updateCardValue} 
                                                                    placeholder="Are you sure want to delete?" onKeyUp={(e) => cardFeature(e)}
                                                                    onChange={(e) => updateCardHandler(e)} autoFocus />
                                                                ) : (
                                                                    <span onClick={() => setCardID(el.id)}>{el.task}</span>
                                                                )
                                                            }
                                                        </div>
                                                        <div className="control" onMouseEnter={() => setMoveCardID(el.id)}>
                                                            <span onClick={() => moveUp(el.id)}>&uarr;</span>
                                                            <span onClick={() => moveDown(el.id)}>&darr;</span>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className="button">
                                        {
                                            listCardID === el.id ? (
                                                <input name="task" onChange={(e) => createCardHandler(e)} type="text" 
                                                placeholder="New card" onKeyUp={e => createCardComplete(e)} autoFocus></input>
                                            ) : (
                                                <span onClick={() => setListCardID(el.id)}>+ Add new card</span>
                                            )
                                        }
                                    </div>
                                    <div className="control">
                                        <span onClick={() => moveLeft(el.id)}>&larr;</span>
                                        <span onClick={() => moveRight(el.id)}>&rarr;</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className="list button">
                        <span>
                            {
                                isCreateList ? (
                                    <input type="text" name="name" onChange={e => createListHandler(e)} 
                                    onKeyUp={(e) => createListComplete(e)}
                                    placeholder="New List Name" autoFocus />
                                ) : ( 
                                    <span onClick={() => setIsCreateList(true)}>+ Add another list</span>
                                )
                            }
                        </span>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default withRouter(Board)