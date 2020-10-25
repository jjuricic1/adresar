const express = require('express')  
const app = express()
const cors = require('cors')

app.use(express.static('build'))

require('dotenv').config()

const Adresar = require('./models/poruke')

app.use(cors())
app.use(express.json()) 

  	
app.get('/', (req, res) =>{
  res.send('<h1>Pozdrav od Express servera i Nodemona </h1>')
})
 
/* app.get('/api/poruke', (req, res) =>{
  res.json(poruke)
}) */

app.get('/api/poruke', (req, res) =>{
  //res.json(poruke)
  Adresar.find({}) //find f-ja ne vraca json objekte nego niz dokumenata
  .then( svePoruke => {
      res.json(svePoruke)  //niz dokumenata u niz json-a, ovdje se zove onaj toJSON
  })
})

/* app.get('/api/poruke/:id', (req, res) =>{
  const id = Number(req.params.id)
  const poruka = poruke.find(p => p.id === id)

  if(poruka){
    res.json(poruka)
  } else {
    res.status(404).end()
  }
}) */

app.get('/api/poruke/:id', (req, res, next) => {
  Adresar.findById(req.params.id)
    .then(poruka => {
      if (poruka) {
        res.json(poruka)
      } else {
        res.status(404).end()
      }
    })
    .catch(err => {
     /*  console.log("Greška pri trazenju", error);
      //res.status(500).end()
      res.status(400).send({error: 'neispravan format ID-a'}) */
      next(err)  //greska se salje na middleware
    })
})


/* app.delete('/api/poruke/:id', (req, res) => {
  const id = Number(req.params.id)
  const poruka = poruke.find(p => p.id === id)

  if(!poruka){
    return res.status(400).json({
      error: 'Ne postoji poruka koju zelite izbrisati'
    })
  }

  poruke = poruke.filter(p => p.id !== id) 
  res.status(204).end()  //no content
}) */

app.delete('/api/poruke/:id', (req, res, next) => {
  Adresar.findByIdAndRemove(req.params.id)
  .then(result => {
    res.status(204).end()
  })
  .catch(err => next(err))
})



/* app.post('/api/poruke', (req, res) => {
  const maxId = poruke.length > 0 
  ?  Math.max(...poruke.map(p => p.id))  
  : 0

  const podatak = req.body

  if(!podatak.ime || !podatak.email){
    return res.status(400).json({
      error: 'Nedostaje sadrzaj poruke'
    })
  }
  const poruka = {
    ime: podatak.ime,
    email: podatak.email,
    id: maxId + 1
  }

  poruke = poruke.concat(poruka) //concat ili push
  res.json(poruka)
}) */


app.post('/api/poruke', (req, res, next) => {
  const podatak = req.body
  if (!podatak.ime || !podatak.email) {
      return res.status(400).json({ error: 'Nedostaje sadržaj poruke' })
  }
  const poruka = new Adresar({
      ime: podatak.ime,
      email: podatak.email,
      datum: new Date()
  })

  poruka.save().then(spremljenaPoruka => {
      res.json(spremljenaPoruka)
  })
  .catch(err => next(err))
})

/* app.put('/api/poruke/:id', (req, res) => {
  const id = Number(req.params.id)
  const podatak = req.body
  if(!podatak.ime || !podatak.email){
    return res.status(400).json({
      error: 'Nedostaje sadrzaj poruke'
    })
  }
  poruke = poruke.map(p => p.id != id ? p : podatak) 
  
  res.json(podatak)
}) */

app.put('/api/poruke/:id', (req, res, next) => {
  const podatak = req.body
  const id = req.params.id

  const poruka = {
    ime: podatak.ime,
    email: podatak.email,
  }

  Adresar.findByIdAndUpdate(id, poruka, {new: true})
  .then( novaPoruka => {
    res.json(novaPoruka)
  })
  .catch(err => next(err))

})

const nepoznataRuta = (req, res) => {
  response.status(404).send({ error: 'Nepostojeca ruta !!!' })
}

app.use(nepoznataRuta)

const errorHandler = (err, req, res, next) => {
  console.log("Middleware For Errors");
  if(err.name === "CastError"){
    return res.status(400).send({error: "krivi ID format"})
  }else if(err.name === "MongoParseError"){
    return res.status(400).send({error: "krivi format podatka"})
  }
  next(err)
}

app.use(errorHandler)


/* const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Posluzitelj je pokrenut na portu ${PORT}`);  
}) */

var server = app.listen(process.env.PORT || 5000, function () {
  var port = server.address().port;
  console.log("Express is working on port " + port);
});