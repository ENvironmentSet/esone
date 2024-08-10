# Commit message convention

Highly inspired by [Karma's](http://karma-runner.github.io/4.0/dev/git-commit-msg.html?fbclid=IwAR1wmeJ_ymMd7nDUg-Nt5ZT7P2hCysJ1Q5HuHZFHsIsmsXbnrLL21jaaqoY).

## Format of commit message

```
<type>(scope): subject

detailed explanation

- problem#issue(if there is no issue, you can skip this): solution
```

## Detailed explanation

### Scope

Format of scope:

Scope is logical place where your commit is about.

```
Acropolis[/package name{/module name}]
```

> **NOTICE**: Scope must be specific as much as possible.

#### Module

*Module* in this project doesn't same as es6 module.
*Module* is a directory that satisfy following structure:

```
- ModuleName
  - __tests__ // reflects directory structure of Module, but adds .test before filename extension and also excludes SubModules.
  - index // main export file
  - SubModuleA
  - SubModuleB
  - codeA
  - codeB
```

Module user must not directly access *Module*'s code or submodule directly.
i.e You can only import exported things in `index`.

> **NOTICE**: Package's src directory is package's main module. 
> So it's name is considered as package's name.
> (i.e if your updates file(`Acropolis/packages/core/src/a.js`), then your commit's scope is `Acropolis/core/core`.)
> And because of this convention, you can't directly have submodule that it's name is package's name inside src directory.

### Kind of types

If scope includes any single module name, it's so called *Module Level Scope*.
Else, it's so called *Package Level Scope*.

#### Package Level

- **doc**: commit that changes package's document
- **dep**: commit that effects change of package's dependency
- **devtool**: commit that effects change of package's devtool

#### *Module* Level

- **test**: commit that effects change of module's test
- **feat**: commit that effects change of module's feature
- **refactor**: commit that refactors module