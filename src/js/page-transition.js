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
            background-color: rgba(256, 256, 256, 0.05);
            display: flex;
            z-index: 1000; /* Ensure it's on top */
            transition: transform opacity 1s ease-in-out;
            transform: translate(5rem, 0);
            opacity: 0;
            height: 0;
          }
  
          :host(.active) {
            display: flex;
            opacity: 1;
            height: 100%;
            transform: translate(0);
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