import { externalSchematic, Rule, SchematicContext, Tree } from "@angular-devkit/schematics"

export function addMaterial(): Rule {
    return (_tree:Tree, _context: SchematicContext) => {
        return externalSchematic('@angular/material', 'ng-add',{});
    }
}
