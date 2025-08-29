import { Rule, SchematicContext, Tree } from "@angular-devkit/schematics"
import { addRootProvider } from "@schematics/angular/utility/standalone/index"

import { } from "@schematics/angular/utility"
export function addMaterial(): Rule {
    return (_tree:Tree, context: SchematicContext) => {
        context.logger.info("Installing Angular Material...")
        // const appConfigFilePath = '/src/app/app.config.ts' 

        return addRootProvider('default', ({code, external}) => {
            return code`${external('provideHttpClient', '@angular/common')}(),
            { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
            `;
        });
    }
}
