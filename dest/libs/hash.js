define(["jquery"],function($){
	//事先保存好所有的 hash 值
	//var obj = {
//		"home.html" : function(){
//			$("#wrap").load("home.html");
//		},
//		"user.html" : function(){
//			$("#wrap").load("user.html");
//		},
//		"other.html" : function(){
//			$("#wrap").load("other.html");
//		}
	//};

	var route_url = {};
	var route_reg = [];

	function hash(){
		
		function hashchange(){
			//把 hash 值总的 # 号开头的字符给去掉，剩下的就是需要的值
			var str = location.hash.replace(/^#/i,"");
			//console.log(str+"str")
			var state = false;
			//route_url[str]&&route_url[str]();
			if(route_url[str]){
				//console.log(str);
				route_url[str](str);
				state = true;							
			}
			/*if(str in route_url){

			}*/

			if(state == false){
				for(var i=0,len = route_reg.length; i<len; i++){

					var item = route_reg[i];

					//console.log(item);
					//console.log(item.reg+".reg屬性即为正则表达式")
					//route_reg[0]的url来测试地址栏中得到的路由；route_reg[1]的url来测试地址栏中得到的路由；符合就执行它的回调函数
					if(item.reg.test(str)){
						item.callback(str);
						break;
					}
				}
			}
		}
		//监听地址栏中的 hash 改变
		$(window).on("hashchange",hashchange);
		
		
		/**
		 * 添加路由
		 * url ： 路由地址
		 * callback ： 触发这个路由所执行的回调函数
		 */
		this.addroute = function(url,callback){
			switch(typeof url){
				case "string":
					//给对象动态添加 key value
					route_url[url] = callback;
					break;
				
				case "object":
					route_reg.push({
						"reg" : url,
						"callback" : callback
					});
					break;

			}
			
		};
		//主动刷新地址栏的值，目的是触发已经绑定的路由事件
		//需求 ： 页面刷新后在显示刷新前的内容
		this.refresh = function(){
			hashchange();
		};
	}
	
	return new hash();
});
