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
        back.addEventListener('click', Photos.goBack);
        const forward = document.querySelector('.forward');
        forward.addEventListener('click', Photos.goForward);
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

    function renderCommercial() {
        clearContent();
        content.classList.add('commercial-content');
        fillContent('html/commercial.html')
            .then(loadFirstCommercialImage)
            .then(addSliderListeners);
    }

        function loadFirstCommercialImage() {
            const photos = Photos.getPhotoList();
            const commercialPhotos = photos.filter(photo => {
                if (photo.category === 'commercial') {
                    return true;
                } 
                return false;
            });
            const caption = document.querySelector('.photo-caption');
            caption.textContent = commercialPhotos[0].caption;
            const photo = document.querySelector('.photo');
            photo.src = commercialPhotos[0].src;
            photo.dataset.id = 0;
            photo.dataset.category = 'commercial';
        }
    
    function renderResidential() {
        clearContent();
        content.classList.add('residential-content');
        fillContent('html/residential.html')
            .then(loadFirstResidentialImage)
            .then(addSliderListeners);
    }

        function loadFirstResidentialImage() {
            const photos = Photos.getPhotoList();
            const residentialPhotos = photos.filter(photo => {
                if (photo.category === 'residential') {
                    return true;
                } 
                return false;
            });
            const caption = document.querySelector('.photo-caption');
            caption.textContent = residentialPhotos[0].caption;
            const photo = document.querySelector('.photo');
            photo.src = residentialPhotos[0].src;
            photo.dataset.id = 0;
            photo.dataset.category = 'residential';
            photo.dataset.portfolio = residentialPhotos[0].portfolio;
        }
    
    function renderPortfolio() {
        clearContent();
        content.classList.add('portfolio-content');
        fillContent('html/portfolio.html')
            .then(loadFirstPortfolioImage)
            .then(addSliderListeners);
    }

        function loadFirstPortfolioImage() {
            const photos = Photos.getPhotoList();
            const portfolioPhotos = photos.filter(photo => {
                if (photo.portfolio === true) {
                    return true;
                } 
                return false;
            });
            const caption = document.querySelector('.photo-caption');
            caption.textContent = portfolioPhotos[0].caption;
            const photo = document.querySelector('.photo');
            photo.src = portfolioPhotos[0].src;
            photo.dataset.id = 0;
            photo.dataset.portfolio = 'true';
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

    function getPhotoList() {
        return photos;
    }


            // should write functions to get all photos, residential photos, commercial photos, portfolio photos


    // function changePhoto(direction) {
    //     const currentPhoto = document.querySelector('.photo');
    //     const currentCategory = currentPhoto.dataset.category;
    //     const portfolioStatus = currentPhoto.dataset.portfolio;
    //     const allCategoryPhotos = photos.filter(photo => {
    //         if (portfolioStatus === 'true') {
    //             return true;
    //         } else if ((!portfolioStatus || portfolioStatus === 'false') && photo.category === currentCategory) {
    //             return true;
    //         }
    //         return false;
    //     });
    //     const currentPhotoIndex = parseInt(currentPhoto.dataset.id);
    //     let nextPhotoIndex;
    //     if (direction === 'back') {
    //         if (currentPhotoIndex === 0) {
    //             nextPhotoIndex = allCategoryPhotos.length - 1;
    //         } else {
    //             nextPhotoIndex = currentPhotoIndex - 1;
    //         }
    //     } else if (direction === 'forward') {
    //         if (currentPhotoIndex + 1 === allCategoryPhotos.length) {
    //             nextPhotoIndex = 0;
    //         } else {
    //             nextPhotoIndex = currentPhotoIndex + 1;
    //         }
    //     }
    //     const nextPhoto = allCategoryPhotos[nextPhotoIndex];
    //     currentPhoto.src = nextPhoto.src;
    //     currentPhoto.dataset.id = nextPhotoIndex;
    //     const caption = document.querySelector('.photo-caption');
    //     caption.textContent = nextPhoto.caption;
    // }

    // function goBack() {
    //     changePhoto('back');
    //     // const currentPhoto = document.querySelector('.photo');
    //     // const currentCategory = currentPhoto.dataset.category;
    //     // const portfolioStatus = currentPhoto.dataset.portfolio;
    //     // const allCategoryPhotos = photos.filter(photo => {
    //     //     if (portfolioStatus) {
    //     //         return true;
    //     //     } else if (!portfolioStatus && photo.category === currentCategory) {
    //     //         return true;
    //     //     }
    //     //     return false;
    //     // });
    //     // const currentPhotoIndex = parseInt(currentPhoto.dataset.id);
    //     // let nextPhotoIndex;
    //     // if (currentPhotoIndex === 0) {
    //     //     nextPhotoIndex = allCategoryPhotos.length - 1;
    //     // } else {
    //     //     nextPhotoIndex = currentPhotoIndex - 1;
    //     // }
    //     // const nextPhoto = allCategoryPhotos[nextPhotoIndex];
    //     // currentPhoto.src = nextPhoto.src;
    //     // currentPhoto.dataset.id = nextPhotoIndex;
    //     // const caption = document.querySelector('.photo-caption');
    //     // caption.textContent = nextPhoto.caption;
    // }

    // function goForward() {
    //     changePhoto('forward');
    //     // const currentPhoto = document.querySelector('.photo');
    //     // const currentCategory = currentPhoto.dataset.category;
    //     // const portfolioStatus = currentPhoto.dataset.portfolio;
    //     // const allCategoryPhotos = photos.filter(photo => {
    //     //     if (portfolioStatus === 'true') {
    //     //         return true;
    //     //     } else if (portfolioStatus === 'false' && photo.category === currentCategory) {
    //     //         return true;
    //     //     }
    //     //     return false;
    //     // });
    //     // const currentPhotoIndex = parseInt(currentPhoto.dataset.id);
    //     // let nextPhotoIndex;
    //     // if (currentPhotoIndex + 1 === allCategoryPhotos.length) {
    //     //     nextPhotoIndex = 0;
    //     // } else {
    //     //     nextPhotoIndex = currentPhotoIndex + 1;
    //     // }
    //     // const nextPhoto = allCategoryPhotos[nextPhotoIndex];
    //     // currentPhoto.src = nextPhoto.src;
    //     // currentPhoto.dataset.id = nextPhotoIndex;
    //     // const caption = document.querySelector('.photo-caption');
    //     // caption.textContent = nextPhoto.caption;
    // }

    // all photos:
    addPhoto('pags-ext.jpg', `Pag's Wine Bar (Doylestown, PA)`, 'commercial', false);
    addPhoto('pags-int.jpg', `Pag's Pub (Doylestown, PA)`, 'commercial', true);
    addPhoto('pags-int-2.jpg', `Pag's Pub (Doylestown, PA)`, 'residential', true);
    addPhoto('santucci.jpg', `Santucci's Square Pizza (Warminster, PA)`, 'commercial', false);
    addPhoto('serenity.jpg', `Serenity Day Spa (Doylestown, PA)`, 'commercial', true);

    return { 
        getPhotoList,
        goBack,
        goForward
    }

})();


Page.renderHome();