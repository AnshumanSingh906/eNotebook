const mongoose = require ('mongoose');

const mogoURI = "mongodb+srv://anshumansingh906:Ansh-enotebook-database@cluster0.s2uoy0k.mongodb.net/?retryWrites=true&w=majority";

const connectToMongo = async () => {
    mongoose.connect(mogoURI).then(console.log("hurray")).catch (error => console.log(error));
}

module.exports = connectToMongo;
