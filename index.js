$(function(){
    setTimeout(function(){
    $.get('./songs.json').then(function(response){
        let items = response
        items.forEach(i => {
        let $li = $(
          `
					<li>
					<a href="./song.html?id=${i.id}">
					<h3>${i.name}</h3>
                    <div class="main">
                    <svg class="sq">
                    <use xlink:href="#icon-sq"></use>
                    </svg><p class="album">${i.album}</p>
					<svg class="playcircled">
					<use xlink:href="#icon-play-circled"></use>
					</svg>
                    </div>
					</a>
					</li>
		  `
        )
            $('#lastestMusic').append($li)
        })
        $('#lastestMusicloading').remove()
    })
  },400)


    $('.siteNav').on('click','ol.tabItems>li',function(e){
        let $li = $(e.currentTarget).addClass('active')
        $li.siblings().removeClass('active')
        let index = $li.index()
        $li.trigger('tabChange',index)
        $('.tabContent > li').eq(index).addClass('active')
            .siblings().removeClass('active')
    })
    $('.siteNav').on('tabChange',function(e,index){
        let $li = $('.tabContent > li').eq(index)
        if($li.attr('data-downloaded') === 'yes'){
            return
        }
        if(index === 1){
            $.get('./songs.json').then((response)=>{
                let items = response
                items.forEach((i) => {
                let $li = $(`
                        <li>
                            <p class="ranking">${'0'+i.id}</p>
                            <a href="./song.html?id=${i.id}">
                            
                                <h3>${i.name}</h3>
                                <div class="main">
                                    <svg class="sq">
                                        <use xlink:href="#icon-sq"></use>
                                    </svg>
                                    <p class="album">${i.album}</p>
                                    <svg class="playcircled">
                                        <use xlink:href="#icon-play-circled"></use>
                                    </svg>
                                    <div class="underline"></div>
                                </div>
                            </a>
                        </li>
                           `)
                    console.log($li)       
                    $('#hotMusic').append($li)
                })
                $('#hotMusicloading').remove()
                $li.attr('data-downloaded','yes')
            })
        }else if(index === 2){
            $.get('./songs.json').then((response)=>{
                let items = response
                items.forEach((i) => {
                    let $li=$(`
                    <li>
                        <a href="./song.html?id=${i.id}">${i.name}</a>
                    </li>
                    `)
                    $('#output').append($li)
                    $li.attr('data-downloaded', 'yes')
                })
            })
        }
    })
    let timer = undefined
    $('input#searchSong').on('input',function(e){
        let $input = $(e.currentTarget)
        let value = $input.val().trim()
        if(value === ''){
            $('#output').text('')
            return
        }


        if(timer){
            clearTimeout(timer)
        }


        timer = setTimeout(function(){
            search(value).then((result)=>{
                timer = undefined
                if(result.length !== 0 ){
                    for(var i=0;i<result.length;i++){
                        let $li = $(`
                        <li>
                         <a href="./song.html?id=${result[i].id}">
                        <h3>${result[i].name}</h3>
                       <div class="main">
                        <svg class="sq">
                            <use xlink:href="#icon-sq"></use>
                            </svg><p class="album">${result[i].album}</p>
                            <svg class="playsvg">
                            <use xlink:href="#icon-play-circled"></use>
                            </svg>
                         </div>
                            </a>
                            </li>
                                   `)

                                $('#output').append($li)
                         }
                }else{
                    let $p = '<p id="sorry">非常抱歉，没有找到这首歌</p>'
                    $('#output').append($p)
                }
            })
        },500)
    })
    function search(keyword){                                 
        return new Promise((resolve,reject)=>{
            var database = [                                   
                { "id":1, "name":"成都","album":"赵雷 - 成都"},
                { "id":2, "name":"蓝","album":"Fusion乐团 - 成人世界"},
                { "id":3, "name":"","album":""},
                { "id":4, "name":"","album":""},
                { "id":5, "name":"","album":""},
                { "id":6, "name":"","album":""},
                { "id":7, "name":"","album":""},               
                { "id":8, "name":"","album":""},
                { "id":9, "name":"","album":""},
                { "id":10, "name":"","album":""}
            ]

            let result = database.filter(function(item){        
                return item.name.indexOf(keyword)>=0



            })
            setTimeout(function(){
                resolve(result)
            },(Math.random () * 200 + 300))
        })
    }
    window.search = search

    $('.playlists').on('click','li',function(e){
            $('.siteNav>ol>li').eq(0).removeClass('active')
            $('.siteNav>ol>li').eq(1).addClass('active')
            $('.tabContent>li').eq(0).removeClass('active')
            $('.tabContent>li').eq(1).addClass('active')
    })
})

