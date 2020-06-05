const Ajv = require('ajv');
const express = require('express');
const Schemes = require('../schemes/Schemes');
const Employee = require('../models/Employee');

const schemes = new Schemes();
const router = express.Router();
const ajv = new Ajv({ allErrors: true });

router.get(
  '/',
  async (req, res) =>
    await Employee.find({})
      .then((employees) => {
        const valid = ajv.validate(
          schemes.getEmployeeSchemeResponse(),
          employees,
        );

        if (!valid) {
          res.status(406).send({
            message: ajv.errors[0].message,
          });
        }

        res.status(200).send(employees);
      })
      .catch((err) =>
        res.status(500).send({
          message: err.message || 'Something wrong while retrieving employees.',
        }),
      ),
);

router.post('/', async (req, res) => {
  const { name, positions, phone, location, email } = req.body;
  const validRequestData = ajv.validate(
    schemes.addEmployeeSchemeRequest(),
    req.body,
  );

  if (!validRequestData) {
    res.status(400).send({
      message: ajv.errors[0].message,
    });
  }

  const notification = await new Employee({
    name,
    positions,
    phone,
    location,
    email,
  })
    .save()
    .then(() =>
      res.status(201).send({ message: 'Employee added successfully!' }),
    )
    .catch((err) => res.status(500));
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const valid = ajv.validate(schemes.deleteEmployeeSchemeRequest(), {
    id: id,
  });

  if (!valid) {
    res.status(400).send({
      message: ajv.errors[0].message,
    });
  }

  await Employee.findByIdAndDelete(id)
    .then((result) =>
      res.status(200).send({ message: 'Employee deleted successfully!' }),
    )
    .catch((err) => res.status(500));
});

module.exports = router;
