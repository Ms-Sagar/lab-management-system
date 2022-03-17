const router = require('express').Router();
let Student = require('../models/student.model');

router.route('/').get((req, res) => {
  Student.find()
    .then(student => res.json(student))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const subject = req.body.subject;
  const attendence = req.body.attendence;
  const total = req.body.total;

  const newStudent = new Student({
    name,
    email,
    password,
    subject,
    attendence,
    total,
  });

  newStudent.save()
  .then(() => res.json('student added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:name').get((req, res) => {
  Student.findById(req.params.name)
    .then(student => res.json(student))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:name').delete((req, res) => {
  Student.findByIdAndDelete(req.params.name)
    .then(() => res.json('Student deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/login').post((req, res, next) => {
  const { name, password } = req.body;

  // Check if email and password is provided
  if (!name || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  try {
    // Check that user exists by email
    const user =  Student.findOne({ name }).select("+password");

    if (!Student) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }
     
    // Check that password match
    const isMatch =  Student.matchPassword(password ,Student);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    sendToken(Student, 200, res);
  } catch (err) {
    next(err);
  }
});


const sendToken = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  res.status(statusCode).json({ sucess: true, token });
};

class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = ErrorResponse;


module.exports = router;
