const express = require('express');
const app = express();
const port = 5000;
//const bodyParser = require('body-parser');

const config = require('./config/key');

const { User } = require('./models/User');

//application/x-www-form-urlencoded를 분석해서 가져올 수 있게 함
////app.use(bodyParser.urlencoded({extended: true}))
//application/json
//app.use(bodyParser.json())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI)
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))


//routes

app.get('/', (req, res) => res.send('Hello World~~'));

app.post('/register', (req, res) => {
    // 회원 가입 시 필요한 정보를 client에 가져오면
    // 이것들을 데이터베이스에 넣어준다.
    const user = new User(req.body)

    user.save((err, userInfo) => {
        if(err) return res.json({ success: false, err})
        return res.status(200).json({
            success: true
        })
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
