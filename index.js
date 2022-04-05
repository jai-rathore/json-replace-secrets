#!/usr/bin/env node

const yargs = require("yargs");
const fs = require("fs");

const options = yargs
 .option("s", { alias: "secretfile", describe: "Enter Secret File Name Without Path and Extension", type: "string", demandOption: true })
 .option("c", { alias: "configfile", describe: "Enter Config File Name Without Path and Extension", type: "string", demandOption: true })
 .argv;

const secretfilename = options.secretfile;
let secretData = fs.readFileSync(secretfilename+'.json');
let secretDataJson = JSON.parse(secretData);
let secretKeys = Object.keys(secretDataJson);

const configfilename = options.configfile;
let configdata = fs.readFileSync(configfilename+'.json');
let configDataJson = JSON.parse(configdata);
let configDataJsonString = JSON.stringify(configDataJson);

for (let index = 0; index < secretKeys.length; index++) {
    const element = secretKeys[index];
    while(configDataJsonString.includes('${'+element+'}')){
        console.log(`Replacing key ${element} in the config file`);
        configDataJsonString = configDataJsonString.replace('${'+element+'}', secretDataJson[element]);
    }
};

fs.writeFile(`${configfilename}.json`, configDataJsonString, 'utf8', function(err) {
    if (err) throw err;
    console.log('replacement complete');
});