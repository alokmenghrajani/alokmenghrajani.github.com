(function () {
  function escape(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // Light syntax highlighter for the mixed CSS/HTML/JS snippets on the index.
  // Single regex with ordered alternatives — first match wins.
  // Groups: 1=block-comment, 2=line-comment, 3=html-comment,
  //         4=double-string, 5=single-string,
  //         6=html-tag-start, 7=hex-color, 8=number-with-unit, 9=css-property
  const RE = new RegExp(
    [
      /(\/\*[\s\S]*?\*\/)/.source,
      /(\/\/[^\n]*)/.source,
      /(<!--[\s\S]*?-->)/.source,
      /("[^"\n]*")/.source,
      /('[^'\n]*')/.source,
      /(<\/?[a-zA-Z][\w-]*)/.source,
      /(#[0-9a-fA-F]{3,8}\b)/.source,
      /(-?\d+(?:\.\d+)?(?:px|em|rem|vh|vw|vmin|vmax|%|s|ms|fr|deg|turn)?)/.source,
      /([a-zA-Z][a-zA-Z-]*(?=\s*:[^/\n]))/.source,
    ].join('|'),
    'g'
  );
  const CLASSES = [null, 'co', 'co', 'co', 'st', 'st', 'tg', 'hx', 'nu', 'pr'];

  function highlight(text) {
    let out = '';
    let last = 0;
    let m;
    RE.lastIndex = 0;
    while ((m = RE.exec(text)) !== null) {
      out += escape(text.slice(last, m.index));
      let i = 1;
      while (i < m.length && m[i] === undefined) i++;
      out += '<span class="' + CLASSES[i] + '">' + escape(m[0]) + '</span>';
      last = m.index + m[0].length;
    }
    out += escape(text.slice(last));
    return out;
  }

  function colorize() {
    document.querySelectorAll('.entry pre code').forEach((code) => {
      code.innerHTML = highlight(code.textContent);
    });
  }

  // Update the URL fragment to #NN before navigating to a preview, using
  // history.replaceState so we DON'T add a new history entry. That way:
  //   - clicking back from a preview returns to index#NN (highlighted via :target)
  //   - clicking back from the index goes to wherever the user came from,
  //     not to a stale fragment-less index entry.
  function wireFragments() {
    document.querySelectorAll('.entry .preview').forEach((link) => {
      link.addEventListener('click', () => {
        const href = link.getAttribute('href') || '';
        const m = href.match(/(\d{2})\.html$/);
        if (m) history.replaceState(null, '', '#' + m[1]);
      });
    });
  }

  function init() {
    colorize();
    wireFragments();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
