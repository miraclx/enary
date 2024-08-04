#!/usr/bin/env node

let fs = require('node:fs');
let zlib = require('node:zlib');

class Node {
  constructor(id, level) {
    this.id = id;
    this.level = level;
    this.children = [];
  }

  push(childId) {
    this.children.push(childId);
  }
}

function generateNaryTree({ leaves, branches, reverse }) {
  if (leaves <= 0 || branches <= 0) return [];

  if (branches === 1 && leaves > 1) return "Branches cannot be 1 when leaves are greater than 1";

  let nodes = [];
  let nodeId = 0;
  let level = 0;

  function createNodes(count, level) {
    let createdNodes = [];
    let max = count + nodeId;
    let min = nodeId;
    let offset = id => reverse ? (max + min) - id : id + 1;
    for (let i = 0; i < count; i++) {
      createdNodes.push(new Node(offset(nodeId++, min, max, reverse), level));
    }
    return createdNodes;
  }

  let lastLevelCount = leaves;
  let currentLevelNodes = createNodes(lastLevelCount, ++level);
  nodes.push(...currentLevelNodes);

  while (currentLevelNodes.length > 1) {
    let nextLevelCount = Math.ceil(currentLevelNodes.length / branches);
    let parentNodes = createNodes(nextLevelCount, ++level);
    nodes.push(...parentNodes);

    for (let i = 0; i < currentLevelNodes.length; i++) {
      let parentNode = parentNodes[Math.floor(i / branches)];
      parentNode.push(currentLevelNodes[i].id);
    }

    currentLevelNodes = parentNodes;
  }

  return nodes;
}

let visOrd = repr => repr == "v" ? "LR" : repr == "v+" ? "RL" : repr == "h" ? "TB" : repr == "h+" ? "BT" : null;

function toMermaid({tree, branches, repr, ascending, outlineLevels}) {
  let offset = (id, max) => ascending ? max - id + 1: id;
  let ord = visOrd(repr);
  if (!ord) return ord;
  let graph = `graph ${ord}`;
  let level, maxHeight = Math.floor((Math.log(tree.length) / Math.log(branches)) + 1);
  for (let entry of tree) {
    let id = offset(entry.id, tree.length);
    let lhs = `n${id}(${id})`;
    let rhs = entry.children.length > 0 ? ` --> ${entry.children.map((c) => `n${offset(c, tree.length)}`).join(" & ")}` : "";
    if (outlineLevels && level !== entry.level) {
      if (level) graph += "\n  end";
      level = entry.level;
      let level$ = ascending ? maxHeight - level + 1 : level;
      graph += `\
\n  subgraph g${level$}["Level ${level$}"]\
\n    style g${level} fill:none`;
    }
    graph += `\n    ${lhs}${rhs}`;
  }
  return outlineLevels ? graph + "\n  end" : graph;
}

function linked(code) {
  let mermaidOpts = {
    theme: "default", // default, neutral, forest, dark, base
  };

  let data = {
    code,
    mermaid: JSON.stringify(mermaidOpts),
    autoSync: true,
    rough: false,
    updateDiagram: false,
    panZoom: true
  };

  let payload = new TextEncoder().encode(JSON.stringify(data));

  let encoded = zlib.deflateSync(payload, {level: 9});

  let fragment = encoded.toString("base64").replace(/=/g, "").replace(/[+\/]/g, e=>e == "+" ? "-" : "_");

  return `https://mermaid.live/view#pako:${fragment}`;
}

const DEFAULT_REPR = "h";

function main() {
  let args = process.argv.slice(2);

  if (args.length < 2 || args.includes("-h") || args.includes("--help")) {
    console.error("Generate an n-ary tree under specific constaints");
    console.error();
    console.error("Usage: enary [opts] <leaves> <branches>");
    console.error();
    console.error("Options:");
    console.error(`  -a              Ascending`);
    console.error(`  -r              Reverse`);
    console.error(`  -l              Show level outlines`);
    console.error(`  -t <spec>       Table representation (default: \`${DEFAULT_REPR}\`)`);
    console.error(`                  - \`v\` for vertical   (\`v+\` to invert)`);
    console.error(`                  - \`h\` for horizontal (\`h+\` to invert)`);
    console.error(`  -o <file>       Output a markdown file containing the tree`);
    console.error("  --debug         Print all nodes");
    console.error("  -h, --help      Show this help");
    process.exit(1);
  }

  let leaves = parseInt(args[0]);
  let branches = parseInt(args[1]);

  let ascending = args.includes("-a");
  let reverse = args.includes("-r");
  let outlineLevels = args.includes("-l");

  let tree = generateNaryTree({leaves, branches, reverse: reverse ? !ascending : ascending});

  if (typeof tree === "string") {
    console.error(tree);
    process.exit(1);
  }

  let idx;

  let file;
  if ((idx = args.indexOf("-o")) !== -1) {
    file = args[idx + 1];
  }

  let repr = DEFAULT_REPR;

  if ((idx = args.indexOf("-t")) !== -1) {
    repr = args[idx + 1];
  }

  let treeVis;
  if (!(treeVis = toMermaid({tree, branches, repr, ascending, outlineLevels}))) {
    console.error("Invalid table representation format");
    process.exit(1);
  }

  if (args.includes("--debug")) {
    for (let node of tree) console.error(node);
    console.error("-".repeat(30));
  }

  let link = linked(treeVis);

  let data = `\
# Generated Tree

<details>
<summary> Parameters </summary>

- Leaves: ${leaves}
- Branches: ${branches}
- Order: ${ascending ? "Ascending" : "Descending"}${reverse ? " (Reversed)" : ""}
- Level Outlines: ${outlineLevels ? "yes" : "no"}
- Table Representation: ${
  repr.startsWith("v")
    ? `Vertical ${repr.endsWith("+") ? "(left-right)" : "(right-left)"}`
    : `Horizontal ${repr.endsWith("+") ? "(bottom-up)" : "(top-down)"}`
  }

\`\`\`console
enary ${leaves} ${branches}\
${ascending ? " -a" : ""}\
${reverse ? " -r" : ""}\
${outlineLevels ? " -l" : ""}\
${repr !== DEFAULT_REPR ? ` -t ${repr}` : ""}\
${file ? ` -o ${file}` : ""}
\`\`\`

</details>

<div align="center">

[Interactive View](https://mermaid.live/view#pako:eNo908tq3EAQBdBfEb0I1zAG1aP1WngR8gfJKsxGeOQZgyUNirQIxv8epqsqu-IW0unbQp_pdb1MaUjXbbzfql_fz0tVLQR6KgODbRCIDQq1ISPb0KCxoUVrQ4fOhh69DVSDah8J5G8nBvn7SUAukILcoAxyhRqQO9SCXKIO5Bb1INe4BrvGBI4uDHaNBewaK9g1zmDXuAG7xi24faqen1-qhapv1cIWd-DOY3nEanEP7j3Oj7ix66shtcftI-4sJgh53D9iqi1nCIdZUDJVBCKxKCyZKwrRWBSYXM6QHItCk9sNpIlFwdnxFhKF2Ro73kGiMhecHe8hUZoLzoZrDY3aXHA2XAkaxbngYrgyNJpLwcVwFWg0l4KL4arQaC4FF8czNJpLwcXxBhrNpbeohUZnrcvnJFt00OisXBZiix4anVXLItt_USNHZ7WTZEKOtlpOonaSzMjRVss1ZLuGLMjRNpdryJxOaZ62eXy_pCF9ntN-m-bpnIZzukxv4_Gxn9NXOqXx2Neff5fXNOzbMZ3Sth7XWxrexo8_0ykd98u4Tz_ex-s2zv_T-7j8XtfZHvn6ByNE-do)

\`\`\`mermaid
${treeVis}
\`\`\`

</div>
`;

  if (file) {
    fs.writeFileSync(file, data);
    console.log(`Tree written to \`${file}\``);
  } else console.log(treeVis);

  console.error("-".repeat(30));
  console.error("View interactive diagram at:");
  console.error("  -", link);
  console.error("-".repeat(30));
}

main();
