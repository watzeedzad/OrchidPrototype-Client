//กำหนดค่าเริ่มต้นให้ state เช่น เช็คว่าข้อมูลที่ดึงมา error หรือไม่เราก็จะเช็คจาก isRejected
//ซึ่งถ้าเราไม่กำหนด state  เริ่มต้นก็จะไม่มี object ชื่อ isRejected ให้เรียกใช้งาน
const initialState = {
    projects: { data: null, isLoading: true, isRejected: false },
    projectSave: { data: null, isLoading: true, isRejected: false },
    projectDelete: { success: false, isLoading: true, isRejected: false },
    project: { data: null , isLoading: true}
}

export default (state = initialState, action) => {
    switch (action.type) {
        
        case 'LOAD_PROJECTS_PENDING':
            return { ...state, projects: { data: null, isLoading: true, isRejected: false } }
        case 'LOAD_PROJECTS_SUCCESS':
            return { ...state, projects: { data: action.payload, isLoading: false, isRejected: false } }
        case 'LOAD_PROJECTS_REJECTED':
            return { ...state, projects: { data: action.payload, isLoading: false, isRejected: true } }

        case 'SAVE_PROJECT_SUCCESS':
            return { ...state, projectSave: { data: null, isLoading: false, isRejected: false } }
        case 'SAVE_PROJECT_REJECTED':
            return { ...state, projectSave: { data: action.payload, isLoading: false, isRejected: true } }

        case 'DELETE_PROJECT_SUCCESS':
            return { ...state, projectDelete: { data: true, isLoading: false, isRejected: false } }
        case 'DELETE_PROJECT_REJECTED':
            return { ...state, projectDelete: { data: action.payload, isLoading: false, isRejected: true } }

        case 'SET_PROJECT':
            return { ...state, project: { data: action.payload, isLoading: false} }

        default:
            return state
    }
}