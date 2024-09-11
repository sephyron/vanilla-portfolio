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
                contentContainer.innerHTML = '<h2>404 - Post not found</h2>';
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
            const content = marked.parse(markdown);

            container.innerHTML = `
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