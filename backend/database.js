import "dotenv/config";
import {Client} from "pg"

const pgClient = new Client({
    connectionString: `postgresql://postgres:${process.env.DBPASSWORD}@localhost:5433/sharethingdb`
    
})

async function dbconnect() {
    try{
        await pgClient.connect()
    }catch(err){
        console.log("failed to connect!!", err)
    }
}

export { dbconnect, pgClient }