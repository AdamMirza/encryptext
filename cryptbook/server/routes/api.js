const express = require('express')
const router = express.Router()

router.get('/api', function(req, res) {
  res.send('api page')
})


module.exports = router
