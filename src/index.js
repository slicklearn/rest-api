import app from './app';
import { createRoles } from './libs/initialSetup';
import { Console } from 'captainjs';
import './database';

// Format console with prefixes and colors
console = new Console();

// Prepare init setup
createRoles();

// Listen application on defined port
app.listen(app.get("port"), () => {
    console.log(`Server listening on port ${app.get("port")}`);
})