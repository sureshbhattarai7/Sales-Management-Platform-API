const EntitySchema = require("typeorm").EntitySchema;
const validator = require("validator");

module.exports = new EntitySchema({
    name: "User",
    tableName: "users",
    columns: {
        id: {
            primary: true,
            type: "number",
            nullable: false,
        },
        firstName: {
            type: "varchar",
            nullable: [false, "First name is required!"],
        },
        lastName: {
            type: "varchar",
            nullable: [false, "Last name is required!"],
        },
        email: {
            type: "varchar",
            nullable: [false, "Email is required!"],
            unique: true,
            lowercase: true,
            validator: {
                validator: (el) => isEmail(el),
                message: "Email is not valid!",
            },
        },
        password: {
            type: "varchar",
            nullable: [false, "Password is required!"],
            validate: {
                validator: (el) => el.length >= 8,
                message: "Password must containt at least 8 characters!",
            },
        },

        passwordConfirm: {
            type: "varchar",
            nullable: [false, "passwordConfirm is required!"],
            validate: {
                validator: function (el) {
                    return el === this.password;
                }
            }
        },
    }
});

