const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 8080;

app.use(cors());
// 階層の書き方がこれでいいか確認
app.use('/getphotos', express.static(__dirname + "/../../Pictures/intern/"));

const { exec } = require('child_process');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// 年月日時分秒の文字列を取得する関数
function getDateString() {
  const date = new Date();

  const year = date.getFullYear().toString();
  const month = ("00" + (date.getMonth() + 1)).slice(-2);
  const day = ("00" + date.getDate()).slice(-2);
  const hours = ("00" + date.getHours()).slice(-2);
  const minutes = ("00" + date.getMinutes()).slice(-2);
  const seconds = ("00" + date.getSeconds()).slice(-2);

  const dateString = year + month + day + hours + minutes + seconds;

  return dateString;
}

app.get('/takephoto', (req, res) => {
  const dateString = getDateString();
  exec(`fswebcam -r 1280x760 ~/Pictures/intern/picture_${dateString}.jpg`);
});

app.get('/deletephoto/*', (req, res) => {
  const fileName = req.path.replace('/deletephoto/', '');
  fs.unlinkSync(__dirname + "/../../Pictures/intern/" + fileName);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// 画像を取得する
app.get('/updatephoto', (req, res) => {
  const pictures = fs.readdirSync(__dirname + "/../../Pictures/intern/");
  res.json(pictures);
});

