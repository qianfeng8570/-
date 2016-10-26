//加载图片
require(["./js/fanke.js"],function(list){
	//console.log(list)//返回fanke.js中函数的return

	//shoplist方法中传入了一个函数带有result这个参数
	list.shoplist(function(result){
		if(result.success){
			var tpl = '<a href="#{{link}}">';
			tpl += '<img src="{{src}}">';
			tpl += '</a>';
			var html = "";
			result.list.forEach(function(item,index){
					//console.log(item)
					html += format(tpl,item);
			});
			$(".con_bot",".content").html(html);
		}
	})
})
function format(html,data){
	return html.replace(/{{([\w]+)}}/ig,function(value,key){
			//console.log(value+"正则匹配到的,匹配到几处，有几个key也一样");
			//console.log(key+"第一个小括号,可以有多个");			
			return data[key] || value;
	})
}
//
require(["hash","js/detail.js"],function(hash,detail){
	hash.addroute(/^\/shop\/detail/,function(url){
		$(".con_bot",".content").html("loading...");
		detail.getdetail(url,function(result){
			if(result.success){
				var tpl = '<li>';
				tpl += '<a href="#{{link}}">';
				tpl += '<img src="{{src}}"/>';
				tpl += '<p>{{name}}</p>';
				tpl += '<p>{{price}}</p>';
				tpl += '</a></li>';

				var html = '<figure>'+'<div class="list">'+
					'<ul>';

				result.data.forEach(function(item,i){
					//console.log(item+"没次循环的值")
					html += format(tpl,item);
				});

				html += '</ul>'+'</div>'+'</figure>';
				$(".con_bot",".content").html(html);

			}
		});//getdetail end
	});//addroute end
	hash.addroute(/^\/page\/[0-9]+/,function(url){
			detail.getpage(url,function(result){
				console.log(result);
				if(result.success){					

					var tpl = '<li>';
										
					result.data.imgs.forEach(function(item,i){
						tpl += '<img src="{{'+i+'}}"/>';
						
					})

					tpl = format(tpl,result.data.imgs);

					tpl += '<p>{{name}}</p>';
					tpl += '<p>{{price}}</p>';
					tpl += '</a></li>';
					console.log(tpl)

					var html = '<figure>'+'<div class="list">'+
											'<ul>';
					console.log(result.data.imgs)
					
					//result.data.forEach(function(item,i){
						html += format(tpl,result.data);
					//});


					html += '</ul>'+'</div>'+'</figure>';
					$(".con_bot",".content").html(html);

				}//if end

			})

			//hash.addroute(/^\/$|^$/,function())
		
	})//addroute page end
});//require hash




