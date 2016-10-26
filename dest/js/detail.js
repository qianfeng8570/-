define(["jquery"],function($){
	return {
		//商品专题
		getdetail :function(url,callback){
			console.log(url);
			$.get(url,{},callback,"json");
		},
		//商品详情
		getpage : function(url,callback){
			console.log(url+"page");
			$.get(url,{},callback,"json");
		}
	}
})