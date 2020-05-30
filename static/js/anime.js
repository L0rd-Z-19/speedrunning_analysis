let timel = anime.timeline({
    easing: 'easeOutExpo',
    duration: 1000
});
    timel.add({
        targets: 'nav a h1',
        color: '#B9B9B9',
        delay: anime.stagger(100)
    })



let tl = anime.timeline({
    easing: 'easeOutExpo',
    duration: 750
    });

    tl.add({
        targets: 'span div',
        width: '100%',
        backgroundColor: '#8B00FF',
        delay: anime.stagger(100)
    })
    .add({
        targets: 'span div',
        backgroundColor: '#48C9B0'
    })


setTimeout(() => { d3.select('#anime').remove(); }, 3000);