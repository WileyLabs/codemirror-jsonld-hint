# JSON-LD Hinter for CodeMirror

[JSON-LD](http://json-ld.org/) has several reserved property (key) names. This
[CodeMirror](http://codemirror.net) add-on provides a helper function that can
be connected to key events to trigger an autosuggest list.

## Usage

NOTE: This add-on *should* be browserify and require.js compatible (as with all
CodeMirror add-ons). However, only browserify usage has been tested.

After requiring this add-on, add the following to your CodeMirror editor
configuration:

```
  extraKeys: {
    "'@'": CodeMirror.hint.jsonld,
    "Ctrl-Space": CodeMirror.hint.jsonld
  }
```

## License

MIT
