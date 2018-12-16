# OrchidPrototype-Client (Frontend)

## วิธีการติดตั้ง
 - ทำการ clone ตัวโปรเจคโดยใช้คำสั่ง git clone
 ```
 git clone https://github.com/watzeedzad/OrchidPrototype-Client.git
 ```
 - แก้ไขไฟล์ configure.js ที่อยู่ใน Folder /src โดยที่แก้ไข BASE_URL ให้เป็น url ของ Backend ใน environment นั้น ๆ
 ```
 const config = {
    BASE_URL: 'http://localhost:3001',
 }
 export default config
 ```
 - ติดตั้ง dependentcy โดยที่ใช้คำสั่ง
 ```
 npm install
 ```
## วิธีการรัน
 - ไปที่ root (Folder OrchidPrototype และ OrchidPrototype-Client ต้องอยู่ใน Directory เดียวกัน) และใช้คำสี่ง
 ```
 npm start
 ```
