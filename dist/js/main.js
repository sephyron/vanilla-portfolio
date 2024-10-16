(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function i(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=i(e);fetch(e.href,o)}})();document.querySelector("page-transition");const r=document.querySelectorAll("nav a"),d=document.querySelectorAll(".page");document.querySelector(".page.active");document.querySelector("nav a.active");r.forEach(n=>{n.addEventListener("click",t=>{t.preventDefault();const i=n.getAttribute("href"),s=document.querySelector(i);d.forEach(e=>e.classList.remove("active")),r.forEach(e=>e.classList.remove("active")),setTimeout(()=>{s.classList.add("active"),n.classList.add("active")},200)})});document.addEventListener("DOMContentLoaded",()=>{[document.getElementById("cards1"),document.getElementById("cards")].forEach(t=>{t.onmousemove=i=>{for(const s of t.querySelectorAll(".card")){const e=s.getBoundingClientRect(),o=i.clientX-e.left,a=i.clientY-e.top;s.style.setProperty("--mouse-x",`${o}px`),s.style.setProperty("--mouse-y",`${a}px`)}}})});const l=document.querySelectorAll(".card"),h=[{title:"Card 1 Title",content:"This is the content for card 1."},{title:"Card 2 Title",content:"This is the content for card 2."},{title:"Card 3 Title",content:"This is the content for card 2."},{title:"Card 4 Title",content:"This is the content for card 2."},{title:"Card 5 Title",content:"This is the content for card 2."},{title:"Card 6 Title",content:"This is the content for card 2."},{title:"Card 7 Title",content:"This is the content for card 2."},{title:"Card 8 Title",content:"This is the content for card 2."},{title:"Card 9 Title",content:"This is the content for card 2."}];l.forEach(n=>{n.addEventListener("click",t=>{t.stopPropagation();const i=n.dataset.cardIndex,s=h[i],e=document.createElement("my-modal");e.innerHTML=`
      <span slot="content">
        <h2>${s.title}</h2>
        <p>${s.content}</p>
      </span>
    `,document.body.appendChild(e),e.open()})});class p extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=`
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
`).map(t=>t.trim()),this.textContent="",this.iArrLength=this.aText[0].length,this.typewriter()}typewriter(){this.sContents=" ",this.iRow=Math.max(0,this.iIndex-this.iScrollAt);const t=this.shadowRoot.getElementById("typedtext");for(;this.iRow<this.iIndex;)this.sContents+=this.aText[this.iRow++]+"<br />";t.innerHTML=this.sContents+this.aText[this.iIndex].substring(0,this.iTextPos)+"<span class='cursor'>_</span>",this.iTextPos++==this.iArrLength?(this.iTextPos=0,this.iIndex++,this.iIndex!=this.aText.length&&(this.iArrLength=this.aText[this.iIndex].length,setTimeout(()=>this.typewriter(),500))):setTimeout(()=>this.typewriter(),this.iSpeed)}}customElements.define("typewriter-component",p);class m extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.posts=[]}connectedCallback(){this.render(),window.addEventListener("popstate",()=>this.handleRouting())}render(){this.shadowRoot.innerHTML=`
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
        `,this.fetchPosts()}async fetchPosts(){try{const t=await fetch("posts.json");this.posts=await t.json(),this.handleRouting()}catch(t){console.error("Error fetching posts:",t)}}handleRouting(){const t=window.location.pathname,i=this.shadowRoot.getElementById("content");if(t==="/"||t==="/index.html")this.displayPostList(i);else{const s=t.slice(1),e=this.posts.find(o=>o.slug===s);e?this.displaySinglePost(i,e):i.innerHTML="<h1>404 - Post not found</h1>"}}displayPostList(t){t.innerHTML="",this.posts.forEach(i=>{const s=document.createElement("div");s.classList.add("post"),s.innerHTML=`
                <h2><a href="/${i.slug}" data-navigo>${i.title}</a></h2>
                <div class="post-meta">Published on ${i.date}</div>
                <p>${i.excerpt}</p>
            `,t.appendChild(s)}),this.addNavigationListeners(t)}async displaySinglePost(t,i){try{const e=await(await fetch(`public/posts/${i.slug}.md`)).text(),o=marked.parse(e,{renderer:new marked.Renderer});t.innerHTML=`
                <p><a href="/" data-navigo>Back to all posts</a></p>    
                <h1>${i.title}</h1>
                <div class="post-meta">Published on ${i.date}</div>
                <div class="post-content">${o}</div>
                <p><a href="/" data-navigo>Back to all posts</a></p>
            `,this.addNavigationListeners(t)}catch(s){console.error("Error fetching post content:",s),t.innerHTML="<h2>Error loading post</h2>"}}addNavigationListeners(t){t.querySelectorAll("a[data-navigo]").forEach(s=>{s.addEventListener("click",e=>{e.preventDefault();const o=s.getAttribute("href");history.pushState(null,"",o),this.handleRouting()})})}}customElements.define("custom-blog",m);const c=document.createElement("template");c.innerHTML=`
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
`;class u extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(c.content.cloneNode(!0)),this.modal=this.shadowRoot.querySelector(".modal"),this.closeBtn=this.shadowRoot.querySelector(".close")}connectedCallback(){this.closeBtn.addEventListener("click",this.close.bind(this))}async open(t){try{const s=await(await fetch(t)).text(),e=document.createElement("div");e.innerHTML=s;const o=this.shadowRoot.querySelector('slot[name="content"]');o.innerHTML="",o.appendChild(e),this.modal.classList.add("fade-in"),this.modal.classList.remove("end")}catch(i){console.error("Error loading modal content:",i)}}close(){this.modal.classList.add("fade-out"),this.modal.classList.add("end")}}customElements.define("my-modal",u);class f extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"});const t=document.createElement("canvas");t.id="particleCanvas",this.shadowRoot.appendChild(t),this.ctx=t.getContext("2d"),this.particles=[],this.particleCount=0,this.resizeHandler=this.onResize.bind(this),this.initParticles=this.initParticles.bind(this),this.animate=this.animate.bind(this)}connectedCallback(){this.onResize(),window.addEventListener("resize",this.resizeHandler),this.initParticles(),this.animate()}disconnectedCallback(){window.removeEventListener("resize",this.resizeHandler)}onResize(){const t=this.shadowRoot.getElementById("particleCanvas");t.width=window.innerWidth,t.height=window.innerHeight,this.particleCount=this.calculateParticleCount(),this.initParticles()}calculateParticleCount(){const t=this.shadowRoot.getElementById("particleCanvas");return Math.floor(t.width*t.height/6e3)}initParticles(){this.particles=[];for(let t=0;t<this.particleCount;t++)this.particles.push(new y(this.ctx,this.shadowRoot.getElementById("particleCanvas")))}animate(){this.ctx.clearRect(0,0,this.shadowRoot.getElementById("particleCanvas").width,this.shadowRoot.getElementById("particleCanvas").height),this.particles.forEach(t=>{t.update(),t.draw()}),requestAnimationFrame(this.animate)}}class y{constructor(t,i){this.ctx=t,this.canvas=i,this.reset(),this.y=Math.random()*this.canvas.height,this.fadeDelay=Math.random()*600+100,this.fadeStart=Date.now()+this.fadeDelay,this.fadingOut=!1}reset(){this.x=Math.random()*this.canvas.width,this.y=Math.random()*this.canvas.height,this.speed=Math.random()/5+.1,this.opacity=1,this.fadeDelay=Math.random()*600+100,this.fadeStart=Date.now()+this.fadeDelay,this.fadingOut=!1}update(){this.y-=this.speed,this.y<0&&this.reset(),!this.fadingOut&&Date.now()>this.fadeStart&&(this.fadingOut=!0),this.fadingOut&&(this.opacity-=.008,this.opacity<=0&&this.reset())}draw(){this.ctx.fillStyle=`rgba(${255-Math.random()*255/2}, 255, 255, ${this.opacity})`,this.ctx.fillRect(this.x,this.y,.4,Math.random()*2+1)}}customElements.define("particle-canvas",f);
