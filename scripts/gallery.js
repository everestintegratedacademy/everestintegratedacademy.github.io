document.addEventListener('DOMContentLoaded', function () {
    const galleryGrid = document.getElementById('gallery-grid');
    const modal = document.getElementById('media-modal');
    const modalContent = document.querySelector('.modal-content');
    const modalMediaContainer = document.getElementById('modal-media-container');
    const mediaTitle = document.getElementById('media-title');
    const mediaDescription = document.getElementById('media-description');
    const mediaCategory = document.getElementById('media-category');
    const closeButton = document.getElementById('close-modal');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const fullscreenButton = document.getElementById('fullscreen-button');
    const downloadButton = document.getElementById('download-button');
    const likeButton = document.getElementById('like-button');
    const likeCount = document.getElementById('like-count');
    const shareButton = document.getElementById('share-button');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const categoryFilter = document.getElementById('category-filter');
    const relatedMediaContainer = document.getElementById('related-media-container');
    const filterSection = document.querySelector('.filter-section');

    let mediaItems = [];
    let selectedItem = null;
    let filteredItems = [];
    const pexelsApiKey = 'D0Rcx9dTpeUOPSIL0tooTfRCO4GPQA6BzQUpsloOA8adCYVFmb190yXv';
    let activeFilters = {
        tags: [],
        year: null,
        search: ''
    };

    // Fetch media items from APIs
    async function fetchMediaItems() {
        const selectedCategory = categoryFilter.value === 'All' ? 'nature' : categoryFilter.value.toLowerCase();

        // Fetch images from Picsum
        const imageCount = 6; // Number of images to fetch
        const imagePromises = Array.from({ length: imageCount }, async (_, i) => {
            try {
                const response = await fetch(`https://picsum.photos/600/400?random=${i + 1}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch image ${i + 1}`);
                }
                return response.url; // Use the image URL if fetch is successful
            } catch (error) {
                console.error(error); // Log the error for debugging
                return './placeholder.svg'; // Fallback to placeholder image if fetch fails
            }
        });

        const images = await Promise.all(imagePromises);

        // Fetch videos from Pexels based on the selected category
        let videos = [];
        try {
            const videoResponse = await fetch(`https://api.pexels.com/videos/search?query=${selectedCategory}`, {
                headers: {
                    Authorization: pexelsApiKey
                }
            });

            if (!videoResponse.ok) {
                throw new Error('Failed to fetch videos');
            }

            const videoData = await videoResponse.json();
            videos = videoData.videos.slice(0, 3).map(video => ({
                id: video.id.toString(),
                type: 'video',
                url: video.video_files[0].link,
                title: generateRandomTitle('video', selectedCategory),
                description: video.description || generateRandomDescription(selectedCategory),
                category: selectedCategory,
                tags: generateTagsForMedia('video', selectedCategory),
                likes: Math.floor(Math.random() * 100),
                subtitles: video.subtitles_url || null,
                date: generateRandomDate() // Add date property for videos
            }));
        } catch (error) {
            console.error(error); // Log the error for debugging
            // If video fetch fails or no connection, fall back to a placeholder video or leave empty
            videos = [{
                id: 'placeholder-video',
                type: 'video',
                url: './Home - Video Placeholders_2.mp4', // Provide a valid placeholder video URL
                title: 'No Video Available',
                description: 'Sorry, we could not fetch videos at the moment.',
                category: selectedCategory,
                tags: ['placeholder'],
                likes: 0,
                subtitles: null,
                date: generateRandomDate()
            }];
        }

        // Combine images and videos into mediaItems
        mediaItems = images.map((url, index) => ({
            id: (index + 1).toString(),
            type: 'image',
            url: url,
            title: generateRandomTitle('image', selectedCategory),
            description: generateRandomDescription(selectedCategory),
            category: selectedCategory,
            tags: generateTagsForMedia('image', selectedCategory),
            likes: Math.floor(Math.random() * 100),
            date: generateRandomDate() // Add date property for images
        })).concat(videos);

        filteredItems = mediaItems;
        renderGalleryItems();
        renderTagFilters(); // Render tag filters after fetching items
        renderYearFilters(); // Render year filters after fetching items
    }

    // Function to generate a random date
    function generateRandomDate() {
        const start = new Date(2020, 0, 1); // Starting from January 1, 2020
        const end = new Date(); // Current date
        const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        return date.toISOString().split('T')[0]; // Return date in YYYY-MM-DD format
    }

    function generateTagsForMedia(type, category) {
        const baseTags = {
            nature: ['outdoors', 'wildlife', 'scenery', 'green'],
            urban: ['city', 'buildings', 'streets', 'modern'],
            animation: ['art', 'story', 'characters', 'fantasy']
        };

        return baseTags[category] || ['general']; // Return appropriate tags based on category
    }

    function generateRandomTitle(type, category) {
        const adjectives = ['Beautiful', 'Stunning', 'Majestic', 'Serene', 'Vibrant', 'Enchanting'];
        const nouns = {
            nature: ['Landscape', 'Sunset', 'Mountain', 'Forest', 'River', 'Waterfall'],
            urban: ['Cityscape', 'Skyline', 'Street', 'Architecture', 'Building', 'Bridge'],
            animation: ['Character', 'Scene', 'Adventure', 'Fantasy', 'World', 'Story']
        };

        const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        const noun = nouns[category][Math.floor(Math.random() * nouns[category].length)];

        return `${adjective} ${category.charAt(0).toUpperCase() + category.slice(1)} ${noun}`;
    }

    function generateRandomDescription(category) {
        const descriptions = {
            nature: [
                'A breathtaking view of untouched wilderness.',
                'Nature\'s beauty captured in a single frame.',
                'Explore the wonders of the natural world.',
                'A peaceful moment in the great outdoors.'
            ],
            urban: [
                'The hustle and bustle of city life in one shot.',
                'Modern architecture meets urban charm.',
                'Discover the hidden gems of the concrete jungle.',
                'A glimpse into the heart of the metropolis.'
            ],
            animation: [
                'Bringing imagination to life through animation.',
                'A whimsical journey into an animated world.',
                'Storytelling through the art of animation.',
                'Colorful characters and fantastic adventures await.'
            ]
        };

        return descriptions[category][Math.floor(Math.random() * descriptions[category].length)];
    }

    function renderGalleryItems() {
        galleryGrid.innerHTML = '';
        filteredItems.forEach(item => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.style.aspectRatio = Math.random() > 0.5 ? '1 / 1' : '16 / 9';
            galleryItem.innerHTML = `
                    <img src="${item.url}" alt="${item.title}">
                `;
            galleryItem.addEventListener('click', () => openModal(item));
            galleryGrid.appendChild(galleryItem);
        });
        // Initialize Masonry after all items are added to the grid
        initializeMasonry();
    }

    // Function to initialize Masonry after the gallery items are rendered
    function initializeMasonry() {
        const galleryGrid = document.querySelector('.gallery-grid');
        const mediaElements = galleryGrid.querySelectorAll('img, video'); // Select both images and videos
        let mediaLoadedCount = 0;

        // Function to check if all media elements (images and videos) are loaded
        function checkAllMediaLoaded() {
            mediaLoadedCount++;
            if (mediaLoadedCount === mediaElements.length) {
                // Once all media (images and videos) are loaded, initialize Masonry
                msnry = new Masonry(galleryGrid, {
                    itemSelector: '.gallery-item',     // Selector for the grid items
                    columnWidth: '.gallery-item',      // Use each gallery item as the column width
                    percentPosition: true,             // Ensure items are positioned using percentage values
                    gutter: 20,                        // Adds 2rem gap (20px, equivalent to 2rem)
                    fitWidth: true,                    // Ensures the grid layout fits the container width
                    horizontalOrder: true,             // Ensures items are placed in the correct order horizontally
                    stagger: 30,                       // Stagger animations when items are loaded
                    resize: true                       // Recalculate layout on window resize
                });

                msnry.layout();  // Recalculate the layout
            }
        }

        // Attach load events to images and loadeddata events to videos
        mediaElements.forEach(media => {
            if (media.tagName.toLowerCase() === 'img') {
                // For images
                if (media.complete) {
                    // If the image is already loaded (cached images)
                    checkAllMediaLoaded();
                } else {
                    // Wait for the image to load
                    media.addEventListener('load', checkAllMediaLoaded);
                    media.addEventListener('error', checkAllMediaLoaded); // Handle broken images
                }
            } else if (media.tagName.toLowerCase() === 'video') {
                // For videos
                if (media.readyState >= 2) { // If video metadata is already loaded
                    checkAllMediaLoaded();
                } else {
                    // Wait for the video's metadata to load
                    media.addEventListener('loadeddata', checkAllMediaLoaded);
                    media.addEventListener('error', checkAllMediaLoaded); // Handle broken videos
                }
            }
        });

        // If there are no media elements, initialize Masonry immediately
        if (mediaElements.length === 0) {
            msnry = new Masonry(galleryGrid, {
                itemSelector: '.gallery-item',
                columnWidth: '.gallery-item',
                percentPosition: true,
                gutter: 20, // 2rem gap
                fitWidth: true, // Ensures the grid layout fits the container width
                horizontalOrder: true,
                stagger: 30,
                resize: true
            });
            msnry.layout(); // Recalculate the layout
        }
    }

    function openModal(item) {
        selectedItem = item;
        if (item.type === 'image') {
            modalMediaContainer.innerHTML = `<img src="${item.url}" alt="${item.title}">`;
        } else if (item.type === 'video') {
            modalMediaContainer.innerHTML = `
                    <div class="custom-video-player">
                        <video src="${item.url}"></video>
                        <div class="video-controls">
                            <button class="play-pause" aria-label="Play"><i class="fas fa-play"></i></button>
                            <div class="progress-bar">
                                <div class="progress"></div>
                            </div>
                            <button class="mute" aria-label="Mute"><i class="fas fa-volume-high"></i></button>
                            <input type="range" class="volume-slider" min="0" max="100" value="100">
                            <button class="speed">1x</button>
                            <button class="subtitles" aria-label="Subtitles"><i class="far fa-closed-captioning"></i></button>
                            <button class="fullscreen" aria-label="Fullscreen"><i class="fas fa-expand"></i></button>
                        </div>
                    </div>
                `;
            setupVideoPlayer();
        }
        mediaTitle.textContent = item.title;
        mediaDescription.textContent = item.description;
        mediaCategory.textContent = `Category: ${item.category}`;
        modal.style.display = 'block';
        updateLikeButton();
        renderRelatedMedia();
    }

    function setupVideoPlayer() {
        const videoContainer = modalMediaContainer.querySelector('.custom-video-player');
        const video = videoContainer.querySelector('video');
        const playPauseBtn = videoContainer.querySelector('.play-pause');
        const muteBtn = videoContainer.querySelector('.mute');
        const fullscreenBtn = videoContainer.querySelector('.fullscreen');
        const progressBar = videoContainer.querySelector('.progress-bar');
        const progress = videoContainer.querySelector('.progress');
        const speedBtn = videoContainer.querySelector('.speed');
        const subtitlesBtn = videoContainer.querySelector('.subtitles');
        const volumeSlider = videoContainer.querySelector('.volume-slider');

        playPauseBtn.addEventListener('click', togglePlay);
        muteBtn.addEventListener('click', toggleMute);
        fullscreenBtn.addEventListener('click', toggleFullscreen);
        video.addEventListener('timeupdate', updateProgress);
        progressBar.addEventListener('click', seek);
        speedBtn.addEventListener('click', changePlaybackSpeed);
        subtitlesBtn.addEventListener('click', toggleSubtitles);
        volumeSlider.addEventListener('input', changeVolume);

        function togglePlay() {
            if (video.paused) {
                video.play();
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                video.pause();
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        }

        function toggleMute() {
            video.muted = !video.muted;
            muteBtn.innerHTML = video.muted ? '<i class="fas fa-volume-xmark"></i>' : '<i class="fas fa-volume-high"></i>';
            volumeSlider.value = video.muted ? 0 : video.volume * 100;
        }

        function toggleFullscreen() {
            if (!document.fullscreenElement) {
                videoContainer.requestFullscreen();
                fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i></i>';
            } else {
                document.exitFullscreen();
                fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
            }
        }

        function updateProgress() {
            const percent = (video.currentTime / video.duration) * 100;
            progress.style.width = `${percent}%`;
        }

        function seek(e) {
            const percent = e.offsetX / progressBar.offsetWidth;
            video.currentTime = percent * video.duration;
        }

        function changePlaybackSpeed() {
            const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
            let currentSpeedIndex = speeds.indexOf(video.playbackRate);
            currentSpeedIndex = (currentSpeedIndex + 1) % speeds.length;
            video.playbackRate = speeds[currentSpeedIndex];
            speedBtn.textContent = `${speeds[currentSpeedIndex]}x`;
        }

        function toggleSubtitles() {
            const tracks = video.textTracks;
            if (tracks.length > 0) {
                if (tracks[0].mode === 'showing') {
                    tracks[0].mode = 'hidden';
                    subtitlesBtn.classList.remove('active');
                    subtitlesBtn.innerHTML = '<i class="fas fa-closed-captioning"></i></i>';
                } else {
                    tracks[0].mode = 'showing';
                    subtitlesBtn.classList.add('active');
                    subtitlesBtn.innerHTML = '<i class="far fa-closed-captioning"></i></i>';
                }
            }
        }

        function changeVolume() {
            video.volume = volumeSlider.value / 100;
            video.muted = video.volume === 0;

            // Change the mute button icon based on the mute state
            if (video.muted) {
                muteBtn.innerHTML = '<i class="fas fa-volume-xmark"></i>';
            } else if (video.volume <= 0.25) {
                muteBtn.innerHTML = '<i class="fas fa-volume-off"></i>'; // Icon for volume off (0% to 25%)
            } else if (video.volume <= 0.50) {
                muteBtn.innerHTML = '<i class="fas fa-volume-low"></i>'; // Icon for low volume (25% to 50%)
            } else {
                muteBtn.innerHTML = '<i class="fas fa-volume-high"></i>'; // Icon for volume above 50%
            }
        }

        // Load subtitles if available
        if (selectedItem.subtitles) {
            const track = document.createElement('track');
            track.kind = 'captions';
            track.label = 'English';
            track.srclang = 'en';
            track.src = selectedItem.subtitles;
            video.appendChild(track);
        }

        // Enable play button when video is ready to play
        video.addEventListener('canplay', function () {
            playPauseBtn.disabled = false;
        });
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            modalContent.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }

    function downloadMedia() {
        if (selectedItem) {
            fetch(selectedItem.url)
                .then(response => response.blob())
                .then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = url;
                    a.download = `${selectedItem.title}.${selectedItem.type === 'image' ? 'jpg' : 'mp4'}`;
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(a);
                })
                .catch(error => console.error('Error downloading file:', error));
        }
    }

    function updateLikeButton() {
        const isLiked = localStorage.getItem(`liked_${selectedItem.id}`) === 'true';
        likeButton.classList.toggle('liked', isLiked);
        likeButton.innerHTML = isLiked ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>';
        likeCount.textContent = selectedItem.likes + (isLiked ? 1 : 0);
    }

    function toggleLike() {
        const isLiked = localStorage.getItem(`liked_${selectedItem.id}`) === 'true';
        localStorage.setItem(`liked_${selectedItem.id}`, !isLiked);
        selectedItem.likes += isLiked ? -1 : 1;
        updateLikeButton();
    }

    function renderRelatedMedia() {
        const relatedItems = mediaItems.filter(item =>
            item.id !== selectedItem.id && item.category === selectedItem.category
        ).slice(0, 5);

        relatedMediaContainer.innerHTML = '';
        relatedItems.forEach(item => {
            const relatedItem = document.createElement('div');
            relatedItem.className = 'related-media-item';
            relatedItem.innerHTML = `
                    <img src="${item.url}" alt="${item.title}">
                    <div class="related-media-title">${item.title}</div>
                `;
            relatedItem.addEventListener('click', () => openModal(item));
            relatedMediaContainer.appendChild(relatedItem);
        });
    }

    function shareMedia() {
        const shareText = `Check out this ${selectedItem.type}: ${selectedItem.title}\n\n${selectedItem.description}\n\nShared from the Gallery`;
        const shareUrl = encodeURIComponent(window.location.href);

        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.left = '0';
        modal.style.top = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.zIndex =

            '2000';

        const modalContent = document.createElement('div');
        modalContent.style.backgroundColor = '#fff';
        modalContent.style.padding = '20px';
        modalContent.style.borderRadius = '5px';
        modalContent.style.maxWidth = '400px';
        modalContent.style.width = '100%';

        const shareTitle = document.createElement('h3');
        shareTitle.textContent = 'Share Media';
        shareTitle.style.marginTop = '0';
        shareTitle.style.marginBottom = '20px';
        shareTitle.style.textAlign = 'center';

        const shareOptions = document.createElement('div');
        shareOptions.style.display = 'flex';
        shareOptions.style.justifyContent = 'center';
        shareOptions.style.gap = '15px';
        shareOptions.style.marginBottom = '20px';

        const createShareButton = (platform, icon, url, color) => {
            const button = document.createElement('button');
            button.innerHTML = `<i class="${platform === 'Email' ? 'fas' : 'fab'} fa-${icon}"></i>`;
            button.style.padding = '10px';
            button.style.border = 'none';
            button.style.borderRadius = '50%';
            button.style.cursor = 'pointer';
            button.style.backgroundColor = color;
            button.style.color = '#fff';
            button.style.fontSize = '18px';
            button.style.width = '40px';
            button.style.height = '40px';
            button.style.display = 'flex';
            button.style.alignItems = 'center';
            button.style.justifyContent = 'center';
            button.style.transition = 'background-color 0.3s, transform 0.1s';

            button.addEventListener('mouseover', () => {
                button.style.backgroundColor = adjustColor(color, -20);
                button.style.transform = 'scale(1.1)';
            });

            button.addEventListener('mouseout', () => {
                button.style.backgroundColor = color;
                button.style.transform = 'scale(1)';
            });

            button.onclick = () => window.open(url, '_blank');
            return button;
        };

        const facebookBtn = createShareButton('Facebook', 'facebook-f', `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, '#3b5998');
        const twitterBtn = createShareButton('Twitter', 'twitter', `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${shareUrl}`, '#1da1f2');
        const linkedinBtn = createShareButton('LinkedIn', 'linkedin-in', `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${encodeURIComponent(selectedItem.title)}&summary=${encodeURIComponent(shareText)}`, '#0077b5');
        const whatsappBtn = createShareButton('WhatsApp', 'whatsapp', `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}%20${shareUrl}`, '#25d366');
        const emailBtn = createShareButton('Email', 'envelope', `mailto:?subject=${encodeURIComponent(selectedItem.title)}&body=${encodeURIComponent(shareText)}%20${shareUrl}`, '#c71610');

        shareOptions.appendChild(facebookBtn);
        shareOptions.appendChild(twitterBtn);
        shareOptions.appendChild(linkedinBtn);
        shareOptions.appendChild(whatsappBtn);
        shareOptions.appendChild(emailBtn);

        const closeButton = document.createElement('button');
        closeButton.textContent = 'Close';
        closeButton.style.padding = '5px 10px';
        closeButton.style.border = 'none';
        closeButton.style.borderRadius = '4px';
        closeButton.style.cursor = 'pointer';
        closeButton.style.backgroundColor = '#e74c3c';
        closeButton.style.color = '#fff';
        closeButton.style.fontSize = '14px';
        closeButton.style.fontFamily = 'Arial, sans-serif';
        closeButton.style.transition = 'background-color 0.3s';

        closeButton.addEventListener('mouseover', () => {
            closeButton.style.backgroundColor = '#c0392b';
        });

        closeButton.addEventListener('mouseout', () => {
            closeButton.style.backgroundColor = '#e74c3c';
        });

        closeButton.onclick = () => document.body.removeChild(modal);

        modalContent.appendChild(shareTitle);
        modalContent.appendChild(shareOptions);
        modalContent.appendChild(closeButton);
        modal.appendChild(modalContent);

        document.body.appendChild(modal);
    }

    function adjustColor(color, amount) {
        return '#' + color.replace(/^#/, '').replace(/../g, color => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
    }

    function searchMedia() {
        const searchTerm = searchInput.value.toLowerCase();
        const category = categoryFilter.value;

        filteredItems = mediaItems.filter(item =>
            (item.title.toLowerCase().includes(searchTerm) ||
                item.description.toLowerCase().includes(searchTerm)) &&
            (category === 'All' || item.category === category)
        );

        renderGalleryItems();
    }

    function closeModal() {
        modal.style.display = 'none';
        const video = document.getElementById('modal-video');
        if (video) {
            video.pause();
        }
    }

    function navigateModal(direction) {
        const currentIndex = filteredItems.findIndex(item => item.id === selectedItem.id);
        let newIndex;
        if (direction === 'prev') {
            newIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
        } else {
            newIndex = (currentIndex + 1) % filteredItems.length;
        }
        openModal(filteredItems[newIndex]);
    }

    function filterItems() {
        const searchTerm = searchInput.value.toLowerCase();
        const category = categoryFilter.value;

        filteredItems = mediaItems.filter(item =>
            (item.title.toLowerCase().includes(searchTerm) ||
                item.description.toLowerCase().includes(searchTerm)) &&
            (category === 'All' || item.category === category)
        );

        renderGalleryItems();
    }

    // Function to render tag filters
    function renderTagFilters() {
        const tagFilters = document.getElementById('tag-filters');
        const allTags = [...new Set(mediaItems.flatMap(item => item.tags))]; // Assuming mediaItems has tags

        allTags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.classList.add('tag-filter');
            tagElement.textContent = tag;
            tagElement.addEventListener('click', () => toggleTagFilter(tag));
            tagFilters.appendChild(tagElement);
        });
    }

    // Function to render year filters
    function renderYearFilters() {
        const yearFilters = document.getElementById('year-filters');
        const years = [...new Set(mediaItems.map(item => new Date(item.date).getFullYear()))]; // Assuming mediaItems has date

        years.forEach(year => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = '#';
            a.textContent = year;
            a.addEventListener('click', (e) => {
                e.preventDefault();
                toggleYearFilter(year);
            });
            li.appendChild(a);
            yearFilters.appendChild(li);
        });
    }

    // Function to toggle tag filter
    function toggleTagFilter(tag) {
        const index = activeFilters.tags.indexOf(tag);
        if (index === -1) {
            activeFilters.tags.push(tag);
        } else {
            activeFilters.tags.splice(index, 1);
        }
        applyFilters();
    }

    // Function to toggle year filter
    function toggleYearFilter(year) {
        if (activeFilters.year === year) {
            activeFilters.year = null;
        } else {
            activeFilters.year = year;
        }
        applyFilters();
    }

    // Function to apply filters
    function applyFilters() {
        filteredItems = mediaItems.filter(item => {
            const tagMatch = activeFilters.tags.length === 0 || activeFilters.tags.some(tag => item.tags.includes(tag));
            const yearMatch = !activeFilters.year || new Date(item.date).getFullYear() === activeFilters.year;
            const searchMatch = !activeFilters.search ||
                item.title.toLowerCase().includes(activeFilters.search.toLowerCase()) ||
                item.description.toLowerCase().includes(activeFilters.search.toLowerCase());

            return tagMatch && yearMatch && searchMatch;
        });

        renderGalleryItems();
        updateFilterUI();
    }

    // Function to update filter UI
    function updateFilterUI() {
        const tagFilters = document.querySelectorAll('.tag-filter');
        tagFilters.forEach(filter => {
            filter.classList.toggle('active', activeFilters.tags.includes(filter.textContent));
        });

        const yearFilters = document.querySelectorAll('#year-filters a');
        yearFilters.forEach(filter => {
            filter.classList.toggle('active', parseInt(filter.textContent) === activeFilters.year);
        });

        searchInput.value = activeFilters.search;
    }

    function clearFilters() {
        activeFilters = {
            tags: [],
            year: null,
            search: ''
        };
        document.getElementById('search-input').value = ''; // Clear the search input
        applyFilters(); // Reapply filters to update the gallery display
    }

    // Create the clear filters button
    const clearFiltersButton = document.createElement('button');
    clearFiltersButton.textContent = 'Clear Filters';
    clearFiltersButton.id = 'clear-filters';
    clearFiltersButton.style.padding = '10px'; // Ensure padding is applied
    clearFiltersButton.style.margin = '10px';  // Add margin if necessary
    clearFiltersButton.addEventListener('click', clearFilters);
    filterSection.appendChild(clearFiltersButton); // Append the button to the filter section

    // Event listeners
    closeButton.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    modalContent.addEventListener('click', (e) => e.stopPropagation());
    prevButton.addEventListener('click', () => navigateModal('prev'));
    nextButton.addEventListener('click', () => navigateModal('next'));
    fullscreenButton.addEventListener('click', toggleFullscreen);
    downloadButton.addEventListener('click', downloadMedia);
    likeButton.addEventListener('click', toggleLike);
    shareButton.addEventListener('click', shareMedia);
    searchInput.addEventListener('input', filterItems);
    searchButton.addEventListener('click', searchMedia);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            searchMedia();
        }
    });
    categoryFilter.addEventListener('change', searchMedia);

    // Initial fetch
    fetchMediaItems();

    // Update the styles for the custom video player
    const style = document.createElement('style');
    style.textContent = `
        .custom-video-player {
            position: relative;
            width: 100%;
            max-width: 800px;
            margin: 0 auto;
        }
        .custom-video-player video {
            width: 100%;
            height: auto;
        }
        .video-controls {
            position: absolute;
            bottom: 0;
            margin-bottom: 0.56rem;
            height: 2rem;
            left: 0;
            right: 0;
            background-color: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            padding: 10px;
        }
        .video-controls button {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            margin-right: 10px;
            margin-bottom: -0.25rem;
            font-size: 16px;
            font-family: 'Outfit';
        }
        .progress-bar {
            flex-grow: 1;
            height: 5px;
            background-color: rgba(255, 255, 255, 0.3);
            cursor: pointer;
            margin: 0 10px;
        }
        .progress {
            height: 100%;
            background-color: #fff;
            width: 0;
        }
        .volume-slider {
            width: 60px;
            margin-right: 10px;
        }
        .subtitles.active {
            color: #4CAF50;
        }
    `;
    document.head.appendChild(style);
    // };
});