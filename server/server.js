const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')

const app = express();
app.use(express.static(path.join(__dirname, "public")))
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

const port = 5000 

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "students"
})
console.log(db);

app.get('/view',function(req,res){
    sql = "SELECT * FROM `student_details`";
    db.query(sql,(err,result) =>{
        if(err) return res.json({message:'somthing error' + err})
        return res.json(result)
    })
    //res.end('my first express app');
});
app.post('/add_user',function(req,res){
    sql = "INSERT INTO `student_details` ( `name`, `email`, `age`, `gender`) VALUES (?, ?, ?, ?) ";
    const values = [
        req.body.name,
        req.body.email,
        req.body.age,
        req.body.gender        
    ]
    db.query(sql,values,(err,result) =>{
        if(err) return res.json({message:'somthing error' + err})
        return res.json({success: "student added successfully"})
    })
})
app.get('/get_user/:id',function(req,res){
    sql = "SELECT * FROM `student_details` WHERE `student_details`.`id` = ?";
    const values = req.params.id;
    db.query(sql,values,(err,result) =>{
        if(err) return res.json({message:'somthing error' + err})
        return res.json(result)
    })
})
app.post('/update_user/:id',function(req,res){
    const id = req.params.id
    sql = "UPDATE `student_details` SET  `name` = ?, email = ?, `age` = ?, `gender` = ? WHERE `student_details`.`id` = ?;";
    const values = [
        req.body.name,
        req.body.email,
        req.body.age,
        req.body.gender,
        id 
    ]
    db.query(sql,values,(err,result) =>{
        if(err) return res.json({message:'somthing error' + err})
        return res.json({success: "student updated successfully"})
    })
})

app.get('/delete_user/:id', (req, res) => {
    const sql = "DELETE FROM `student_details` WHERE `id` = ?";
    const id = req.params.id;

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.json({ message: 'Something went wrong: ' + err });
        }
        return res.json({ success: "Student deleted successfully" });
    });
});


app.listen(port,()=>{
    console.log("Listening")
})