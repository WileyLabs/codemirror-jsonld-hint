var textarea = document.getElementById('textarea');
var editor = CodeMirror.fromTextArea(textarea, {
  mode: 'application/ld+json',
  lineNumbers: true,
  gutters: ["CodeMirror-lint-markers"],
  lint: true,
  extraKeys: {
    "'@'": CodeMirror.hint.jsonld,
    "':'": CodeMirror.hint.jsonldContexts,
    "'\"'": CodeMirror.hint.jsonldContexts,
    "Ctrl-Space": "autocomplete"
  },
  hintOptions: {
    // triggered by "autocomplete" hinter
    hint: CodeMirror.hint.jsonld,
    // config for the jsonldContexts hinter
    contexts: {}
  }
});

// expands the context definition below into fully materialized JSON-LD
materializeContextsInto(
  editor.options.hintOptions.contexts,
  {
    // @vocab is the default @vocab...here as in JSON-LD
    '@vocab': 'https://www.w3.org/ns/anno.jsonld',
    schema: 'https://schema.org/'
  }
);
