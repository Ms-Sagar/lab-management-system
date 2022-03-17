const router = require('express').Router();
let Teacher = require('../models/teacher.model');

router.route('/').get((req, res) => {
  Teacher.find()
    .then(teacher => res.json(teacher))
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
    const user =  Teacher.findOne({ name }).select("+password");

    if (!Teacher) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    // Check that password match
    const isMatch =  Teacher.matchPassword(password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    sendToken(teacher, 200, res);
  } catch (err) {
    next(err);
  }
});


router.route('/add').post((req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const subject = req.body.subject;
  
    const newteacher = new Teacher({
      name,
      email,
      password,
      subject,
    });
  
    newteacher.save()
    .then(() => res.json('teacher added!'))
    .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/:name').get((req, res) => {
    Teacher.findById(req.params.name)
      .then(teacher => res.json(teacher))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/:name').delete((req, res) => {
    Teacher.findByIdAndDelete(req.params.name)
      .then(() => res.json('Teacher deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  const sendToken = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    res.status(statusCode).json({ sucess: true, token });
  };
  module.exports = router;