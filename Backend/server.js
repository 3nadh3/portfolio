
const express = require('express');
const bodyParser = require('body-parser'); 
const cors = require('cors');
const app = express();
const ChatBot = require('./src/routes/GeminiRouter');
const Visitor = require('./src/routes/VistorRoutes');
app.use(express.urlencoded({ extended: true }));
const PORT = 5000;

app.use(cors())
app.use(bodyParser.json());

app.use(ChatBot);
app.use(Visitor);



app.listen(PORT, () => {
    console.log("Server successfully running on port " + PORT);
  });

