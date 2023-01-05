
const router = require('express').Router();

router.route('/tasks').get((req, res, next) => {
  res.json({
    message: 'Obteniendo todas las tasks',
  });
});


module.exports = router;
