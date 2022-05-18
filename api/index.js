const server = require("./src/app.js");
const { connect } = require("./src/db.js");
PORT = 3001;
connect.sync({ force: false}).then(() => {
    server.listen(process.env.PORT || PORT   ,() => {
        console.log("***** listening at 3001 *****");
    })
});