const EntitySchema = require("typeorm").EntitySchema;
const validator = require("validator");

const User = new EntitySchema({
    name: "User",
    tableName: "users",
    columns: {
        id: {
            primary: true,
            type: Number,
            nullable: false,
        },
        firstName: {
            type: String,
            nullable: [false, "First name is required!"],
        },
        lastName: {
            type: String,
            nullable: [false, "Last name is required!"],
        },
        email: {
            type: String,
            nullable: [false, "Email is required!"],
            unique: true,
            lowercase: true,
            validator: {
                validator: (el) => isEmail(el),
                message: "Email is not valid!",
            },
        },
        password: {
            type: String,
            nullable: [false, "Password is required!"],
            validate: {
                validator: (el) => el.length >= 8,
                message: "Password must containt at least 8 characters!",
            },
        },

        passwordConfirm: {
            type: String,
            nullable: [false, "passwordConfirm is required!"],
            validate: {
                validator: function (el) {
                    return el === this.password;
                }
            }
        },
    }
});

module.exports = User;

