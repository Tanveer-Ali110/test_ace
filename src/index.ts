import './pre-start'; // Must be the first import
import Config from "./config/constant";
import server from './server';
import { initSequelize } from "./storage";

// Constants
const serverStartMsg = `Server is listening on port: ${Config.port.toString()}`;
const serverUrl = `http://localhost:${Config.port}`;

// Start server
server.listen(Config.port, () => {
    initSequelize().catch(err => console.log('initSequelize', err))
    console.log(serverStartMsg, serverUrl);
});