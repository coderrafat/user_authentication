const jwt = require('jsonwebtoken');

const { AuthShield } = require('auth-shield')

exports.isLogin = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({
                message: 'Unauthorized'
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (error) {
        res.status(401).json({
            message: 'Unauthorized'
        })
    }
};


AuthShield.setRoleList(['user', 'admin']);

AuthShield.setPermissionList(['AllUsers', 'BanUser', 'AddRole', 'DeleteRole', 'EditRole', 'AddPermission', 'EditPermission', 'DeletePermission', 'GivePermission'])

AuthShield.givePermission('admin', ['AllUsers', 'BanUser', 'AddRole', 'DeleteRole', 'EditRole', 'AddPermission', 'EditPermission', 'DeletePermission', 'GivePermission'])



