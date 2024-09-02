class PageTransition extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(256, 256, 256, 0.5);
            display: none;
            z-index: 1000; /* Ensure it's on top */
            transition: opacity 0.3s ease-in-out;
            opacity: 0;
          }
  
          :host(.active) {
            display: block;
            opacity: 1;
          }
        </style>
        <slot></slot> 
      `;
    }
  
    show() {
      this.classList.add('active');
    }
  
    hide() {
      this.classList.remove('active');
    }
  }
  
  customElements.define('page-transition', PageTransition);