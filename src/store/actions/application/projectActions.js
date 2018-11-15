import axios from 'axios'
import config from 'configure'

//ดึงเอา url ที่ใช้ fetch data มาเก็บไว้ใน BASE_URL
const BASE_URL = config.BASE_URL

//ฟังก์ชันดึงข้อมูลผู้ใช้ทุกรายการโดยจะส่ง query ชื่อ term เข้าไปด้วยเพื่อนำไป filter
//สำหรับ es6 เราสามารถกำหนดค่า default ของ parameter ได้ด้วยครับ
export const showProject = (values) => {

    return (dispatch) => {
        //ก่อนดึงข้อมูลสั่ง dispatch ให้ reducer รู้ว่าก่อนเพื่อจะแสดง loading
        dispatch({ type: 'LOAD_PROJECTS_PENDING' })
        return axios({
            method: 'post',
            data: values,
            url: `${BASE_URL}/project/showProject`,
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
            //headers: { authorization: localStorage.getItem('token') }
        }).then(results => {
            //เมื่อข้อมูลส่งกลับมาก็สั่ง dispatch ให้ reducer รู้พร้อมส่ง payload
            //เนื่องจากเราใช้ axios แทน fetch ดังนั้นข้อมูลที่ส่งมาจะอยู่ใน object ชื่อ data
            //ที่มี Array อยู่ข้างใน ดังนั้นนำไป data.map ได้เลยครับ
            dispatch({ type: 'LOAD_PROJECTS_SUCCESS', payload: results.data })
        }).catch(err => {
            //กรณี error
            dispatch({ type: 'LOAD_PROJECTS_REJECTED', payload: err.message })
        })
    }
}

export const addProject = (values,picture) => {

    const formData = new FormData();
    formData.append('picture', picture);
    formData.append('greenHouseId', values.greenHouseId);
    formData.append('name', values.name);
    formData.append('tribeName', values.tribeName);
    formData.append('currentRatio', values.currentRatio);

    return (dispatch) => {
        //รูปแบบการใช้ axios อีกรูปแบบในการจะบุ method ที่ต้องการ
        //ต้องส่ง heder ชื่อ authorization โดยส่ง token เขาไปด้วยครับ
        return axios({
            method:'post',
            url:`${BASE_URL}/project/addProject`,
            data: formData,
            headers:{'Content-type': 'multipart/form-data'},
            withCredentials: true
        }).then(results => {
            //เมื่อข้อมูลส่งกลับมาต้องเช็คสถานะก่อนว่า username ซ้ำหรือไม่
            //โดยserver จะส่ง object ที่ชื่อว่า status และ message กลับมา
            if (results.data.errorMessage) {
                dispatch({ type: 'SAVE_PROJECT_REJECTED', payload: results.data.errorMessage })
            } else {
                dispatch({ type: 'SAVE_PROJECT_SUCCESS' })
            }
        }).catch(err => {
            //กรณี error
            dispatch({ type: 'SAVE_PROJECT_REJECTED', payload: err.message })
        })
    }
}

//ฟังก์ชันลบข้อมูลผู้ใช้ตาม id ที่ส่งเข้ามา
export const deleteProject = (value) => {
    return (dispatch) => {
        return axios({
            method:'post',
            url:`${BASE_URL}/project/deleteProject`,
            data: value,
            headers:{'Content-type': 'application/json'},
            withCredentials: true
        }).then(results => {
            //ลบข้อมูลสำเร็จ
            dispatch({ type: 'DELETE_PROJECT_SUCCESS' })
        }).catch(err => {
            //กรณี error
            dispatch({ type: 'DELETE_PROJECT_REJECTED', payload: err.message })
        })
    }
}

export const editProject = (values,picture) => {

    const formData = new FormData();
    formData.append('picture', picture);
    formData.append('id', values.id);
    formData.append('name', values.name);
    formData.append('tribeName', values.tribeName);
    formData.append('currentRatio', values.currentRatio);

    return (dispatch) => {
        //รูปแบบการใช้ axios อีกรูปแบบในการจะบุ method ที่ต้องการ
        //ต้องส่ง heder ชื่อ authorization โดยส่ง token เขาไปด้วยครับ
        return axios({
            method:'post',
            url:`${BASE_URL}/project/editProject`,
            data: formData,
            headers:{'Content-type': 'application/json',
                    'id' : values.id,
                    'name' : values.name,
                    'tribeName' : values.tribeName,
                    'currentRatio' : values.currentRatio},
            withCredentials: true
        }).then(results => {
            //เมื่อข้อมูลส่งกลับมาต้องเช็คสถานะก่อนว่า username ซ้ำหรือไม่
            //โดยserver จะส่ง object ที่ชื่อว่า status และ message กลับมา
            if (results.data.errorMessage) {
                dispatch({ type: 'SAVE_PROJECT_REJECTED', payload: results.data.errorMessage })
            } else {
                dispatch({ type: 'SAVE_PROJECT_SUCCESS' })
            }
        }).catch(err => {
            //กรณี error
            dispatch({ type: 'SAVE_PROJECT_REJECTED', payload: err.message })
        })
    }
}

export const selectProject = (project) => {
    return (dispatch) => {
        dispatch({ type: 'SET_PROJECT' , payload:project})
    }
}

export const resetStatus = () => {
    return (dispatch) => {
        dispatch({ type: 'SAVE_PROJECTS_SUCCESS' })
    }
}