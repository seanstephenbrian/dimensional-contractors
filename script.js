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
        footer.textContent = `copyright © dimensional contractors ${year}`;
    })();

    (function addInitialListeners() {

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

    function addSliderListeners() {
        const back = document.querySelector('.back');
        back.addEventListener('click', () => {
            Photos.changePhoto('back');
        });
        const forward = document.querySelector('.forward');
        forward.addEventListener('click', () => {
            Photos.changePhoto('forward');
        });
    }

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
            // add click listener to 'contact us' inline link:
            const contactUs = document.querySelector('.inline-contact');
            contactUs.addEventListener('click', renderContact);
        }
    
    function loadFirstImage(category) {
        let selectedPhotos;
        if (category === 'commercial') {
            selectedPhotos = Photos.getCommercialPhotos();
        } else if (category === 'residential') {
            selectedPhotos = Photos.getResidentialPhotos();
        } else if (category === 'portfolio') {
            selectedPhotos = Photos.getPortfolioPhotos();
        }

        const caption = document.querySelector('.photo-caption');
        caption.textContent = selectedPhotos[0].caption;

        const photo = document.querySelector('.photo');
        photo.src = selectedPhotos[0].src;
        photo.dataset.id = 0;
        photo.dataset.category = category;
    }

    function selectNav(page) {
        const navButtons = document.querySelectorAll('.nav-button');
        navButtons.forEach(button => {
            if (button.classList.contains('selected')) {
                button.classList.remove('selected');
            } 
        });
        const selectedButton = document.querySelector(`.${page}`);
        selectedButton.classList.add('selected');
    }

    function renderCommercial() {
        clearContent();
        content.classList.add('commercial-content');
        fillContent('html/commercial.html')
            .then(() => {
                selectNav('commercial');
            })
            .then(() => {
                loadFirstImage('commercial');
            })
            .then(addSliderListeners);
    }

    function renderResidential() {
        clearContent();
        content.classList.add('residential-content');
        fillContent('html/residential.html')
            .then(() => {
                selectNav('residential');
            })
            .then(() => {
                loadFirstImage('residential');
            })
            .then(addSliderListeners);
    }
    
    function renderPortfolio() {
        clearContent();
        content.classList.add('portfolio-content');
        fillContent('html/portfolio.html')
            .then(() => {
                selectNav('portfolio');
            })
            .then(() => {
                loadFirstImage('portfolio');
            })
            .then(addSliderListeners);
    }
    
    function renderStory() {
        clearContent();
        content.classList.add('story-content');
        fillContent('html/story.html')
            .then(() => {
                selectNav('story');
            });
    }
    
    function renderContact() {
        clearContent();
        content.classList.add('contact-content');
        fillContent('html/contact.html')
            .then(() => {
                selectNav('contact');
            });
    }

    return { renderHome }
})();

const Photos = (function() {

    // create empty array for photo objects:
    let photos = [];

    // object constructor for new photos;
    function Photo(src, caption, category, portfolio) {
        this.src = src;
        this.caption = caption;
        this.category = category;
        this.portfolio = portfolio;
    }

    // method to create new photo and add it to 'photos' array:
    function addPhoto(src, caption, category, portfolio) {
        const newPhoto = new Photo(`img/photos/${src}`, caption, category, portfolio);
        photos.push(newPhoto);
    }

    function getAllPhotos() {
        return photos;
    }

    function getCommercialPhotos() {
        return photos.filter(photo => {
            return photo.category === 'commercial' ? true : false;
        });
    }

    function getResidentialPhotos() {
        return photos.filter(photo => {
            return photo.category === 'residential' ? true : false;
        })
    }

    function getPortfolioPhotos() {
        return photos.filter(photo => {
            return photo.portfolio === true ? true : false;
        })
    }

    function changePhoto(direction) {
        const currentPhoto = document.querySelector('.photo');
        const currentCategory = currentPhoto.dataset.category;

        let selectedPhotos;
        if (currentCategory === 'commercial') {
            selectedPhotos = getCommercialPhotos();
        } else if (currentCategory === 'residential') {
            selectedPhotos = getResidentialPhotos();
        } else if (currentCategory === 'portfolio') {
            selectedPhotos = getPortfolioPhotos();
        }

        const currentPhotoIndex = parseInt(currentPhoto.dataset.id);
        let nextPhotoIndex;

        if (direction === 'back') {
            if (currentPhotoIndex === 0) {
                nextPhotoIndex = selectedPhotos.length - 1;
            } else {
                nextPhotoIndex = currentPhotoIndex - 1;
            }
        } else if (direction === 'forward') {
            if (currentPhotoIndex === selectedPhotos.length - 1) {
                nextPhotoIndex = 0;
            } else {
                nextPhotoIndex = currentPhotoIndex + 1;
            }
        }
        
        const nextPhoto = selectedPhotos[nextPhotoIndex];
        currentPhoto.src = nextPhoto.src;
        currentPhoto.dataset.id = nextPhotoIndex;
        const caption = document.querySelector('.photo-caption');
        caption.textContent = nextPhoto.caption;
    }

    // all photos:
    addPhoto('pags-ext.jpg', `Pag's Wine Bar (Doylestown, PA)`, 'commercial', false);
    addPhoto('pags-int.jpg', `Pag's Pub (Doylestown, PA)`, 'commercial', true);
    addPhoto('pags-int-2.jpg', `Pag's Pub (Doylestown, PA)`, 'residential', true);
    addPhoto('santucci.jpg', `Santucci's Square Pizza (Warminster, PA)`, 'residential', false);
    addPhoto('serenity.jpg', `Serenity Day Spa (Doylestown, PA)`, 'commercial', true);

    return { 
        getAllPhotos,
        getCommercialPhotos,
        getResidentialPhotos,
        getPortfolioPhotos,
        changePhoto
    }

})();


Page.renderHome();