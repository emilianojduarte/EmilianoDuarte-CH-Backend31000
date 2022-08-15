import bcrypt from 'bcrypt';

function checkPassword (plainPassword, hashedPassword) {
    return bcrypt.compareSync(plainPassword, hashedPassword);
}

export default checkPassword;