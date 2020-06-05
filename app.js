const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const index = require('./routes/index');
const start = require('./settings/database');
const employees = require('./routes/employees');

const PORT = process.env.PORT || 8001;
const app = express();

app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);
app.use('/employees', employees);

start().then(
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log('Server has been started...');
  }),
);

module.exports = app;
