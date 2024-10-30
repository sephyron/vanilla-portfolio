document.addEventListener('DOMContentLoaded', function() {
    const menu = document.querySelector('.navi');
    const bar = document.createElement('span');
    bar.classList.add('bar');
    menu.appendChild(bar);
  
    const activeItem = menu.querySelector('li a.active');
    let barLeft = activeItem.offsetLeft;
    let barWidth = activeItem.offsetWidth;
  
    bar.style.width = barWidth + 'px';
    bar.style.left = barLeft + 'px';
  
    const menuItems = menu.querySelectorAll('li');
    menuItems.forEach(item => {
      item.addEventListener('mouseover', function() {
        bar.style.width = item.offsetWidth + 'px';
        bar.style.left = item.offsetLeft + 'px';
      });
    });
  
    menu.addEventListener('mouseleave', function() {
      bar.style.width = barWidth + 'px';
      bar.style.left = barLeft + 'px';
    });
  
    menuItems.forEach(item => {
      item.addEventListener('click', function() {
        barLeft = item.offsetLeft;
        barWidth = item.offsetWidth;
        menuItems.forEach(li => li.classList.remove('active'));
        item.classList.add('active');
      });
    });
  });
  