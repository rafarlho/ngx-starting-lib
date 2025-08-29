import { Rule, SchematicContext, Tree } from "@angular-devkit/schematics"
import { NodePackageInstallTask } from "@angular-devkit/schematics/tasks"

export function addTailwind(): Rule {
    return (tree:Tree, context: SchematicContext) => {
        context.logger.info("Installing TailwindCss...")
        
        context.addTask(new NodePackageInstallTask({
            packageName:"tailwindcss @tailwindcss/postcss postcss",
            workingDirectory:''
        }))

        tree.create('postcssrc.json',postcssrcContent)

        const stylesScssPath = "src/styles.scss"
        const content = tree.read(stylesScssPath)!.toString("utf-8")
        const tailwindImport = '@use "tailwindcss";'
        if(!content.includes(tailwindImport)) {
            tree.overwrite(stylesScssPath,tailwindImport + '\n' + content)
        }
        return tree
    }
}

const postcssrcContent = `{
    "plugins": {
        "@tailwindcss/postcss":{}
    }
}`