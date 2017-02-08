(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(
      require("codemirror/lib/codemirror"),
      require("codemirror/addon/hint/show-hint")
    );
  else if (typeof define == "function" && define.amd) // AMD
    define([
      "codemirror/lib/codemirror",
      "codemirror/addon/hint/show-hint"
    ], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {

  function getText(completion) {
    if (typeof completion == "string") return completion;
    else return completion.text;
  }

  function customHint(cm, data, completion) {
    // cursor position & token before replacing
    var cur = cm.getCursor();
    var token = cm.getTokenAt(cur);
    // TODO: make suffix configurable?
    var suffix = '": ""';
    // range to replace with selected completion
    var from = completion.from || data.from;
    var to = completion.to || data.to;
    var text = getText(completion);
    var jump_back = 0;
    // don't add suffix if we're inside of a finished property string (`""`)
    if (token.string.length > 1 && token.string[token.string.length-1] !== '"') {
      // move the cursor back by one--inside the value
      // replace with completion + suffix
      text += suffix;
      jump_back = 1;
    } else {
      text += '"';
    }
    cm.replaceRange(text, from, to, "complete");
    cm.setCursor(cm.getCursor().line, cm.getCursor().ch - jump_back);
    CodeMirror.signal(data, "pick", completion);
  }

  var terms = [
    '@base',
    '@container', '@context',
    '@graph',
    '@id',
    '@language', '@list',
    '@reverse',
    '@set',
    '@type',
    '@vocab'
  ];
  CodeMirror.registerHelper("hint", "jsonld", function(cm, options) {
    var cur = cm.getCursor(),
        token = cm.getTokenAt(cur);
    var start = token.start - 1,
        end = token.end;
    var list = terms;
    if (token.type === 'property') {
      var search = token.string.match(/[@]?\w+/);
      if (search !== null) {
        list = terms.filter(function(t) {
          if (t.indexOf(search) > -1) {
            return t;
          }
        });
      }
      return {
        list: list.map(function(item) { return {text: item, hint: customHint}}),
        from: CodeMirror.Pos(cur.line, start+2),
        to: CodeMirror.Pos(cur.line, end)
      };
    }
  });
});
