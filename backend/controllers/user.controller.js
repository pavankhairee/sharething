import { pgClient } from "../database.js";

const createPost = async (req, res) => {

    try {
        const userId = req.user.id
        const { media_type, title, creator, review_text, rating } = req.body;

        const query = `INSERT INTO posts (user_id, media_type, title, creator, review_text, rating) 
                   VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`
        const result = await pgClient.query(query, [userId, media_type, title, creator, review_text, rating])

        res.status(201).json({
            message: "Post is uploaded!!",
            result: result.rows[0]
        })
    } catch (err) {

        res.status(500).json({
            error: "Could not create post!!"
        })
    }

}

const feed = async (req, res) => {
    try {
        const query = `SELECT media_type, title, creator, review_text, rating FROM posts;`
        const result = pgClient.query(query)

        res.json({
            result: (await result).rows
        })
    } catch (err) {
        res.status(500).json({
            error: "could not fetch feed"
        })
    }
}


export { createPost, feed }