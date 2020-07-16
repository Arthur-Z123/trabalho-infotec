const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/", function (req, res) {
    const about = {
        avatar_url: "https://avatars1.githubusercontent.com/u/52016017?s=460&u=c34b3486ba1deca03788e1522291bcd7a0efb0c1&v=4",
        nome: "Arthur Zambiasi",
        role: "Futuro podcast Guitar Karabiner",
        description: 'Trabalhando para lançar o melhor podcast sobre heavy metal e cultura pop do planeta.',
        links: [
           {name: "Github", ulr: "https://github.com/Arthur-Z123/"},
        ]
    }
    return res.render("about", { about })
})

server.get("/portfolio", function (req, res) {

    return res.render("portfolio", {items: videos})

})

server.get("/video", function(req, res){
    const id = req.query.id;

     const video = videos.find(function(video){
         return video.id == id
     })

     if (!video) {
         return res.send("Video not found")
     }

     return res.render("video", { item: video })
})

server.listen(5000, function () {
    console.log("server is running")
})