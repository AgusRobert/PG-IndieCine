const server = require("./src/app.js");
const { connect } = require("./src/db.js");

connect.sync({ force: true}).then(() => {
    server.listen(3001,() => {
        console.log("***** listening at 3001 *****");
    })
});