# esone

esone is ECMAScript 1 implementation built with typescript & functional programming manner.

You can find specification of ECMAScript 1 in [here](https://ecma-international.org/wp-content/uploads/ECMA-262_1st_edition_june_1997.pdf).

## Usage

```
npm run build && npm run interpret [source file]
```

## Implementation status

- Expression
  + [x] Literals
  + [x] Identifier reference
  + [x] `this` reference
  + [x] Grouping operator
  + [x] Property access (dot notation)
  + [ ] (Computed) Property access (bracket notation) 
  + [ ] `new` operator
  + [x] Function call (partially, `this` bind process is not completed)
  + [ ] Postfix operators
  + [ ] Unary operators
  + [x] Multiplicative operators
  + [x] Additive operators
  + [ ] Bitwise shift operators
  + [ ] Relational operators
  + [x] Equality operators
  + [ ] Binary bitwise operators
  + [ ] Binary logical operators
  + [ ] Conditional operator
  + [x] Assignment operator (simple form)
  + [ ] (Compound) assignment operator
  + [ ] Comma operator
- Statement
  + [x] Block
  + [x] Variable statement
  + [x] Empty statement
  + [x] Expression statement (partially, as much as expression is implemented)
  + [x] If statement
  + [x] While statement
  + [ ] For statement
  + [ ] For..in statement
  + [ ] Continue statement
  + [ ] Break statement
  + [x] Return statement
  + [ ] With statement
- Declaration
 [x] Function Declaration
[ ] Standard Library
[ ] Automatic semicolon insertion