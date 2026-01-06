import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import "dotenv/config"
import { pgClient } from "../database.js";

const register = async (req, res) => {

    try {
        const { username, email, password } = req.body;
        const hashPassword = await bcrypt.hash(password, 10)

        await pgClient.query(`INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3)`, [username, email, hashPassword]);
        res.status(201).json({ message: "User Registered successfully" });
    } catch (err) {
        res.status(500).json({ message: " FailedRegistered", err });
    }

}

const login = async (req, res) => {
    const { email, password } = req.body;
    const result = await pgClient.query(`SELECT * FROM users WHERE email = $1`, [email])

    const user = result.rows[0]
    const isPassword = await bcrypt.compare(password, user.password_hash)

    if (!isPassword) {
        return res.status(401).json({ message: "Incorrect Credentials!!" })
    }

    const token = jwt.sign({
        id: user.id
    }, process.env.AUTHJWT,
        { expiresIn: '7d' }
    );

    res.json({
        token,
        user: {
            id: user.id,
            username: user.username
        }
    })
}

const getme = async (req, res) => {
    const userId = req.user.id
    const result = await pgClient.query(`SELECT id, username, email, bio, profile_pic, created_at FROM users WHERE id = $1`,
        [userId])

    if (result.rowCount === 0) {
        res.status(404).json({ message: "User Not Found!!" })
    }
    res.json({
        user: result.rows[0]
    })
}

export { register, login, getme }