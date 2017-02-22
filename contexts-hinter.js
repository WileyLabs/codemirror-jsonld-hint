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
  function hint(cm, options) {
    var cur = cm.getCursor(),
        token = cm.getTokenAt(cur);
    var start = token.start - 1,
        end = token.end;
    var colon_at = token.string.indexOf(':');
    if (token.type !== 'property' && token.type !== 'string') {
      return;
    } else {
      // set prefix to the default @vocab
      var prefix = '@vocab';
      var suffix = '';
      // remove any `"` form the lookup (typically start/end)
      var search = token.string.replace(/"/gi, '').split(':');
      if (search.length > 1) {
        prefix = search[0];
        suffix = search[1];
      } else {
        suffix = search[0];
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
  }
  CodeMirror.registerHelper("hint", "jsonldContexts", function(cm, options) {
    setTimeout(function() {
      cm.showHint({
        completeSingle: false,
        hint: hint,
      });
    }, 100);
    return CodeMirror.Pass;
  });
});
