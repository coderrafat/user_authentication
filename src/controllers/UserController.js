const { ValidationError } = require('custom-error-handlers/error');
const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AuthShield } = require('auth-shield')


//!User Registration
exports.UserRegister = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name) {
            throw new ValidationError('Please enter a name!', 404,)
        }
        if (!email) {
            throw new ValidationError('Please enter an email!', 404,)
        }
        if (!password) {
            throw new ValidationError('Please enter a password!', 404,)
        }
        if (password.length < 6) {
            throw new ValidationError('Password must be at least 6 characters long!', 404,)
        }
        const user = await UserModel.findOne({ email });

        if (user) {
            throw new ValidationError('User already exists!')
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const newUser = await UserModel.create({
            name,
            email,
            password: hashedPassword
        });

        const token = jwt.sign({ _id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '24h' })

        res.status(201).json({
            status: 'success',
            massage: 'User has been Created!😊',
            token,
        })


    } catch (error) {
        next(error);
    }
};


//!User Login
exports.UserLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email) {
            throw new ValidationError('Please enter an email!', 404,)
        }
        if (!password) {
            throw new ValidationError('Please enter a password!', 404,)
        }
        if (password.length < 6) {
            throw new ValidationError('Password must be at least 6 characters long!')
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            throw new ValidationError('User not found!')
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new ValidationError('Invalid Email or Password!')
        }
        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' })
        res.status(200).json({
            status: 'success',
            massage: 'User has been logged in!😊',
            token,
        })

    } catch (error) {
        next(error);
    }
};


//!User Logout
exports.UserLogout = (req, res, next) => {
    try {
        res.status(200).json({
            status: 'success',
            massage: 'User has been logged out!😊',
        })

    } catch (error) {
        next(error);
    }
};


//!User Profile
exports.UserProfile = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.user, 'name email role ');

        res.status(200).json(user)

    } catch (error) {
        next(error);
    }
};


//!All Users
exports.AllUsers = async (req, res, next) => {
    try {
        const users = await UserModel.find();

        res.status(200).json({ User: users.length, Data: users });

    } catch (error) {
        next(error);
    }
};




//!Authentication

//!Add Role
exports.AddRole = async (req, res, next) => {
    try {
        const { role } = req.body;

        if (!role) {
            throw new ValidationError('Please enter a role!', 404,)
        }

        AuthShield.newRole(role)
        AuthShield.status()

        res.status(200).json({
            status: 'success',
            massage: 'Role has been added!😊',
        })

    } catch (error) {
        next(error);
    }
};


//!Delete Role
exports.DeleteRole = async (req, res, next) => {
    try {
        const { role } = req.body;

        if (!role) {
            throw new ValidationError('Please enter a role!', 404,)
        }

        AuthShield.deleteRole(role)
        AuthShield.status()

        res.status(200).json({
            status: 'success',
            massage: 'Role has been deleted!😊',
        })

    } catch (error) {
        next(error);
    }
};


// //!Update Role
// exports.UpdateRole = async (req, res, next) => {
//     try {
//         const { role } = req.body;

//         if (!role) {
//             throw new ValidationError('Please enter a role!', 404,)
//         }

//         AuthShield.renameRole(role)
//         AuthShield.status()

//         res.status(200).json({
//             status: 'success',
//             massage: 'Role has been updated!😊',
//         })

//     } catch (error) {
//         next(error);
//     }
// };

//!Add Permissions
exports.AddPermission = async (req, res, next) => {
    try {
        const { permission } = req.body;

        if (!permission) {
            throw new ValidationError('Please enter a permission!', 404,)
        }

        AuthShield.newPermission(permission)
        AuthShield.status()

        res.status(200).json({
            status: 'success',
            massage: 'Permission has been added!😊',
        })

    } catch (error) {
        next(error);
    }
};

//!Delete Permission
exports.DeletePermission = async (req, res, next) => {
    try {
        const { permission } = req.body;

        if (!permission) {
            throw new ValidationError('Please enter a permission!', 404,)
        }

        AuthShield.deletePermission(permission)
        AuthShield.status()

        res.status(200).json({
            status: 'success',
            massage: 'Permission has been deleted!😊',
        })

    } catch (error) {
        next(error);
    }
};

//!Set permissions
exports.SetPermissions = async (req, res, next) => {
    try {
        const { permission } = req.body;

        if (!permission) {
            throw new ValidationError('Please enter a permission!', 404,)
        }

        AuthShield.AddPermission(permission)
        AuthShield.status()

        res.status(200).json({
            status: 'success',
            massage: 'Permission has been updated!😊',
        })

    } catch (error) {
        next(error);
    }
};

