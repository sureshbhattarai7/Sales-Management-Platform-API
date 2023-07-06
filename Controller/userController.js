const User = require('./../Model/userModel');
const { getRepository } = require('typeorm');
const bcrypt = require('bcryptjs');

exports.createUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const userRepository = getRepository(User);

        const user = userRepository.create({
            firstName, lastName, email, password
        });

        const createdUser = await userRepository.save(user);

        res.status(200).json({
            status: 'success',
            data: {
                user: createdUser
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message,
            error:  err
        })
    }
}


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userRepository = getRepository(User);

        const user = userRepository.findOne({ email }).select('+password');
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'User does not exists!'
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                status: 'fail',
                message: 'Invalid email or password!'
            })
        }

        res.status(200).json({
            status: 'success',
            message: 'User logged in successfully!',
            data: {
                user
            }
        })

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    };
};

exports.getUsers = async (req, res) => {
    try {
        const userRepository = getRepository(User);

        const getUsers = await userRepository.find();
        res.status(200).json({
            status: 'success',
            data: {
                getUsers
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
}

exports.getUser = async (req, res) => {
    try {
        const userRepository = getRepository(User);
        const getUser = await userRepository.findOne(req.params.id);

        if (!getUser) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found!'
            })
        };

        res.status(200).json({
            status: 'success',
            data: {
                getUser
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { firstName, lastName, password } = req.body;
        const userRepository = getRepository(User);

        const user = await userRepository.findOne(req.params.id, {
            new: true,
            runValidators: true
        });
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            })
        }
        
        user.firstName = firstName;
        user.lastName = lastName;
        user.password = password;

        const updateUser = await userRepository.save(user);
        
        res.status(200).json({
            status: 'success',
            data: {
                updateUser
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    };
};

exports.deleteUser = async (req, res) => {
    try {
        const userRepository = getRepository(User);
        const user = await userRepository
            .createQueryBuilder()
            .delete()
            .from(User)
            .where('id = :id', { id: id })
            .execute();
        
        if (user.affected === 0) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            })
        }

        res.status(200).json({
            status: 'success',
            data: null
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
}