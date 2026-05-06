// @ts-nocheck

const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
  'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ';

function init() {
  if (typeof lorem === 'undefined') {
    return;
  }

  lorem.addEventListener('click', () => {
    if (typeof centerish === 'undefined') return;
    const tag = centerish.tagName.toLowerCase();
    // <button> only accepts phrasing content cleanly. Just append plain text
    if (tag === 'button') {
      centerish.children[0].textContent += LOREM;
      return;
    }
    const span = document.createElement('span');
    span.className = 'lorem-text';
    span.textContent = ' ' + LOREM;
    // canvas / iframe / input / svg can't show appended HTML text. Append next to them
    if (tag === 'canvas' || tag === 'iframe' || tag === 'input' || tag === 'svg') {
      centerish.parentNode.insertBefore(span, centerish.nextSibling);
    } else {
      centerish.appendChild(span);
      centerish.appendChild(document.createElement('br'));
    }
  });
}

// Always wait for DOMContentLoaded so #50 (which injects its chrome on
// DOMContentLoaded) has time to create the lorem button before we hook it.
if (document.readyState === 'complete') {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init);
}
