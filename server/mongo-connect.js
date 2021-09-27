const mongoose = require("mongoose");
const userModel = require("./models/user");


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
        try {
            console.log(users);
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
