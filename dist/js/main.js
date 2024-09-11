(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();document.querySelector("page-transition");const a=document.querySelectorAll("nav a"),c=document.querySelectorAll(".page");document.querySelector(".page.active");document.querySelector("nav a.active");a.forEach(n=>{n.addEventListener("click",t=>{t.preventDefault();const s=n.getAttribute("href"),i=document.querySelector(s);c.forEach(e=>e.classList.remove("active")),a.forEach(e=>e.classList.remove("active")),setTimeout(()=>{i.classList.add("active"),n.classList.add("active")},200)})});document.getElementById("cards").onmousemove=n=>{for(const t of document.getElementsByClassName("card")){const s=t.getBoundingClientRect(),i=n.clientX-s.left,e=n.clientY-s.top;t.style.setProperty("--mouse-x",`${i}px`),t.style.setProperty("--mouse-y",`${e}px`)}};class l extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=`
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
`).map(t=>t.trim()),this.textContent="",this.iArrLength=this.aText[0].length,this.typewriter()}typewriter(){this.sContents=" ",this.iRow=Math.max(0,this.iIndex-this.iScrollAt);const t=this.shadowRoot.getElementById("typedtext");for(;this.iRow<this.iIndex;)this.sContents+=this.aText[this.iRow++]+"<br />";t.innerHTML=this.sContents+this.aText[this.iIndex].substring(0,this.iTextPos)+"<span class='cursor'>_</span>",this.iTextPos++==this.iArrLength?(this.iTextPos=0,this.iIndex++,this.iIndex!=this.aText.length&&(this.iArrLength=this.aText[this.iIndex].length,setTimeout(()=>this.typewriter(),500))):setTimeout(()=>this.typewriter(),this.iSpeed)}}customElements.define("typewriter-component",l);class d extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.posts=[]}connectedCallback(){this.render(),window.addEventListener("popstate",()=>this.handleRouting())}render(){this.shadowRoot.innerHTML=`
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
                    font-family: var(--font-family-display);
                }
               h1, h3, h4, span {
                    
                    font-family: var(--font-family-display), sans-serif;
                    font-weight: 400;
                    margin: 0px;
                  }
                .post-meta {
                    color: #888;
                    font-size: 0.9em;
                    margin-bottom: 10px;
                }
                a {
                    color: var(--accent-color-1);
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
        `,this.fetchPosts()}async fetchPosts(){try{const t=await fetch("posts.json");this.posts=await t.json(),this.handleRouting()}catch(t){console.error("Error fetching posts:",t)}}handleRouting(){const t=window.location.pathname,s=this.shadowRoot.getElementById("content");if(t==="/"||t==="/index.html")this.displayPostList(s);else{const i=t.slice(1),e=this.posts.find(o=>o.slug===i);e?this.displaySinglePost(s,e):s.innerHTML="<h2>404 - Post not found</h2>"}}displayPostList(t){t.innerHTML="",this.posts.forEach(s=>{const i=document.createElement("div");i.classList.add("post"),i.innerHTML=`
                <h2><a href="/${s.slug}" data-navigo>${s.title}</a></h2>
                <div class="post-meta">Published on ${s.date}</div>
                <p>${s.excerpt}</p>
            `,t.appendChild(i)}),this.addNavigationListeners(t)}async displaySinglePost(t,s){try{const e=await(await fetch(`public/posts/${s.slug}.md`)).text(),o=marked.parse(e);t.innerHTML=`
                <h1>${s.title}</h1>
                <div class="post-meta">Published on ${s.date}</div>
                <div class="post-content">${o}</div>
                <p><a href="/" data-navigo>Back to all posts</a></p>
            `,this.addNavigationListeners(t)}catch(i){console.error("Error fetching post content:",i),t.innerHTML="<h2>Error loading post</h2>"}}addNavigationListeners(t){t.querySelectorAll("a[data-navigo]").forEach(i=>{i.addEventListener("click",e=>{e.preventDefault();const o=i.getAttribute("href");history.pushState(null,"",o),this.handleRouting()})})}}customElements.define("custom-blog",d);
