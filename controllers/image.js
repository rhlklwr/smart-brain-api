const Clarifai = require('clarifai');

const app = new Clarifai.App(
    {apiKey: process.env.API_TOKEN}
);

const handleApiCall = (req, res) =>{
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with api'))
}

const handleImage = (db) => (req, res) =>{
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err =>{
        res.status(400).json("Unable to get Count");
    })
}

module.exports ={
    handleImage: handleImage,
    handleApiCall: handleApiCall
}