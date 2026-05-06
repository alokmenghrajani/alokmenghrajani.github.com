(function () {
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wireFragments);
  } else {
    wireFragments();
  }
})();
