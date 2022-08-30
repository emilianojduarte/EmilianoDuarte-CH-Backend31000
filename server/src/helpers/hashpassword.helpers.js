import bcrypt from 'bcrypt';

function hashPassword (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

export default hashPassword;