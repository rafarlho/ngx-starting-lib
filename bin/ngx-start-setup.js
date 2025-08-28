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

console.log("Installing schematics package...")
run("npm install ../ngx-start-setup-schematics/dist/ngx-start-setup-schematics/ngx-start-setup-schematics-0.0.1.tgz")
console.log("Successfully installed schematics package!")
console.log("Installing and configuring TailwindCSS!")
run("ng g ngx-start-setup-schematics:add-tailwind")
console.log("Successfully installed and configured TailwindCSS!")

console.log("Your app is now ready to go! Happy coding!")