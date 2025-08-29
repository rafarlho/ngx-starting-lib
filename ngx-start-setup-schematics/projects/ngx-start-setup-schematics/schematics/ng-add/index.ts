import { Rule, SchematicContext, Tree } from "@angular-devkit/schematics";

export function ngAdd():Rule {
    return (tree: Tree, context:SchematicContext) => {
        context.logger.info('Successfully installed ngx-start-setup-schematics!')
        context.logger.info('Initilizing dependencies installation and configuration...')
        return tree
    }
}