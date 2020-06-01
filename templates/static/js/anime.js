let tl = anime.timeline({
    easing: 'easeOutExpo',
    duration: 750
    });

    tl.add({
        targets: 'span div',
        width: '100%',
        backgroundColor: '#7bab8e',
        delay: anime.stagger(100)
    })
    .add({
        targets: 'span div',
        backgroundColor: '#b6d2c1'
    })

setTimeout(() => { d3.select('#anime').remove(); }, 3000);