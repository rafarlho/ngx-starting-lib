import { strings } from "@angular-devkit/core";
import { apply, MergeStrategy, mergeWith, move, Rule, SchematicContext, template, Tree, url } from "@angular-devkit/schematics";
import { AppName } from "../generic-models/app-name";

export function customizeEntryPage(option: AppName): Rule {
    return (_tree: Tree, _context: SchematicContext) => {
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