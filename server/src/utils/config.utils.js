import dotenv from "dotenv";
dotenv.config();
import Yargs from "yargs/yargs";
const args = Yargs(process.argv.slice(2)).alias({
    u: 'user',
    p: 'password'
}).default({
    port: 3001,
    mode: 'fork',
}).argv

let config = {
    port: args.port,
    mongoconnect: process.env.PAK_MONGO,
    mode: args.mode,
}

export default config;