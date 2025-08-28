import { Rule, SchematicContext, Tree } from "@angular-devkit/schematics"
import { NodePackageInstallTask } from "@angular-devkit/schematics/tasks"

export function addTailwind(): Rule {
    return (_tree:Tree, context: SchematicContext) => {
        context.logger.info("Installing TailwindCss...")
        
        context.addTask(new NodePackageInstallTask({
            packageName:"tailwindcss @tailwindcss/postcss postcss",
            workingDirectory:''
        }))

        _tree.create('postcssrc.json',postcssrcContent)

        const stylesScssPath = "src/styles.scss"
        const content = _tree.read(stylesScssPath)!.toString("utf-8")
        const tailwindImport = '@use "tailwindcss";'
        if(!content.includes(tailwindImport)) {
            _tree.overwrite(stylesScssPath,tailwindImport + '\n' + content)
        }
        return _tree
    }
}

const postcssrcContent = `{
    "plugins": {
        "@tailwindcss/postcss":{}
    }
}`