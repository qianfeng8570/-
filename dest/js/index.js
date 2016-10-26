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
//列表页详情页
require(["hash","js/detail.js","./js/fanke.js"],function(hash,detail,homelist){
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

	hash.addroute(/^\/$|^$/,function(url){
		console.log(url);
		homelist.shoplist(function(result){
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
		});//homelist end

	});//addroute home end
	hash.refresh();
});//require hash
//轮播图
require(["swiper","jquery"],function(Swiper,$,jquery){
	var content = $('.swiper-container');
	var mySwiper = new Swiper(content, {
	    //速度，执行动画完成的时间
	    speed: 400,
	    //加载完后 默认显示的索引
	    initialSlide : 0,
	    // 自动播放   这里是1 秒钟播放一次

	     autoplay : 1000,
	    //是否循环   最后一张时在播放就会显示第一张
	    loop : true,
	    //是否控制整屏显示，正常滑动到  1/3 后自动滚动一屏的内容
	    //设置为 true 后就不会触发这个效果
	    //freeMode  : true,
	    
	    pagination : ".swiper-pagination",
	    onInit : function(){
	    	$(".swiper-slide-active").addClass("active");
	    },
	    onTouchStart : function(){
	    	console.log("onTouchStart");
	    },
	    onTouchEnd : function(swiper){
	    	setTimeout(function(){
	    		var $ele = $(".swiper-slide").eq(swiper.activeIndex);
	    		$ele.siblings().removeClass("active");
	    		$ele.addClass("active");
	    	},0);
	    }
	});
});//require swiper end



