/**
 * Wander Rajasthan - Interactive Application Controller
 * Handles tabs, search, cross-section discovery, bookmarks/saved trips, modal dialogs, animations, and themes.
 */

// Application State
const state = {
  currentTab: "places", // default landing on Places to visit
  currentTag: "All",
  searchQuery: "",
  openCards: new Set(),
  openDays: new Set(), // tracked day accordions in itineraries
  savedItems: new Set(JSON.parse(localStorage.getItem("wander_saved_items") || "[]")),
  theme: localStorage.getItem("wander_theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
};

// Utilities
const $ = (id) => document.getElementById(id);

function esc(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Item Finder Helper
 */
function findItemById(id) {
  const all = [
    ...RAJASTHAN_DATA.places.items,
    ...RAJASTHAN_DATA.stays.three,
    ...RAJASTHAN_DATA.stays.four,
    ...RAJASTHAN_DATA.food.items,
    ...RAJASTHAN_DATA.snacks.items,
    ...RAJASTHAN_DATA.dishes.items,
    ...RAJASTHAN_DATA.hidden.items
  ];
  return all.find(item => item.id === id);
}

/**
 * Toast Notification System
 */
function showToast(message) {
  const toast = $("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

/**
 * Bookmark / Saved Trips Manager
 */
function toggleSaveItem(id, event) {
  if (event) event.stopPropagation();
  const item = findItemById(id);
  const name = item ? item.n : "Item";

  if (state.savedItems.has(id)) {
    state.savedItems.delete(id);
    showToast(`Removed "${name}" from your trip plan`);
  } else {
    state.savedItems.add(id);
    showToast(`Saved "${name}" to your trip plan ❤️`);
  }
  localStorage.setItem("wander_saved_items", JSON.stringify([...state.savedItems]));
  updateSavedBadge();

  if (state.currentTab === "saved") {
    render();
  } else {
    // Update active button states without full DOM re-render
    document.querySelectorAll(`.card-save-btn[data-id="${id}"]`).forEach(btn => {
      const isSaved = state.savedItems.has(id);
      btn.classList.toggle("saved", isSaved);
      btn.setAttribute("aria-label", isSaved ? "Remove from saved" : "Save to trip");
      btn.innerHTML = isSaved ? "❤️" : "🤍";
    });
    document.querySelectorAll(`.card-save-btn-stay[data-id="${id}"]`).forEach(btn => {
      const isSaved = state.savedItems.has(id);
      btn.innerHTML = isSaved ? "❤️ Saved in Plan" : "🤍 Save Stay";
    });
  }
}

function updateSavedBadge() {
  const badge = $("savedBadgeCount");
  if (badge) {
    badge.textContent = state.savedItems.size;
    badge.style.transform = "scale(1.25)";
    setTimeout(() => { badge.style.transform = "scale(1)"; }, 200);
  }
}

/**
 * Theme Manager
 */
function applyTheme(theme) {
  state.theme = theme;
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("wander_theme", theme);
  const themeBtn = $("themeToggleBtn");
  if (themeBtn) {
    themeBtn.innerHTML = theme === "dark" 
      ? `<span>☀️</span> Light Mode` 
      : `<span>🌙</span> Dark Mode`;
  }
}

function toggleTheme() {
  const newTheme = state.theme === "dark" ? "light" : "dark";
  applyTheme(newTheme);
  showToast(`Switched to ${newTheme} mode`);
}

/**
 * Surprise Me / Random Pick Discovery Feature
 */
function surpriseMe() {
  const pool = [
    ...RAJASTHAN_DATA.places.items,
    ...RAJASTHAN_DATA.hidden.items,
    ...RAJASTHAN_DATA.dishes.items,
    ...RAJASTHAN_DATA.stays.four
  ];
  const randomPick = pool[Math.floor(Math.random() * pool.length)];
  if (!randomPick) return;

  if (randomPick.spots) {
    openDestinationModal(randomPick.id);
    showToast(`🎲 Discovered: ${randomPick.n}!`);
  } else {
    searchTag(randomPick.n);
    showToast(`🎲 Discovered: ${randomPick.n}!`);
  }
}

/**
 * Search & Suggestions
 */
function handleSearchInput(e) {
  state.searchQuery = e.target.value.trim().toLowerCase();
  const clearBtn = $("searchClearBtn");
  if (clearBtn) {
    clearBtn.classList.toggle("visible", state.searchQuery.length > 0);
  }
  render();
}

function clearSearch() {
  const qInput = $("q");
  if (qInput) {
    qInput.value = "";
    state.searchQuery = "";
    const clearBtn = $("searchClearBtn");
    if (clearBtn) clearBtn.classList.remove("visible");
    qInput.focus();
    render();
  }
}

function searchTag(tagText) {
  const qInput = $("q");
  if (qInput) {
    qInput.value = tagText;
    state.searchQuery = tagText.toLowerCase();
    const clearBtn = $("searchClearBtn");
    if (clearBtn) clearBtn.classList.add("visible");
    render();
    $("tabs").scrollIntoView({ behavior: "smooth" });
  }
}

/**
 * Cross-section Search Match Counts
 */
function getCrossSectionMatches(query) {
  if (!query) return [];
  const results = [];

  const placesMatches = RAJASTHAN_DATA.places.items.filter(i => (i.n + " " + i.d + " " + (i.t || "")).toLowerCase().includes(query)).length;
  if (placesMatches > 0) results.push({ key: "places", label: "Places", count: placesMatches });

  const staysMatches = [...RAJASTHAN_DATA.stays.three, ...RAJASTHAN_DATA.stays.four].filter(h => (h.n + " " + h.area + " " + h.d).toLowerCase().includes(query)).length;
  if (staysMatches > 0) results.push({ key: "stays", label: "Stays", count: staysMatches });

  const foodMatches = RAJASTHAN_DATA.food.items.filter(i => (i.n + " " + i.d + " " + (i.t || "") + " " + (i.m?.Known || "")).toLowerCase().includes(query)).length;
  if (foodMatches > 0) results.push({ key: "food", label: "Restaurants", count: foodMatches });

  const snacksMatches = RAJASTHAN_DATA.snacks.items.filter(i => (i.n + " " + i.d + " " + (i.t || "")).toLowerCase().includes(query)).length;
  if (snacksMatches > 0) results.push({ key: "snacks", label: "Sweets & Lassi", count: snacksMatches });

  const dishesMatches = RAJASTHAN_DATA.dishes.items.filter(i => (i.n + " " + i.d + " " + (i.t || "")).toLowerCase().includes(query)).length;
  if (dishesMatches > 0) results.push({ key: "dishes", label: "Dishes", count: dishesMatches });

  const hiddenMatches = RAJASTHAN_DATA.hidden.items.filter(i => (i.n + " " + i.d + " " + (i.t || "")).toLowerCase().includes(query)).length;
  if (hiddenMatches > 0) results.push({ key: "hidden", label: "Less Explored", count: hiddenMatches });

  const itinMatches = ITINERARIES.filter(it => (it.name + " " + it.route.join(" ")).toLowerCase().includes(query)).length;
  if (itinMatches > 0) results.push({ key: "itin", label: "Routes", count: itinMatches });

  return results;
}

/**
 * Destination Quick View Modal
 */
function openDestinationModal(placeId) {
  const place = findItemById(placeId);
  if (!place) return;

  const modalBackdrop = $("destModalBackdrop");
  const modalHero = $("modalHero");
  const modalTitle = $("modalTitle");
  const modalBadge = $("modalBadge");
  const modalDesc = $("modalDesc");
  const modalTip = $("modalTip");
  const modalSpots = $("modalSpots");
  const modalCityActions = $("modalCityActions");

  modalHero.style.backgroundImage = `linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.85) 100%), url('${place.img}')`;
  modalTitle.textContent = `${place.e} ${place.n}`;
  modalBadge.textContent = place.t || "Destination";
  modalDesc.textContent = place.d;
  modalTip.innerHTML = `<strong>💡 Insider Tip:</strong> ${esc(place.tip || "Visit monuments early morning to beat the midday desert sun.")}`;

  if (Array.isArray(place.spots) && place.spots.length) {
    modalSpots.innerHTML = `
      <h4 style="font-family: var(--font-display); font-size: 1.15rem; margin-top: 14px; margin-bottom: 10px; font-weight:700;">Top Sights & Experiences (${place.spots.length})</h4>
      <div style="display:flex; flex-direction:column; gap:10px;">
        ${place.spots.map((s, idx) => `
          <div style="background:var(--bg-subtle); padding:12px 14px; border-radius:8px; border:1px solid var(--line); display:flex; gap:12px; align-items:flex-start;">
            <input type="checkbox" id="spot_${idx}" style="margin-top:4px; accent-color:var(--brand); cursor:pointer;">
            <label for="spot_${idx}" style="cursor:pointer; flex:1;">
              <strong style="color:var(--brand); display:block; margin-bottom:2px; font-size:0.96rem;">${esc(s[0])}</strong>
              <span style="font-size:0.88rem; color:var(--ink-secondary); line-height:1.5;">${esc(s[1])}</span>
            </label>
          </div>
        `).join("")}
      </div>
    `;
  } else {
    modalSpots.innerHTML = "";
  }

  // City Cross-Navigation Shortcuts
  modalCityActions.innerHTML = `
    <button class="btn-sm-action" data-action="explore-food" data-city="${esc(place.n)}">
      🍽️ Restaurants in ${esc(place.n)}
    </button>
    <button class="btn-sm-action" data-action="explore-stays" data-city="${esc(place.n)}">
      🏨 Stays in ${esc(place.n)}
    </button>
    <button class="btn-sm-action" data-action="save-modal-item" data-id="${esc(place.id)}">
      ${state.savedItems.has(place.id) ? "❤️ Saved in Plan" : "🤍 Save to Plan"}
    </button>
  `;

  modalCityActions.querySelectorAll("[data-action]").forEach(btn => {
    btn.addEventListener("click", () => {
      const act = btn.dataset.action;
      if (act === "explore-food") {
        crossFilterCity("food", btn.dataset.city);
      } else if (act === "explore-stays") {
        crossFilterCity("stays", btn.dataset.city);
      } else if (act === "save-modal-item") {
        toggleSaveItem(btn.dataset.id);
        const isSaved = state.savedItems.has(btn.dataset.id);
        btn.innerHTML = isSaved ? "❤️ Saved in Plan" : "🤍 Save to Plan";
      }
    });
  });

  modalBackdrop.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeDestinationModal() {
  const modalBackdrop = $("destModalBackdrop");
  if (modalBackdrop) {
    modalBackdrop.classList.remove("active");
    document.body.style.overflow = "";
  }
}

function crossFilterCity(targetTab, cityName) {
  closeDestinationModal();
  state.currentTab = targetTab;
  state.currentTag = "All";
  state.searchQuery = cityName.toLowerCase();
  const qInput = $("q");
  if (qInput) {
    qInput.value = cityName;
    const clearBtn = $("searchClearBtn");
    if (clearBtn) clearBtn.classList.add("visible");
  }
  render();
  $("tabs").scrollIntoView({ behavior: "smooth" });
}

/**
 * Route Map Generator (Enhanced SVG schematic with interactive animated pins)
 */
function generateMapSvg(it) {
  const P = c => [(C[c][1] - 70.3) * 62 + 20, (28.3 - C[c][0]) * 72 + 20];
  const pts = it.route.map(P);
  const seen = {};
  const line = pts.map(q => q.join(",")).join(" ");

  const dots = it.route.map((c, i) => {
    if (seen[c]) return "";
    seen[c] = 1;
    const [x, y] = P(c);
    const isStart = i === 0;
    const isEnd = i === it.route.length - 1;
    const label = `${c}${isStart ? " (Start)" : isEnd ? " (End)" : ""}`;
    return `
      <g class="map-node" style="cursor:pointer;" data-city="${esc(c)}" title="Click to filter by ${esc(c)}">
        <circle cx="${x}" cy="${y}" r="8" fill="${it.color}" opacity="0.25">
          <animate attributeName="r" values="6;11;6" dur="2.4s" repeatCount="indefinite" />
        </circle>
        <circle cx="${x}" cy="${y}" r="5.5" fill="${it.color}" stroke="#ffffff" stroke-width="1.8" />
        <text x="${x + 9}" y="${y - 4}" font-size="11" font-weight="700" fill="currentColor" font-family="Bricolage Grotesque, sans-serif">${esc(label)}</text>
      </g>
    `;
  }).join("");

  return `
    <div class="map-wrapper">
      <svg viewBox="0 0 490 320" role="img" aria-label="Route map for ${esc(it.name)}">
        <polyline points="${line}" fill="none" stroke="${it.color}" stroke-width="3" stroke-dasharray="6 4" stroke-linejoin="round" />
        ${dots}
      </svg>
      <p class="mapnote">📍 Tap any city pin on the schematic route to filter food, stays, and sights for that stop.</p>
    </div>
  `;
}

/**
 * Itinerary Section HTML Generator
 */
function renderItineraryHtml() {
  return ITINERARIES.map(it => `
    <section class="it" id="${it.id}">
      <div class="it-header">
        <div class="it-meta-pills">
          <span class="it-pill accent">${esc(it.badge)}</span>
          <span class="it-pill">${esc(it.duration)}</span>
          <span class="it-pill">${esc(it.stats)}</span>
        </div>
        <h2>${esc(it.name)}</h2>
        <p style="color:var(--ink-secondary); font-size:0.96rem;">${esc(it.bestFor)}</p>
      </div>

      ${generateMapSvg(it)}

      ${it.note ? `<div class="itnote"><strong>Travel Note:</strong> ${esc(it.note)}</div>` : ""}

      <div class="it-toolbar">
        <div>
          <strong style="font-family:var(--font-display); font-size:0.92rem;">Route Actions:</strong>
        </div>
        <div style="display:flex; gap:8px;">
          <button class="btn-sm-action copy-it-btn" data-id="${esc(it.id)}">📋 Copy Route Summary</button>
          <button class="btn-sm-action print-it-btn">🖨️ Print Route</button>
        </div>
      </div>

      <h3>Drive times & scenic highway halts</h3>
      <div class="tw">
        <table>
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Drive Time</th>
              <th>Distance</th>
              <th>Recommended Eat on the Way</th>
            </tr>
          </thead>
          <tbody>
            ${it.legs.map((l, i) => `
              <tr>
                <td><strong>${esc(it.route[i])}</strong></td>
                <td><strong>${esc(it.route[i + 1])}</strong></td>
                <td>${esc(l[0])}</td>
                <td>${esc(l[1])}</td>
                <td>
                  ${l[3] ? `
                    <button class="eat-link-btn" data-ref="${esc(l[3])}">
                      🍽️ ${esc(l[2])}
                    </button>
                  ` : `
                    <span class="eat">🍽️ ${esc(l[2])}</span>
                  `}
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:28px; margin-bottom:14px; flex-wrap:wrap; gap:10px;">
        <h3 style="margin:0;">Day by Day Itinerary (${it.days.length} Days)</h3>
      </div>

      <ol class="days">
        ${it.days.map((d, idx) => `
          <li class="day-card" id="${it.id}_day_${idx}">
            <div class="day-badge">Day ${idx + 1}</div>
            <div class="day-content">
              <b>${esc(d[0])}</b>
              <p>${esc(d[1])}</p>
              ${d[3] ? `
                <button class="eat-link-btn" data-ref="${esc(d[3])}">
                  🍽️ Eat: ${esc(d[2])}
                </button>
              ` : `
                <div class="eat"><span>🍽️</span> Eat: ${esc(d[2])}</div>
              `}
            </div>
          </li>
        `).join("")}
      </ol>
    </section>
  `).join("");
}

function copyItineraryText(itId) {
  const it = ITINERARIES.find(i => i.id === itId);
  if (!it) return;

  const text = `Wander Rajasthan - ${it.name}\n${it.stats}\n\nRoute: ${it.route.join(" -> ")}\n\nDay-by-Day Highlights:\n` +
    it.days.map((d, idx) => `Day ${idx + 1} (${d[0]}): ${d[1]} | Eat: ${d[2]}`).join("\n");

  navigator.clipboard.writeText(text).then(() => {
    showToast(`Copied "${it.name}" summary to clipboard! 📋`);
  }).catch(() => {
    showToast("Route summary copied!");
  });
}

/**
 * Hotel Stays HTML Generator
 */
function renderHotelCol(title, list, starRating) {
  return `
    <div class="hotel-col">
      <div class="hotel-col-header">
        <h2><span>${starRating === 4 ? "⭐⭐⭐⭐" : "⭐⭐⭐"}</span> ${esc(title)}</h2>
        <span class="sub">${list.length} curated stays</span>
      </div>
      <div class="hlist">
        ${list.map(h => {
          const isSaved = state.savedItems.has(h.id);
          const fallbackPattern = getVectorPattern(starRating === 4 ? '#7a2e14' : '#0e5c52', '🏨', h.n);
          return `
            <div class="hitem">
              <div class="hitem-media">
                <img class="hitem-img" src="${h.img || fallbackPattern}" alt="${esc(h.n)}" loading="lazy" onerror="this.onerror=null; this.src='${fallbackPattern}'">
                <div class="card-hero-overlay"></div>
                <button class="card-save-btn ${isSaved ? 'saved' : ''}" data-id="${esc(h.id)}" title="${isSaved ? 'Remove from saved' : 'Save stay'}">
                  ${isSaved ? "❤️" : "🤍"}
                </button>
              </div>
              <div class="hitem-content">
                <div class="hh">
                  <h4>${esc(h.n)}</h4>
                  <span class="score-badge">★ ${esc(h.score)}</span>
                </div>
                <div class="loc">
                  <span>📍 ${esc(h.area)}</span>
                  <span>•</span>
                  <span>${h.reviews} reviews</span>
                  <span class="price-badge">${h.price || "₹₹"}</span>
                </div>
                <p>${esc(h.d)}</p>
                ${h.amenities ? `
                  <div class="hitem-amenities">
                    ${h.amenities.map(a => `<span class="amenity-pill">${esc(a)}</span>`).join("")}
                  </div>
                ` : ""}
                <div class="hitem-footer">
                  <span class="badge-tag">${esc(h.tag || "Recommended")}</span>
                  <button class="btn-sm-action card-save-btn-stay" data-id="${esc(h.id)}">
                    ${isSaved ? "❤️ Saved in Plan" : "🤍 Save Stay"}
                  </button>
                </div>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

/**
 * Saved Trips (Favorites) HTML Generator
 */
function renderSavedTripsHtml() {
  const allItems = [
    ...RAJASTHAN_DATA.places.items,
    ...RAJASTHAN_DATA.stays.three,
    ...RAJASTHAN_DATA.stays.four,
    ...RAJASTHAN_DATA.food.items,
    ...RAJASTHAN_DATA.snacks.items,
    ...RAJASTHAN_DATA.dishes.items,
    ...RAJASTHAN_DATA.hidden.items
  ];

  const savedList = allItems.filter(item => state.savedItems.has(item.id));

  if (!savedList.length) {
    return `
      <div class="empty-state">
        <div class="empty-state-icon">🎒</div>
        <h3>Your Trip Plan is Empty</h3>
        <p>Tap the heart icon ❤️ on any destination, palace, heritage stay, or food stall to save it here for quick access during your journey.</p>
        <button class="tab-btn" style="background:var(--brand); color:#fff; margin-top:16px;" id="browseDestBtn">
          Browse Destinations
        </button>
      </div>
    `;
  }

  return `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; flex-wrap:wrap; gap:10px;">
      <div>
        <h3 style="margin:0; font-size:1.35rem;">Custom Rajasthan Travel Checklist</h3>
        <p style="color:var(--ink-secondary); font-size:0.92rem; margin:0;">${savedList.length} places and experiences saved to your local device</p>
      </div>
      <div style="display:flex; gap:8px;">
        <button class="btn-sm-action" id="printPlanBtn">🖨️ Print Plan</button>
        <button class="btn-sm-action" id="clearAllSavedBtn">🗑️ Clear All</button>
      </div>
    </div>
    <div class="grid">
      ${savedList.map(item => {
        const fallbackPattern = getVectorPattern('#0e5c52', item.e || '📍', item.n);
        return `
          <article class="card">
            <div class="card-hero-media">
              <img class="card-img" src="${item.img || fallbackPattern}" alt="${esc(item.n)}" loading="lazy" onerror="this.onerror=null; this.src='${fallbackPattern}'">
              <div class="card-hero-overlay"></div>
              <div class="card-hero-icon">${item.e || "🏨"}</div>
              <button class="card-save-btn saved" data-id="${esc(item.id)}" title="Remove">
                ❤️
              </button>
            </div>
            <div class="body">
              <h3>${esc(item.n)}</h3>
              <p class="desc">${esc(item.d)}</p>
              ${item.area ? `<div class="loc" style="font-size:0.85rem; color:var(--ink-secondary);">📍 ${esc(item.area)}</div>` : ""}
              <div class="card-actions">
                <button class="btn-sm-action card-remove-btn" data-id="${esc(item.id)}">
                  Remove from Plan
                </button>
              </div>
            </div>
          </article>
        `;
      }).join("")}
    </div>
  `;
}

function clearAllSaved() {
  if (confirm("Are you sure you want to clear your saved trip items?")) {
    state.savedItems.clear();
    localStorage.removeItem("wander_saved_items");
    updateSavedBadge();
    render();
    showToast("Cleared all saved trip items");
  }
}

/**
 * Tab Navigation Renderer
 */
function renderTabs() {
  const tabsContainer = $("tabs");
  if (!tabsContainer) return;

  const entries = Object.entries(RAJASTHAN_DATA);
  
  let tabsHtml = entries.map(([key, section]) => {
    let count = 0;
    if (key === "itin") count = ITINERARIES.length;
    else if (key === "stays") count = section.three.length + section.four.length;
    else if (section.items) count = section.items.length;

    const isSelected = key === state.currentTab;
    return `
      <button class="tab-btn" role="tab" aria-selected="${isSelected}" data-key="${key}">
        <span>${section.icon || ""} ${esc(section.label)}</span>
        <span class="tab-btn-count">${count}</span>
      </button>
    `;
  }).join("");

  // Add Saved Trips Tab
  tabsHtml += `
    <button class="tab-btn" role="tab" aria-selected="${state.currentTab === 'saved'}" data-key="saved">
      <span>❤️ Saved Plan</span>
      <span class="tab-btn-count">${state.savedItems.size}</span>
    </button>
  `;

  tabsContainer.innerHTML = tabsHtml;

  tabsContainer.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      switchTab(btn.dataset.key);
    });
  });
}

function switchTab(newTabKey) {
  state.currentTab = newTabKey;
  state.currentTag = "All";
  state.openCards = new Set();
  render();
}

/**
 * Main Content Renderer
 */
function render() {
  renderTabs();
  updateSavedBadge();

  const q = state.searchQuery;
  const grid = $("grid");
  const intro = $("intro");
  const chips = $("chips");
  const filterBar = $("filterBar");
  const sectionTitle = $("sectionTitle");

  // Show Cross-Section Search Banner if query is active
  let crossSearchBanner = "";
  if (q) {
    const matches = getCrossSectionMatches(q);
    if (matches.length > 0) {
      crossSearchBanner = `
        <div class="search-state-banner">
          <div>
            Results for "<b>${esc(q)}</b>" found across guide:
            ${matches.map(m => `
              <button class="sugg-chip cross-switch-btn" data-tab="${m.key}" style="margin-left:6px; cursor:pointer;">
                ${m.label} (${m.count})
              </button>
            `).join("")}
          </div>
          <button class="reset-search-btn" id="bannerClearSearchBtn">✕ Clear Search</button>
        </div>
      `;
    }
  }

  // Handle Saved Trips View
  if (state.currentTab === "saved") {
    if (sectionTitle) sectionTitle.innerHTML = `❤️ Saved Trip Highlights`;
    if (intro) intro.textContent = "Review and export your customized list of saved destinations, heritage hotels, and royal dining spots.";
    if (filterBar) filterBar.style.display = "none";
    if (grid) {
      grid.className = "";
      grid.innerHTML = (crossSearchBanner ? crossSearchBanner : "") + renderSavedTripsHtml();
      attachSavedTabListeners();
    }
    return;
  }

  if (filterBar) filterBar.style.display = "flex";

  const sec = RAJASTHAN_DATA[state.currentTab];
  if (!sec) return;

  if (sectionTitle) sectionTitle.innerHTML = `${sec.icon || ""} ${esc(sec.label)}`;
  if (intro) intro.textContent = sec.intro;

  // Itinerary View
  if (state.currentTab === "itin") {
    if (chips) chips.innerHTML = "";
    if (grid) {
      grid.className = "";
      grid.innerHTML = (crossSearchBanner ? crossSearchBanner : "") + renderItineraryHtml();
      attachItineraryListeners();
    }
    return;
  }

  // Stays View
  if (state.currentTab === "stays") {
    if (chips) {
      const stayFilters = ["All", "Rating 9.0+", "Jaipur", "Jodhpur", "Jaisalmer"];
      chips.innerHTML = stayFilters.map(sf => `
        <button class="chip stay-chip" aria-pressed="${sf === state.currentTag}" data-filter="${esc(sf)}">
          ${esc(sf)}
        </button>
      `).join("");

      chips.querySelectorAll(".stay-chip").forEach(btn => {
        btn.addEventListener("click", () => {
          state.currentTag = btn.dataset.filter;
          render();
        });
      });
    }

    if (grid) {
      grid.className = "";
      const matchesSearch = h => {
        const text = (h.n + " " + h.area + " " + h.d + " " + (h.tag || "")).toLowerCase();
        const matchesQ = !q || text.includes(q);
        let matchesFilter = true;
        if (state.currentTag === "Rating 9.0+") {
          const scoreNum = parseFloat(h.score);
          matchesFilter = !isNaN(scoreNum) && scoreNum >= 9.0;
        } else if (state.currentTag !== "All") {
          matchesFilter = h.area.toLowerCase().includes(state.currentTag.toLowerCase());
        }
        return matchesQ && matchesFilter;
      };

      const filteredThree = sec.three.filter(matchesSearch);
      const filteredFour = sec.four.filter(matchesSearch);

      if (!filteredThree.length && !filteredFour.length) {
        grid.innerHTML = (crossSearchBanner ? crossSearchBanner : "") + `
          <div class="empty-state">
            <div class="empty-state-icon">🏨</div>
            <h3>No Stays Matching "${esc(q || state.currentTag)}"</h3>
            <p>Try clearing filters or searching for another city.</p>
            <button class="reset-search-btn" id="emptyClearBtn">Clear Filters</button>
          </div>
        `;
        const ecb = $("emptyClearBtn");
        if (ecb) ecb.onclick = () => { state.currentTag = "All"; clearSearch(); };
      } else {
        grid.innerHTML = (crossSearchBanner ? crossSearchBanner : "") + `
          <div class="hotel-cols">
            ${renderHotelCol("3-Star Heritage & Boutique", filteredThree, 3)}
            ${renderHotelCol("4-Star Luxury & Palaces", filteredFour, 4)}
          </div>
        `;
        attachStayListeners();
      }
      attachBannerClearListener();
    }
    return;
  }

  // Cards Grid View (Places, Food, Snacks, Dishes, Hidden)
  grid.className = "grid";

  // Build Filter Chips
  const allTags = ["All", ...new Set(sec.items.map(i => i.t).filter(Boolean))];
  if (chips) {
    chips.innerHTML = allTags.map(tag => `
      <button class="chip" aria-pressed="${tag === state.currentTag}" data-tag="${esc(tag)}">
        ${esc(tag)}
      </button>
    `).join("");

    chips.querySelectorAll(".chip").forEach(btn => {
      btn.addEventListener("click", () => {
        state.currentTag = btn.dataset.tag;
        render();
      });
    });
  }

  // Filter Items
  const list = sec.items.filter(item => {
    const matchesTag = state.currentTag === "All" || item.t === state.currentTag;
    const contentString = (
      item.n + " " + 
      item.d + " " + 
      (item.t || "") + " " + 
      (item.tip || "") + " " +
      JSON.stringify(item.m || {})
    ).toLowerCase();
    const matchesQuery = !q || contentString.includes(q);
    return matchesTag && matchesQuery;
  });

  if (!list.length) {
    grid.innerHTML = (crossSearchBanner ? crossSearchBanner : "") + `
      <div class="empty-state">
        <div class="empty-state-icon">🔍</div>
        <h3>No matches found in ${esc(sec.label)}</h3>
        <p>No items matching "${esc(q)}" for category "${esc(state.currentTag)}".</p>
        <button class="reset-search-btn" id="emptyClearBtn">Clear Search Filter</button>
      </div>
    `;
    const ecb = $("emptyClearBtn");
    if (ecb) ecb.onclick = () => { state.currentTag = "All"; clearSearch(); };
    attachBannerClearListener();
    return;
  }

  // Render Cards HTML
  const cardsHtml = list.map(item => {
    const hasSpots = Array.isArray(item.spots) && item.spots.length > 0;
    const isOpen = hasSpots && state.openCards.has(item.id);
    const isSaved = state.savedItems.has(item.id);
    const fallbackPattern = getVectorPattern(sec.color, item.e || '📍', item.n);

    return `
      <article class="card ${hasSpots ? 'clickable' : ''} ${isOpen ? 'open' : ''}" data-id="${esc(item.id)}">
        <div class="card-hero-media">
          <img class="card-img" src="${item.img || fallbackPattern}" alt="${esc(item.n)}" loading="lazy" onerror="this.onerror=null; this.src='${fallbackPattern}'">
          <div class="card-hero-overlay"></div>
          <div class="card-hero-icon">${item.e || "📍"}</div>
          <button class="card-save-btn ${isSaved ? 'saved' : ''}" 
                  data-id="${esc(item.id)}"
                  aria-label="${isSaved ? 'Remove from saved' : 'Save to trip'}" 
                  title="${isSaved ? 'Remove from saved' : 'Save to trip'}">
            ${isSaved ? "❤️" : "🤍"}
          </button>
        </div>

        <div class="body">
          <div class="card-tag-row">
            ${item.hot ? '<span class="badge">Off the beaten path</span>' : ''}
            ${item.t ? `<span class="badge-tag">${esc(item.t)}</span>` : ''}
            ${item.m && item.m.Type === "Veg" ? '<span class="diet-badge veg">● Pure Veg</span>' : ''}
            ${item.m && item.m.Type === "Non-veg" ? '<span class="diet-badge non-veg">▲ Non-Veg</span>' : ''}
          </div>

          <h3 class="card-title-toggle" data-id="${esc(item.id)}" style="${hasSpots ? 'cursor:pointer;' : ''}">
            <span>${esc(item.n)}</span>
            ${hasSpots ? '<span class="arrow" title="Toggle attractions">▸</span>' : ''}
          </h3>

          <p class="desc">${esc(item.d)}</p>

          ${item.m ? `
            <div class="meta">
              ${Object.entries(item.m).filter(([k]) => k !== "Type").map(([k, v]) => `
                <span>${esc(k)}: <b>${esc(v)}</b></span>
              `).join("")}
            </div>
          ` : ''}

          ${isOpen ? `
            <div class="spots-container">
              ${item.spots.map(s => `
                <div class="spot-item">
                  <b>${esc(s[0])}</b>
                  <span>${esc(s[1])}</span>
                </div>
              `).join("")}
            </div>
          ` : ''}

          <div class="card-actions">
            ${hasSpots ? `
              <button class="btn-sm-action card-expand-toggle-btn" data-id="${esc(item.id)}">
                ${isOpen ? 'Hide Attractions' : 'View Attractions'}
              </button>
              <button class="btn-sm-action card-modal-open-btn" data-id="${esc(item.id)}">
                Guide & Tips
              </button>
            ` : item.m && item.m.City ? `
              <button class="btn-sm-action card-city-more-btn" data-city="${esc(item.m.City)}">
                More in ${esc(item.m.City)}
              </button>
            ` : `
              <button class="btn-sm-action card-save-action-btn" data-id="${esc(item.id)}">
                ${isSaved ? 'In Your Plan' : 'Save to Plan'}
              </button>
            `}
          </div>
        </div>
      </article>
    `;
  }).join("");

  grid.innerHTML = (crossSearchBanner ? crossSearchBanner : "") + cardsHtml;
  attachGridListeners();
  attachBannerClearListener();
}

/**
 * Event Listeners Attachments
 */
function attachGridListeners() {
  const grid = $("grid");
  if (!grid) return;

  // Save Heart buttons
  grid.querySelectorAll(".card-save-btn").forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      toggleSaveItem(btn.dataset.id);
    };
  });

  // Action Save buttons
  grid.querySelectorAll(".card-save-action-btn").forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      toggleSaveItem(btn.dataset.id);
      render();
    };
  });

  // Expand Spots Toggle
  grid.querySelectorAll(".card-title-toggle, .card-expand-toggle-btn").forEach(el => {
    el.onclick = () => {
      const id = el.dataset.id;
      if (state.openCards.has(id)) {
        state.openCards.delete(id);
      } else {
        state.openCards.add(id);
      }
      render();
    };
  });

  // Open Modal Guide
  grid.querySelectorAll(".card-modal-open-btn").forEach(btn => {
    btn.onclick = () => {
      openDestinationModal(btn.dataset.id);
    };
  });

  // More in city
  grid.querySelectorAll(".card-city-more-btn").forEach(btn => {
    btn.onclick = () => {
      searchTag(btn.dataset.city);
    };
  });
}

function attachStayListeners() {
  document.querySelectorAll(".card-save-btn-stay").forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      toggleSaveItem(btn.dataset.id);
      const isSaved = state.savedItems.has(btn.dataset.id);
      btn.innerHTML = isSaved ? "❤️ Saved in Plan" : "🤍 Save Stay";
    };
  });
  document.querySelectorAll(".hitem .card-save-btn").forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      toggleSaveItem(btn.dataset.id);
    };
  });
}

function attachSavedTabListeners() {
  const browseBtn = $("browseDestBtn");
  if (browseBtn) browseBtn.onclick = () => switchTab("places");

  const printBtn = $("printPlanBtn");
  if (printBtn) printBtn.onclick = () => window.print();

  const clearBtn = $("clearAllSavedBtn");
  if (clearBtn) clearBtn.onclick = clearAllSaved;

  document.querySelectorAll(".card-remove-btn").forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      toggleSaveItem(btn.dataset.id);
    };
  });
}

function attachItineraryListeners() {
  document.querySelectorAll(".map-node").forEach(node => {
    node.onclick = () => {
      const city = node.dataset.city;
      if (city) searchTag(city);
    };
  });

  document.querySelectorAll(".copy-it-btn").forEach(btn => {
    btn.onclick = () => copyItineraryText(btn.dataset.id);
  });

  document.querySelectorAll(".print-it-btn").forEach(btn => {
    btn.onclick = () => window.print();
  });

  document.querySelectorAll(".eat-link-btn").forEach(btn => {
    btn.onclick = () => {
      const ref = btn.dataset.ref;
      if (ref) {
        const item = findItemById(ref);
        if (item) {
          switchTab("food");
          searchTag(item.n);
        }
      }
    };
  });
}

function attachBannerClearListener() {
  const clearBtn = $("bannerClearSearchBtn");
  if (clearBtn) clearBtn.onclick = clearSearch;

  document.querySelectorAll(".cross-switch-btn").forEach(btn => {
    btn.onclick = () => {
      switchTab(btn.dataset.tab);
    };
  });
}

/**
 * Quick Suggestion Chips Setup
 */
function renderQuickSuggestions() {
  const container = $("quickSuggestions");
  if (!container) return;

  container.innerHTML = `
    <span class="suggestion-label">Popular Searches:</span>
    ${POPULAR_TAGS.map(t => `
      <button class="sugg-chip" data-search="${esc(t)}">${esc(t)}</button>
    `).join("")}
  `;

  container.querySelectorAll(".sugg-chip").forEach(btn => {
    btn.onclick = () => searchTag(btn.dataset.search);
  });
}

/**
 * Scroll to top observer
 */
function setupScrollObserver() {
  const backToTop = $("backToTop");
  if (!backToTop) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/**
 * Keyboard Shortcuts
 */
function setupKeyboardShortcuts() {
  window.addEventListener("keydown", (e) => {
    // Focus search with '/'
    if (e.key === "/" && document.activeElement !== $("q")) {
      e.preventDefault();
      $("q").focus();
    }
    // Escape closes modal or clears search
    if (e.key === "Escape") {
      closeDestinationModal();
      if (document.activeElement === $("q")) {
        clearSearch();
      }
    }
  });
}

/**
 * App Initialization
 */
document.addEventListener("DOMContentLoaded", () => {
  // Apply initial theme
  applyTheme(state.theme);

  // Setup Theme Button Listener
  const themeBtn = $("themeToggleBtn");
  if (themeBtn) {
    themeBtn.addEventListener("click", toggleTheme);
  }

  // Setup Surprise Me Button
  const surpriseBtn = $("surpriseBtn");
  if (surpriseBtn) {
    surpriseBtn.addEventListener("click", surpriseMe);
  }

  // Setup Saved Trips Header Button Listener
  const savedTripsBtn = $("savedTripsBtn");
  if (savedTripsBtn) {
    savedTripsBtn.addEventListener("click", () => switchTab("saved"));
  }

  // Setup Search Listeners
  const searchInput = $("q");
  if (searchInput) {
    searchInput.addEventListener("input", handleSearchInput);
  }

  const clearBtn = $("searchClearBtn");
  if (clearBtn) {
    clearBtn.addEventListener("click", clearSearch);
  }

  // Setup Quick Suggestions
  renderQuickSuggestions();

  // Setup Modal close listeners
  const modalCloseBtn = $("modalCloseBtn");
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeDestinationModal);
  }
  const modalBackdrop = $("destModalBackdrop");
  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", (e) => {
      if (e.target === modalBackdrop) closeDestinationModal();
    });
  }

  // Setup Scroll & Shortcuts
  setupScrollObserver();
  setupKeyboardShortcuts();

  // Initial Render
  render();
});
