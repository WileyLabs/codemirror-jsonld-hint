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
    "Ctrl-Space": CodeMirror.hint.jsonld
  }
```

## License

MIT
