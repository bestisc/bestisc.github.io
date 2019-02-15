(function(){
    window.methods = {
        map:function(player){  //地图初始化 player传入参加游戏的人数
            var start = document.getElementsByClassName("start")[0];
            var map = document.getElementsByClassName("map")[0];
            var start_player = document.getElementsByClassName("start-player")[0];
            start.removeChild(start_player);
            start.className = "start display-none";
            map.className = "map display-block";
            console.log(player);
        },
    };
})();