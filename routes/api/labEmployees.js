const express = require('express')
const router = express.Router()
const passport = require('passport')

const LabEmployee = require('../../models/LabEmployee')

//@route    GET api/labEmployees
//@desc     Get All LabEmployees In LabEmployee
router.get('/', (req, res) => {
    LabEmployee.find()
        .then(labEmployees => res.json(labEmployees) )
})

//@route    POST api/labEmployees
//@desc     Add an labEmployee to LabEmployee
router.post('/', (req, res) => {
    const newLabEmployee = new LabEmployee({
        _id: req.body._id,
        password: req.body.password
    })
    newLabEmployee.save().then(labEmployee => res.json(labEmployee))
});

//@route    Delete api/labEmployees/id
//@desc     Delete a labEmployee from LabEmployee
router.delete('/:id', (req, res) => {
    LabEmployee.findById(req.params.id)
        .then(labEmployee => labEmployee.remove().then(() => res.json({success : true})))
        .catch(error => res.status(404).json({success : false}))
})


//@route    POST api/labEmployees/login
//@desc     Logs in a user
router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;
      if (!user) res.send(null);
      else {
        req.logIn(user, (err) => {
          if (err) throw err;
          res.send(user);
          console.log(req.user);
        });
      }
    })(req, res, next);
  });


//@route    GET api/labEmployees/getInfo
//@desc     Get info of logged in user 

router.get("/getInfo" ,(req,res) =>{
  console.log("got req, " + req.user)
    res.send(req.user);
})

module.exports = router