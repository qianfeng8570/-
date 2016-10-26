define(["jquery"],function($){
	return {
		"shoplist" : function(callback){
			$.get("/shoplist/list",{},function(result){
				//执行这个函数传入的参数为请求到的数据callback为传入shoplist的带有rusult的函数
				/*console.log(result.list+"result");*/
				callback(result);
				/*function(result){
					if(result.success){
						var tpl = '<a href="#{{link}}">';
						tpl += '<img src="{{src}}">';
						tpl += '</a>';
						var html = "";
						result.list.forEach(function(item,index){
								html += format(tpl,item);
						});
						$(".con_bot",".content").html(html);
					}
				}*/
			},"json");
		}
	}
})