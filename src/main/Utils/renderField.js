import React from 'react';
import {Label} from 'reactstrap';

//renderField จะรับ props ต่างๆ ของ Field ที่ได้จาก redux-form
const renderField = ({ input, label ,type, textarea, autoFocus,readOnly,meta: { touched, error } }) => {
    //ส�ำหรับรูปแบบ Field ที่เป็น TextArea
    const textareaType = <textarea {...input}
        placeholder={label}
        className="form-control" row="3" />;
    //ส�ำหรับรูปแบบ Field ที่เป็น TextBox
    const inputType = <input {...input}
        placeholder={label}
        type={type}
        className="form-control"
        autoFocus={autoFocus} 
        readOnly={readOnly}/>;
    return (
        <div className="form-group row">
            <label className="col-sm-3 col-form-label">{label}</label>
            <div className="col-sm-4">
                {/* เลือกว่าจะแสดงแบบ textarea หรือ input ธรรมดา*/}
                {textarea ? textareaType : inputType}
                {/* ส่วนนี้จะแสดงข้อความ error ที่ได้จากการ validate */}
                {touched && error && <small className="text-danger">{error}</small>}
            </div>
        </div>
    )
}
export default renderField;