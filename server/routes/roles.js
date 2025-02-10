const app = require('./server-config.js');
const router = app.Router();
const {getRole, postRole, patchRole, getAllRoles, deleteRole} = require('../controllers/roles.js');


router.get('/', getAllRoles); //GET /role/
router.get('/:id', getRole); //GET /role/:id
router.post('/', postRole); //POST /role/
router.patch('/:id', patchRole); //PATCH /role/:id
router.delete('/:id', deleteRole); //DELETE /role/:id

module.exports = router;