import { readFile } from 'node:fs/promises';
import ts from 'typescript';

export async function loadTypeScript(url) {
  if (url.pathname.endsWith('.json')) return 'data:text/javascript;base64,' + Buffer.from('export default '+await readFile(url,'utf8')).toString('base64');
  const {outputText}=ts.transpileModule(await readFile(url,'utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext}});
  let source=outputText;
  for (const match of outputText.matchAll(/(?:from\s+|import\s*)["'](\.[^"']+)["']/g)) {
    const path=match[1];const dependency=new URL(path.endsWith('.json')?path:path+'.ts',url);
    source=source.replaceAll('"'+path+'"','"'+await loadTypeScript(dependency)+'"');
  }
  return 'data:text/javascript;base64,'+Buffer.from(source).toString('base64');
}
