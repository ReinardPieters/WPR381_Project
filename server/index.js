const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

port = process.env.PORT;
const app = express();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});