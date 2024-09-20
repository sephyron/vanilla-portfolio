(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?i.credentials="include":e.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(e){if(e.ep)return;e.ep=!0;const i=s(e);fetch(e.href,i)}})();document.querySelector("page-transition");const r=document.querySelectorAll("nav a"),d=document.querySelectorAll(".page");document.querySelector(".page.active");document.querySelector("nav a.active");r.forEach(n=>{n.addEventListener("click",t=>{t.preventDefault();const s=n.getAttribute("href"),o=document.querySelector(s);d.forEach(e=>e.classList.remove("active")),r.forEach(e=>e.classList.remove("active")),setTimeout(()=>{o.classList.add("active"),n.classList.add("active")},200)})});document.getElementById("cards").onmousemove=n=>{for(const t of document.getElementsByClassName("card")){const s=t.getBoundingClientRect(),o=n.clientX-s.left,e=n.clientY-s.top;t.style.setProperty("--mouse-x",`${o}px`),t.style.setProperty("--mouse-y",`${e}px`)}};const l=document.querySelectorAll(".card");l.forEach(n=>{n.addEventListener("click",()=>{const t=document.createElement("my-modal");t.innerHTML=`
      <span slot="content">
        <h2>Card Content</h2>
        <p>This is the content of the modal that pops up when you click the card.</p>
      </span>
    `,document.body.appendChild(t),t.open()})});class h extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=`
        <style>
          :host {
            display: block;
          }
          span.cursor {
            animation: blinker 1s ease-in-out infinite;
          }
          @keyframes blinker {
            0% {
              opacity: 0;
            }
            50% {
              opacity: 1;
            } 
            100% {
              opacity: 0;
            }
          }
        </style>
        <div id="typedtext"></div>
      `,this.iSpeed=this.getAttribute("ispeed")||10,this.iIndex=0,this.iScrollAt=20,this.iTextPos=0,this.sContents="",this.iRow=0}connectedCallback(){this.aText=this.textContent.trim().split(`
`).map(t=>t.trim()),this.textContent="",this.iArrLength=this.aText[0].length,this.typewriter()}typewriter(){this.sContents=" ",this.iRow=Math.max(0,this.iIndex-this.iScrollAt);const t=this.shadowRoot.getElementById("typedtext");for(;this.iRow<this.iIndex;)this.sContents+=this.aText[this.iRow++]+"<br />";t.innerHTML=this.sContents+this.aText[this.iIndex].substring(0,this.iTextPos)+"<span class='cursor'>_</span>",this.iTextPos++==this.iArrLength?(this.iTextPos=0,this.iIndex++,this.iIndex!=this.aText.length&&(this.iArrLength=this.aText[this.iIndex].length,setTimeout(()=>this.typewriter(),500))):setTimeout(()=>this.typewriter(),this.iSpeed)}}customElements.define("typewriter-component",h);class p extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.posts=[]}connectedCallback(){this.render(),window.addEventListener("popstate",()=>this.handleRouting())}render(){this.shadowRoot.innerHTML=`
            <style>
                :host {
                    display: block;
                    max-width: 100%;
                    margin: 0 auto;
                    padding: 20px;
                }

                .post {
                    padding-bottom: 1rem;
                    margin-bottom: 1rem;
                }
                .post h2 {
                    font-size: 2rem;
                    character-spacing: 0.1em;
                    
                }
                .post p {
                    padding: 0 1rem;
                }
                .post-content img {
                    width: 100%;
                    max-width: 600px;
                }
                h1, h2, h3, h4, span {
                    
                    font-family: var(--font-family-display), sans-serif;
                    font-weight: 100;
                    margin: 0px;
                  }
                .post-meta {
                    color: #888;
                    font-size: 0.9em;
                    margin-bottom: 10px;
                }
                .post-content {
                    font-size: 1.1rem;
                    padding: 1rem;
                }
                a {
                    color: var(--contrast-color);
                    text-decoration: none;
                    display: inline-block;
                    font-family: var(--font-family-display);
                    font-weight: 100;
                }
                a:hover {
                    background-color: #26253c;
                    color: #fff;
                    
                }
            </style>
            
            <div id="content"></div>
        `,this.fetchPosts()}async fetchPosts(){try{const t=await fetch("posts.json");this.posts=await t.json(),this.handleRouting()}catch(t){console.error("Error fetching posts:",t)}}handleRouting(){const t=window.location.pathname,s=this.shadowRoot.getElementById("content");if(t==="/"||t==="/index.html")this.displayPostList(s);else{const o=t.slice(1),e=this.posts.find(i=>i.slug===o);e?this.displaySinglePost(s,e):s.innerHTML="<h1>404 - Post not found</h1>"}}displayPostList(t){t.innerHTML="",this.posts.forEach(s=>{const o=document.createElement("div");o.classList.add("post"),o.innerHTML=`
                <h2><a href="/${s.slug}" data-navigo>${s.title}</a></h2>
                <div class="post-meta">Published on ${s.date}</div>
                <p>${s.excerpt}</p>
            `,t.appendChild(o)}),this.addNavigationListeners(t)}async displaySinglePost(t,s){try{const e=await(await fetch(`public/posts/${s.slug}.md`)).text(),i=marked.parse(e,{renderer:new marked.Renderer});t.innerHTML=`
                <p><a href="/" data-navigo>Back to all posts</a></p>    
                <h1>${s.title}</h1>
                <div class="post-meta">Published on ${s.date}</div>
                <div class="post-content">${i}</div>
                <p><a href="/" data-navigo>Back to all posts</a></p>
            `,this.addNavigationListeners(t)}catch(o){console.error("Error fetching post content:",o),t.innerHTML="<h2>Error loading post</h2>"}}addNavigationListeners(t){t.querySelectorAll("a[data-navigo]").forEach(o=>{o.addEventListener("click",e=>{e.preventDefault();const i=o.getAttribute("href");history.pushState(null,"",i),this.handleRouting()})})}}customElements.define("custom-blog",p);const c=document.createElement("template");c.innerHTML=`
  <div class="modal">
    <div class="modal-content">
      <span class="close">&times;</
span>
      <slot name="content"></slot>
    </div>
  </div>
`;class m extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(c.content.cloneNode(!0)),this.modal=this.shadowRoot.querySelector(".modal"),this.closeBtn=this.shadowRoot.querySelector(".close")}connectedCallback(){this.closeBtn.addEventListener("click",this.close.bind(this))}open(){this.modal.style.display="block"}close(){this.modal.style.display="none"}}customElements.define("my-modal",m);
