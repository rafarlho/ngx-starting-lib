#!/usr/bin/env node
const { execSync } = require("child_process")

function run(command) {
    execSync(command,{stdio:"inherit"})
}

const args = process.argv.slice(2)
const appName = args[0] ?? "my-app" 
const angularVersion = args[1] ?? "latest"
const createApplication = args[2] ?? true

console.log(`Creating new Angular project named ${appName}`)

run(`npx -p  @angular/cli@${angularVersion} ng new --style=scss --ai-config=none --zoneless=false --ssr=false --create-application=${createApplication} ${appName}`)

process.chdir(appName)

console.log("Your app is now ready to go! Happy coding!")