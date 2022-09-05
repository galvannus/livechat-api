const Role = require('../models/Role');

exports.createRole = async (req, res) => {
    
    try {
        let role;

        //Create Role
        role = new Role(req.body);

        //Save Role
        await role.save();

        //Message of confirmation
        res.send("Role Created!!")
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'An error ocurred' });
    }
}

//Get role List
exports.getRoleList = async (req, res) => {
    try {
        const roleList = await Role.find({});
        res.json({ roleList });
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'An error ocurred' });
    }
}