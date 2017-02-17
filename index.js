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

  var terms = {
    property: [
      '@base',
      '@container', '@context',
      '@graph',
      '@id',
      '@language', '@list',
      '@reverse',
      '@set',
      '@type',
      '@vocab'
    ],
    // TODO: these can be values of @container...any others like this?
    string: ["@list", "@index", "@set"]
  };
  CodeMirror.registerHelper("hint", "jsonld", function(cm, options) {
    var cur = cm.getCursor(),
        token = cm.getTokenAt(cur);
    var start = token.start - 1,
        end = token.end;
    if (token.type !== 'property' && token.type !== 'string') {
      // early return if it's not what we're looking for
      return;
    } else {
      // token.type === 'property' || token.type === 'string'
      var list = terms[token.type];
      var search = token.string.match(/[@]?\w+/);
      if (search !== null) {
        list = list.filter(function(t) {
          return (t.indexOf(search) > -1);
        });
      }
      return {
        list: list.map(function(item) {
          return {
            text: item + '"',
            displayText: item
          };
        }),
        from: CodeMirror.Pos(cur.line, start+2),
        to: CodeMirror.Pos(cur.line, end)
      };
    }
  });
});
