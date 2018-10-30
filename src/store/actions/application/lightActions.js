import axios from 'axios'
import config from 'configure'

//get ค่า url จากไฟล์ config
const BASE_URL = config.BASE_URL

export const saveLightIntensity = (values) => {

    return (dispatch) => {
        //รูปแบบการใช้ axios อีกรูปแบบในการจะบุ method ที่ต้องการ
        //ต้องส่ง heder ชื่อ authorization โดยส่ง token เขาไปด้วยครับ
        return axios({
            method: 'post',
            url: `${BASE_URL}/lightControl/lightIntensityConfig`,
            data: values,
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
            //headers: { authorization: localStorage.getItem('token') }
        }).then(results => {
            //เมื่อข้อมูลส่งกลับมาต้องเช็คสถานะก่อนว่า code ซ�้ำหรือไม่
            //โดยserver จะส่ง object ที่ชื่อว่า status และ message กลับมา         
            dispatch({ type: 'SAVE_LIGHTINTENSITYCONFIG_SUCCESS' })
        }).catch(err => {
            //กรณี error
            dispatch({ type: 'SAVE_LIGHTINTENSITYCONFIG_REJECTED', payload: err.message })
        })
    }
}

export const getLightIntensity = ({greenHouseId,count}) => {

    let values = {
        greenHouseId: greenHouseId
    }
    return (dispatch) => {
        //รูปแบบการใช้ axios อีกรูปแบบในการจะบุ method ที่ต้องการ
        //ต้องส่ง heder ชื่อ authorization โดยส่ง token เขาไปด้วยครับ
        if(count==0){
            dispatch({ type: 'LOAD_LIGHTINTENSITY_PENDING' })
        }
        return axios({
            method: 'post',
            url: `${BASE_URL}/lightControl/showLightIntensity`,
            data: values,
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
            //headers: { authorization: localStorage.getItem('token') }
        }).then(result => {
            //เมื่อข้อมูลส่งกลับมาต้องเช็คสถานะก่อนว่า code ซ�้ำหรือไม่
            //โดยserver จะส่ง object ที่ชื่อว่า status และ message กลับมา
            dispatch({ type: 'LOAD_LIGHTINTENSITY_SUCCESS', payload: result.data })           
        }).catch(err => {
            //กรณี error         
            dispatch({ type: 'LOAD_LIGHTINTENSITY_REJECTED', payload: err.message })
        })
    }
}

export const saveLightVolume = (values) => {

    let maxLightVolume = values.maxLightVolume*60*60*1000
    
    let data = {
        greenHouseId: values.greenHouseId,
        maxLightVolume: maxLightVolume
    }

    return (dispatch) => {
        //รูปแบบการใช้ axios อีกรูปแบบในการจะบุ method ที่ต้องการ
        //ต้องส่ง heder ชื่อ authorization โดยส่ง token เขาไปด้วยครับ
        return axios({
            method: 'post',
            url: `${BASE_URL}/lightControl/lightVolumeConfig`,
            data: data,
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
            //headers: { authorization: localStorage.getItem('token') }
        }).then(results => {
            //เมื่อข้อมูลส่งกลับมาต้องเช็คสถานะก่อนว่า code ซ�้ำหรือไม่
            //โดยserver จะส่ง object ที่ชื่อว่า status และ message กลับมา         
            dispatch({ type: 'SAVE_LIGHTVOLUMECONFIG_SUCCESS' })
        }).catch(err => {
            //กรณี error
            dispatch({ type: 'SAVE_LIGHTVOLUMECONFIG_REJECTED', payload: err.message })
        })
    }
}

export const getLightVolume = ({greenHouseId,count}) => {

    let values = {
        greenHouseId: greenHouseId
    }
    return (dispatch) => {
        //รูปแบบการใช้ axios อีกรูปแบบในการจะบุ method ที่ต้องการ
        //ต้องส่ง heder ชื่อ authorization โดยส่ง token เขาไปด้วยครับ
        if(count==0){
            dispatch({ type: 'LOAD_LIGHTVOLUME_PENDING' })
        }
        return axios({
            method: 'post',
            url: `${BASE_URL}/lightControl/showLightVolume`,
            data: values,
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
            //headers: { authorization: localStorage.getItem('token') }
        }).then(result => {
            //เมื่อข้อมูลส่งกลับมาต้องเช็คสถานะก่อนว่า code ซ�้ำหรือไม่
            //โดยserver จะส่ง object ที่ชื่อว่า status และ message กลับมา
            dispatch({ type: 'LOAD_LIGHTVOLUME_SUCCESS', payload: result.data })           
        }).catch(err => {
            //กรณี error         
            dispatch({ type: 'LOAD_LIGHTVOLUME_REJECTED', payload: err.message })
        })
    }
}