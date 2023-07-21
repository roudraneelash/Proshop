const mongoose= require('mongoose');

const conn=mongoose.connect(process.env.MONGO_URI);
const db= mongoose.connection;

db.on('error',()=>console.log('error!'));

db.once('open',(err)=>{
    if(err)
    console.log('error');

    console.log('successfully connected to the db');
})
