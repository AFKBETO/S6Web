const express = require('express')
const router = express.Router()

const mysql = require('mysql')

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin"
})

db.connect(function(err){
  if (err) throw err;
  console.log("BDD connecté!");
})

class Panier {
  constructor () {
    this.createdAt = new Date()
    this.updatedAt = new Date()
    this.articles = []
  }
}

/**
 * Dans ce fichier, vous trouverez des exemples de requêtes GET, POST, PUT et DELETE
 * Ces requêtes concernent l'ajout ou la suppression d'articles sur le site
 * Votre objectif est, en apprenant des exemples de ce fichier, de créer l'API pour le panier de l'utilisateur
 *
 * Notre site ne contient pas d'authentification, ce qui n'est pas DU TOUT recommandé.
 * De même, les informations sont réinitialisées à chaque redémarrage du serveur, car nous n'avons pas de système de base de données pour faire persister les données
 */

/**
 * Notre mécanisme de sauvegarde des paniers des utilisateurs sera de simplement leur attribuer un panier grâce à req.session, sans authentification particulière
 */
router.use((req, res, next) => {
  // l'utilisateur n'est pas reconnu, lui attribuer un panier dans req.session
  if (typeof req.session.panier === 'undefined') {
    req.session.panier = new Panier()
  }
  next()
})

/*
 * Cette route doit retourner le panier de l'utilisateur, grâce à req.session
 */
router.get('/panier', (req, res) => {
  res.status(200).json(req.session.panier)
})

/*
 * Cette route doit ajouter un article au panier, puis retourner le panier modifié à l'utilisateur
 * Le body doit contenir l'id de l'article, ainsi que la quantité voulue
 */
router.post('/panier', (req, res) => {
  const quantity = req.body.quantity
  const articleId = req.body.id
  if (!articleId) {
    res.status(400).json({ message: "No item id.  "})
    return
  }
  if (req.session.panier.articles.find(a => a.id == articleId)) {
    res.status(400).json({ message: `Item ${articleId} is already in the cart.`})
    return
  }
  if (!quantity || quantity <= 0) {
    res.status(400).json({ message: "Quantity value must be positive!"})
    return
  }
  if(articles.find(a => a.id == articleId)){
    req.session.panier.articles.push({
      id : articleId,
      quantity : quantity
    })
    res.status(201).json(req.session.panier)
    return
  }
  
  res.status(404).json({ message: `Item ${articleId} does not exist` })
  return 
})

/*
 * Cette route doit permettre de confirmer un panier, en recevant le nom et prénom de l'utilisateur
 * Le panier est ensuite supprimé grâce à req.session.destroy()
 */
router.post('/panier/pay', (req, res) => {
  let user = {
    surname: req.body.surname,
    firstname: req.body.firstname
  }
  if (!user.surname){
    res.status(400).json({ message: 'Please add surname.' })
    return
  }
  if (!user.firstname){
    res.status(400).json({ message: 'Please add firstname.' })
    return
  }
  if(req.session.panier.articles.length == 0) {
    res.status(400).json({ message: 'Cart is empty.' })
    return
  }
  req.session.destroy()
  res.status(200).json({ message: `Thank you, ${user.firstname} ${user.surname} for your purchase!` })
})

/*
 * Cette route doit permettre de changer la quantité d'un article dans le panier
 * Le body doit contenir la quantité voulue
 */
router.put('/panier/:articleId', (req, res) => {
  let articleId = parseInt(req.params.articleId)
  let article = req.session.panier.articles.find(a => a.id == articleId)
  if (!article){
    res.status(404).json({ message: `Item ${articleId} is not in the cart.` })
  }
  let quantity = req.body.quantity
  if (!quantity || quantity <= 0) {
    res.status(400).json({ message: "Quantity value must be positive!"})
    return
  }
  article.quantity = quantity
  res.status(201).json(req.session.panier)
})

/*
 * Cette route doit supprimer un article dans le panier
 */
router.delete('/panier/:articleId', (req, res) => {
  let articleId = parseInt(req.params.articleId)
  let article = req.session.panier.articles.find(a => a.id == articleId)
  if (!article){
    res.status(404).json({ message: `Item ${articleId} is not in the cart.` })
  }
  req.session.panier.articles.pop(article)
  res.status(200).json(req.session.panier)
})


/**
 * Cette route envoie l'intégralité des articles du site
 */
router.get('/articles', (req, res) => {
  db.query(`SELECT id_article as id, name, description, image, price FROM bdweb_tp5.articles`, function(err, result){
    if (err) throw err;
    var articles = result
    res.json(articles)
  })
})

/**
 * Cette route crée un article.
 * WARNING: dans un vrai site, elle devrait être authentifiée et valider que l'utilisateur est bien autorisé
 * NOTE: lorsqu'on redémarre le serveur, l'article ajouté disparait
 *   Si on voulait persister l'information, on utiliserait une BDD (mysql, etc.)
 */
router.post('/article', (req, res) => {
  const name = req.body.name
  const description = req.body.description
  const image = req.body.image
  const price = parseInt(req.body.price)

  // vérification de la validité des données d'entrée
  if (typeof name !== 'string' || name === '' ||
      typeof description !== 'string' || description === '' ||
      typeof image !== 'string' || image === '' ||
      isNaN(price) || price <= 0) {
    res.status(400).json({ message: 'bad request' })
    return
  }
  
  db.query(`INSERT INTO bdweb_tp5.articles (name, description, image, price) VALUES ("${name}", "${description}", "${image}", ${price});`, (err) => {
    if (err) throw err;
    db.query(`SELECT * FROM bdweb_tp5.articles ORDER BY id_article DESC LIMIT 1;`, (err, result) => {
      if (err) throw err;
      res.json(result)
    })
  })

  // on envoie l'article ajouté à l'utilisateur
})

/**
 * Cette fonction fait en sorte de valider que l'article demandé par l'utilisateur
 * est valide. Elle est appliquée aux routes:
 * - GET /article/:articleId
 * - PUT /article/:articleId
 * - DELETE /article/:articleId
 * Comme ces trois routes ont un comportement similaire, on regroupe leurs fonctionnalités communes dans un middleware
 */
function parseArticle (req, res, next) {
  const articleId = parseInt(req.params.articleId)

  // si articleId n'est pas un nombre (NaN = Not A Number), alors on s'arrête
  if (isNaN(articleId)) {
    res.status(400).json({ message: 'articleId should be a number' })
    return
  }
  // on affecte req.articleId pour l'exploiter dans toutes les routes qui en ont besoin
  req.articleId = articleId

  const article = articles.find(a => a.id === req.articleId)
  if (!article) {
    res.status(404).json({ message: 'article ' + articleId + ' does not exist' })
    return
  }
  // on affecte req.article pour l'exploiter dans toutes les routes qui en ont besoin
  req.article = article
  next()
}

router.route('/article/:articleId')
  /**
   * Cette route envoie un article particulier
   */
  .get(parseArticle, (req, res) => {
    // req.article existe grâce au middleware parseArticle
    res.json(req.article)
  })

  /**
   * Cette route modifie un article.
   * WARNING: dans un vrai site, elle devrait être authentifiée et valider que l'utilisateur est bien autorisé
   * NOTE: lorsqu'on redémarre le serveur, la modification de l'article disparait
   *   Si on voulait persister l'information, on utiliserait une BDD (mysql, etc.)
   */
  .put(parseArticle, (req, res) => {
    const name = req.body.name
    const description = req.body.description
    const image = req.body.image
    const price = parseInt(req.body.price)

    req.article.name = name
    req.article.description = description
    req.article.image = image
    req.article.price = price
    res.send()
  })

  .delete(parseArticle, (req, res) => {
    const index = articles.findIndex(a => a.id === req.articleId)

    articles.splice(index, 1) // remove the article from the array
    res.send()
  })

module.exports = router
