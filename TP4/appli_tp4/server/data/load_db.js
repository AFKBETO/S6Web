const mysql = require('mysql');

const articles = require('./articles.js');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    insecureAuth : true
})

db.connect(function(err){
    if (err) throw err;
    console.log("Connecté à la bdd MySQL!");
    for (let article of articles) {
        db.query(`INSERT INTO bdweb_tp5.articles (id_article, name, description, image, price) VALUES (${article.id},"${article.name}", "${article.description}", "${article.image}", ${article.price}) ON DUPLICATE KEY UPDATE name = "${article.name}", description = "${article.description}", image = "${article.image}", price = ${article.price};`, function(err, result) {
            if (err) throw err;
            console.log(result);
        });

    };
    
});