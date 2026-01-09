// Marked.js extension for highlight (==text==)
const highlightExtension = {
  name: "highlight",
  level: "inline",
  start(src) {
    return src.indexOf("==");
  },
  tokenizer(src, tokens) {
    const rule = /^==([^=\n]+)==/;
    const match = rule.exec(src);
    if (match) {
      return {
        type: "highlight",
        raw: match[0],
        text: match[1],
      };
    }
  },
  renderer(token) {
    return `<mark>${token.text}</mark>`;
  },
};

marked.use({ extensions: [highlightExtension] });
