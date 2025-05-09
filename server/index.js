const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

port = process.env.PORT;
host = process.env.HOST;
const app = express();

app.listen(port, host, () => {
    console.log(`Server is running at http://${host}:${port}`);
});
