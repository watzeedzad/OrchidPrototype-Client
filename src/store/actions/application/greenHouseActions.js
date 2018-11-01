import axios from 'axios'
import config from 'configure'

//ดึงเอา url ที่ใช้ fetch data มาเก็บไว้ใน BASE_URL
const BASE_URL = config.BASE_URL

//ฟังก์ชันดึงข้อมูลผู้ใช้ทุกรายการโดยจะส่ง query ชื่อ term เข้าไปด้วยเพื่อนำไป filter
//สำหรับ es6 เราสามารถกำหนดค่า default ของ parameter ได้ด้วยครับ
export const showGreenHouse = () => {

    return (dispatch) => {
        //ก่อนดึงข้อมูลสั่ง dispatch ให้ reducer รู้ว่าก่อนเพื่อจะแสดง loading
        dispatch({ type: 'LOAD_USERS_PENDING' })
        return axios({
            method: 'post',
            url: `${BASE_URL}/greenHouse/showGreenHouse`,
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
            //headers: { authorization: localStorage.getItem('token') }
        }).then(results => {
            //เมื่อข้อมูลส่งกลับมาก็สั่ง dispatch ให้ reducer รู้พร้อมส่ง payload
            //เนื่องจากเราใช้ axios แทน fetch ดังนั้นข้อมูลที่ส่งมาจะอยู่ใน object ชื่อ data
            //ที่มี Array อยู่ข้างใน ดังนั้นนำไป data.map ได้เลยครับ
            dispatch({ type: 'LOAD_GREENHOUSES_SUCCESS', payload: results.data })
        }).catch(err => {
            //กรณี error
            dispatch({ type: 'LOAD_GREENHOUSES_REJECTED', payload: err.message })
        })
    }
}