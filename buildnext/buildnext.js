// Load textarea's initial value from local storage
function load() {
  loading.className = "hide";
  input.value = localStorage.getItem("sets");
}

// Save the content of the textarea to local storage
function save() {
  localStorage.setItem("sets", input.value);
}

// Search sets
function search() {
  error.innerHTML = "";
  results.innerHTML = "";

  // Convert input to parts.
  const inputSets = input.value.trim().split(/\s+/);
  const parts = {};
  for (let i=0; i<inputSets.length; i++) {
    const s = inputSets[i];
    if (!s) {
      const d = document.createElement("div");
      d.innerText = "Please list your inventory first";
      results.appendChild(d);
      return;
    }
    const inventory = setToInventory(s);
    // Check that we found the set.
    if (!inventory) {
      const p = document.createElement("p");
      p.innerText = "unknown set: " + s;
      error.append(p);
      continue;
    }
    const inventoryPart = inventoryParts[inventory];
    for (let j=0; j<inventoryPart.length; j+=4) {
      if (!parts[inventoryPart[j]]) {
        parts[inventoryPart[j]] = 0;
      }
      parts[inventoryPart[j]] += inventoryPart[j+2];
    }
  }

  // Search over inventory and see which sets we can build
  const keys = Object.keys(inventoryParts);
  let found = 0;
  outer: for (i=0; i<keys.length; i++) {
    const key = keys[i];
    const inventoryPart = inventoryParts[key];
    let numParts = 0;
    for (let j=0; j<inventoryPart.length; j+=4) {
      if (inventoryPart[j+3]) {
        // skip spare parts
        continue;
      }
      if (!parts[inventoryPart[j]]) {
        // we don't have this part
        continue outer;
      }
      if (parts[inventoryPart[j]] < inventoryPart[j+2]) {
        // we don't have enough of this part
        continue outer;
      }
      numParts += inventoryPart[j+2];
    }
    if (numParts < 10) {
      // Some sets have incomplete inventoryParts data. We filter them out by noticing that
      // their pieces are missing. We could compare numParts with the information in the
      // set, but then we need to take minifigs into account.
      continue;
    }
    found++;
    const d = document.createElement("div");
    const set_num = inventories[key];
    const set = sets[set_num];
    if (!set) {
      continue;
    }
    if (set[3] == 254) {
      // ignore "Bulk Bricks"
      continue;
    }
    if ((set[3] == 524) || (set[3] == 443)) {
      // ignore "Service Packs"
      continue;
    }
    if (set[3] == 371) {
      // ignore "Supplemental"
      continue;
    }
    if (set[3] == 497) {
      // ignore "Books"
      continue;
    }
    if ((set[3] == 501) || (set[3] == 503) ||
    (set[3] == 730) ||
    (set[3] == 731) ||
    (set[3] == 732) ||
    (set[3] == 733) ||
    (set[3] == 734) ||
    (set[3] == 735) ||
    (set[3] == 736) ||
    (set[3] == 737) ||
    (set[3] == 738) ||
    (set[3] == 739) ||
    (set[3] == 740) ||
    (set[3] == 741) ||
    (set[3] == 742)) {
      // ignore "Gears"
      // includes stuff like Key Chains and Magnets.
      continue;
    }
    const a = document.createElement("a");
    a.innerText = set_num + ": " + set[0] + " (" + set[2] + " pieces)";
    a.href = "https://rebrickable.com/sets/" + inventories[key] + "-1/";
    const p = document.createElement("p");
    p.appendChild(a);
    d.appendChild(p);

    const img = document.createElement("img");
    img.src = set[1];
    img.onerror = () => img.classList = "hide";
    d.appendChild(img);

    const debug = document.createElement("span");
    debug.className = "debug";
    debug.innerText = JSON.stringify({
      key: key,
      num: set_num,
      set: set,
    });
    d.appendChild(debug);

    results.appendChild(d);
  }
  if (!found) {
    const d = document.createElement("div");
    d.innerText = "sorry, no results";
    results.appendChild(d);
  }
}

function setToInventory(setNum) {
  const keys = Object.keys(inventories);
  for (let i=0; i<keys.length; i++) {
    const key = keys[i];
    if (inventories[key] == setNum) {
      return key;
    }
  }
  return false;
}