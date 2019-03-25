window.__webpack_public_path__ = __webpack_public_path__ = wpCodeOptions.publicPath;
console.log(window.__webpack_public_path__);

import * as monaco from 'monaco-editor'; // so monaco will be loaded as a global
// or import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
// if shipping only a subset of the features & languages is desired