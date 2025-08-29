import { externalSchematic, Rule, SchematicContext, Tree } from "@angular-devkit/schematics"

import { } from "@schematics/angular/utility"
export function addMaterial(): Rule {
    return (_tree:Tree, context: SchematicContext) => {
        context.logger.info("Installing Angular Material...")

        return externalSchematic('@angular/material', 'ng-add',{});
    }
}
