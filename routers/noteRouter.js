const Router = require('express');
const router = new Router();
const controller = require('../controllers/noteController');
const authMiddleware = require('../middlewares/authMiddleware');


router.get('/', authMiddleware, controller.getNotes);

router.post('/', authMiddleware, controller.addNote);

router.get('/:id', authMiddleware, controller.getNote);

router.put('/:id', authMiddleware, controller.updateNote);

router.patch('/:id', authMiddleware, controller.changeFlag);

router.delete('/:id', authMiddleware, controller.deleteNote);


module.exports = router;
