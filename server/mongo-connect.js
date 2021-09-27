const mongoose = require("mongoose");
const userModel = require("./models/user");
import { Session } from '@shopify/shopify-api/dist/auth/session';

const username = "Godstime";
const password = "Lqx3E4116690";
const cluster = "cluster0";
const dbname = "swytech";

mongoose.connect(
    `mongodb+srv://${username}:${password}@${cluster}.ybnw8.mongodb.net/${dbname}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));

db.once("open", function ()
{
    console.log("Connected successfully");
});

class MongoStore {
    constructor(){

    }

    async storeCallback(session){
        const user = new userModel(session);
        console.log(session)
        try {
            await user.save();
            console.log(user);
        } catch (error) {
            console.log(error);
        }
        // console.log(session);
        // fs.writeFileSync(FILENAME, JSON.stringify(session))
        return true
    }

    async loadCallback(id){
        const users = await userModel.find({
            "id": id
        });
        console.log('load')
        try {
            console.log(users);
            if (users.length > 0) {
                let session = new Session(id);

                session.shop = result[0].session;
                session.state = result[0].state;
                session.isOnline = result[0].isOnline;

                return session;
            } else {
                return undefined;
            }
        } catch (error) {
            console.log(error);
        }
        return false;
    }

    async deleteCallback(id){
        console.log('deleteCallback', id)
    }
}

export default MongoStore;
