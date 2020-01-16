const server = require('./server');

server.listen(8000, () => {
    console.log(`\n ** server running on http://localhost:8000 ** \n`);
});