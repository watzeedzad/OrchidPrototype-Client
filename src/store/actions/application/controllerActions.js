import axios from 'axios'
import config from 'configure'

//get ค่า url จากไฟล์ config
const BASE_URL = config.BASE_URL

export const getGreenHouse = () => {

    return (dispatch) => {
        //รูปแบบการใช้ axios อีกรูปแบบในการจะบุ method ที่ต้องการ
        //ต้องส่ง heder ชื่อ authorization โดยส่ง token เขาไปด้วยครับ
        dispatch({ type: 'LOAD_GREENHOUSES_PENDING' })
        return axios({
            method: 'post',
            url: `${BASE_URL}/controllerManagement/showAllGreenHouse`,
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
            //headers: { authorization: localStorage.getItem('token') }
        }).then(result => {
            //เมื่อข้อมูลส่งกลับมาต้องเช็คสถานะก่อนว่า code ซ�้ำหรือไม่
            //โดยserver จะส่ง object ที่ชื่อว่า status และ message กลับมา
            dispatch({ type: 'LOAD_GREENHOUSES_SUCCESS', payload: result.data })           
        }).catch(err => {
            //กรณี error         
            dispatch({ type: 'LOAD_GREENHOUSES_REJECTED', payload: err.message })
        })
    }
}

export const getGreenHouseController = ({greenHouseId}) => {

    let values = {
        greenHouseId: greenHouseId
    }
    return (dispatch) => {
        //รูปแบบการใช้ axios อีกรูปแบบในการจะบุ method ที่ต้องการ
        //ต้องส่ง heder ชื่อ authorization โดยส่ง token เขาไปด้วยครับ
        dispatch({ type: 'LOAD_GCONTROLLER_PENDING' })
        return axios({
            method: 'post',
            url: `${BASE_URL}/controllerManagement/showAllGreenHouseController`,
            data: values,
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
            //headers: { authorization: localStorage.getItem('token') }
        }).then(result => {
            //เมื่อข้อมูลส่งกลับมาต้องเช็คสถานะก่อนว่า code ซ�้ำหรือไม่
            //โดยserver จะส่ง object ที่ชื่อว่า status และ message กลับมา
            dispatch({ type: 'LOAD_GCONTROLLER_SUCCESS', payload: result.data })           
        }).catch(err => {
            //กรณี error         
            dispatch({ type: 'LOAD_GCONTROLLER_REJECTED', payload: err.message })
        })
    }
}

export const getProject = ({greenHouseId}) => {

    let values = {
        greenHouseId: greenHouseId
    }
    return (dispatch) => {
        //รูปแบบการใช้ axios อีกรูปแบบในการจะบุ method ที่ต้องการ
        //ต้องส่ง heder ชื่อ authorization โดยส่ง token เขาไปด้วยครับ
        dispatch({ type: 'LOAD_PROJECTS_PENDING' })
        return axios({
            method: 'post',
            url: `${BASE_URL}/controllerManagement/showAllProject`,
            data: values,
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
            //headers: { authorization: localStorage.getItem('token') }
        }).then(result => {
            //เมื่อข้อมูลส่งกลับมาต้องเช็คสถานะก่อนว่า code ซ�้ำหรือไม่
            //โดยserver จะส่ง object ที่ชื่อว่า status และ message กลับมา
            dispatch({ type: 'LOAD_PROJECTS_SUCCESS', payload: result.data })           
        }).catch(err => {
            //กรณี error         
            dispatch({ type: 'LOAD_PROJECTS_REJECTED', payload: err.message })
        })
    }
}

export const getProjectController = ({greenHouseId,projectId}) => {

    let values = {
        greenHouseId: greenHouseId,
        projectId: projectId
    }
    return (dispatch) => {
        //รูปแบบการใช้ axios อีกรูปแบบในการจะบุ method ที่ต้องการ
        //ต้องส่ง heder ชื่อ authorization โดยส่ง token เขาไปด้วยครับ
        dispatch({ type: 'LOAD_PCONTROLLER_PENDING' })
        return axios({
            method: 'post',
            url: `${BASE_URL}/controllerManagement/showAllProjectController`,
            data: values,
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
            //headers: { authorization: localStorage.getItem('token') }
        }).then(result => {
            //เมื่อข้อมูลส่งกลับมาต้องเช็คสถานะก่อนว่า code ซ�้ำหรือไม่
            //โดยserver จะส่ง object ที่ชื่อว่า status และ message กลับมา
            dispatch({ type: 'LOAD_PCONTROLLER_SUCCESS', payload: result.data })           
        }).catch(err => {
            //กรณี error         
            dispatch({ type: 'LOAD_PCONTROLLER_REJECTED', payload: err.message })
        })
    }
}

export const deleteController = (values)=>{
    return (dispatch)=>{
        return axios({
            method:'post',
            url:`${BASE_URL}/controllerManagement/deleteController`,
            data: values,
            headers:{'Content-type': 'application/json'},
            withCredentials: true
        }).then(result=>{
            dispatch({type:'DELETE_CONTROLLER_SUCCESS' , payload: result.data});
        }).catch(err=>{
            dispatch({type:'DELETE_CONTROLLER_REJECTED',payload: err.message});
        })
    }
}

export const editController = (values)=>{
    return (dispatch)=>{
        return axios({
            method:'post',
            url:`${BASE_URL}/controllerManagement/editController`,
            data: values,
            headers:{'Content-type': 'application/json'},
            withCredentials: true
        }).then(result=>{
            dispatch({type:'EDIT_CONTROLLER_SUCCESS' , payload: result.data});
        }).catch(err=>{
            dispatch({type:'EDIT_CONTROLLER_REJECTED',payload: err.message});
        })
    }
}

export const getDropdownController = () => {

    return (dispatch) => {
        //รูปแบบการใช้ axios อีกรูปแบบในการจะบุ method ที่ต้องการ
        //ต้องส่ง heder ชื่อ authorization โดยส่ง token เขาไปด้วยครับ
        dispatch({ type: 'LOAD_DROPDOWNCONTROLLER_PENDING' })
        return axios({
            method: 'post',
            url: `${BASE_URL}/controllerManagement/getDropdownController`,
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
            //headers: { authorization: localStorage.getItem('token') }
        }).then(result => {
            //เมื่อข้อมูลส่งกลับมาต้องเช็คสถานะก่อนว่า code ซ�้ำหรือไม่
            //โดยserver จะส่ง object ที่ชื่อว่า status และ message กลับมา
            dispatch({ type: 'LOAD_DROPDOWNCONTROLLER_SUCCESS', payload: result.data })           
        }).catch(err => {
            //กรณี error         
            dispatch({ type: 'LOAD_DROPDOWNCONTROLLER_REJECTED', payload: err.message })
        })
    }
}