// Update the URL fragment to #NN before navigating to a preview, using
// history.replaceState so we DON'T add a new history entry. That way:
//   - clicking back from a preview returns to index#NN
//   - clicking back from the index goes to wherever the user came from,
//     not to a stale fragment-less index entry.
function wireFragments() {
  document.querySelectorAll('.entry .preview').forEach((link) => {
    link.addEventListener('click', () => {
      const href = link.getAttribute('href') || '';
      const m = href.match(/(\d{2})\.html$/);
      if (m) {
        history.replaceState(null, '', '#' + m[1]);
      }
    });
  });
}

// We can't rely on CSS :target alone — when the page is restored from the
// back/forward cache (bfcache), browsers don't re-evaluate :target against
// the current URL fragment, so the highlight stays stuck on whatever it was
// before we navigated away. Manage it via a class on `pageshow` instead.
function applyHighlight() {
  document.querySelectorAll('.entry.highlighted').forEach((e) =>
    e.classList.remove('highlighted')
  );
  const id = location.hash.slice(1);
  if (!id) {
    return;
  }
  const entry = document.getElementById(id);
  if (entry) {
    entry.classList.add('highlighted');
  }
}

function init() {
  wireFragments();
  applyHighlight();
}

window.addEventListener('hashchange', applyHighlight);
window.addEventListener('pageshow', applyHighlight);

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
