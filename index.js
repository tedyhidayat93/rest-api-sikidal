const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors");
const logger = require('morgan');
const mysql = require('mysql');
const path = require('path');
const fileUpload = require("express-fileupload");
const jwt = require('jsonwebtoken');


require('dotenv').config();
const PORT = process.env.PORT || 3000;
const base_url = process.env.base_url;

const app = express();
app.use(fileUpload());
app.use(express.json())// add this line
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())


app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin','*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
  
    // Pass to next layer of middleware
    next();
});

app.use(cors())
app.use(logger('dev'));
app.use(express.json({
    limit: '50mb'
}));
app.use(express.urlencoded({
    extended: true,
    parameterLimit: 100000,
    limit: '50mb'
}));

// modul routing here
const user_management = require ('./user_management');
const role = require ('./role');
const jenis_kapal = require('./jenis_kapal');
const penyakit = require('./penyakit');
const profesi = require('./profesi');
const jenis_keadaan_darurat = require('./jenis_keadaan_darurat');
const spesialis_kesehatan = require('./spesialis_kesehatan');
const pelabuhan = require('./pelabuhan');
const kapal = require('./kapal');


// routing here


// ============================== Jenis Kapal ===============================
app.get('/sikidal/v1/jenis_kapal', jenis_kapal.read);
app.get('/sikidal/v1/jenis_kapal/:id', jenis_kapal.read_by_id);
app.post('/sikidal/v1/jenis_kapal/create', jenis_kapal.create);
app.patch('/sikidal/v1/jenis_kapal/update/:id', jenis_kapal.update);
app.delete('/sikidal/v1/jenis_kapal/delete/:id', jenis_kapal.soft_delete);

// ============================== Penyakit ===============================
app.get('/sikidal/v1/penyakit', penyakit.read);
app.get('/sikidal/v1/penyakit/:id', penyakit.read_by_id);
app.post('/sikidal/v1/penyakit/create', penyakit.create);
app.patch('/sikidal/v1/penyakit/update/:id', penyakit.update);
app.delete('/sikidal/v1/penyakit/delete/:id', penyakit.soft_delete);

// ============================== Profesi ===============================
app.get('/sikidal/v1/profesi', profesi.read);
app.get('/sikidal/v1/profesi/:id', profesi.read_by_id);
app.post('/sikidal/v1/profesi/create', profesi.create);
app.patch('/sikidal/v1/profesi/update/:id', profesi.update);
app.delete('/sikidal/v1/profesi/delete/:id', profesi.soft_delete);

// ============================== Jenis Keadaan Darurat ===============================
app.get('/sikidal/v1/jenis_keadaan_darurat', jenis_keadaan_darurat.read);
app.get('/sikidal/v1/jenis_keadaan_darurat/:id', jenis_keadaan_darurat.read_by_id);
app.post('/sikidal/v1/jenis_keadaan_darurat/create', jenis_keadaan_darurat.create);
app.patch('/sikidal/v1/jenis_keadaan_darurat/update/:id', jenis_keadaan_darurat.update);
app.delete('/sikidal/v1/jenis_keadaan_darurat/delete/:id', jenis_keadaan_darurat.soft_delete);

// ============================== Spesialis Kesehatan ===============================
app.get('/sikidal/v1/spesialis_kesehatan', spesialis_kesehatan.read);
app.get('/sikidal/v1/spesialis_kesehatan/:id', spesialis_kesehatan.read_by_id);
app.post('/sikidal/v1/spesialis_kesehatan/create', spesialis_kesehatan.create);
app.patch('/sikidal/v1/spesialis_kesehatan/update/:id', spesialis_kesehatan.update);
app.delete('/sikidal/v1/spesialis_kesehatan/delete/:id', spesialis_kesehatan.soft_delete);

// ============================== Pelabuhan ===============================
app.get('/sikidal/v1/pelabuhan', pelabuhan.read);
app.get('/sikidal/v1/pelabuhan/:id', pelabuhan.read_by_id);
app.post('/sikidal/v1/pelabuhan/create', pelabuhan.create);
app.patch('/sikidal/v1/pelabuhan/update/:id', pelabuhan.update);
app.delete('/sikidal/v1/pelabuhan/delete/:id', pelabuhan.soft_delete);

// ============================== Kapal ===============================
app.get('/sikidal/v1/kapal', kapal.read);
app.get('/sikidal/v1/kapal/:id', kapal.read_by_id);
app.post('/sikidal/v1/kapal/create', kapal.create);
app.patch('/sikidal/v1/kapal/update/:id', kapal.update);
app.delete('/sikidal/v1/kapal/delete/:id', kapal.soft_delete);

// ============================== Role ===============================
app.get('/sikidal/v1/role', role.read);
app.get('/sikidal/v1/role/:id', role.read_by_id);
app.post('/sikidal/v1/role/create', role.create);
app.patch('/sikidal/v1/role/update/:id', role.update);
app.delete('/sikidal/v1/role/delete/:id', role.soft_delete);


// =============================== USER MANAGEMNT =====================================
app.get('/sikidal/v1/users', user_management.read);
app.post('/sikidal/v1/user/create', user_management.create);
app.get('/sikidal/v1/user/:id', user_management.read_by_id);

// app.get('/sikidal/v1/users', authenticateToken, (req, res) => {
//     user_management.readall(req,res)
// });
// app.get('/sikidal/v1/user/:id', (req, res) => {
//     user_management.read_by_id(req,res)
// });
// //app.post('/sikidal/v1/user/login', user_management.read);
// app.patch('/sikidal/v1/user/:id', (req, res) => {
//     user_management.update(req,res)
// });
// app.delete('/sikidal/v1/user/:id',authenticateToken, (req, res) => {
//     user_management.delete_(req,res)
// });

// =============================== LOGIN USER ===============================
app.post('/sikidal/v1/user/login',user_management.login);

// ========================== Download Part =================================
// app.get('/sikidal/v1/user/:filename', user_management.download);
// app.get('/sikidal/v1/kapal/foto/:filename', kapal.download);

// authentification part======================================================
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
    try {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET)
      req.user = verified
  
      next() // continuamos
    } catch (error) {
        res.status(400).json({error: 'token not valid'})
    }
  
}



// ==============================================================================
app.get("/", (req, res) => {
    res.send({
        message: "🚀 SIKIDAL (Sistem Informasi Koordinasi Lapangan) v1.0"
    });
});

app.listen(PORT, () => {
    console.log(`API listening on port ${PORT}`);
});
