# NgxStartSetupSchematics
# ngx-start-setup-schematics

**ngx-start-setup-schematics** is a CLI tool designed to streamline the setup of Angular projects with essential configurations, including Angular Material, TailwindCSS, and ngx-translate. It provides a set of schematics to automate repetitive tasks, making it easier to bootstrap and customize Angular applications.

---

## Features

- **Angular Material Integration**: Quickly install and configure Angular Material with prebuilt themes and typography settings.
- **TailwindCSS Setup**: Seamlessly integrate TailwindCSS into your Angular project.
- **Ngx-Translate Configuration**: Add and configure ngx-translate for internationalization, including language file generation.
- **Generic Providers**: Add reusable providers to your Angular application.

---

## Installation

To install the library globally, run:

```bash
npm install -g ngx-start-setup-schematics
```

--- 

## Usage

### Add Angular Material
```bash
ng g ngx-start-setup-schematics:add-material
```

### Add TailwindCSS
```bash
ng g ngx-start-setup-schematics:add-tailwind
``` 

### Add Ngx-Translate
```bash
ng g ngx-start-setup-schematics:add-ngx-translate --languages="en,fr,es" --default="en"
```
### Add generic providers
```bash
ng g ngx-start-setup-schematics:add-generic-providers
``` 

---

## Contributing
Contributions are welcome! If you find a bug or have a feature request, please open an issue or submit a pull request.

---

## Author
Created by rafarlho. If you have any questions or feedback, feel free to reach out!