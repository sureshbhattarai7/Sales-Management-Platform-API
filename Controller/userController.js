const User = require('./../Model/userModel').default;
const { getRepository } = require('typeorm');

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
            message: err.message
        })
    }
}

