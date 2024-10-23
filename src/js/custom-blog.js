
class CustomBlog extends HTMLElement {
    
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.posts = [];
    }

    connectedCallback() {
        this.render();
        window.addEventListener('popstate', () => this.handleRouting());
    }

    render() {
        this.shadowRoot.innerHTML = `
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
        `;

        this.fetchPosts();
    }

    async fetchPosts() {
        try {
            const response = await fetch('posts.json');
            this.posts = await response.json();
            this.handleRouting();
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    }

    handleRouting() {
        const path = window.location.pathname;
        const contentContainer = this.shadowRoot.getElementById('content');

        if (path === '/' || path === '/index.html') {
            this.displayPostList(contentContainer);
        } else {
            const postSlug = path.slice(1); // Remove leading slash
            const post = this.posts.find(p => p.slug === postSlug);
            if (post) {
                this.displaySinglePost(contentContainer, post);
            } else {
                contentContainer.innerHTML = '<h1>404 - Post not found</h1>';
            }
        }
    }

    displayPostList(container) {
        container.innerHTML = '';
        this.posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = `
                <h2><a href="/${post.slug}" data-navigo>${post.title}</a></h2>
                <div class="post-meta">Published on ${post.date}</div>
                <p>${post.excerpt}</p>
            `;
            container.appendChild(postElement);
        });

        this.addNavigationListeners(container);
    }
    async displaySinglePost(container, post) {
        try {
            const response = await fetch(`public/posts/${post.slug}.md`);
            const markdown = await response.text();
            const content = marked.parse(markdown, { renderer: new marked.Renderer() });




            container.innerHTML = `
                <p><a href="/" data-navigo>Back to all posts</a></p>    
                <h1>${post.title}</h1>
                <div class="post-meta">Published on ${post.date}</div>
                <div class="post-content">${content}</div>
                <p><a href="/" data-navigo>Back to all posts</a></p>
            `;

            this.addNavigationListeners(container);
        } catch (error) {
            console.error('Error fetching post content:', error);
            container.innerHTML = '<h2>Error loading post</h2>';
        }
    }

    addNavigationListeners(container) {
        const links = container.querySelectorAll('a[data-navigo]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                history.pushState(null, '', href);
                this.handleRouting();
            });
        });
    }
}

customElements.define('custom-blog', CustomBlog);