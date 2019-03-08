/*迭代器模式
	迭代器模式是指提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示。迭代器模式可以把迭代的过程从业务逻辑中分离出来，在使用迭代器模式之后，即使不关心对象的内部构造，也可以按顺序访问其中的每个元素。

	迭代器模式提供了循环访问一个聚合对象中每个元素的方法，但它没有规定我们以顺序、倒序还是中序来循环遍历聚合对象。
*/




var each = function(any,callback){
	for(var i=0;i<any.length;i++){
		callback.call(any[i],i,any[i]);
	}
};

each([1,2,3,4],function(i,n){
	console.log(i);
	console.log(n);
});


(function(){
	//内部迭代器
	var compare = function(ary1,ary2){
		if(ary1.length !== ary2.length){
			throw new Error('ary1和ary2不相等');
		}
		each(ary1,function(i,n){
			if(n !== ary2[i] ){
				throw new Error('ary1和ary2不相等');
			}
		});
		console.log("ary1 == ary2");
	};
})();

(function(){
	//外部迭代器
	var Iterator = function(obj){
		var current = 0;
		
		var next = function(){
			current += 1;
		};

		var isDone = function(){
			return current >= obj.length;
		};

		var getCurrItem = function(){
			return obj[current];
		};

		return {
			next : next,
			isDone : isDone,
			getCurrItem : getCurrItem
		}
	};

	var compare = function(iterator1, iterator2){
		while (!iterator1.isDone() && !iterator2.isDone()) {
			if(iterator1.getCurrItem() != iterator2.getCurrItem()){
				throw new Error('iterator1 != iterator2');
			}
			iterator1.next();
			iterator2.next();
		}
		console.log("iterator1 == iterator2");
	}
})();

(function(){
	/*jQuery封装$.each函数*/
	$.each = function(obj,callback){
		var value,
		var i = 0;
		var length = obj.length;
		var isArray = isArraylike(obj);
		if(isArray){	//迭代类数组
			for(;i<length;i++){
				value = callback.call(obj[i],i,obj[i]);
				if(value === false){
					break;
				}
			}
		}else{
			for(i in obj){	//迭代object对象
				value = callback.call(obj[i],i,obj[i]);
				if(value === false){
					break;
				}
			}
		}
		return obj;
	};
})();

(function(){
	/*倒叙迭代器*/
	var reverseEach = function(arr,callback){
		for(var le = arr.length-1;le >= 0;le--){
			callback(le,arr[le]);
		}
	};
	reverseEach([1,2,3],function(i,n){
		console.log(n);
	});
})();

