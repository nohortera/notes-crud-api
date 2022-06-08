const Router = require('express');
const router = new Router();
const controller = require('../controllers/noteController');
const authMidleware = require('../middlewares/authMiddleware');


router.get('/', authMidleware, controller.getNotes);

router.post('/', authMidleware, controller.addNote);

router.get('/:id', authMidleware, controller.getNote);

router.put('/:id', authMidleware, controller.updateNote);

router.patch('/:id', authMidleware, controller.changeFlag);

router.delete('/:id', authMidleware, controller.deleteNote);


module.exports = router;
