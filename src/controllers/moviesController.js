const db = require('../database/models');
const sequelize = db.sequelize;

//Otra forma de llamar a los modelos
const Movies = db.Movie;

const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll({
            include: [
                {association: 'genero'}, {association: 'actors'}
            ]
        })
            .then(movies => {
                res.render('moviesList.ejs', {movies})
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id, {
            include: [{association: 'genero'}]
        })
            .then(movie => {
                res.render('moviesDetail.ejs', {movie});
            });
    },
    'new': (req, res) => {
        db.Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', {movies});
            });
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', {movies});
            });
    }, //Aqui debemos modificar y completar lo necesario para trabajar con el CRUD
    add: async function (req, res) {
        try{
        const generos = await db.Genre.findAll()
        res.render('../views/moviesAdd', {generos})  
        }catch(error){
            console.log(error)
            res.send(error.message)
        }
         
    },
    create: async (req, res) => {
        try{
        const movie = await db.Movie.create({
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            release_date: req.body.release_date,
            length: req.body.length,
            genre_id: req.body.genero
        })

        movie.addActor([1,2,3])

        res.redirect('/movies')
        } catch (error) {
            console.log(error)
            res.send(error.message)
        }
    },
    edit: async (req, res) =>{
        try {
            const generos = await db.Genre.findAll()
            const peli = await db.Movie.findByPk(req.params.id,{
                include: [{association:'genero'},{association:'actors'}]
            })
            res.render('moviesEdit', {Movie:peli, generos})
        } catch (error) {
            console.log(error)
            res.send(error.message)
        }
    },
    update: async (req,res) =>{
        try {
            await db.Movie.update({
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                release_date: req.body.release_date,
                length: req.body.length,
                genre_id: req.body.genero
            },{
                where: {
                    id: req.params.id
                }
            })
            res.redirect('/movies')
        } catch (error) {
            console.log(error)
            res.send(error.message)
        }
    },
    delete: async (req, res) =>{
        try {
            const peli = await db.Movie.findByPk(req.params.id)
            res.render('moviesDelete', {Movie:peli})
        } catch (error) {
            console.log(error)
            res.send(error.message)
        }
    },
    destroy: async (req, res) =>{
        try {
            await db.Movie.destroy({
                where:{
                    id:req.params.id
                }
            })
            res.redirect('/movies')
        } catch (error) {
            console.log(error)
            res.send(error.message)
        }
    }

}

module.exports = moviesController;