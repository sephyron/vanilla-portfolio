// components/modal.js
const template = document.createElement('template');
template.innerHTML = `
<style>
.modal {
    
    position: absolute;
    z-index: 9999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.4);
   
  }
  .end {
    opacity: 0;
      display: none;
      visibility: hidden;

  }
  .modal-content {
    background-color: var(--secondary-color);
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
  }
  
  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }
  
  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
  .fade-in {
    animation: appear 1s ease-in-out;
  }
 .fade-out {
    animation: disappear 1s ease-in-out;
  }
  @keyframes appear {
    0% {
      opacity: 0;
      display: none;
      visibility: hidden;
    }
    100% {
      opacity: 1;
      display: block;
      visibility: visible;
    }
  }
  @keyframes disappear {
    0% {
      display: block;
      opacity: 1;
      visibility: visible;
    }
    100% {
      opacity: 0;
      display: none;
      visibility: hidden;
 
    }
  }
</style>
  <div class="modal">
    <div class="modal-content">
      <span class="close">&times;</span>
      <slot name="content"></slot>
    </div>
  </div>
`;
class Modal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.modal = this.shadowRoot.querySelector('.modal');
    this.closeBtn = this.shadowRoot.querySelector('.close');
  }
  connectedCallback() {
    this.closeBtn.addEventListener('click', this.close.bind(this));
  }
  async open(contentUrl) {
    try {
      const response = await fetch(contentUrl);
      const contentHtml = await response.html();

      // Create a div to hold the content
      const contentDiv = document.createElement('div');
      contentDiv.innerHTML = contentHtml;

      // Get the slot element and clear its existing content
      const slot = this.shadowRoot.querySelector('slot[name="content"]');
      slot.innerHTML = ''; // Clear existing content

      // Append the content to the slot
      slot.appendChild(contentDiv);

      // Show the modal
      this.modal.classList.add('fade-in');
      this.modal.classList.remove('end'); 
    } catch (error) {
      console.error('Error loading modal content:', error);
      // Handle error, e.g., show an error message in the modal
    }
  }
  close() {
    this.modal.classList.add('fade-out');
    this.modal.classList.add('end');
    //this.modal.style.animation = 'disappear';
   // this.modal.style.display = 'none';
    //this.modal.style.opacity = '0';
    //this.modal.animate({ opacity: [1, 0] }, { duration: 500, easing: 'ease-in-out' });
  }
}
customElements.define('my-modal', Modal);