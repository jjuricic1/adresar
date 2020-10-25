const mongoose = require('mongoose')
const password = 'mongo2020'
//const password = process.env.ATLAS_PASS
const dbname = 'adresar-api'
const url = `mongodb+srv://Yopa:${password}@cluster0.mqqim.mongodb.net/${dbname}?retryWrites=true&w=majority`


console.log('Spajanje na bazu...');
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
.then(result => {
    console.log("Spojeno na bazu.");
  }).catch(error => {
    console.log("Greška pri spajanju na bazu.", error.message);
  })

const porukaSchema = new mongoose.Schema({
  ime: {
      type: String,
      required: true,
      minlength: 5
  },
  email: {
    type: String,
    required: true,
    minlength: 5
  },
  datum: {
    type: Date,
    required: true
  }
})

porukaSchema.set('toJSON', {
    transform: (doc, ret) => { 
      ret.id = doc._id.toString()  
      delete ret._id  
      delete ret.__v 
      return ret 
    }
})

module.exports = mongoose.model('Adresar', porukaSchema, 'adrese') 
