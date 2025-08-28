"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTailwind = addTailwind;
const tasks_1 = require("@angular-devkit/schematics/tasks");
function addTailwind() {
    return (_tree, context) => {
        context.logger.info("Installing TailwindCss...");
        context.addTask(new tasks_1.NodePackageInstallTask({
            packageName: "tailwindcss @tailwindcss/postcss postcss",
            workingDirectory: ''
        }));
        _tree.create('postcssrc.json', postcssrcContent);
        const stylesScssPath = "src/styles.scss";
        const content = _tree.read(stylesScssPath).toString("utf-8");
        const tailwindImport = '@use "tailwindcss";';
        if (!content.includes(tailwindImport)) {
            _tree.overwrite(stylesScssPath, tailwindImport + '\n' + content);
        }
        return _tree;
    };
}
const postcssrcContent = `{
    "plugins": {
        "@tailwindcss/postcss":{}
    }
}`;
