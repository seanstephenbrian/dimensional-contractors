const Page = (function() {

    const squareX = document.querySelector('.square-x');
    const squareY = document.querySelector('.square-y');
    const content = document.querySelector('.content');

    (function createXLines() {
        for (let i=0; i<80; i++) {
            const newDiv = document.createElement('div');
            if (i % 2) {
                newDiv.classList.add('square-x-odd');
            } else {
                newDiv.classList.add('square-x-even');
            }
            squareX.appendChild(newDiv);
        }
    })();
    
    (function createYLines() {
        for (let i=0; i<30; i++) {
            const newDiv = document.createElement('div');
            if (i % 2) {
                newDiv.classList.add('square-y-odd');
            } else {
                newDiv.classList.add('square-y-even');
            }
            squareY.appendChild(newDiv);
        }
    })();
    
    (function fillFooterText() {
        const year = new Date().getFullYear();
        const footer = document.querySelector('footer');
        footer.textContent = `Copyright © Dimensional Contractors ${year}`;
    })();

    (function addPageListeners() {

        // return home if visitor clicks on logo:
        const h1 = document.querySelector('h1');
        h1.addEventListener('click', renderHome);
        const h2 = document.querySelector('h2');
        h2.addEventListener('click', renderHome);

        // click listeners for nav buttons:
        const commercial = document.querySelector('.commercial');
        commercial.addEventListener('click', renderCommercial);

        const residential = document.querySelector('.residential');
        residential.addEventListener('click', renderResidential);

        const portfolio = document.querySelector('.portfolio');
        portfolio.addEventListener('click', renderPortfolio);

        const story = document.querySelector('.story');
        story.addEventListener('click', renderStory);

        const contact = document.querySelector('.contact');
        contact.addEventListener('click', renderContact);
        
    })();

    function clearContent() {
        content.innerHTML = '';
        content.className = '';
        content.classList.add('content');
    }

    async function fillContent(src) {
        await fetch(src)
            .then((response) => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error('Could not retrieve page content.')
                }})
            .then(pageContent => content.innerHTML = pageContent)
            .catch((err) => {
                content.innerHTML = err;
            });
    }

    function renderHome() {
        clearContent();
        content.classList.add('home-content');
        fillContent('html/home.html')
            .then(addHomeListeners);
    }

    function addHomeListeners() {
        // add click listener to 'contact us today' button:
        const contactUs = document.querySelector('.contact-button');
        contactUs.addEventListener('click', renderContact);
    }

    function renderCommercial() {
        clearContent();
        content.classList.add('commercial-content');
        fillContent('html/commercial.html');
    }
    
    function renderResidential() {
        clearContent();
        content.classList.add('residential-content');
        fillContent('html/residential.html');
    }
    
    function renderPortfolio() {
        clearContent();
        content.classList.add('portfolio-content');
        fillContent('html/portfolio.html');
    }
    
    function renderStory() {
        clearContent();
        content.classList.add('story-content');
        fillContent('html/story.html');
    }
    
    function renderContact() {
        clearContent();
        content.classList.add('contact-content');
        fillContent('html/contact.html');
    }

    return { renderHome }
})();

Page.renderHome();