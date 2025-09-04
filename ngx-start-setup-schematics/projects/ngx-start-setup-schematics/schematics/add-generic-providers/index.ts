import { Rule, SchematicContext, Tree } from "@angular-devkit/schematics"
import { addRootProvider } from "@schematics/angular/utility/standalone/index"

import { } from "@schematics/angular/utility"
export function addGenericProviders(): Rule {
    return (_tree:Tree, _context: SchematicContext) => {

        const angularJsonPath = "angular.json"
        if (!_tree.exists(angularJsonPath)) {
            throw new Error("angular.json not found. Make sure you are running this schematic inside an Angular project.")
        }

        const angularJson = JSON.parse(_tree.read(angularJsonPath)!.toString("utf-8"))

        const appName = Object.keys(angularJson.projects)[0];
        return addRootProvider(appName, ({code, external}) => {
            return code`${external('provideHttpClient', '@angular/common/http')}()
            `;
        });
    }
}
