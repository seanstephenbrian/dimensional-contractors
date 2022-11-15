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

    function clearContent() {
        content.innerHTML = '';
    }

    function renderHome() {
        clearContent();

        content.innerHTML = 'worked';
    }

    function renderCommercial() {
        clearContent();
    
    }
    
    function renderResidential() {
        clearContent();
    
    }
    
    function renderPortfolio() {
        clearContent();
    
    }
    
    function renderStory() {
        clearContent();
    
    }
    
    function renderContact() {
        clearContent();
    
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