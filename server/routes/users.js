const app = require('./server-config.js');
const router = app.Router();
const {getUser, postUser, patchUser, deleteUser, getAllUsers} = require('../controllers/users.js');


router.get('/', getAllUsers); //GET /user/
router.get('/:id', getUser); //GET /user/:id
router.post('/', postUser); //POST /user/
router.patch('/:id', patchUser); //PATCH /user/:id
router.delete('/:id', deleteUser); //DELETE /user/:id

module.exports = router;