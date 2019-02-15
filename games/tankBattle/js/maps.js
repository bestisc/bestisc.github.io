(function(){
    window.methods = {
        map:function(player){  //地图初始化 player传入参加游戏的人数
            var start = document.getElementsByClassName("start")[0];
            var map = document.getElementsByClassName("map")[0];
            var start_player = document.getElementsByClassName("start-player")[0];
            start.removeChild(start_player);
            start.className = "start display-none";
            map.className = "map display-block";
            tanks.createPlayerTanks(player);
        }
    };

    var tanks = {
        createPlayerTanks:function(player){ //创建玩家坦克
            var map = document.getElementsByClassName("map")[0];
            var tanks1 = document.createElement("div");
            tanks1.className = "tank-init tank-init1";
            tanks1.style.top = "550px";
            tanks1.style.left = "400px";
            tanks1.innerHTML = `
                <div class="tank-init-body"></div>
                <div class="tank-init-gun"></div>
                <div class="tank-init-header"></div>
            `;
            var tanks2 = document.createElement("div");
            tanks2.className = "tank-init tank-init2";
            tanks2.style.top = "550px";
            tanks2.style.left = "550px";
            tanks2.innerHTML = `
                <div class="tank-init-body"></div>
                <div class="tank-init-gun"></div>
                <div class="tank-init-header"></div>
            `;
            switch(player){
                case 1:{
                    map.appendChild(tanks1);
                    tanks.operatePlayerTanks1();
                };break;
                case 2:{
                    map.appendChild(tanks1);
                    map.appendChild(tanks2);
                    tanks.operatePlayerTanks2();
                };break;
            }
        },
        operatePlayerTanks1:function(){  //
            var tank = document.getElementsByClassName("tank-init1")[0];
            document.addEventListener("keydown",(event)=>{
                switch(event.keyCode){
                    case 87:case 38:{
                        if(parseInt(tank.style.top)>0){
                            tank.style.top = parseInt(tank.style.top) - 5 + "px";
                            tank.style.transform="rotate(0deg)";
                        }
                    };break;//上W
                    case 83:case 40:{
                        if(parseInt(tank.style.top)<550){
                            tank.style.top = parseInt(tank.style.top) + 5 + "px";
                            tank.style.transform="rotate(180deg)";
                        }
                    };break;//下S
                    case 65:case 37:{
                        if(parseInt(tank.style.left)>0){
                            tank.style.left = parseInt(tank.style.left) - 5 + "px";
                            tank.style.transform="rotate(270deg)";
                        }
                    };break;//左A
                    case 68:case 39:{
                        if(parseInt(tank.style.left)<950){
                            tank.style.left = parseInt(tank.style.left) + 5 + "px";
                            tank.style.transform="rotate(90deg)";
                        }
                    };break;//右D
                }
            },false);
            document.addEventListener("keydown",(event)=>{
                if(event.keyCode == 13 || event.keyCode == 32){
                    tanks.sendBullet(tank); 
                }
            },false);
        },
        operatePlayerTanks2:function(){  //
            
        },
        sendBullet:function(tank){  //发射子弹
            var map = document.getElementsByClassName("map")[0];
            var x = parseInt(tank.style.left);
            var y = parseInt(tank.style.top);
            var bullet = document.createElement("div"); 
            bullet.className = "bullet";
            bullet.style.top = y + "px";
            bullet.style.left = x + "px";
            map.appendChild(bullet);
        }
    }

    tanks.createPlayerTanks(1);
})();