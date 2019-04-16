import * as path from 'path';
import * as ts from 'typescript';

const errors: string[] = [];

const traverse = (node: ts.Node, checker: ts.TypeChecker) => {
  if (
    node.kind === ts.SyntaxKind.FunctionDeclaration &&
    (ts.getCombinedModifierFlags(node as ts.FunctionDeclaration) & ts.ModifierFlags.Export) !== 0 &&
    node.getText().indexOf('exampleUnion') >= 0
  ) {
    const { name } = node as ts.FunctionDeclaration;

    if (name) {
      const symbol = checker.getSymbolAtLocation(name);

      if (symbol) {
        console.log('Name:', symbol.getName());
        console.log('Text:', (node as ts.FunctionDeclaration).getText());
        const type = checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration);

        type.getCallSignatures().forEach((signature) => {
          const returnType = checker.typeToString(signature.getReturnType());
          console.log('Union:', signature.getReturnType().isUnion());
          console.log('Returns:', returnType);


          if (!returnType.includes('null')) {
            errors.push(`${symbol.getName()} return type "${returnType}" did not include "null"`);
          }
        });

        console.log('\n');
      }
    }
  } else {
    ts.forEachChild(node, (subNode) => {
      traverse(subNode, checker)
    });
  }
};

function getReturnTypes() {
  const compilerOptions = require(path.join(process.cwd(), 'tsconfig.json'));
  const sourceFileNames = [path.resolve(process.cwd(), 'src/example.ts')];
  const program = ts.createProgram(sourceFileNames, compilerOptions);
  const sourceFiles = program.getSourceFiles();
  const checker = program.getTypeChecker();

  sourceFiles.forEach((node) => {
    traverse(node, checker);
  });

  if (errors.length) {
    errors.forEach((error) => {
      console.log('Error:', error);
    });

    return process.exit(1);
  }
}

getReturnTypes();
