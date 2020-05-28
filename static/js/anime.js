let tl = anime.timeline({
    easing: 'easeOutExpo',
    duration: 750
    });

    tl.add({
        targets: 'span div',
        width: '100%',
        backgroundColor: 'rgb(32, 32, 32)',
        delay: anime.stagger(100)
    })
    .add({
        targets: 'span div',
        backgroundColor: '#48C9B0'
    })


setTimeout(() => { d3.select('#anime').remove(); }, 3000);