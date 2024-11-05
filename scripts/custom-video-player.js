document.addEventListener('DOMContentLoaded', function() {
    const videoPlayer = document.getElementById('custom-video-player');
    const video = videoPlayer.querySelector('video');
    const playPauseBtn = videoPlayer.querySelector('.play-pause-btn');
    const muteBtn = videoPlayer.querySelector('.mute-btn');
    const fullscreenBtn = videoPlayer.querySelector('.fullscreen-btn');
    const seekBar = videoPlayer.querySelector('.seek-bar');
    const volumeBar = videoPlayer.querySelector('.volume-bar');
    const currentTime = videoPlayer.querySelector('.current-time');
    const duration = videoPlayer.querySelector('.duration');
    const playbackSpeedBtn = videoPlayer.querySelector('.playback-speed-btn');
    const captionsBtn = videoPlayer.querySelector('.captions-btn');

    // Custom icons (SVG paths)
    const icons = {
        play: 'M8 5v14l11-7z',
        pause: 'M6 19h4V5H6v14zm8-14v14h4V5h-4z',
        mute: 'M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z',
        unmute: 'M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z',
        fullscreen: 'M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z',
        exitFullscreen: 'M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z',
        speedNormal: 'M10 8v8l6-4-6-4zM6.5 16h-2v2H3v-2H1v-2h2v-2h1.5v2h2v2zM18 14v2h-5v-2h5z',
        speedFast: 'M10 8v8l6-4-6-4zM6.5 16h-2v2H3v-2H1v-2h2v-2h1.5v2h2v2zM18 14v2h-7v-2h7z',
        captionsOn: 'M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 7H9.5v-.5h-2v3h2V13H11v1c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v1zm7 0h-1.5v-.5h-2v3h2V13H18v1c0 .55-.45 1-1 1h-3c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v1z',
        captionsOff: 'M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H5V6h14v12z'
    };

    // Helper function to create SVG icons
    function createSVGIcon(pathD) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 24 24');
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', pathD);
        svg.appendChild(path);
        return svg;
    }

    // Initialize icons
    playPauseBtn.appendChild(createSVGIcon(icons.play));
    muteBtn.appendChild(createSVGIcon(icons.unmute));
    fullscreenBtn.appendChild(createSVGIcon(icons.fullscreen));
    playbackSpeedBtn.appendChild(createSVGIcon(icons.speedNormal));
    captionsBtn.appendChild(createSVGIcon(icons.captionsOff));

    // Play/Pause functionality
    function togglePlayPause() {
        if (video.paused) {
            video.play();
            playPauseBtn.innerHTML = '';
            playPauseBtn.appendChild(createSVGIcon(icons.pause));
        } else {
            video.pause();
            playPauseBtn.innerHTML = '';
            playPauseBtn.appendChild(createSVGIcon(icons.play));
        }
    }

    playPauseBtn.addEventListener('click', togglePlayPause);
    video.addEventListener('click', togglePlayPause);

    // Mute functionality
    muteBtn.addEventListener('click', function() {
        video.muted = !video.muted;
        muteBtn.innerHTML = '';
        muteBtn.appendChild(createSVGIcon(video.muted ? icons.mute : icons.unmute));
        volumeBar.value = video.muted ? 0 : video.volume;
    });

    // Fullscreen functionality
    fullscreenBtn.addEventListener('click', function() {
        if (!document.fullscreenElement) {
            if (videoPlayer.requestFullscreen) {
                videoPlayer.requestFullscreen();
            } else if (videoPlayer.mozRequestFullScreen) {
                videoPlayer.mozRequestFullScreen();
            } else if (videoPlayer.webkitRequestFullscreen) {
                videoPlayer.webkitRequestFullscreen();
            } else if (videoPlayer.msRequestFullscreen) {
                videoPlayer.msRequestFullscreen();
            }
            fullscreenBtn.innerHTML = '';
            fullscreenBtn.appendChild(createSVGIcon(icons.exitFullscreen));
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            fullscreenBtn.innerHTML = '';
            fullscreenBtn.appendChild(createSVGIcon(icons.fullscreen));
        }
    });

    // Seek bar functionality
    seekBar.addEventListener('change', function() {
        const time = video.duration * (seekBar.value / 100);
        video.currentTime = time;
    });

    video.addEventListener('timeupdate', function() {
        const value = (100 / video.duration) * video.currentTime;
        seekBar.value = value;
        currentTime.textContent = formatTime(video.currentTime);
    });

    // Volume control
    volumeBar.addEventListener('change', function() {
        video.volume = volumeBar.value;
        video.muted = volumeBar.value === 0;
        muteBtn.innerHTML = '';
        muteBtn.appendChild(createSVGIcon(video.muted ? icons.mute : icons.unmute));
    });

    // Playback speed control
    let currentSpeed = 1;
    const speeds = [0.5, 1, 1.5, 2];
    playbackSpeedBtn.addEventListener('click', function() {
        const currentIndex = speeds.indexOf(currentSpeed);
        const nextIndex = (currentIndex + 1) % speeds.length;
        currentSpeed = speeds[nextIndex];
        video.playbackRate = currentSpeed;
        playbackSpeedBtn.textContent = `${currentSpeed}x`;
        playbackSpeedBtn.innerHTML = '';
        playbackSpeedBtn.appendChild(createSVGIcon(currentSpeed > 1 ? icons.speedFast : icons.speedNormal));
    });

    // Captions control
    let captionsOn = false;
    captionsBtn.addEventListener('click', function() {
        captionsOn = !captionsOn;
        const tracks = video.textTracks;
        for (let i = 0; i < tracks.length; i++) {
            tracks[i].mode = captionsOn ? 'showing' : 'hidden';
        }
        captionsBtn.innerHTML = '';
        captionsBtn.appendChild(createSVGIcon(captionsOn ? icons.captionsOn : icons.captionsOff));
    });

    // Format time helper function
    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    // Set video duration when metadata is loaded
    video.addEventListener('loadedmetadata', function() {
        duration.textContent = formatTime(video.duration);
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.code === 'Space') {
            e.preventDefault();
            togglePlayPause();
        } else if (e.code === 'ArrowLeft') {
            video.currentTime -= 5;
        } else if (e.code === 'ArrowRight') {
            video.currentTime += 5;
        } else if (e.code === 'ArrowUp') {
            video.volume = Math.min(1, video.volume + 0.1);
            volumeBar.value = video.volume;
        } else if (e.code === 'ArrowDown') {
            video.volume = Math.max(0, video.volume - 0.1);
            volumeBar.value = video.volume;
        } else if (e.code === 'KeyM') {
            video.muted = !video.muted;
            muteBtn.innerHTML = '';
            muteBtn.appendChild(createSVGIcon(video.muted ? icons.mute : icons.unmute));
            volumeBar.value = video.muted ? 0 : video.volume;
        } else if (e.code === 'KeyF') {
            fullscreenBtn.click();
        }
    });
});