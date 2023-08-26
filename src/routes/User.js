const { UserRegister, UserLogin, UserLogout, UserProfile, AllUsers, AddRole, DeleteRole, UpdateRole, AddPermission, DeletePermission } = require('../controllers/UserController');
const { isLogin } = require('../middlewares/auth');
const { AuthShield } = require('auth-shield')


const router = require('express').Router();


//!User Registration Route
router.post('/register', UserRegister);

//!User Login Route
router.post('/login', UserLogin);

//!Logout Route
router.post('/logout', isLogin, UserLogout);

//!User Profile
router.get('/profile', isLogin, UserProfile);

//!All Users
router.get('/users', isLogin, AuthShield.checkPermission('AllUsers'), AllUsers);



//!Authentication Routes

//!Add Role
router.post('/add-role', isLogin, AuthShield.checkPermission('AddRole'), AddRole);

//!Remove Role
router.post('/remove-role', isLogin, AuthShield.checkPermission('DeleteRole'), DeleteRole);


//!Add Permissions
router.post('/add-permission', isLogin, AuthShield.checkPermission('AddPermission'), AddPermission);

//!Delete Permissions
router.post('/remove-permission', isLogin, AuthShield.checkPermission('DeletePermission'), DeletePermission);



module.exports = router;