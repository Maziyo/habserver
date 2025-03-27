const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 5000;
const DATA_FILE = "./db.json";

app.use(express.json());
app.use(cors());

//JSON파일 읽기
const readData = () => {
    try {
        const data = fs.readFileSync(DATA_FILE, "UTF-8");
        return JSON.parse(data);  // 데이터를 객체로 변환하여 반환


    } catch (err) {
        console.error("Error reading data:", err);
        return { text: [] };  // 에러 발생 시 빈 배열 반환 (예: 서버 실행 초기화)
    }
};

//JSON 파일 쓰기
const writeData = (data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2),"UTF-8");

};

//텍스트 목록 조회
app.get("/texts", (req,res) =>{
    console.log("Received GET request on /texts");
    const data = readData();
    res.json(data);
});

//텍스트 추가
app.post("/texts", (req,res) => {
    console.log("받은 데이터:", req.body);
    const data = readData();
    const newText = {id : Date.now(), text : req.body.text};
    
    data.texts.push(newText);
    writeData(data);

    res.json(newText);
});

app.listen(PORT, () => console.log(`서버 실행 중 : http://localhost:${PORT}`));

module.exports = app;