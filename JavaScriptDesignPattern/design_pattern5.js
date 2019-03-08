/*发布—订阅模式
	又叫观察者模式，它定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知。在JavaScript开发中，我们一般用事件模型来替代传统的发布—订阅模式。
	第一点说明发布—订阅模式可以广泛应用于异步编程中，这是一种替代传递回调函数的方案。

 */
(function(){
	document.body.addEventListener('click', function(){
		console.log(2);
	}, false);
	document.body.addEventListener('click', function(){
		console.log(3);
	}, false);
})();

(function(){
	/*发布--订阅的实现*/
	var salesOffices = {};	//定义售楼处
	salesOffices.clientList = [];	//缓存列表，存放订阅者的回调函数
	salesOffices.listen = function(fn,key){	//增加订阅者
		if(!this.clientList[key]){	//如果还没有订阅过此类消息，给该类消息创建一个缓存列表
			this.clientList[key] = [];

		}
		this.clientList[key].push(fn);	//订阅的消息添加进缓存列表
	};
	salesOffices.trigger = function(){	//发布消息
		var key = Array.prototype.shift.call(arguments);//取出消息类型
		var fns = this.clientList[key];//取出该消息对应回调函数集合
		if(!fns || fns.clientList[key]){
			return false;
		}
		for(var i=0,fn;fn = fns[i++];){
			fn.apply(this,arguments);	//arguments是发布消息时带上的参数
		}
	};

	salesOffices.listen( 'squareMeter88', function( price ){    // 小明订阅88平方米房子的消息    
	console.log( '价格= ' +price );    // 输出：2000000
	});
	salesOffices.listen( 'squareMeter110', function( price ){     // 小红订阅110平方米房子的消息    
	console.log( '价格= ' +price );    // 输出：3000000
	});
	salesOffices.trigger( 'squareMeter88', 2000000 );     // 发布88平方米房子的价格
	salesOffices.trigger( 'squareMeter110', 3000000 );    // 发布110平方米房子的价格
})();

(function(){
	/*发布－订阅模式的通用实现*/
	var event = {
		clientList : [],
		//订阅
		listen : function( key, fn ){
			if( !this.clientList[ key ] ){
				this.clientList[ key ] = [];
			}
			this.clientList[ key ].push( fn );	//订阅的消息添加进缓存列表
		},
		//发布
		trigger : function(){
			var key = Array.prototype.shift.call(arguments);
			var fns = this.clientList[ key ];
			if( !fns || fns.length === 0){	//如果没有绑定对应的消息
				return false;
			}
			for( var i = 0,fn; fn = fns[i++];){
				fn.apply(this,arguments);
			}
		},
	};

	//取消订阅事件
	event.remove = function(key,fn){
		var fns = this.clientList[ key ];
		if(!fns){	//如果key对应的消息没有被人订阅，则直接返回
			return false;
		}
		if(!fn){	//如果没有传入具体的回调函数，表示取消key对应消息的所有订阅
			fns && (fns.length = 0);
		}else{
			for(var ln=fns.length - 1;fn >= 0;ln--){
				//反向遍历订阅的回调函数列表
				var _fn = fns[ln];
				if(_fn === fn){
					fns.splice(ln,1);	// 删除订阅者的回调
				}
			}
		}
	};

	/**
	 * [installEvent 给所有的对象都动态安装发布—订阅功能：]
	 * @param  {[type]} obj [description]
	 * @return {[type]}     [description]
	 */
	var installEvent = function(obj){
		for(var i in event){
			obj[i] = event[i];
		}
	};

	//Test
	var salesOffices = {};
	installEvent( salesOffices );
	salesOffices.listen( 'squareMeter88', function( price ){    // 小明订阅消息    
		console.log( '价格= ' +price );
	});
	salesOffices.listen( 'squareMeter100', function( price ){     // 小红订阅消息    
		console.log( '价格= ' +price );
	});
	salesOffices.trigger( 'squareMeter88', 2000000 );    // 输出：2000000
	salesOffices.trigger( 'squareMeter100', 3000000 );    // 输出：3000000
})();

(function(){
	/*全局发布--订阅模式*/
	var Event = (function(){
		var clientList = {};
		var listen;
		var trigger;
		var remove;

		listen = function(key,fn){
			if(!clientList[key]){
				clientList[key] = [];
			}
			clientList[key].push(fn);
		};

		trigger = function(){
			var key = Array.prototype.shift.call(arguments);
			var fns = clientList [key];
			if(!fns || fns.length === 0){
				return false;
			}
			for(var i=0,fn;fn=fns[i++];){
				fn.apply(this,arguments);
			}
		};

		remove = function(key,fn){
			var fns = clientList[key];
			if( !fns ){
				return false;
			}
			if( !fn ){
				fns && (fns.length = 0);
			}else{
				for(var le = fns.length -1; le >= 0 ;le--){
					var _fn = fns[le];
					if(_fn === fn){
						fns.splice(le,1);
					}
				}
			}
		};

		return {
			listen : listen,
			trigger : trigger,
			remove : remove
		}
	})();

	//Test
	Event.listen( 'squareMeter88', function( price ){     // 小红订阅消息    
		console.log( '价格= ' +price );       // 输出：'价格=2000000'
	});
	Event.trigger( 'squareMeter88', 2000000 );    // 售楼处发布消息
})();