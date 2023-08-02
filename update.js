/**
 * 更新 package.json 版本号
 */
const fetch = require("node-fetch");
const md5 = require("js-md5");
const fs = require("fs");

const getVersion = async() => {
    const latestVersion = await fetch("https://registry.npmjs.org/lvbyte-cdn/latest").then(res => res.json()).then(res => {
        return res.version;
    })
    return latestVersion;
}

const update = async() => {
    const version = await getVersion();
    var verArray = version.split(".");
    verArray[2] = verArray[2].split("-")[0];
    if (verArray[2] < 9) {
        verArray[2] = String(Number(verArray[2])+1);
    } else if (verArray[1] < 9) {
        verArray[1] = String(Number(verArray[1])+1);
        verArray[2] = 0;
    } else {
        verArray[0] = String(Number(verArray[0])+1);
        verArray[1] = 0;
        verArray[2] = 0;
    }
    var newVersion = `${verArray[0]}.${verArray[1]}.${verArray[2]}`
    var newVersion = newVersion + "-" + md5(`${new Date().getTime()}${newVersion}`);
    console.log(newVersion);
    var packageJson = fs.readFileSync("./package.json");
    var packageJson = JSON.parse(packageJson);
    packageJson.version = newVersion;
    var newPackage = JSON.stringify(packageJson);
    fs.writeFileSync("./package.json", newPackage);
    console.log("Complete!!");
}

update()
