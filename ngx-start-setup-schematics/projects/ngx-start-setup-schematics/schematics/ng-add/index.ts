import { Rule, SchematicContext, Tree } from "@angular-devkit/schematics";

export function ngAdd():Rule {
    return (tree: Tree, _context:SchematicContext) => {
        return tree
    }
}