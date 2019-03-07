/*代理模式
	代理模式是为一个对象提供一个代用品或占位符，以便控制对它的访问。
*/
(function(){
	var Flower = function(){};

	var xiaoming = {
		sendFlower:function(target){
			var flower = new Flower();
			target.receiveFlower(flower);
		}
	};

	var A = {
		receiveFlower:function(flower){
			console.log('get '+ flower);
		},
		listenGoodMood: function(fn){
			setTimeout(function(){
				fn();
			},10000);
		}
	};

	xiaoming.sendFlower( A );

	var B = {
		receiveFlower: function(flower){
			A.listenGoodMood(function(){
				var flower = new Flower();
				A.receiveFlower(flower);
			});
		}
	};

	xiaoming.sendFlower( B );
})();

/*虚拟代理*/
(function(){
	
	/*图片预加载*/
	var myImage = (function(){
		var imgNode = document.createElement('img');
		document.body.appendChild(imgNode);
		return {
			setSrc: function(src){
				imgNode.src = src;
			}
		}
	})();

	var proxyInage = (function(){
		var img = new Image;
		img.onload = function(){
			myImage.setSrc(this.src);
		};
		return{
			setSrc: function(src){
				myImage.setSrc('file:// /C:/Users/svenzeng/Desktop/loading.gif');
				img.src = src;
			}
		}
	})();

	proxyInage.setSrc('http://imgcache.qq.com/music/photo/k/000GGDys0yA0Nk.jpg');

})();

(function(){
	/*缓存代理*/
	var mult = function(){
		var a = 1;
		for(var i=0;i < arguments ;i++){
			a = a * arguments[i];
		}
		return a;
	};

	var proxyMult = (function(){
		var cache = {};
		return function(){
			var args = Array.prototype.join.call(arguments,',');
			if(args in cache){
				return cache[args];
			}
			return cache[ args ] = mult.apply(this,arguments);
		};
	})();
})();

(function(){
	/*高阶函数 缓存代理*/
	var mult = function(){
		var a = 1;
		for(var i=0;i<arguments.length;i++){
			a = a * arguments[i];
		}
		return a;
	};

	var plus = function(){
		var a = 0;
		for(var i=0;i<arguments.length;i++){
			a += arguments[i];
		}
		return a;
	};

	var createProxyFactory = function(fn){
		var cache = {};
		return function(){
			var args = Array.prototype.join.call(arguments,',');
			if(args in cache){
				return cache[args];
			}
			return cache[args] = fn.apply(this,arguments);
		}
	};

	var proxyMult = createProxyFactory(mult);
	var proxyPlus = createProxyFactory(plus);

})();