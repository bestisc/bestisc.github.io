/*命令模式
	命令模式是最简单和优雅的模式之一，命令模式中的命令（command）指的是一个执行某些特定事情的指令。
	命令模式最常见的应用场景是：有时候需要向某些对象发送请求，但是并不知道请求的接收者是谁，也不知道被请求的操作是什么。此时希望用一种松耦合的方式来设计程序，使得请求发送者和请求接收者能够消除彼此之间的耦合关系。
	命令模式还支持撤销、排队等操作
*/
/*
(function(){
	//传统面向对象中的命令模式实现方法
	var setCommand = function(button,comanmd){
			button.onclick = function(){
				comanmd.execute();
			};
		}

		var MenuBar = {
			refresh : function(){
				console.log('刷新菜单目录');
			}
		};

		var SubMenu = {
			add : function(){
				console.log('增加子菜单');
			},
			del : function(){
				console.log('删除子菜单');
			}
		};

		var RefreshMenuBarCommand = function(receiver){
			this.receiver = receiver;
		};

		RefreshMenuBarCommand.prototype.execute = function(){
			this.receiver.refresh();
		};

		var AddSubMenuCommand = function(receiver){
			this.receiver = receiver;
		};

		AddSubMenuCommand.prototype.execute = function(){
			this.receiver.add();
		};

		var DelSubMenuCommand = function(receiver){
			this.receiver = receiver;
		};

		DelSubMenuCommand.prototype.execute = function(){
			this.receiver.del();
		};

		var refreshMenuBarCommand = new RefreshMenuBarCommand( MenuBar );
		var addSubMenuCommand = new AddSubMenuCommand( SubMenu );
		var delSubMenuCommand = new DelSubMenuCommand( SubMenu );
		setCommand( button1, refreshMenuBarCommand );
		setCommand( button2, addSubMenuCommand );
		setCommand( button3, delSubMenuCommand );
})();
*/
(function(){
	/*JS中命令模式实现*/
	var bindClick = function(button,func){
		button.onclick = func;
	};

	var MenuBar ={
		refresh : function(){
			console.log('刷新菜单目录');
		}
	};

	var SubMenu = {
		add:function(){
			console.log('增加子菜单');
		},
		del:function(){
			console.log('删除子菜单');
		}
	};

	bindClick(button1,MenuBar.refresh);
	bindClick(button2,SubMenu.add);
	bindClick(button3,SubMenu.del);
})();

(function(){
	//闭包实现
	var setCommand = function(button,func){
		button.onclick = function(){
			func();
		};
	};

	var MenuBar = {
		refresh : function(){
			console.log('刷新菜单界面');
		}
	};

	// var RefreshMenuBarCommand = function(receiver){
	// 	return function(){
	// 		receiver.refresh();
	// 	}	
	// };
	// var refreshMenuBarCommand = RefreshMenuBarCommand(MenuBar);
	// setCommand(button1,refreshMenuBarCommand);
	// 
	
	var RefreshMenuBarCommand = function(receiver){
		return {
			execute : function(){
				receiver.refresh();
			}
		}
	};

	var refreshMenuBarCommand = RefreshMenuBarCommand(MenuBar);
	setCommand(button1,refreshMenuBarCommand.refresh); 
})();