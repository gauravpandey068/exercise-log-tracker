const router = require('express').Router()
let Exerise = require('../model/exercise.model')

router.route('/').get((req, res) => {
    Exerise.find()
        .then(exercises => res.json(exercises))
        .catch(err =>  res.status(400).json('Error: ' + err))
})

router.route('/').post((req, res) => {
    const username = req.body.username
    const description = req.body.description
    const duration = Number(req.body.duration)
    const date = Date.parse(req.body.date)

    const newExercise = new Exerise({
        username,
        description,
        duration,
        date,
    })

    newExercise.save()
        .then(() => res.json('Exercise Added!'))
        .catch(err =>  res.status(400).json('Error: ' + err))
})

router.route('/:id').get((req, res) =>{
    Exerise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').delete((req, res) =>{
    Exerise.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise Deleted!'))
        .catch(err => res.status(400).json('Error: ' + err))
})
router.route('/:id').put((req, res) =>{
    Exerise.findById(req.params.id)
        .then(exercise =>{
            exercise.username = req.body.username
            exercise.description = req.body.description
            exercise.duration = Number(req.body.duration)
            exercise.date = Date.parse(req.body.date)

            exercise.save()
                .then(() => res.json('Exercise Update!'))
                .catch(err => res.status(400).json('Error: ' + err))

        })
        .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router