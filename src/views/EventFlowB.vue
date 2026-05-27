<template>
  <!-- NAV -->
  <header>
    <div class="nav-inner">
      <div class="logo">EventFlow<span class="logo-dot">.</span></div>
      <nav>
        <a href="#" class="active">Discover</a>
        <a href="#">Schedule</a>
        <a href="#">Speakers</a>
        <a href="#">Venues</a>
      </nav>
      <div class="nav-actions">
        <button class="btn-primary">Create Event</button>
        <button class="icon-btn">
          <span class="material-symbols-outlined">notifications</span>
        </button>
        <button class="icon-btn">
          <span class="material-symbols-outlined">account_circle</span>
        </button>
      </div>
    </div>
  </header>

  <main>
    <!-- HERO -->
    <section style="max-width: 1440px; margin: 2rem auto; padding: 0 2rem">
      <div class="hero" style="margin: 0; border-radius: 24px">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9JuJlPv-U3qDfu3964lPjr0hXhjEzrZjJQHeRkFL3WcO2xGugjKG7vfU5iYm6qhnYH0dwWxdB1l6O3YBeCPKD0L_5mEHKV08gxPLv5IR4vaC2Zg10azF1e73ekE9QwaEKtqBymrCjO4fzLDOv-QFcGVImv02unjk0cO4BD71BVExBpVtv0jskP-laK2GljNl5k2M9ZiZy7unleXN_a5FulmXyohLM7sC4D6EzD44rQoV9Nbc8-g2tm6FBHLiDVAZ3j4gR3QM_224o"
          alt="Hero"
        />
        <div class="hero-overlay">
          <div>
            <div class="hero-badge">Featured Experience</div>
            <h1>The Future of <span>Global FinTech</span> 2024</h1>
            <p>
              Join over 5,000 industry leaders for the most influential financial technology
              conference of the year.
            </p>
            <div class="hero-actions">
              <button class="btn-hero">Register Now</button>
              <button class="btn-ghost">View Agenda</button>
            </div>
          </div>
        </div>
        <div class="hero-dots">
          <span class="active"></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </section>

    <!-- SEARCH -->
    <section style="max-width: 1440px; margin: 2rem auto; padding: 0 2rem">
      <div class="search-bar">
        <div class="search-row">
          <div class="search-input-wrap">
            <span class="material-symbols-outlined search-icon">search</span>
            <input class="search-input" type="text" placeholder="Find your next experience..." />
          </div>
          <button class="filter-btn">
            <span class="material-symbols-outlined" style="font-size: 1.1rem">calendar_today</span>
            Any Date
          </button>
          <button class="filter-btn">
            <span class="material-symbols-outlined" style="font-size: 1.1rem">category</span>
            Category
          </button>
          <button class="filter-btn-icon">
            <span class="material-symbols-outlined" style="font-size: 1.1rem">tune</span>
          </button>
        </div>
        <div class="chips">
          <span class="chip active">#Technology</span>
          <span class="chip">#Wellness</span>
          <span class="chip">#Business</span>
          <span class="chip">#Music</span>
          <span class="chip">#Workshops</span>
        </div>
      </div>
    </section>

    <!-- EVENTS LIST -->
    <section class="section">
      <div class="section-header">
        <div>
          <div class="section-label">— Upcoming</div>
          <h2>Upcoming Events</h2>
          <p>Handpicked experiences tailored for you</p>
        </div>
      </div>

      <div class="events-list">
        <!-- Sample Event -->
        <div class="event-list-item">
          <div class="event-date">12 NOV</div>
          <div class="event-info">
            <h3>Digital Arts & Music Expo</h3>
            <p>A sensory journey blending immersive digital installations with global electronic sounds.</p>
          </div>
        </div>

        <!-- Add more list items... -->
      </div>
    </section>
  </main>

  <!-- FOOTER -->
  <footer>
    <div class="footer-inner">
      <div class="footer-brand">
        <div class="logo">EventFlow<span class="logo-dot">.</span></div>
        <p>© 2024 EventFlow Ecosystem. All rights reserved.</p>
      </div>
      <div class="footer-links">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Help Center</a>
        <a href="#">API Docs</a>
      </div>
    </div>
  </footer>
</template>
<script setup lang="ts">

</script>
<style scoped>
/* Add specific styles for events list. */
.events-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.event-list-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 10px;
}

.event-date {
  background: var(--emerald);
  color: #fff;
  border-radius: 4px;
  padding: 0.5rem;
  font-size: 0.9rem;
  font-weight: bold;
}

.event-info h3 {
  margin: 0;
  color: var(--text);
}
</style>