import axios from 'axios'
import config from '../../../configure'

//get ค่า url จากไฟล์ config
const BASE_URL = config.BASE_URL

export const saveTempConfig = (values) => {

    return (dispatch) => {
        //รูปแบบการใช้ axios อีกรูปแบบในการจะบุ method ที่ต้องการ
        //ต้องส่ง heder ชื่อ authorization โดยส่ง token เขาไปด้วยครับ
        return axios({
            method: 'post',
            url: `${BASE_URL}/temperatureControl/configTemperature`,
            data: values,
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
            //headers: { authorization: localStorage.getItem('token') }
        }).then(results => {
            //เมื่อข้อมูลส่งกลับมาต้องเช็คสถานะก่อนว่า code ซ�้ำหรือไม่
            //โดยserver จะส่ง object ที่ชื่อว่า status และ message กลับมา         
            dispatch({ type: 'SAVE_TEMPCONFIG_SUCCESS' })
        }).catch(err => {
            //กรณี error
            dispatch({ type: 'SAVE_TEMPCONFIG_REJECTED', payload: err.message })
        })
    }
}

export const getTemp = ({greenHouseId,count}) => {

    let values = {
        greenHouseId: greenHouseId
    }
    
    return (dispatch) => {
        //รูปแบบการใช้ axios อีกรูปแบบในการจะบุ method ที่ต้องการ
        //ต้องส่ง heder ชื่อ authorization โดยส่ง token เขาไปด้วยครับ
        if(count==0){
            dispatch({ type: 'LOAD_TEMP_PENDING' })
        }

        return axios({
            method: 'post',
            url: `${BASE_URL}/temperatureControl/showTemperature`,
            data: values,
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
            //headers: { authorization: localStorage.getItem('token') }
        }).then(result => {
            //เมื่อข้อมูลส่งกลับมาต้องเช็คสถานะก่อนว่า code ซ�้ำหรือไม่
            //โดยserver จะส่ง object ที่ชื่อว่า status และ message กลับมา
            dispatch({ type: 'LOAD_TEMP_SUCCESS', payload: result.data })           
        }).catch(err => {
            //กรณี error         
            dispatch({ type: 'LOAD_TEMP_REJECTED', payload: err.message })
        })
    }
}

export const getTempHistory = ({greenHouseId}) => {

    let values = {
        greenHouseId: greenHouseId
    }
    return (dispatch) => {
        //รูปแบบการใช้ axios อีกรูปแบบในการจะบุ method ที่ต้องการ
        //ต้องส่ง heder ชื่อ authorization โดยส่ง token เขาไปด้วยครับ
        dispatch({ type: 'LOAD_TEMPHISTORY_PENDING' })
        return axios({
            method: 'post',
            url: `${BASE_URL}/temperatureControl/showTemperatureHistory`,
            data: values,
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
            //headers: { authorization: localStorage.getItem('token') }
        }).then(result => {
            //เมื่อข้อมูลส่งกลับมาต้องเช็คสถานะก่อนว่า code ซ�้ำหรือไม่
            //โดยserver จะส่ง object ที่ชื่อว่า status และ message กลับมา
            dispatch({ type: 'LOAD_TEMPHISTORY_SUCCESS', payload: result.data })           
        }).catch(err => {
            //กรณี error         
            dispatch({ type: 'LOAD_TEMPHISTORY_REJECTED', payload: err.message })
        })
    }
}

export const saveHumidityConfig = (values) => {

    return (dispatch) => {
        //รูปแบบการใช้ axios อีกรูปแบบในการจะบุ method ที่ต้องการ
        //ต้องส่ง heder ชื่อ authorization โดยส่ง token เขาไปด้วยครับ
        return axios({
            method: 'post',
            url: `${BASE_URL}/temperatureControl/configHumidity`,
            data: values,
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
            //headers: { authorization: localStorage.getItem('token') }
        }).then(results => {
            //เมื่อข้อมูลส่งกลับมาต้องเช็คสถานะก่อนว่า code ซ�้ำหรือไม่
            //โดยserver จะส่ง object ที่ชื่อว่า status และ message กลับมา         
            dispatch({ type: 'SAVE_HUMIDITYCONFIG_SUCCESS' })           
        }).catch(err => {
            //กรณี error
            dispatch({ type: 'SAVE_HUMIDITYCONFIG_REJECTED', payload: err.message })
        })
    }
}

export const getHumidity = ({greenHouseId,count}) => {

    let values = {
        greenHouseId: greenHouseId
    }

    return (dispatch) => {
        //รูปแบบการใช้ axios อีกรูปแบบในการจะบุ method ที่ต้องการ
        //ต้องส่ง heder ชื่อ authorization โดยส่ง token เขาไปด้วยครับ
        if(count === 0){
            dispatch({ type: 'LOAD_HUMIDITY_PENDING' })
        }
        
        return axios({
            method: 'post',
            url: `${BASE_URL}/temperatureControl/showHumidity`,
            data: values,
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
            //headers: { authorization: localStorage.getItem('token') }
        }).then(result => {
            //เมื่อข้อมูลส่งกลับมาต้องเช็คสถานะก่อนว่า code ซ�้ำหรือไม่
            //โดยserver จะส่ง object ที่ชื่อว่า status และ message กลับมา
            dispatch({ type: 'LOAD_HUMIDITY_SUCCESS', payload: result.data })           
        }).catch(err => {
            //กรณี error         
            dispatch({ type: 'LOAD_HUMIDITY_REJECTED', payload: err.message })
        })
    }
}

export const getHumidityHistory = ({greenHouseId}) => {

    let values = {
        greenHouseId: greenHouseId
    }
    return (dispatch) => {
        //รูปแบบการใช้ axios อีกรูปแบบในการจะบุ method ที่ต้องการ
        //ต้องส่ง heder ชื่อ authorization โดยส่ง token เขาไปด้วยครับ
        dispatch({ type: 'LOAD_HUMIDITYHISTORY_PENDING' })
        return axios({
            method: 'post',
            url: `${BASE_URL}/temperatureControl/showHumidityHistory`,
            data: values,
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
            //headers: { authorization: localStorage.getItem('token') }
        }).then(result => {
            //เมื่อข้อมูลส่งกลับมาต้องเช็คสถานะก่อนว่า code ซ�้ำหรือไม่
            //โดยserver จะส่ง object ที่ชื่อว่า status และ message กลับมา
            dispatch({ type: 'LOAD_HUMIDITYHISTORY_SUCCESS', payload: result.data })           
        }).catch(err => {
            //กรณี error         
            dispatch({ type: 'LOAD_HUMIDITYHISTORY_REJECTED', payload: err.message })
        })
    }
}
