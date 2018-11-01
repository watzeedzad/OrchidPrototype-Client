//กำหนดค่าเริ่มต้นให้ state เช่น เช็คว่าข้อมูลที่ดึงมา error หรือไม่เราก็จะเช็คจาก isRejected
//ซึ่งถ้าเราไม่กำหนด state  เริ่มต้นก็จะไม่มี object ชื่อ isRejected ให้เรียกใช้งาน
const initialState = {
    greenHouses: { data: null, isLoading: true, isRejected: false },
}

export default (state = initialState, action) => {
    switch (action.type) {
        
        case 'LOAD_GREENHOUSES_PENDING':
            return { ...state, greenHouses: { data: null, isLoading: true, isRejected: false } }
        case 'LOAD_GREENHOUSES_SUCCESS':
            return { ...state, greenHouses: { data: action.payload, isLoading: false, isRejected: false } }
        case 'LOAD_GREENHOUSES_REJECTED':
            return { ...state, greenHouses: { data: action.payload, isLoading: false, isRejected: true } }

        default:
            return state
    }
}