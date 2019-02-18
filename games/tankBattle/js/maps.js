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
            var direction = "W";
            document.addEventListener("keydown",(event)=>{
                switch(event.keyCode){
                    case 87:case 38:{
                        if(parseInt(tank.style.top)>0){
                            tank.style.top = parseInt(tank.style.top) - 2 + "px";
                            tank.style.transform="rotate(0deg)";
                            direction = "W";
                        }
                    };break;//上W
                    case 83:case 40:{
                        if(parseInt(tank.style.top)<550){
                            tank.style.top = parseInt(tank.style.top) + 2 + "px";
                            tank.style.transform="rotate(180deg)";
                            direction = "S";
                        }
                    };break;//下S
                    case 65:case 37:{
                        if(parseInt(tank.style.left)>0){
                            tank.style.left = parseInt(tank.style.left) - 2 + "px";
                            tank.style.transform="rotate(270deg)";
                            direction = "A";
                        }
                    };break;//左A
                    case 68:case 39:{
                        if(parseInt(tank.style.left)<950){
                            tank.style.left = parseInt(tank.style.left) + 2 + "px";
                            tank.style.transform="rotate(90deg)";
                            direction = "D";
                        }
                    };break;//右D
                }
            },false);
            document.addEventListener("keyup",(event)=>{
                if(event.keyCode == 13 || event.keyCode == 32){
                    tanks.sendBullet(tank,direction); 
                }
            },false);
        },
        operatePlayerTanks2:function(){  //
            
        },
        BulletNum:0,//发射的子弹总数
        sendBullet:function(tank,direction){  //发射子弹
            var map = document.getElementsByClassName("map")[0];
            var x = parseInt(tank.style.left);
            var y = parseInt(tank.style.top);
            var bullet = document.createElement("div"); 
            bullet.className = "bullet"+" bullet"+tanks.BulletNum;
            switch(direction){
                case "W":{
                    bullet.style.top = y-20 + "px";
                    bullet.style.left = x+20 + "px";
                    map.appendChild(bullet);
                };break;
                case "S":{
                    bullet.style.top = y+50 + "px";
                    bullet.style.left = x+20 + "px";
                    map.appendChild(bullet);
                };break;
                case "A":{
                    bullet.style.top = y+20 + "px";
                    bullet.style.left = x-20 + "px";
                    map.appendChild(bullet);
                    bullet.style.width = "20px";
                    bullet.style.height = "10px";
                };break;
                case "D":{
                    bullet.style.top = y+20 + "px";
                    bullet.style.left = x+50 + "px";
                    map.appendChild(bullet);
                    bullet.style.width = "20px";
                    bullet.style.height = "10px";
                };break;
            }
            var bul = document.getElementsByClassName("bullet"+tanks.BulletNum)[0];
            tanks.BulletNumAction(direction,tanks.BulletNum);
            tanks.BulletNum++;
        },
        BulletNumAction(direction,num){
            var map = document.getElementsByClassName("map")[0];
            var timer = setInterval(()=>{
                var bul = document.getElementsByClassName("bullet"+num)[0];
                var x = parseInt(bul.style.left);
                var y = parseInt(bul.style.top);
                switch(direction){
                    case "W":{
                        if(y>0){
                            bul.style.top = y - 5 + "px";
                        }else{
                            map.removeChild(bul);
                            clearInterval(timer);
                        }
                    };break;
                    case "S":{
                        if(y<580){
                            console.log(y);
                            bul.style.top = y + 5 + "px";
                        }else{
                            map.removeChild(bul);
                            clearInterval(timer);
                        }
                    };break;
                    case "A":{
                        if(x>0){
                            bul.style.left = x - 5 + "px";
                        }else{
                            map.removeChild(bul);
                            clearInterval(timer);
                        }
                    };break;
                    case "D":{
                        if(x<980){
                            bul.style.left = x + 5 + "px";
                        }else{
                            map.removeChild(bul);
                            clearInterval(timer);
                        }
                    };break;
                }
            },40);
        }
    }

    tanks.createPlayerTanks(1);
})();