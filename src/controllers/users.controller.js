const db = require('../models');

const Users = db.users;
const Roles = db.roles;

exports.getUsers = (req, res, next) => {
    Users
        .scope('activeUser')
        .findAll({
            attributes: [['id', 'userId'], 'name', 'email', 'gender'],
            include: [
                {
                    model: Roles,
                    attributes: [['id', 'roleId'], 'name', 'permissions'],
                    as: 'role'
                }
            ]
        })
        .then(data => {
            res.status(200).json({ data });
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
}

exports.findUser = (req, res, next) => {
    const userId = req.params.userId;
    
    Users
        .scope('activeUser')
        .findByPk(userId, {
            attributes: {
                exclude: ['created_at', 'modified_at']
            }
        })
        .then(data => {
            res.status(200).json({ data });
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
}

exports.createUser = async (req, res, next) => {
    // await Roles.bulkCreate([
    //     { name: 'admin', permissions: [1] },
    //     { name: 'author', permissions: [1] },
    //     { name: 'guest', permissions: [1] }
    // ])
    
    const { name, email, gender, roleId, status = 0 } = req.body;
    
    Users.create({ name, email, gender, roleId, status })
    .then(result => {
        res.status(200).json({ result, message: 'user created successfully' });
    })
    .catch(err => {
        res.status(500).json({ error: err.message });
    });
}

exports.updateUser = (req, res, next) => {
    const userId = req.params.userId;
    const { name, email, gender, status = 0 } = req.body;
    const data = { name, email, gender };
    if (status) data.status = status; 
    Users.update(
        data,
        {
            where: { id: userId }
        }
    )
    .then(result => {
        res.status(200).json({ result, message: 'user updated successfully' });
    })
    .catch(err => {
        res.status(500).json({ error: err.message });
    });
}

exports.deleteUser = (req, res, next) => {
    const userId = req.params.userId;
    
    Users.destroy({
        where: {
           id: userId
        }
    })
    .then(result => {
        if(result === 1){
            res.status(200).json({ message: "User deleted successfully" });          
        }
        else {
            res.status(404).json({message:"user not found"})
        }
    })
    .catch(err => {
        res.status(500).json({ error: err.message });
    });
}