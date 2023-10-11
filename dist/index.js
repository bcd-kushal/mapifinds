"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const path_1 = __importDefault(require("path"));
const main_1 = __importDefault(require("./routes/main"));
const users_1 = __importDefault(require("./routes/users"));
const pointers_1 = __importDefault(require("./routes/pointers"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8001;
//connectDB();
/* LONG TERM::
        --> try clusterizing this
        --> LB-ing using NGINX
    */
//======[ initialize app() ]===========
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: '30mb' }));
app.use(body_parser_1.default.urlencoded({
    extended: false
}));
app.use(body_parser_1.default.json());
//=======[ define routing ]==============
app.use("/", main_1.default);
app.use("/user", users_1.default);
app.use("/pointers", pointers_1.default);
//========[ define environment ]=============
if (process.env.NODE_ENV === "production") {
    app.use(express_1.default.static("client/build"));
    //if dont recognize file - send back the OG index.html file
    app.get("*", (req, res) => {
        res.sendFile(path_1.default.resolve(__dirname, "client", "build", "index.html"));
    });
}
module.exports = app.listen(PORT, () => {
    console.log(`NodeJS for Mapifinds running on port: ${PORT}`);
});
