const pool = require("../database/database");

const getUsers = async (req, res) => {
    const data = await pool.query('SELECT * FROM users')
    console.log(data.rows)
    return res.json(data.rows)
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    const data = await pool.query(`SELECT * FROM users WHERE id=${id}`)
    return res.json(data.rows[0])
};


const postUsers = async (req, res) => {
    const { name, email } = req.body;
    const responseId = await pool.query(`SELECT max(id) AS id FROM users`);
    const { id } = responseId.rows[0];
    await pool.query(`INSERT INTO users VALUES ('${id + 1}', '${name}', '${email}')`);
    return res.status(201).json({
        success: "Usuario creado con éxito"
    })
};

const patchUserById = async (req, res) => {
    const { name, email } = req.body;
    const { id } = req.params;
    const values = [name, email]
    await pool.query(`UPDATE users SET name=$1, email=$2 WHERE id=${id}`, values);
    return res.status(201).json({
        success: "Usuario actualizado con éxito"
    })
};

const deleteUserById = async (req, res) => {
    const { id } = req.params;
    await pool.query(`DELETE FROM users WHERE id=${id}`);
    return res.status(200).json({
        success: "Usuario eliminado con éxito"
    })
};

module.exports = {
    getUsers,
    getUserById,
    postUsers,
    patchUserById,
    deleteUserById,
}