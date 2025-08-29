import { strings } from "@angular-devkit/core";
import { apply, MergeStrategy, mergeWith, move, Rule, SchematicContext, template, Tree, url } from "@angular-devkit/schematics";
import { AppName } from "../generic-models/app-name";

export function customizeEntryPage(option: AppName): Rule {
    return (_tree: Tree, context: SchematicContext) => {
        context.logger.info(`Customizing entry page for app`);
        context.logger.info(`Customizing entry page for app: ${option.name}`);

        const source = apply(url('./files'), [
            template({
                ...strings,
                name: option.name,
                
            }),
            move('src/app')
        ]);

        return mergeWith(source,MergeStrategy.Overwrite)
    };
}