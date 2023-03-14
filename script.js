import React, { useState } from "https://cdn.skypack.dev/react@17.0.1";
import ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";
import classnames from "https://cdn.skypack.dev/classnames@2.2.6";
import marked from "https://cdn.skypack.dev/marked@2.0.0";
import dompurify from "https://cdn.skypack.dev/dompurify@2.2.6";
marked.setOptions({
    breaks: true,
    highlight: (code) => hljs.highlightAuto(code).value
});

function App() {
    return (React.createElement("div", { id: "app" },
        React.createElement(Markdown, null)));
}
function Markdown() {
    const [editorMaxed, setEditorMaxed] = useState(false);
    const [previewerMaxed, setPreviewerMaxed] = useState(false);
    const [text, setText] = useState(defaultText);
    function handleEditorMaxedToggle() {
        setEditorMaxed(!editorMaxed);
    }
    function handlePreviewerMaxedToggle() {
        setPreviewerMaxed(!previewerMaxed);
    }
    function handleTextChange(event) {
        setText(event.target.value);
    }
    return (React.createElement("div", null,
        React.createElement(Editor, { text: text, maxed: editorMaxed, hidden: previewerMaxed, onMaxedToggle: handleEditorMaxedToggle, onTextChange: handleTextChange }),
        React.createElement(Previewer, { text: text, maxed: previewerMaxed, hidden: editorMaxed, onMaxedToggle: handlePreviewerMaxedToggle })));
}
function Editor({ text, maxed, hidden, onMaxedToggle, onTextChange }) {
    return (React.createElement(Window, Object.assign({ windowClass: "editor" }, { maxed, hidden }),
        React.createElement(Toolbar, { title: "Editor", onMaxedToggle: onMaxedToggle }),
        React.createElement("textarea", { id: "editor", className: "document border shadow", onChange: onTextChange }, text)));
}
function Previewer({ text, maxed, hidden, onMaxedToggle }) {
    return (React.createElement(Window, Object.assign({ windowClass: "previewer" }, { maxed, hidden }),
        React.createElement(Toolbar, { title: "Previewer", onMaxedToggle: onMaxedToggle }),
        React.createElement("div", { id: "preview", className: "document border shadow", dangerouslySetInnerHTML: {
                __html: dompurify.sanitize(marked(text))
            } })));
}
function Window({ windowClass, maxed, hidden, children }) {
    return (React.createElement("div", { className: classnames(windowClass, "window", { maxed, hidden }) }, children));
}
function Toolbar({ title, onMaxedToggle }) {
    return (React.createElement("div", { className: "toolbar border shadow" },
        React.createElement("div", null,
            React.createElement("i", { className: "fab fa-free-code-camp" }),
            React.createElement("span", { className: "title" }, title)),
        React.createElement("div", { className: "max-control" },
            React.createElement("i", { className: "fa fa-expand-arrows-alt", onClick: onMaxedToggle }))));
}
const defaultText = `
# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://icons.iconarchive.com/icons/tatice/operating-systems/128/Linux-icon.png)
    
    `;
ReactDOM.render(React.createElement(App, null), document.getElementById("root"));
