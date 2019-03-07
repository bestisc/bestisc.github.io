/*策略模式
	定义：定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换。
*/

(function(){
	var calculateBonus = function(performanceLevel,salary){
		if(performanceLevel === 'S'){
			return salary * 4;
		}
		if(performanceLevel === 'A'){
			return salary * 3;
		}
		if(performanceLevel === 'B'){
			return salary * 2;
		}
	}

	/*实例一*/
	var performanceS = function(){};
	performanceS.prototype.cancelable = function(salary){
		return salary * 4;
	};

	var performanceA = function(){};
	performanceA.prototype.cancelable = function(salary){
		return salary * 3;
	};

	var performanceB = function(){};
	performanceB.prototype.cancelable = function(salary){
		return salary * 2;
	};

	var Bonus = function(){
		this.salary = null;	//原始工资
		this.strategy = null;	//绩效等级对应的策略对象
	};

	Bonus.prototype.setSalary = function(salary){
		this.salary = salary;	// 设置员工绩效等级对应的策略对象
	};

	Bonus.prototype.setStrategy = function(strategy){
		this.strategy = strategy;
	};

	Bonus.prototype.getBonus = function(){
		return this.strategy.cancelable(this.salary);// 把计算奖金的操作委托给对应的策略对象
	};

})();

(function(){
	/*JavaScript版本的策略模式*/
	var strategies = {    
		"S": function( salary ){        
			return salary * 4;    
		},    
		"A": function( salary ){        
			return salary * 3;
		},    
		"B": function( salary ){        
			return salary * 2;    
		}
	};
	var calculateBonus = function( level, salary ){    
		return strategies[ level ]( salary );
	};
})();

(function(){
	/*运动的小球*/
	/*   * @param  {[type]} t [动画已消耗的时间]
		 * @param  {[type]} b [小球原始位置]
		 * @param  {[type]} c [小球目标位置]
		 * @param  {[type]} d [动画持续的总时间]
	 */
	var tween = {
		/**
		 * [linear description]
		 * @return {[type]}   [description]
		 */
		linear: function( t, b, c, d ){    
			return c*t/d +b;
		},
		easeIn: function( t, b, c, d ){    
			return c * ( t /= d ) * t +b;
		},
		strongEaseIn: function(t, b, c, d){    
			return c * ( t /= d ) * t * t * t * t +b;
		},
		strongEaseOut: function(t, b, c, d){    
			return c * ( ( t = t / d - 1) * t * t * t * t +1 ) +b;
		},
		sineaseIn: function( t, b, c, d ){    
			return c * ( t /= d) * t * t +b;
		},
		sineaseOut: function(t,b,c,d){    
			return c * ( ( t = t / d - 1) * t * t +1 ) +b;
		}
	};

	var Animate = function( dom ){    
		this.dom = dom;                   
		// 进行运动的dom节点    
		this.startTime = 0;               
		// 动画开始时间    
		this.startPos = 0;                
		// 动画开始时，dom节点的位置，即dom的初始位置    
		this.endPos = 0;                  
		// 动画结束时，dom节点的位置，即dom的目标位置    
		this.propertyName = null;         
		// dom节点需要被改变的css属性名    
		this.easing = null;               
		// 缓动算法    
		this.duration = null;             
		// 动画持续时间
	};

	/**
	 * [start 启动的瞬间，要记录一些信息]
	 * @param  {[type]} propertyName [要改变的CSS属性名，比如'left'、'top'，分别表示左右移动和上下移动。]
	 * @param  {[type]} endPos       [小球运动的目标位置]
	 * @param  {[type]} duration     [动画持续时间]
	 * @param  {[type]} easing       [缓动算法]
	 * @return {[type]}              [description]
	 */
	Animate.prototype.start = function(propertyName,endPos,duration,easing){
		this.startTime = +new Date;        
		// 动画启动时间    
		this.startPos = this.dom.getBoundingClientRect()[ propertyName ];  
		// dom节点初始位置    
		this.propertyName = propertyName;  
		// dom节点需要被改变的CSS属性名    
		this.endPos = endPos;  
		// dom节点目标位置    
		this.duration = duration;   
		// 动画持续时间    
		this.easing = tween[ easing ];  
		// 缓动算法    
		var self = this;    
		var timeId = setInterval(function(){      
		// 启动定时器，开始执行动画        
		if ( self.step() === false ){         
		// 如果动画已结束，则清除定时器            
			clearInterval( timeId );        
			}    
		}, 19 );
	};

	Animate.prototype.step = function(){
		var t = +new Date;        
		// 取得当前时间    
		if ( t >= this.startTime +this.duration ){       
			// 如果当前时间大于动画开始时间加上动画持续时间之和，说明动画已经结束，此时要修正小球的位置。        
			this.update( this.endPos );   
			// 更新小球的CSS属性值        
			return false;    
		}    
		var pos = this.easing( 
			t - this.startTime, this.startPos,        
			this.endPos - this.startPos, this.duration 
		);    
		// pos为小球当前位置    
		this.update( pos );    
		// 更新小球的CSS属性值
	};

	Animate.prototype.update = function(pos){
		this.dom.style[this.propertyName] = pos + 'px';
	};

	var div = document.getElementById( 'div' );
	var animate = new Animate( div );
	animate.start( 'left', 500, 1000, 'strongEaseOut' );
})();

(function(){
	/*表单校验*/
	var strategies = {
		isNonEmpty:function(value,errorMsg){
			if( value === ''){
				return errorMsg;
			}
		},
		minLength: function(value,length,errorMsg){
			if(value.length < length){
				return errorMsg;
			}
		},
		isMobile: function(value,errorMsg){
			if(!/(^1[3][5][8][0-9]{9}$)/.test(value)){
				return errorMsg;
			}
		}
	};

	var validataFunc = function(){    
		var validator = new Validator();    
		// 创建一个validator对象      
		 
		// /***************添加一些校验规则****************/    
		validator.add( registerForm.userName, 'isNonEmpty', '用户名不能为空' );    
		validator.add( registerForm.password, 'minLength:6', '密码长度不能少于6位' );    
		validator.add( registerForm.phoneNumber, 'isMobile', '手机号码格式不正确' );    
		var errorMsg = validator.start();    
		// 获得校验结果    
		return errorMsg;  
		// 返回校验结果
	}
	var registerForm = document.getElementById( 'registerForm' ); registerForm.onsubmit = function(){     
		var errorMsg = validataFunc();   // 如果errorMsg有确切的返回值，说明未通过校验     
		if ( errorMsg ){         
		alert ( errorMsg );         
		return false;    // 阻止表单提交     
	}};


})();

(function(){

	var S = function(salary){
		return salary * 4;
	};
	var A = function(salary){
		return salary * 3;
	};
	var B = function(salary){
		return salary * 2;
	};

	var calculateBonus = function(func,salary){
		return func(salary);
	};

	calculateBonus(S,10000);

})();