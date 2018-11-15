


const initialState = {
    farms : {data: null ,isLoading: true , isRejected: false},
    farmSave : {data: null, isLoading: true, isRejected: false},
}


export default (state = initialState ,action) => {
    switch(action.type){
        //เก็บ state การดึงข้อมูลฟาร์มทั้งหมด
        case 'LOAD_FARMS_PENDING':
            return {...state, farms: {data:null, isLoading:true, isRejected: false}}
        case 'LOAD_FARMS_SUCCESS':
            return {...state, farms: {data: action.payload, isLoading:false, isRejected:false}}
        case 'LOAD_FARMS_REJECTED':
            return {...state, farms: {data: action.payload, isLoading:false, isRejected:true}}

        //เก็บ state สถานะการบันทึกข้อมูลฟาร์ม
        case 'SAVE_FARM_REJECTED':
            return {...state, farmSave: { data: action.payload, isLoading: false, isRejected: true}}
        case 'SAVE_FARM_SUCCESS':
            return  {...state, farmSave: {data: null, isLoading: false, isRejected: true}}

        default:
            return state
    }
}