(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function i(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=i(e);fetch(e.href,s)}})();document.querySelector("page-transition");document.querySelectorAll("nav a");document.querySelectorAll(".page");document.querySelector(".page.active");document.querySelector("nav a.active");document.addEventListener("DOMContentLoaded",()=>{[document.getElementById("page1"),document.getElementById("cards1"),document.getElementById("cards")].forEach(t=>{t.onmousemove=i=>{for(const o of t.querySelectorAll(".card")){const e=o.getBoundingClientRect(),s=i.clientX-e.left,a=i.clientY-e.top;o.style.setProperty("--mouse-x",`${s}px`),o.style.setProperty("--mouse-y",`${a}px`)}}})});const c=document.querySelectorAll(".card"),d=[{title:"Card 1 Title",content:"This is the content for card 1.",contentURL:"/about.html"},{title:"Card 2 Title",content:"This is the content for card 2.",contentURL:"/about.html"},{title:"Card 3 Title",content:"This is the content for card 2.",contentURL:"/about.html"},{title:"Card 4 Title",content:"This is the content for card 2.",contentURL:"/about.html"},{title:"Card 5 Title",content:"This is the content for card 2.",contentURL:"/about.html"},{title:"Card 6 Title",content:"This is the content for card 2.",contentURL:"/about.html"},{title:"Card 7 Title",content:"This is the content for card 2.",contentURL:"/about.html"},{title:"Card 8 Title",content:"This is the content for card 2.",contentURL:"/about.html"},{title:"Card 9 Title",content:"This is the content for card 2.",contentURL:"/about.html"}];c.forEach(n=>{n.addEventListener("click",async t=>{t.stopPropagation();const i=n.dataset.cardIndex,o=d[i],e=document.createElement("my-modal");try{const a=await(await fetch(o.contentURL)).text();e.innerHTML=`
        <span slot="content">
          <h2>${o.title}</h2>
          <div>${a}</div> 
        </span>
      `}catch(s){console.error("Error fetching content:",s),e.innerHTML=`
        <span slot="content">
          <h2>Error</h2>
          <p>Failed to load content.</p>
        </span>
      `}document.body.appendChild(e),e.open()})});class l extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=`
        <style>
          :host {
            display: flex;
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
`).map(t=>t.trim()),this.textContent="",this.iArrLength=this.aText[0].length,this.typewriter()}typewriter(){this.sContents=" ",this.iRow=Math.max(0,this.iIndex-this.iScrollAt);const t=this.shadowRoot.getElementById("typedtext");for(;this.iRow<this.iIndex;)this.sContents+=this.aText[this.iRow++]+"<br />";t.innerHTML=this.sContents+this.aText[this.iIndex].substring(0,this.iTextPos)+"<span class='cursor'>_</span>",this.iTextPos++==this.iArrLength?(this.iTextPos=0,this.iIndex++,this.iIndex!=this.aText.length&&(this.iArrLength=this.aText[this.iIndex].length,setTimeout(()=>this.typewriter(),500))):setTimeout(()=>this.typewriter(),this.iSpeed)}}customElements.define("typewriter-component",l);class h extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.posts=[]}connectedCallback(){this.render(),window.addEventListener("popstate",()=>this.handleRouting())}render(){this.shadowRoot.innerHTML=`
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
                    font-size: 1.25rem;
                    font-weight: 300;    
                    character-spacing: 0.1em;
                }
                .post p {
                    padding: 0 1rem;
                }
                .post-content img {
                    width: 100%;
                    max-width: 600px;
                }
                
                .post-meta {
                    color: #888;
                    font-size: 0.8em;
                    margin-bottom: 10px;
                }
                .post-content {
                   
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
                    background-color: var(--accent-color-1);
                    color: #fff;
                    
                }
                #content h1{
                    font-weight: 300;
                    font-size: 2rem;
                }
            </style>
            
            <div id="content"></div>
        `,this.fetchPosts()}async fetchPosts(){try{const t=await fetch("posts.json");this.posts=await t.json(),this.handleRouting()}catch(t){console.error("Error fetching posts:",t)}}handleRouting(){const t=window.location.pathname,i=this.shadowRoot.getElementById("content");if(t==="/"||t==="/index.html")this.displayPostList(i);else{const o=t.slice(1),e=this.posts.find(s=>s.slug===o);e?this.displaySinglePost(i,e):i.innerHTML="<h1>404 - Post not found</h1>"}}displayPostList(t){t.innerHTML="",this.posts.forEach(i=>{const o=document.createElement("div");o.classList.add("post"),o.innerHTML=`
                <h2><a href="/${i.slug}" data-navigo>${i.title}</a></h2>
                <div class="post-meta">Published on ${i.date}</div>
                <p>${i.excerpt}</p>
            `,t.appendChild(o)}),this.addNavigationListeners(t)}async displaySinglePost(t,i){try{const e=await(await fetch(`public/posts/${i.slug}.md`)).text(),s=marked.parse(e,{renderer:new marked.Renderer});t.innerHTML=`
                <p><a href="/" data-navigo>Back to all posts</a></p>    
                <h1>${i.title}</h1>
                <div class="post-meta">Published on ${i.date}</div>
                <div class="post-content">${s}</div>
                <p><a href="/" data-navigo>Back to all posts</a></p>
            `,this.addNavigationListeners(t)}catch(o){console.error("Error fetching post content:",o),t.innerHTML="<h2>Error loading post</h2>"}}addNavigationListeners(t){t.querySelectorAll("a[data-navigo]").forEach(o=>{o.addEventListener("click",e=>{e.preventDefault();const s=o.getAttribute("href");history.pushState(null,"",s),this.handleRouting()})})}}customElements.define("custom-blog",h);const r=document.createElement("template");r.innerHTML=`
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
`;class p extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(r.content.cloneNode(!0)),this.modal=this.shadowRoot.querySelector(".modal"),this.closeBtn=this.shadowRoot.querySelector(".close")}connectedCallback(){this.closeBtn.addEventListener("click",this.close.bind(this))}async open(t){try{const o=await(await fetch(t)).html(),e=document.createElement("div");e.innerHTML=o;const s=this.shadowRoot.querySelector('slot[name="content"]');s.innerHTML="",s.appendChild(e),this.modal.classList.add("fade-in"),this.modal.classList.remove("end")}catch(i){console.error("Error loading modal content:",i)}}close(){this.modal.classList.add("fade-out"),this.modal.classList.add("end")}}customElements.define("my-modal",p);class m extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"});const t=document.createElement("canvas");t.id="particleCanvas",this.shadowRoot.appendChild(t),this.ctx=t.getContext("2d"),this.particles=[],this.particleCount=0,this.resizeHandler=this.onResize.bind(this),this.initParticles=this.initParticles.bind(this),this.animate=this.animate.bind(this)}connectedCallback(){this.onResize(),window.addEventListener("resize",this.resizeHandler),this.initParticles(),this.animate()}disconnectedCallback(){window.removeEventListener("resize",this.resizeHandler)}onResize(){const t=this.shadowRoot.getElementById("particleCanvas");t.width=window.innerWidth,t.height=window.innerHeight,this.particleCount=this.calculateParticleCount(),this.initParticles()}calculateParticleCount(){const t=this.shadowRoot.getElementById("particleCanvas");return Math.floor(t.width*t.height/6e3)}initParticles(){this.particles=[];for(let t=0;t<this.particleCount;t++)this.particles.push(new u(this.ctx,this.shadowRoot.getElementById("particleCanvas")))}animate(){this.ctx.clearRect(0,0,this.shadowRoot.getElementById("particleCanvas").width,this.shadowRoot.getElementById("particleCanvas").height),this.particles.forEach(t=>{t.update(),t.draw()}),requestAnimationFrame(this.animate)}}class u{constructor(t,i){this.ctx=t,this.canvas=i,this.reset(),this.y=Math.random()*this.canvas.height,this.fadeDelay=Math.random()*600+100,this.fadeStart=Date.now()+this.fadeDelay,this.fadingOut=!1}reset(){this.x=Math.random()*this.canvas.width,this.y=Math.random()*this.canvas.height,this.speed=Math.random()/5+.1,this.opacity=1,this.fadeDelay=Math.random()*600+100,this.fadeStart=Date.now()+this.fadeDelay,this.fadingOut=!1}update(){this.y-=this.speed,this.y<0&&this.reset(),!this.fadingOut&&Date.now()>this.fadeStart&&(this.fadingOut=!0),this.fadingOut&&(this.opacity-=.008,this.opacity<=0&&this.reset())}draw(){this.ctx.fillStyle=`rgba(${255-Math.random()*255/2}, 255, 255, ${this.opacity})`,this.ctx.fillRect(this.x,this.y,.4,Math.random()*2+1)}}customElements.define("particle-canvas",m);
