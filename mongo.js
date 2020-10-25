const mongoose = require('mongoose')
const password = 'mongo2020'
const dbname = 'adrese-api'
const url = `mongodb+srv://Yopa:${password}@cluster0.mqqim.mongodb.net/${dbname}?retryWrites=true&w=majority`

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})

const porukaSchema = new mongoose.Schema({
    ime: String,
    email: String,
    datum: Date
  })
  
const Adresar = mongoose.model('Adresar', porukaSchema, 'adrese') 

const novaPoruka = new Adresar({
    ime: 'Josipa Juricic',
    email: 'jjuricic1@pmfst.hr',
    datum: new Date()
  })

/* novaPoruka.save()
  .then(result => {
    console.log('Poruka spremljena')
    console.log(result);
    mongoose.connection.close()
  }) */

Adresar.find({}) //prazan parametar {} pronalazi sve rezultate
.then( result => {
    result.forEach(
        p => {
            console.log(p);
        })
    mongoose.connection.close()
})

/* Poruka.find({ vazno: true}) 
.then( result => {
    result.forEach(
        p => {
            console.log(p);
        })
    mongoose.connection.close()
}) */