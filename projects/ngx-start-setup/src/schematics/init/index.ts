import {schema as InitSchema } from "./schema.json"
import { chain, externalSchematic, Rule, SchematicContext, Tree } from "@angular-devkit/schematics"
import { execSync } from "child_process";
export interface InitSchema {
    name?: string;
    version?: string;
}

export function init(options: InitSchema): Rule {
    return (_tree:Tree, context: SchematicContext) => {
        context.logger.info(`Creating Angular project ${options.name} in version ${options.version}...`)
        execSync(`ng new ${options.name}`,{stdio: 'inherit'})
        return _tree;
        // return chain([
        //     externalSchematic('@schematics/angular', 'ng-new', {
        //         name:options.name,
        //         version: options.version,
        //         routing:true,
        //         styles:'scss'
        //     })
        // ])
    }
}