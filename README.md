# JSON-LD Hinter for CodeMirror

[JSON-LD](http://json-ld.org/) has several reserved property (key) names. This
[CodeMirror](http://codemirror.net) add-on provides a helper function that can
be connected to key events to trigger an autosuggest list.

[Demo](http://wileylabs.github.io/codemirror-jsonld-hint)

## Usage

After requiring this add-on (via browserify, require.js, or ye olde script tag),
add the following to your CodeMirror editor configuration:

```
  mode: 'application/ld+json',
  extraKeys: {
    "'@'": CodeMirror.hint.jsonld,
    "':'": CodeMirror.hint.jsonldContexts,
    "'\"'": CodeMirror.hint.jsonldContexts,
    "Ctrl-Space": "autocomplete"
  },
  hintOptions: {
    // triggered by "autocomplete" hinter (above)
    hint: CodeMirror.hint.jsonld,
    // config for the jsonldContexts hinter
    contexts: {}
  }
```

The value of `hintOptions.contexts` should be an object with keys for prefix
names and (optionally) a default vocabularly set to `@vocab`. For example:

```
  contexts: {
    '@vocab': http://www.w3.org/ns/anno.jsonld',
    schema: 'http://schema.org/'
  }
```

## License

MIT
