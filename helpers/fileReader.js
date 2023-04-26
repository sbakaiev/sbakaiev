const fs = require('fs');
const PRODUCT_LINKS_FILE = './productLinks.txt';

module.exports = {
    readFileContent() {
        const fileData = fs.readFileSync(PRODUCT_LINKS_FILE, 'utf8');
        return fileData;
    }
}