// Render content and handle interactions
(function() {
  function isDatePast(dateString) {
    const eventDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return eventDate < today;
  }

  function categorizeEvents(events) {
    const upcoming = [];
    const past = [];

    events.forEach(event => {
      if (isDatePast(event.date)) {
        past.push(event);
      } else {
        upcoming.push(event);
      }
    });

    return { upcoming, past };
  }

  function renderSection(sectionName) {
    const container = document.querySelector(`[data-section="${sectionName}"]`);
    if (!container || !content[sectionName]) return;

    const { upcoming, past } = categorizeEvents(content[sectionName]);

    // Render upcoming
    if (upcoming && upcoming.length > 0) {
      const upcomingEl = document.createElement('div');
      upcomingEl.className = 'work-group';
      upcomingEl.innerHTML = `<h3 class="work-group-label">Upcoming</h3>`;
      upcoming.forEach((item, index) => {
        upcomingEl.appendChild(createItem(item, `${sectionName}-upcoming-${index}`));
      });
      container.appendChild(upcomingEl);
    }

    // Render past
    if (past && past.length > 0) {
      const pastEl = document.createElement('div');
      pastEl.className = 'work-group';
      pastEl.innerHTML = `<h3 class="work-group-label">Past</h3>`;
      past.forEach((item, index) => {
        pastEl.appendChild(createItem(item, `${sectionName}-past-${index}`));
      });
      container.appendChild(pastEl);
    }
  }

  function createItem(item, id) {
    const el = document.createElement('div');
    el.className = 'work-item';
    el.innerHTML = `
      <button class="work-header" aria-expanded="false" aria-controls="${id}">
        <div class="work-info">
          <span class="work-title">${item.title}</span>
          <span class="work-date">${item.date}</span>
        </div>
        <span class="work-toggle">+</span>
      </button>
      <div class="work-details" id="${id}">
        <p>${item.details}</p>
      </div>
    `;
    return el;
  }

  function initInteractions() {
    document.addEventListener('click', (e) => {
      const header = e.target.closest('.work-header');
      if (!header) return;

      const item = header.closest('.work-item');
      const toggle = header.querySelector('.work-toggle');
      const isOpen = item.classList.contains('open');

      // Close all other open items
      document.querySelectorAll('.work-item.open').forEach(openItem => {
        if (openItem !== item) {
          openItem.classList.remove('open');
          openItem.querySelector('.work-header').setAttribute('aria-expanded', 'false');
          openItem.querySelector('.work-toggle').textContent = '+';
        }
      });

      // Toggle current item
      item.classList.toggle('open');
      header.setAttribute('aria-expanded', !isOpen);
      toggle.textContent = isOpen ? '+' : '−';
    });
  }

  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    renderSection('tech');
    renderSection('music');
    initInteractions();
  });
})();
