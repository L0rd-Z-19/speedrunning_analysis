let timel = anime.timeline({
    easing: 'easeOutExpo',
    duration: 750
});
timel.add({
    targets: '.ana',
    opacity:0,
    delay: anime.stagger(200)
})
.add({
    targets: '.ana',
    opacity:1,
    delay: anime.stagger(200)
})
.add({
    targets: '.dat',
    opacity:1
})