class PageContainer extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' }); // Use shadow DOM for encapsulation
    }
  
    static get observedAttributes() {
      return ['page'];
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'page' && oldValue !== newValue) {
        this.loadPage(newValue);
      }
    }
  
    async loadPage(pageId) {
      try {
        const response = await fetch(`../${pageId}.html`); // Fetch the HTML content
        if (!response.ok) {
          throw new Error(`Status: ${response.status}`);
        }
        const content = await response.text();
        this.render(content);
      } catch (error) {
        console.error(`Error loading page: ${error}`);
        this.render('Error loading page: ' +  error);
      }
    }
  
    render(content) {
      this.shadowRoot.innerHTML = content; // Render the content in the shadow DOM
    }
}
  
customElements.define('page-container', PageContainer);