const express = require("express");
const bodyparser = require("body-parser");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();

app.use(bodyparser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

API_KEY = "c602089951f49a979839e849a8617c39";
app.get("/", (req, res) => {
    res.render("form.ejs");
});

app.post("/", (req, res) => {
    let SearchTerm = req.body.SearchTerm;

    const fetchData = () => {
        return fetch(
                `http://api.serpstack.com/search?access_key=${API_KEY}&query=${SearchTerm}`
            )
            .then((res) => res.json())
            .then((body) => {
                let FullPage = body;
                let knowledge_graph = FullPage.knowledge_graph;
                let Name = knowledge_graph.title;
                let Role = knowledge_graph.type;
                let Wiki = knowledge_graph.source.url;
                let key0 = knowledge_graph.known_attributes[0].name;
                let key1 = knowledge_graph.known_attributes[1].name;
                let key2 = knowledge_graph.known_attributes[2].name;
                let key3 = knowledge_graph.known_attributes[3].name;
                let value0 = knowledge_graph.known_attributes[0].value;
                let value1 = knowledge_graph.known_attributes[1].value;
                let value2 = knowledge_graph.known_attributes[2].value;
                let value3 = knowledge_graph.known_attributes[3].value;
                let Description = knowledge_graph.description;
                res.json({
                    Name: Name,
                    Role: Role,
                    About: Description,
                    Wikipedia: Wiki,
                    [key0]: value0,
                    [key1]: value1,
                    [key2]: value2,
                    [key3]: value3,
                });
            })
            .catch((err) => {
                console.log(err);
                res.json({
                    Error: "Entered Term is not allowed try something else!",
                });
            });
    };

    fetchData();
});

app.listen(3000, () => {
    console.log("server is running!");
});