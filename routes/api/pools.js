const express = require('express')
const router = express.Router()

const Pool = require('../../models/Pool')

//@route    GET api/pools
//@desc     Get All pools In Pool
router.get('/', (req, res) => {
    Pool.find()
        .then(pools => res.json(pools) )
})

//@route    POST api/pool
//@desc     Add pool to Pool
router.post('/', (req, res) => {
    const newPool = new Pool({
        poolBarcode: req.body.poolBarcode
    })
    newPool.save().then(pool => res.json(pool))
});

//@route    Delete api/pools/id
//@desc     Delete a pool from Pool
router.delete('/:id', (req, res) => {
    Pool.findById(req.params.id)
        .then(pool => pool.remove().then(() => res.json({success : true})))
        .catch(error => res.status(404).json({success : false}))
})

module.exports = router