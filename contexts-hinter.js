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


  /**
   * Requires editor config to contain:
   * hintOptions.contexts = {
   *   schema: {
   *     property: ["name", ...],
   *     string: ["Person", ...]
   *   }
   * }
   **/
  CodeMirror.registerHelper("hint", "jsonldContexts", function(cm, options) {
    var cur = cm.getCursor(),
        token = cm.getTokenAt(cur);
    var start = token.start - 1,
        end = token.end;
    var colon_at = token.string.indexOf(':');
    if (token.type !== 'property' && token.type !== 'string') {
      return;
    } else if (colon_at > -1) {
      // remove any `"` form the lookup (typically start/end)
      var search = token.string.replace(/"/gi, '').split(':');
      var prefix = search[0];
      var suffix = search[1];
      if (!prefix) {
        prefix = '@vocab';
      }
      if (prefix in options.contexts
          && token.type in options.contexts[prefix]) {
        var terms = options.contexts[prefix][token.type];
        var list = terms.map(function(item) {
          if (item.indexOf(suffix) > -1) {
            return {
              text: (prefix !== '@vocab'
                     ? prefix + ':' + item + '"'
                     : item + '"'),
              displayText: item
            };
          }
        }).filter(function(item) {
          return item
        });
        return {
          list: list,
          from: CodeMirror.Pos(cur.line, start+2),
          to: CodeMirror.Pos(cur.line, end)
        };
      }
    }
  });
});
