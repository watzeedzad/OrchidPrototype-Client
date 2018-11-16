import axios from 'axios'
import config from '../../../configure'
import history from '../../../history'

//get ค่า url จากไฟล์ config
const BASE_URL = config.BASE_URL


export const logout = () => {

    return (dispatch) => {
        //รูปแบบการใช้ axios อีกรูปแบบในการจะบุ method ที่ต้องการ
        //ต้องส่ง heder ชื่อ authorization โดยส่ง token เขาไปด้วยครับ
        return axios({
            method: 'post',
            url: `${BASE_URL}/logout/`,
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
            //headers: { authorization: localStorage.getItem('token') }
        }).then(result => {
            //สั่ง redirect ไปหน้าแรก (/)
            history.push('/login')
            dispatch({ type: 'LOGOUT' })
        }).catch(err => {
            //กรณี error     
            dispatch({ type: 'LOGOUT_REJECTED', payload: err.message })
        })
    }
}