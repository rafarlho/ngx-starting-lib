#!/usr/bin/env node
const chalk  = require("chalk")
const { execSync } = require("child_process")
const readline  = require("readline")

function run(command) {
    return execSync(command,{stdio:"inherit"})
}

function getUserInput(question, defaultValue) {
    const readLineInterface = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    return new Promise((resolve) => {
        readLineInterface.question(question, (answer) => {
            readLineInterface.close()
            if(answer)
                resolve(answer)
            else resolve(defaultValue)
        })
    })
}

(async () => {
    const log = console.log
    
    log(chalk.green.bold(`Welcome to ngx-start-setup! 🍻`))
    log(`Lets create and setup your new project right away.. 🎬\n`)
    
    
    log(chalk.bgBlue.bold(`Creating new Angular project... `))
    let validaAppName = false
    let appName = ""
    do {
        appName = await getUserInput(chalk.blue("What should the project be called?(MyApp): "),"MyApp")
        if (appName.trim().includes(" ")) {
            log(chalk.redBright("Invalid name: The project name cannot contain spaces. Please try again."));
        } else if (!/^[a-zA-Z0-9_-]+$/.test(appName)) {
            log(chalk.redBright("Invalid name: The project name can only contain letters, numbers, dashes, and underscores. Please try again."));
        } else {
            validaAppName = true;
        }
    } while(!validaAppName)
    // const angularVersion = await getUserInput(chalk.blue("What version should it be?(latest): "),"latest")

    // run(`npx -p  @angular/cli@${angularVersion} ng new --style=scss --ai-config=none --zoneless=false --ssr=false --create-application=${createApplication} ${appName}`)

    try {
        run(`npx -p  @angular/cli@20 ng new ${appName?? "MyApp"}`)
    }catch(ex) {
        log(chalk.redBright.bold.underline( "\nFailed to create angular app!!"))
        log(chalk.redBright( "Please consult the command window and try again.\n"))
        throw ex
    }
    log(chalk.bgGreen.bold(`Successfully created ${appName} in version ${angularVersion} `))
    process.chdir(appName)

    //DEV -> creates and instatiates npmrc t Verdaccio
    run(`echo registry=http://localhost:4873 > .npmrc`)

    log(chalk.bgMagenta.bold("\nInstalling schematics package..."))
    run("ng add ngx-start-setup-schematics --skip-confirmation")
    log(chalk.bgGreen.bold("Successfully installed schematics package!\n"))

    log(chalk.bgHex("#7447b3").bold("\nInstalling and configuring Angular Material!"))
    run("npm install @angular/material")
    run("ng g ngx-start-setup-schematics:add-material")
    log(chalk.bgGreen.bold("Successfully installed and configured Angular Material!"))

    log(chalk.bgHex("#e864d4").bold("\nInstalling and configuring TailwindCSS!"))
    run("ng g ngx-start-setup-schematics:add-tailwind")
    log(chalk.bgGreen.bold("Successfully installed and configured TailwindCSS!"))

    run(`ng g ngx-start-setup-schematics:customize-entry-page --name ${appName}`)

    log(chalk.greenBright.bold.underline("\n\nYour app is now ready to go!"))
    log(chalk("Thanks for using StartingLib Cli!!"))
    log(chalk("Happy coding! 🍻"))
})()