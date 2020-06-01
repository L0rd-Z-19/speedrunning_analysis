let timel = anime.timeline({
    easing: 'easeOutExpo',
    duration: 1000
});
    timel.add({
        targets: 'nav a h1',
        color: '#B9B9B9',
        delay: anime.stagger(100)
    })