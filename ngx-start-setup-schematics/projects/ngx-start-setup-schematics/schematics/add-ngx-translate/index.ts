import { chain, Rule, SchematicContext, Tree } from "@angular-devkit/schematics"
import { NodePackageInstallTask } from "@angular-devkit/schematics/tasks";
import { Languages } from "./languages";
import { addRootProvider } from "@schematics/angular/utility/standalone/index"
import * as ts from 'typescript';
import { insertImport } from '@schematics/angular/utility/ast-utils';
import { InsertChange } from '@schematics/angular/utility/change';

export function addNgxTranslate(languages: Languages): Rule {
    return (_tree:Tree, _context: SchematicContext) => {
        const selectedLanguages = languages.languages.split(",").map(lang => lang.trim())
        let defaultLang = languages.default.trim()
        
        if(!selectedLanguages.includes(defaultLang)) {
            _context.logger.warn(`Inserted default language not found in language list. Using ${selectedLanguages[0]}.`)
            defaultLang = selectedLanguages[0];
        }

        _context.addTask(new NodePackageInstallTask({
            packageName: "@ngx-translate/core @ngx-translate/http-loader"
        }))

        const angularJsonPath = "angular.json"
        if (!_tree.exists(angularJsonPath)) {
            throw new Error("angular.json not found. Make sure you are running this schematic inside an Angular project.")
        }

        const angularJson = JSON.parse(_tree.read(angularJsonPath)!.toString("utf-8"))

        const appName = Object.keys(angularJson.projects)[0];

        return chain([
            
            //------ Updates app.config.ts and adds Translation providers ------
            addRootProvider(appName, ({code, external}) => {
                return code
    `\n    ${external('provideTranslateService', '@ngx-translate/core')}({
        loader: ${external('provideTranslateHttpLoader','@ngx-translate/http-loader')}({
            prefix: './i18n/',
            suffix: '.json'
        })
    })`;
            }),

            //------ Updates app.ts to define imports and configures translations ------
            (_tree:Tree, _context: SchematicContext) => {
                const path = "src/app/app.ts"
                const appComponentFile = ts.createSourceFile(
                    path,
                    _tree.read(path)!.toString('utf-8'),
                    ts.ScriptTarget.Latest,
                    true
                )

                const changes = [
                    insertImport(appComponentFile, path, 'TranslateService',"@ngx-translate/core"),
                    insertImport(appComponentFile, path, 'inject',"@angular/core")
                ]
                
                const selectedLanguagesToImport = selectedLanguages.map(lang => `"${lang}"`).join(', ')
                const classDeclaration = appComponentFile.statements.find(
                    (node) => ts.isClassDeclaration(node) && node.name?.text === "App"
                ) 

                const classEndPos = classDeclaration!.end -1
                changes.push(
                    new InsertChange(path, classEndPos, `
    private translateService = inject(TranslateService)

    constructor() {
        this.translateService.addLangs([${selectedLanguagesToImport}])
        this.translateService.setFallbackLang('${defaultLang}');
        this.translateService.use('${defaultLang}');
    }\n`)
                )

                const recorder = _tree.beginUpdate(path)
                for (const change of changes) {
                    if (change instanceof InsertChange) {
                        recorder.insertLeft(change.pos, change.toAdd)
                    }
                }
                _tree.commitUpdate(recorder)

                return _tree
            },
            
            //------ Creates translation files on public folder ------
            (_tree: Tree, _context: SchematicContext) => {
                selectedLanguages.forEach(lang => {
                    _tree.create(`public/i18n/${lang}.json`,"")
                })
                return _tree
            }
        ])
    }
}
