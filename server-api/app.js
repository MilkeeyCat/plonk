const express = require('express')
const mongoose = require('mongoose');
const app = express()
const port = 3000

app.get('/', async (req, res) => {
    res.send('Hello World!')

    await mongoose.connect('mongodb://root:example@mongo:27017/cats?authSource=admin', {useNewUrlParser: true, useUnifiedTopology: true});

    const Cat = mongoose.model('Cat', { name: String });

    const kitty = new Cat({ name: 'Zildjian' });
    kitty.save().then(() => console.log('meow'));
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})