const app = require ("./app")
const { PORT } = require ("./config")

require('./config/db')

const server = app.listen(PORT, () => {
    console.log(`[+] Server is running on port ${PORT}`);
})