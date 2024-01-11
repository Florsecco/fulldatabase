const db = require('../database/models');
const Actors = db.Actor;

//Otra forma de llamar a los modelos


const actorsController = {
    list: async (req, res) => {
        try{
            const actores = await Actors.findAll()
            res.render('actorsList.ejs', {actores})

        }catch (error){
        console.log(error)
        res.send(error.message)
        }
            
    },
    detail: async(req, res) => {
        try{
        const actor = await Actors.findByPk(req.params.id)
        res.render('actorsDetail.ejs', {actor});
            
        } catch(error){
            console.log(error)
            res.send(error.message)
            }
    },
    add: async function (req, res) {
        try{
        const movies = await db.Movie.findAll()
        res.render('../views/actorsAdd', {movies})  
        }catch(error){
            console.log(error)
            res.send(error.message)
        }
         
    }, 
    create: async (req, res) => {
        try{
        const actor = await Actors.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            rating: req.body.rating,
            favorite_movie_id: req.body.movie
        })

    
        res.redirect('/actors')
        } catch (error) {
            console.log(error)
            res.send(error.message)
        }
    }
}

module.exports = actorsController