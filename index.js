const server = require('./server');

const port = process.env.PORT || 8000;

server.listen(8000, () => {
    console.log(`\n ** server running on http://localhost:8000 ** \n`);
});