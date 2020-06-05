const mongoose = require('mongoose');

const start = async () => {
  await mongoose.connect(
    'mongodb+srv://test:test@cluster0-jfgbm.mongodb.net/employees',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) throw err;
    },
  );
};

module.exports = start;
