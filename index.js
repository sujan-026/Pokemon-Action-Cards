import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
const port = 4000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    try {
        const response = await axios.get("https://bored-api.appbrewery.com/random");
        const result = response.data;
        res.render("index.ejs", { data: result });
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
            error: error.message,
        });
    }
});

let data;

app.post("/", async (req, res) => {
    //Trying this
    try {
      console.log(req.body);
      const name = req.body.type;
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const result = response.data;
      const pokemonspecies = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
      res.render("index.ejs",{data : result, species : pokemonspecies});
    }
    
    //And checking for error
    catch (error) {
      console.error("Failed to make request:", error.message);
      res.render("index.ejs", {
        error: "No activities that match your criteria.",
      });
    }

});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
