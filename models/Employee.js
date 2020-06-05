const { Schema, model } = require('mongoose');

const schema = new Schema({
  name: { type: 'string' },
  positions: { type: 'string' },
  phone: { type: 'string' },
  location: { type: 'string' },
  email: { type: 'string' },
});

module.exports = model('Employee', schema);
