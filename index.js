const express = require('express');
const app = express();
const {pokemon} = require('./pokedex.json');
const bodyParser = require('express');

app.use(bodyParser.json());

app.get('/', (req, res, next)=>{
   return res.status(200).send('Bienvenido al pokedex');
});

app.post("/pokemon", (req, res, next)=>{
    return res.status(200).send("Estas en post");
});

app.get('/pokemon/all', (req, res, next)=>{
    return res.status(200).send(pokemon);
});

app.get('/pokemon/:id([0-9]{1,3})', (req, res, next)=>{
    const id = req.params.id - 1;
    if(id >= 0 && id <= 150) {
    res.status(200).send(pokemon[req.params.id - 1]);
    }
    else{
        return res.status(404).send("Pokemon no encontrado");
    }
});

app.get('/pokemon/:name([A-Za-z]+)', (req, res, next)=>{
    const name = req.params.name;
        const pk = pokemon.filter((p) => {
        if(p.name.toUpperCase()==name.toUpperCase()) {
            return p;
        }
    });
    console.log(pk);
    if(pk.length>0){
         return res.status(200).send(pk);
    }
   return res.status(404).send('Pokemon no encontrado');
});

app.listen(process.env.PORT || 3000, ()=>{
    console.log('server is running');
})