(function(){
    /**全局变量*/
    window.public = {
        player:1,   //设置游戏人数 默认为1
    };
})();

/*游戏初始化*/
(function(){    
    var map = document.getElementsByClassName("map")[0];
    var end = document.getElementsByClassName("end")[0];
    //map.className="map display-none";
    end.className="end display-none";
})();

/*初始化开始页面*/
(function(){
    var start = document.getElementsByClassName("start")[0];
    var players = document.createElement("div");
    players.className = "start-player";
    start.appendChild(players);

    var tips = document.createElement("div");
    tips.className = "start-tips";
    tips.innerHTML = `
    <h1>提示</h1>
    <p>请用鼠标或键盘选则人数</p>
    <p>键盘A和(←)表示左移</p>
    <p>键盘D和(→)表示右移</p>
    `;
    players.appendChild(tips);
    var player1 = document.createElement("div");
    var player2 = document.createElement("div");
    player1.className = "player1 player";
    player2.className = "player2";
    player1.innerHTML = "单人";
    player2.innerHTML = "双人";
    players.appendChild(player1);
    players.appendChild(player2);
})();

/*选中单人还是双人*/
(function(){
    var player1 = document.getElementsByClassName("player1")[0];
    var player2 = document.getElementsByClassName("player2")[0];

    var body = document.getElementsByTagName("body")[0];
    body.onkeydown = function(event){
        if(event.keyCode==37||event.keyCode==65){  //1player
            player1.className = "player1 player";
            player2.className = "player2";
            public.player = 1;
        }else if(event.keyCode==39||event.keyCode==68){ //2player
            player1.className = "player1";
            player2.className = "player2 player";
            public.player = 2;
        }
        if(event.keyCode == 13){
            enter(public.player);
            body.onkeydown = null;
        }
    }

    player1.onclick = function(){
        player1.className = "player1 player";
        player2.className = "player2";
        public.player = 1;
        enter(public.player);
    }
    player2.onclick = function(){
        player1.className = "player1";
        player2.className = "player2 player";
        public.player = 2;
        enter(public.player);
    }

    function enter(player){   //进入动画
        var start = document.getElementsByClassName("start")[0];
        start.style.opacity = "1";
        var num = 1;
        var timer = setInterval(function(){
            if(Number(start.style.opacity)>=0){
                num -= 0.1;
                start.style.opacity = ""+num;
            }else{
                methods.map(player); //初始化地图
                clearInterval(timer);
            }
        },100);
    }
})();

