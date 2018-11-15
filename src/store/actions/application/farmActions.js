import axios from 'axios';
import config from 'configure';

const BASE_URL = config.BASE_URL

export const loadFarms = () => {

    return (dispatch) => {
        dispatch({ type: 'LOAD_FARMS_PENDING' })
        return axios({
            method: 'post',
            url: `${BASE_URL}/farm/showFarm`,
            headers: { 'Content-Type' : 'application/json'},
            withCredentials: true
        }).then(results => {
            dispatch({ type: 'LOAD_FARMS_SUCCESS', payload: results.data})
        }).catch(err => {
            dispatch({ type: 'LOAD_FARMS_REJECTED', payload: err.message})
        })
    }
}

export const addFarm = (values) => {

    return (dispatch) => {

        return axios({
            method:'post',
            url:`${BASE_URL}/farm/addFarm`,
            data:values,
            headers:{'Content-type': 'application/json'},
            withCredentials:true
        }).then(results=>{
            if(results.data.errorMessage){
                dispatch({type:'SAVE_FARM_REJECTED', payload: results.data.errorMessage})
            }else{
                dispatch({type:'SAVE_FARM_SUCCESS' })
            }
        }).catch(err =>{
            dispatch({type:'SAVE_FARM_REJECTED',payload: err.message})
        })
    }
}


export const editFarm = (values) => {
    return (dispatch) =>{
        return axios({
            method:'post',
            url:`${BASE_URL}/farm/editFarm`,
            data:values,
            headers:{'Content-type': 'application/json'},
            withCredentials: true
        }).then(results => {
            if(results.data.errorMessage){
                dispatch({ type: 'SAVE_FARM_REJECTED', payload: results.data.errorMessage})
            }else{
                dispatch({ type: 'SAVE_FARM_SUCCESS'})
            }
        }).catch(err=>{
            dispatch({type:'SAVE_FARM_REJECTED' , payload: err.message})
        })
    }
}

export const resetStatus = () => {
    return (dispatch) => {
        dispatch({ type: 'SAVE_FARM_SUCCESS' })
    }
}