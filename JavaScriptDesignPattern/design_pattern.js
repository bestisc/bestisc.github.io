/* 鸭子类型 */
(function(){
	var duck = {
		duckSing : function(){
			console.log("gagaga");
		}
	}

	var chicken = {
		duckSing : function(){
			cosole.log("gagaga");
		}
	}

	var choir = [];
	var joinChoir = function(animal){
		if(animal && typeof animal.duckSing === 'function'){
			choir.push(animal);
			console.log('OK');
			console.log(choir.length);
		}
	}

	joinChoir(duck);
	joinChoir(chicken);

	console.log("鸭子类型 ====== HAS-A");
})();

console.log('=====================================');
/*多态1*/
(function(){
	var makeSound = function(animal){
		if(animal instanceof Duck){
			console.log("gagaga");
		}else if(animal instanceof Chicken){
			console.log("gegege");
		}
	}

	var Duck = function(){}
	var Chicken = function(){}

	var duck = new Duck();
	var chicken = new Chicken();

	makeSound(duck);
	makeSound(chicken);
})();

console.log('=====================================');
/*多态2*/
(function(){
	var makeSound = function(animal){
		animal.sound();
	}

	var Duck = function(){}
	Duck.prototype.sound = function(){
		console.log('gagaga');
	}

	var Chicken = function(){}
	Chicken.prototype.sound = function(){
		console.log('gegege');
	}

	makeSound(new Duck());
	makeSound(new Chicken());

})();

//console.log('=====================================');
/*多态3*/
// (function(){

// 	var googleMap = {
// 		show:function(){
// 			console.log("googleMap");
// 		}
// 	}

// 	var baiduMap = {
// 		show:function(){
// 			console.log("baiduMap");
// 		}
// 	}

// 	var renderMap = function(map){

// 		if(map.show instanceof Function){
// 			map.show();
// 		}
// 	}

// 	renderMap(googleMap.show());
// 	renderMap(baiduMap.show());
// })();

console.log('=====================================');
/*封装*/
(function(){
	var myObject = (function(){
		var __name = 'liuxinghong';	//私有(private)变量

		return{						//公开(public)方法 类似Java的getter方法
			getName:function(){
				return __name;
			}
		}
	})();

	console.log(myObject.__name);		//undefined
	console.log(myObject.getName());	//liuxinghong
})();

console.log('=====================================');
/*原型模式*/
(function(){
	var Plane = function(){
		this.blood = 100;
		this.attackLevel = 1;
		this.defenseLevel = 1;
	};

	var plane = new Plane();
	plane.blood = 500;
	plane.attackLevel = 10;
	plane.defenseLevel = 7;
	
	console.log(plane);

	//在不支持Object.create方法的浏览器中，则可以使用以下代码
	Object.create = Object.create || function(obj){
		var F = function(){}
		F.prototype = obj;
		return new F(); 
	}

	if(Object.create instanceof Function){
		var clonePlane = Object.create(plane);
	}
	
	console.log(clonePlane);
	console.log(clonePlane.blood);
	console.log(clonePlane.attackLevel);
	console.log(clonePlane.defenseLevel);

	var obj1 = new Object();
	var obj2 = {};
	console.log(Object.getPrototypeOf(obj1) === Object.prototype);
	console.log(Object.getPrototypeOf(obj2) === Object.prototype);


	function Person(name){
		this.name = name;
	}

	Person.prototype.getName = function(){
		return this.name;
	}

	var person = new Person("lxh");
	console.log(person.name);
	console.log(person.getName());
	console.log(Object.getPrototypeOf(person) === Person.prototype);
})();


console.log('=====================================');
/*原型继续*/
(function(){
	var obj = {name:'lxh'};

	var Fun = function(){}
	Fun.prototype = obj;

	var f = new Fun();
	console.log(f.name);


	var A = function(){};
	A.prototype = {name:'liu'};

	var B = function(){};
	B.prototype = new A();

	console.log(new B().name);

	class Animal{
		constructor(name){
			this.name = name;
		}

		getName(){
			return this.name;
		}
	}

	class Dog extends Animal{
		constructor(name){
			super(name);
		}

		speak(){
			return "woof";
		}
	}

	var dog = new Dog("xiaohuang");
	console.log(dog.getName() + ' says ' + dog.speak());
})();

console.log('=====================================');
/*this指向*/
(function(){
	var obj = {
		a: 1,
		getA: function(){
			console.log(this === obj);
			console.log(this.a);
		}
	}
	obj.getA();	//作为对象的方法调用

	window.name = 'globalName';
	var getName = function(){
		return this.name;
	}
	console.log(getName());	//作为普通函数调用


	var MyObj = {
		name: 'lxh',
		getName: function(){
			return this.name;
		}
	}

	var getMyName = MyObj.getName;
	console.log(getMyName());

	"use strict";
	window.id = 'window';
	document.getElementById("div1").onclick = function(){
		console.log(this.id);
		var that = this;
		var callback = function(){
			console.log("callback="+this.id);
			console.log("callback that="+that.id);
		}
		callback();
	}

	//构造器调用
	var MyClass = function(){
		this.name = "构造器调用";
	}
	var my = new MyClass();
	console.log(my.name);

	var MyClass = function(){
		this.name = "构造器调用";
		return {	//返回对象有效
			name:'显示返回对象'
		}
	}
	var my = new MyClass();
	console.log(my.name);
})();

console.log('=====================================');
/*call和apply初步*/
(function(){
	var obj1 = {
		name: "obj1",
		getName:function(){
			return this.name;
		}
	}

	var obj2 = {
		name: "obj2"
	}

	console.log(obj1.getName());
	console.log(obj1.getName.call(obj2));

	var getId = function(id){
		return document.getElementById(id);
	}
	console.log(getId("div1"));

	try{
		var getId = document.getElementById;
		console.log(getid("div1"));
	}catch(e){
		console.log(e);
	}

	(function(){
		//修正this指向
		document.getElementById = (function(func){
			return function(){
				return func.apply(document,arguments);
			}
		})(document.getElementById);
		
		var getId = document.getElementById;
		console.log(getId("div1"));

	})();

	var func = function(a,b,c){
		console.log([a,b,c]);
		console.log(this === window);
		"use strict";
		console.log(this === null);
	}
	func.apply(null,[1,2,3]);

	func.call(null,1,2,3);

	console.log("-------------------------------------");
	/*call和apply的作用*/
	//1.改变this指向
	(function(){
		var obj1 = {
			name:'obj1'
		};

		var obj2 = {
			name:'obj2'
		};

		window.name = 'window';

		var getName = function(){
			console.log(this.name);
		}

		getName();
		getName.apply(obj1);
		getName.call(obj2);
	})();

	//模拟bind方法
	(function(){
		Function.prototype.bind = function(centext){
			var self = this;	//保存原函数
			return function(){
				return self.apply(centext, arguments);
			}
		}

		var obj = {
			name : 'bind'
		};

		var func = function(){
			console.log(this.name);
		}.bind(obj);

		func();

	})();

	// 3.借用其他对象的方法
	(function(){
		var A = function(name){
			this.name = name;
		};

		var B = function(){
			A.apply(this, arguments);
		};

		B.prototype.getName = function(){
			return this.name;
		};

		var b = new B("apply+");
		console.log(b.getName());
	})();

	(function(){
		Array.prototype.push.call(arguments,3);
		console.log(arguments);
	})(1,2);

})();

console.log('=====================================');
/*闭包*/
(function(){
	var func = function(){
		var a = 1;
		return function(){
			a++;
			console.log(a);
		}
	}

	var f = func();
	f();
	f();
	f();
	f();

	var div = document.getElementsByClassName("div2");
	for(var i=0;i<div.length;i++){
		(function(i){
			div[i].onclick = function(){
				console.log(i);
			}
		})(i);
	}

	(function(){
		var Type = {};
		for(var i = 0, type; type = ['String', 'Array', 'Number'][ i++];){
			(function(type){
				Type['is' + type] = function(obj){
					return Object.prototype.toString.call(obj) === '[object ' +type + ']';
				}
			})(type);
		}

		console.log(Type.isArray([]));
		console.log(Type.isString("str"));
	})();

	console.log("-------------------------------------");

	(function(){
		var mult = function(){
			var cache = {};
			return function(){
				var args = Array.prototype.join.call(arguments,',');
				if(args  in cache){
					return cache[args];
				}
				var a = 1;
				for(var i = 0; i < arguments.length; i++){
					a *= arguments[i];
				}
				return cache[args] = a;
			}

			
		}

		console.log(mult(5,5,6,7,8,3));
	})();

	(function(){
		var report = (function(){
			var imgs = [];
			return function(src){
				var img = new Image();
				imgs.push(img);
				img.src = src;
			}
		})();
	})();

	var extent1 = function(){
		var value = 0;
		return {
			call:function(){
				value++;
				console.log(value);
			}
		}
	};

	var extent2 = {
		value : 0,
		call:function(){
			this.value++;
			console.log(this.value);
		}
	}

	var Extent3 = function(){
		this.value = 0;
	}
	Extent3.prototype.call = function(){
		this.value++;
		console.log(this.value);
	};

	(function(){
	/*	//命令模式-面向对象版
		var Tv = {    
			open: function(){        
				console.log( '打开电视机' );    
			},    
			close: function(){        
			console.log( '关上电视机' );    
			}
		};

		// var OpenTvCommand = function( receiver ){    
		// 	this.receiver = receiver;
		// };
		function OpenTvCommand(receiver){
			this.receiver = receiver;
		}

		OpenTvCommand.prototype.execute = function(){    
			this.receiver.open();    // 执行命令，打开电视机
		};
		OpenTvCommand.prototype.undo = function(){    
			this.receiver.close();    // 撤销命令，关闭电视机
		};

		function setCommand( command ){    
			document.getElementById( 'execute' ).onclick = function(){        
				command.execute();     // 输出：打开电视机    
			}    
			document.getElementById( 'undo' ).onclick = function(){        
				command.undo();     // 输出：关闭电视机    
			}
		};
		setCommand( new OpenTvCommand( Tv ) );
	*/

	/*命令模式 */
	var Tv = {    
		open: function(){        
			console.log( '打开电视机' );    
		},    
		close: function(){        
			console.log( '关上电视机' );    
		}
	};
	function createCommand( receiver ){    
		function execute(){        
			return receiver.open();    // 执行命令，打开电视机    
		}    
		function undo(){        
			return receiver.close();    // 执行命令，关闭电视机    
		}    
		return {        
			execute: execute,        
			undo: undo    
		}
	};

	function setCommand( command ){    
		document.getElementById( 'execute' ).onclick = function(){        
			command.execute();     // 输出：打开电视机    
		}    
		document.getElementById( 'undo' ).onclick = function(){        
			command.undo();    // 输出：关闭电视机    
		}
	};
	setCommand( createCommand( Tv ) );

	})();

})();

console.log('=====================================');
/*高阶函数*/
(function(){

	/*Ajax回调*/
	function getUserInfo(useId,callback){
		$.ajax('url?'+useId,function(data){
			if(typeof callback === 'function'){
				callback(data);
			}
		});
	}

	function appendDiv(callback){
		var div3 = document.getElementById('div3');
		for(var i=0; i < 100; i++){
			var div = document.createElement('div');
			div.innerHTML = i;
			div3.appendChild(div);
			if(typeof callback === 'function'){
				callback(div);
			}
		}
	}

	appendDiv(function(node){
		node.style.display = 'none';
	});


	Function.prototype.before = function(beforefn){
		var __self = this;
		return function(){
			beforefn.apply(this,arguments);
			return __self.apply(this,arguments);
		}
	};

	Function.prototype.after = function(afterfn){
		var __self = this;
		return function(){
			var ret = __self.apply(this, arguments);
			afterfn.apply(this,arguments);
			return ret;
		}
	}

	var func = function(){
		console.log(2);
	};

	func = func.before(function(){
		console.log(1);
	}).after(function(){
		console.log(3);
	});

	func();

})();
/*函数柯里化*/
(function(){

	var cost = (function(){
		var args = [];
		return function(){
			if(arguments.length === 0){
				var money = 0;
				for(var i = 0; i<args.length; i++){
					money += args[i];
				}
				return money;
			}else {
				[].push.apply(args,arguments);
			}
		}	
	})();

	var currying = function(fn){
		var args = [];
		return function(){
			if(arguments.length === 0){
				return fn.apply(this,args);
			}else{
				[].push.apply(args,arguments);
				return arguments.callee;
			}
		}
	};

	var cost = (function(){
		var money = 0;
		return function(){
			for(var i = 0; i < arguments.length; i++){
				money += arguments[i];
			}
			return money;
		}
	})();

	var cost = currying( cost );
})();
/*uncurrying:反柯里化的作用在与扩大函数的适用性，使本来作为特定对象所拥有的功能的函数可以被任意对象所用*/
(function(){
	var obj1 = {
		name : 'lxh'
	};

	var obj2 = {
		getName: function(){
			return this.name;
		}
	}

	Function.prototype.uncurrying = function(){
		var self = this;
		return function(){
			var obj = Array.prototype.shift.call(arguments);
			return self.apply(obj,arguments);
		}
	}
	var push = Array.prototype.push.uncurrying();

	(function(){
		push(arguments,4);
		console.log(arguments);
	})(1,2,3);

	

})();


console.log('=====================================');
console.log('=====================================');
console.log('=====================================');
