const Login = window.httpVueLoader('./components/Login.vue')
const Home = window.httpVueLoader('./components/Home.vue')
const Panier = window.httpVueLoader('./components/Panier.vue')

const routes = [
  { path: '/', component: Login},
  { path: '/home', component: Home},
  { path: '/panier', component: Panier}
]

const router = new VueRouter({
  routes
})

var app = new Vue({
  router,
  el: '#app',
  data: {
    articles: [],
    panier: {
      createdAt: null,
      updatedAt: null,
      articles: []
    },
    login: false,
    error: false
  },
  components: {
    Login,
  },
  async mounted(){
    return
  },
  methods: {
    async load () {
      const res = await axios.get('/api/articles')
      this.articles = res.data
      // const res2 = await axios.get('/api/panier')
      // this.panier = res2.data
    },
    async addArticle (article) {
      const res = await axios.post('/api/article', article)
      this.articles.push(res.data)
    },
    async updateArticle (newArticle) {
      await axios.put('/api/article/' + newArticle.id, newArticle)
      const article = this.articles.find(a => a.id === newArticle.id)
      article.name = newArticle.name
      article.description = newArticle.description
      article.image = newArticle.image
      article.price = newArticle.price
    },
    async deleteArticle (articleId) {
      await axios.delete('/api/article/' + articleId)
      const index = this.articles.findIndex(a => a.id === articleId)
      this.articles.splice(index, 1)
    },
    async authenticate (loginDetails){
      try {
        await axios.post(`/api/login`, loginDetails).then(res => {
          if (res.data) {
            this.$router.push('/home')
            this.login = true
          }
          if (!res.data){
            throw err
          }
        })
      }
      catch (err) {
        this.error = true
        setTimeout(() => {this.error = false},2000)
      }
    }
  }
})
