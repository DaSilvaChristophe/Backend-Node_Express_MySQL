const PORT =  3000;
const express = require('express');
const app = express();
const mysql = require('mysql');
const connection = require('express-myconnection');


require('dotenv').config();


const db = {
    host: 'localhost',
    user: 'root',
    password: `${process.env.PASSWORD}`,
    port: 3306,
    database: 'dcrprojectone'
};


app.use(connection(mysql,db,'pool'))
app.use(express.urlencoded({extended: true}));


app.post('/ajoutnote',(req, res, next) => {
    const title = req.body.title;
    const contenu = req.body.contenu;
    req.getConnection((err,connect) => {
        if(!err){
            connect.query("INSERT INTO notes(id, title, contenu) VALUES (?,?,?)", [null, title, contenu], (err, rows, fields) => {
                if(err){
                    res.status = 500;
                    res.send(JSON.stringify({reussi: false, message: err.message}))
                } else {
                    res.status = 200;
                    res.send(JSON.stringify({reussi: true, message: 'Note enregistré avec succès !'}))
                }
            }) 
        } else {
            res.status = 500;
            res.send(JSON.stringify({reussi: false, message: err.message}))
        }
    });
})

app.put('/modifiernote',(req, res, next) => {
    const id = req.body.id
    const title = req.body.title;
    const contenu = req.body.contenu;
    req.getConnection((err,connect) => {
        if(!err){
            connect.query("UPDATE notes SET title = ?, contenu = ? WHERE id = ?", [title, contenu, id], (err, rows, fields) => {
                if(err){
                    res.status = 500;
                    res.send(JSON.stringify({reussi: false, message: err.message}))
                } else {
                    res.status = 200;
                    res.send(JSON.stringify({reussi: true, message: 'Note modifié avec succès !'}))
                }
            }) 
        } else {
            res.status = 500;
            res.send(JSON.stringify({reussi: false, message: err.message}))
        }
    });
});

app.delete('/supprimernote',(req, res, next) => {
    const id = req.body.id;
    req.getConnection((err,connect) => {
        if(!err){
            connect.query("DELETE FROM notes WHERE id = ? ", [id], (err, rows, fields) => {
                if(err){
                    res.status = 500;
                    res.send(JSON.stringify({reussi: false, message: err.message}))
                } else {
                    res.status = 200;
                    res.send(JSON.stringify({reussi: true, message: 'Note supprimé avec succès !'}))
                }
            }) 
        } else {
            res.status = 500;
            res.send(JSON.stringify({reussi: false, message: err.message}))
        }
    });
});

app.get('/note',(req, res, next) => {
   
    req.getConnection((err,connect) => {
        if(!err){
            connect.query("SELECT * FROM notes", (err, rows, fields) => {
                if(err){
                    res.status = 500;
                    res.send(JSON.stringify({reussi: false, message: err.message}))
                } else {
                    res.status = 200;
                    res.send(JSON.stringify({reussi: true, donnees: rows}))
                }
            }) 
        } else {
            res.status = 500;
            res.send(JSON.stringify({reussi: false, message: err.message}))
        }
    });
});


app.listen(PORT, () => {
    console.log('Requête au port ' + PORT)
})


















/* const http = require('http');

const server = http.createServer((req, res) => {
    console.log('Serveur Actif');

    // Définition de l'en-tête
    res.setHeader('content-type', 'text/plain')

    if (req.url === '/home') {  
        res.write('Hello World');
    }

});





server.listen(3000, "localhost", () => {
    console.log('Requête prête au port 3000 !')
}); */