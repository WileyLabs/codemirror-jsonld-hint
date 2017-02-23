function collectContextTerms(prefix, url) {
  // fetch the URL
  return fetch(url, {headers: {Accept: 'application/ld+json'}})
    .then(function(resp) {
      // return the promise of some JSON
      return resp.json();
    })
    .then(function(json) {
      // once it arrives, make sure it's a @context
      if ('@context' in json) {
        return json['@context'];
      } else {
        // TODO: throwing a bit extreme?
        throw Error('Not a valid @context document');
      }
    })
    .then(function(context) {
      var terms = {
        prefix: prefix,
        property: [],
        string: []
      };

      for (key in context) {
        // keep out internal prefixes
        if ((typeof context[key] === 'string'
             && context[key].search('://') < 0)
            ||
            (typeof context[key] === 'object'
             && '@type' in context[key]
             && context[key]['@type'] === '@id')) {
          terms.property.push(key);
          terms.string.push(key);
        }
      }
      // TODO: this rashly assumes initial a-z are sufficient for determining
      // possible property names...
      terms.property = terms.property.filter(function(term) {
        return (term.charCodeAt(0) >= 97 && term.charCodeAt(0) <= 122);
      });
      return terms;
    })
    .catch(console.error.bind(console));
}

function materializeContextsInto(contexts, prefix_urls) {
  for (prefix in prefix_urls) {
    collectContextTerms(prefix, prefix_urls[prefix])
      .then(function(terms) {
        contexts[terms.prefix] = terms;
      });
  }
}
