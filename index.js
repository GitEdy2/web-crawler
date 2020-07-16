const cheerio = require('cheerio');
const axios = require('axios');

axios.get('https://news.ycombinator.com/')
    .then( res => {

        let itemslist = [];

        const hackerNews = () => {
            const $ = cheerio.load(res.data);

            $('.athing').each((index,el) => {
                
                let title = $(el)           
                    .find('.title > .storylink')
                    .first()
                    .text();

                let rank = $(el)
                    .find('.athing > .title')
                    .children('span')
                    .first()
                    .text();

                let score = $(el)
                    .next()
                    .find('.subtext > .score')
                    .first()
                    .text()

                let comments = $(el)
                    .next()
                    .find('.subtext')
                    .children('a')
                    .last()
                    .text()

                itemslist[index] = {rank,title,score,comments}
            });

            return itemslist;
        }

        const printHackerNews = () => {
            return console.log(hackerNews());
        }
    
        const filtercomments = () => {
            let filter1 = itemslist.filter((item) => {
                let tituloDividido = item.title.split(" ");
                let numeroPalabras = tituloDividido.length;
                
                return numeroPalabras > 5;
            })

            let sortfilter1 = filter1.sort((a,b) => {
                
                    return parseInt(b.comments) - parseInt(a.comments);
            }) 
    
            return console.log(sortfilter1);
        }
        
        
        const filterscores = () => {
    
            let filter2 = itemslist.filter((item) => {
                let tituloDividido = item.title.split(" ");
                let numeroPalabras = tituloDividido.length;
    
                return numeroPalabras <= 5;
            })
    
            let sortfilter2 = filter2.sort((a,b) => {
    
                    return parseInt(b.score) - parseInt(a.score);
            })
    
            return console.log(sortfilter2);
        }
        
            console.log('--------Lista de Publicaciones---------')
            printHackerNews();
            console.log('------------------FIN------------------')
            console.log('------------Primer Filtro--------------')
            filtercomments(hackerNews());
            console.log('------------------FIN------------------')
            console.log('------------Segundo Filtro--------------')
            filterscores(hackerNews());
            console.log('------------------FIN------------------')
    })
    .catch(error => console.log(error));

    
    
    
    

    



























