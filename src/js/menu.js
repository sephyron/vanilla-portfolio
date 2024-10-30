class NavigationBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }); 

    // Create the navigation bar structure
    this.shadowRoot.innerHTML = `
      <style>
        /* Add your CSS styles here */
        .navi { 
          /* existing styles */

        }
        .bar {
          /* existing styles */
        }
      </style>
      <ul class="navi">
        <li><a href="#home" class="active">Home</a></li> 
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li> 
        <li><a href="#contact">Contact</a></li>
      </ul>
      <span class="bar"></span> 
    `;

    this.menu = this.shadowRoot.querySelector('.navi');
    this.bar = this.shadowRoot.querySelector('.bar'); 
  }

  connectedCallback() {
    this.initializeBar();
    this.addListeners();
  }

  initializeBar() {
    const activeItem = this.menu.querySelector('li a.active');
    const barLeft = activeItem.offsetLeft;
    const barWidth = activeItem.offsetWidth;

    this.bar.style.width = barWidth + 'px';
    this.bar.style.left = barLeft + 'px';
  }

  addListeners() {
    const menuItems = this.menu.querySelectorAll('li');

    menuItems.forEach(item => {
      item.addEventListener('mouseover', () => {
        this.bar.style.width = item.offsetWidth + 'px';
        this.bar.style.left = item.offsetLeft + 'px';
      });

      item.addEventListener('click', () => {
        const barLeft = item.offsetLeft;
        const barWidth = item.offsetWidth;
        menuItems.forEach(li => li.classList.remove('active'));
        item.classList.add('active');

        this.bar.style.width = barWidth + 'px';
        this.bar.style.left = barLeft + 'px';
      });
    });

    this.menu.addEventListener('mouseleave', () => {
      this.initializeBar(); 
    });
  }
}

customElements.define('navigation-bar', NavigationBar);
