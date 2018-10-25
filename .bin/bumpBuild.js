const fs = require('fs')
const path = require('path')

const pckgPath = path.join(__dirname, '../app.json')
const pckg = require(pckgPath)

const pckgWithBumpedBuild = {
  ...pckg,
  expo: {
    ...pckg.expo,
    ios: {
      ...pckg.expo.ios,
      buildNumber: (parseInt(pckg.expo.ios.buildNumber) + 1).toString()
    }
  }
}

fs.writeFileSync(pckgPath, JSON.stringify(pckgWithBumpedBuild, null, 2), 'utf8')