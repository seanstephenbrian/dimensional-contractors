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
        footer.textContent = `Copyright © Dimensional Contractors Inc. ${year}`;
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
    }

    function renderHome() {
        clearContent();

        content.innerHTML = 'home';
    }

    function renderCommercial() {
        clearContent();

        content.innerHTML = 'commercial';
    }
    
    function renderResidential() {
        clearContent();

        content.innerHTML = 'residential';
    }
    
    function renderPortfolio() {
        clearContent();

        content.innerHTML = 'portfolio';
    }
    
    function renderStory() {
        clearContent();

        content.innerHTML = 'story';
    }
    
    function renderContact() {
        clearContent();

        content.innerHTML = 'contact';
    
    }

    return {
        renderHome,
        renderCommercial,
        renderResidential,
        renderPortfolio,
        renderStory,
        renderContact
    }

})();

Page.renderHome();