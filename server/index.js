const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

const app = express()
dotenv.config()

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

app.use('/posts', require('./routes/posts'))
app.get('/', (req, res) => res.send('Welcome in Old Memories app API'))

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => app.listen(PORT,
        () => console.log(`Sever is live on http://localhost:${PORT}`)))
    .catch((error) => console.log(`ERROR: ${error.message}`))

mongoose.set('useFindAndModify', false)