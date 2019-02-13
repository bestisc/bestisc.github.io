/*游戏初始化*/
(function(){    
    var map = document.getElementsByClassName("map")[0];
    var end = document.getElementsByClassName("end")[0];
    map.style.display="none";
    end.style.display="none";
})();

/*初始化开始页面*/
(function(){
    var start = document.getElementsByClassName("start")[0];
    var players = document.createElement("div");
    players.className = "start-player";
    start.appendChild(players);

    var player1 = document.createElement("div");
    var player2 = document.createElement("div");
    player1.className = "player1";
    player2.className = "player2";
    player1.innerHTML = "单人";
    player2.innerHTML = "双人";
    players.appendChild(player1);
    players.appendChild(player2);
})();