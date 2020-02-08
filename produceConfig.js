const _ = require('lodash');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('config.static.json'));
const dynamicConfig = JSON.parse(fs.readFileSync('config.runtime.json'));

function applyDynamicProperties(config, configObject) {
    Object.keys(configObject).forEach(key => {
        _.set(config, key, process.env[configObject[key]]);
    });
}

applyDynamicProperties(config, dynamicConfig);

fs.writeFileSync('config.json', JSON.stringify(config));
