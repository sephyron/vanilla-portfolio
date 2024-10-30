class Router extends HTMLElement {
  constructor() {
    super();
    this.routes = new Map();
  }

  connectedCallback() {
    window.addEventListener('popstate', () => this.handleRouting());
    this.handleRouting();
  }

  addRoute(path, pageId) {
    this.routes.set(path, pageId);
  }

  handleRouting() {
    const path = window.location.pathname;
    const pageId = this.routes.get(path) || 'bio';
    this.activatePage(pageId);
    this.updateNavigation(path);
  }

  activatePage(pageId) {
    const pageContainer = document.getElementById('page-container');
    if (pageContainer) {
      pageContainer.setAttribute('page', pageId); // Set the 'page' attribute
    } else {
      console.error('Page container not found.');
    }
  }
  

  updateNavigation(path) {
    document.querySelectorAll('nav a').forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === path);
    });
  }

  navigateTo(path) {
    history.pushState(null, '', path);
    this.handleRouting();
  }
}

customElements.define('site-router', Router);