var MONGODB_URI;
var TOKEN_SECRET;

if (process.env.NODE_ENV === 'production'){
    MONGODB_URI = process.env.MONGODB_URI
    TOKEN_SECRET = process.env.TOKEN_SECRET
}
else{
    MONGODB_URI = "mongodb://localhost/animaps"
    TOKEN_SECRET = "hello_world"
}

const key = {
    uri: MONGODB_URI || "",
    secret: TOKEN_SECRET || ""
};

export default key;