/*单例模式
	定义：保证一个类仅有一个实例，并提供一个访问它的全局访问点。
	单例模式的核心是确保只有一个实例，并提供全局访问。
*/
(function(){

	/*实现单例模式*/
	/*形式二*/
	var Singleton = function(name){
		this.name = name;
		this.instance = null;
	};

	Singleton.prototype.getName = function(){
		console.log(this.name);
	};

	Singleton.getInstance = function(name){
		if(!this.instance){
			this.instance = new Singleton(name);
		}

		return this.instance;
	};

	/*形式二*/
	var Singleton = function(name){
		this.name = name;
	}

	Singleton.prototype.getName = function(){
		console.log(this.name);
	}

	Singleton.getInstance = (function(){
		var instance = null;
		return function(name){
			if(!instance){
				instance = new Singleton(name);
			}
			return instance;
		}
	})();

	/*验证*/
	var obj1 = Singleton.getInstance("单例模式");
	var obj2 = Singleton.getInstance("在创建一个对象");
	console.log(obj1 === obj2);	//true

})();

(function(){

	/*透明的单例模式*/
	var CreateDiv = (function(){
		var instance;
		var CreateDiv = function(html){
			if(instance){
				return instance;
			}
			this.html = html;
			this.init();
			return instance = this;
		};

		CreateDiv.prototype.init = function(){
			var div = document.createElement('div');
			div.innerHTML = this.html;
			document.body.appendChild(div);
		};

		return CreateDiv;
	})();

	/*验证*/
	var div1 = new CreateDiv('div1');
	var div2 = new CreateDiv('div2');
	console.log(div1 === div2);	//true
})();

(function(){

	/*用代理实现单例模式*/
	var CreateDiv = function(html){
		this.html = html;
		this.init();
	};

	CreateDiv.prototype.init = function(){
		var div = document.createElement('div');
		div.innerHTML = this.html;
		document.body.appendChild(div);
	};

	var ProxySingletonCreateDiv = (function(){
		var instance;
		return function(html){
			if(!instance){
				instance = new CreateDiv(html);
			}
			return instance;
		}
	})();

	var div1 = new ProxySingletonCreateDiv('div1');
	var div2 = new ProxySingletonCreateDiv('div2');

})();
/*以上模仿传统面向对象语言创建类*/

/*惰性单例指的是在需要的时候才创建对象实例。惰性单例是单例模式的重点*/
(function(){

	/*惰性单例*/
	/*先创建好*/
	var loginLayer = (function(){
		var div = document.createElement('div');
		div.innerHTML = "我是登录浮窗";
		div.style.display = 'none';
		document.body.appendChild(div);
		return div;
	})();

	document.getElementById('loginBtn').onclick = function(){
		loginLayer.style.display = 'block';
	};

	/**/
	var createLoginLayer = (function(){
		var div;
		return function(){
			if(!div){
				div = document.createElement('div');
				div.innerHTML = '我是登录浮窗';
				div.style.display = 'none';
			}
			return div;
		}
	})();

	document.getElementById('loginBtn').onclick = function(){
		var loginLayer = createLoginLayer();
		loginLayer.style.display = 'block';
	};
})();

(function(){
	
	/*通用的惰性单例*/
	var getSingle = function(fn){
		var result;
		return function(){
			return result || (result = fn.apply(this , arguments));
		}
	};

	var createLoginLayer = function(){    
		var div = document.createElement( 'div' );    
		div.innerHTML = '我是登录浮窗';    
		div.style.display = 'none';    
		document.body.appendChild( div );    
		return div;
	};
	
	var createSingleLoginLayer = getSingle( createLoginLayer );

	document.getElementById( 'loginBtn' ).onclick = function(){    
		var loginLayer = createSingleLoginLayer();    
		loginLayer.style.display = 'block';
	};
	
	var createSingleIframe = getSingle( function(){    
		var iframe = document.createElement ( 'iframe' );    
		document.body.appendChild( iframe );    
		return iframe;
	});
	document.getElementById( 'loginBtn' ).onclick = function(){    
		var loginLayer = createSingleIframe();    
		loginLayer.src = 'http://baidu.com';
	};

})();