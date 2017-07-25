$(function(){
	var searchsize = $('.searchsize');
	var search = $('.search');
	
	searchsize.mouseover(function(){
		$(this).children('ul').css('display','block');
	}).mouseout(function(){
		$(this).children('ul').css('display','none');
	})
	$('.searchsize_list>li').click(function(){
		var sizename = $(this).text();
		searchsize.children('span').text('搜'+sizename);
		$(this).parent().css('display','none');
		search.val('');
		console.log(1);
	})																	//搜索栏种类切换
	

	var oldVal = '针织哈伦裤套装';
	var search_list = $('.search_list');
 
		$.getJSON('js/jsonall/searchdata.json',function(data){
			var searchgoods = null;
			var searchnum = Math.floor(Math.random()*8);
			searchgoods = data.todaygoods.split(',');
			search_list.html('<div class="search_list_tit clearfix"><span>历史记录</span><i class="search_removes">删除</i></div>');
			for (var i = 0;i < 7;i++) {
				search_list.append('<li class="clearfix"><a href="javascript:void(0);"></a><span>'+searchgoods[i]+'</span><i class="search_remove">x</i></a></li>');			
			}
			$('.search_list>li').click(function(){
				search.val($(this).children('span').text());
				search_list.css('display','none');
			})
			$('.search_remove').click(function(){
				$(this).parent().remove();
			})
			$('.search_removes').click(function(){
				$(this).parent().siblings().remove();
			})
			search.val(searchgoods[searchnum]);
			$(document).click(function(){														
				if(search_list.css('display') == 'block'){
					search.val(searchgoods[searchnum]).siblings('ul').css('display','none');						//搜索列表功能	
				}
			})	
			
		})
	
	search.focus(function(){
		oldVal = $(this).val();
		var that = $(this);
		that.val('');
		setTimeout(function(){
			that.siblings('ul').css('display','block');
		},500)
	})																	//搜索栏功能和json文本		
																			
	search_list.click(function(e){
		var e = e||window.event;
		if(e.stopPropagation){
			e.stopPropagation();	
		}else{
			e.cancelBubble = true;
		}
	})
	
	/*search搜索栏功能*/
	
	/*banner图切换开始*/
	var bannerNum = 0;
	var banner_list = $('.banner_list');
	var outbanner = $('.outbanner');
	var banner_btn_li= $('.banner_btn li');
	var timer = null;
	var off = false;
	var stimer = null;
	
	setTimeout(function(){
		off = true;
	},3900)
	
	timer = setInterval(function(){
		bannerNum++;
		bannerAction();
	},4000)
	
	outbanner.mouseenter(function(){
			clearInterval(timer);	
	}).mouseleave(function(){
		if(off){
			bannerNum++;
			bannerAction();
		}
			clearInterval(timer);
			timer = setInterval(function(){
				bannerNum++;						
				bannerAction();
			},4000)
	})
	
		banner_btn_li.mouseover(function(){
			bannerNum = $(this).index();
			bannerAction();
		})
	
	function bannerAction(){
		off = false;
		if(bannerNum == banner_list.length){bannerNum=0}
		banner_list.eq(bannerNum).addClass('show').siblings().removeClass('show');
		var newColor = banner_list.eq(bannerNum).children('img').attr('imgColor');
		outbanner.css('backgroundColor',newColor);
		banner_btn_li.eq(bannerNum).addClass('btn_show').siblings().removeClass('btn_show');
		if(stimer == null){
			clearTimeout(stimer);
			stimer = setTimeout(function(){
				off = true;
				stimer = null;
			},3900)
		}
		
	}
	/*banner图切换结束*/
	
	/*二级导航开始*/	
//	console.log($('.detail_list_one').length);
	var detail_list_one = $('.detail_list_one');
	var detail_list = $('.detail_list')
	var banner_left_menu = $('.banner_left_ul>li');
	var banner_left = $('.banner_left');
	var listNum = 0;
		banner_left_menu.mouseover(function(){
			listNum = $(this).index();
			detail_list.css('display','block');
			detail_list_one.eq(listNum).css('display','block').siblings().css('display','none');
		}).mouseout(function(){
			detail_list.css('display','none');
			detail_list_one.css('display','none');
		})
		
		detail_list_one.mouseenter(function(){
			detail_list.css('display','block');
			$(this).css('display','block').siblings().css('display','none');
		})
		detail_list.mouseleave(function(){
			detail_list.css('display','none');
			detail_list_one.css('display','none');
		})
	/*二级导航结束*/
	
	/*倒计时开始*/
		var timer_one_span = $('.timer_one>span');
		var endTime = new Date("2017/07/23 21:09:27");
		var adddate = endTime.getDate();
		var addmon = endTime.getMonth()+1;
		
		function calculate(num){
			return num = num>=10?num:'0'+num;
		}
		
		function onetimerover(){
			var now = new Date();
			if(endTime.getTime()>now.getTime()){
				var oneTime = endTime.getTime() - now.getTime();
				oneTime = parseInt(oneTime / 1000);
			}else{
				adddate++;
				if(adddate==30){adddate==1;addmon++}
				endTime = new Date("2017/"+addmon+"/"+adddate+" 21:09:27");
				var oneTime = endTime.getTime() - now.getTime();
				oneTime = parseInt(oneTime / 1000);
			}
				var o = Math.floor(oneTime / 3600);
				var m = Math.floor(oneTime / 60 % 60);
				var s = oneTime % 60;
				o = calculate(o);
				s = calculate(s);
				m = calculate(m);
				timer_one_span.eq(0).text(o);
				timer_one_span.eq(1).text(m);
				timer_one_span.eq(2).text(s);
				setTimeout(function(){
					onetimerover();	
				},1000);
			
		}
		onetimerover();	
		
			var timer_two_span = $('.timer_two>span');
			var twoendTime = new Date("2017/07/23 12:00:00");
			var twoadddate =  twoendTime.getDate();
			var twoaddmon =  twoendTime.getMonth()+1;
			
			function twotimerover(){
				var now = new Date();
				if(twoendTime.getTime()>now.getTime()){
					var twoTime = twoendTime.getTime() - now.getTime();
					twoTime = parseInt(twoTime / 1000);
				}else{
					twoadddate++;
					if(twoadddate==30){twoadddate==1;twoaddmon++}
					twoendTime = new Date("2017/"+twoaddmon+"/"+twoadddate+" 12:00:00");
					var twoTime = twoendTime.getTime() - now.getTime();
					twoTime = parseInt(twoTime / 1000);
				}
					var o = Math.floor(twoTime / 3600);
					var m = Math.floor(twoTime / 60 % 60);
					var s = twoTime % 60;
					o = calculate(o);
					s = calculate(s);
					m = calculate(m);
					timer_two_span.eq(0).text(o);
					timer_two_span.eq(1).text(m);
					timer_two_span.eq(2).text(s);
					setTimeout(function(){
						twotimerover();	
					},1000);
				
			}
			twotimerover();	
		
	/*倒计时结束*/
	
	/*3d旋转开始*/
	$.getJSON('js/jsonall/img3d.json',function(data){
		around3d(data);
	})
	
	function around3d(data){
		var imginfo = data;
		var imglistNum = 4;
		var li_img = $('.left3d>li');
		setInterval(function(){
			imglistNum++;
			if(imglistNum==14){imglistNum=0}
			var romNum = Math.floor((Math.random())*5);
			li_img.eq(romNum).css({
				'transform':'rotateY(90deg)',
    			'transition':'transform .5s ease-in'
			})
			setTimeout(function(){
				var newchild = li_img.eq(romNum);
				li_img.eq(romNum).css({
					'transform':'rotateY(-90deg)',
	    			'transition':'none'
				})
				setTimeout(function(){
					newchild.find('div').text(imginfo.img3d[imglistNum].txt);
					newchild.find('img').attr('src',imginfo.img3d[imglistNum].images);
					li_img.eq(romNum).css({
						'transform':'rotateY(0deg)',
		    			'transition':'transform 1s ease-out'
					})
				},15)
				
			},500)
			
		},4000)
	}
	

	/*3d旋转结束*/
	
	/*楼梯右侧换一批功能开始*/
	
	function newBatch(){
		var newaroundone = $('.newaroundone');
		var newaroundfour = $('.newaroundfour');
		newaroundone.click(function(){
			var $this = $(this);
			$.getJSON('js/jsonall/stairsRight.json',function(data){
				var dataimg = data.starightimg;
				var len = dataimg.length;
				var newRom = Math.floor(Math.random()*len);
				var par = $this.parent().parent();
				par.find('.five_img').children('img').attr('src',dataimg[newRom].images);
				par.find('.five_p').children('p').html(dataimg[newRom].txt);
				par.find('.five_p').children('span').html(dataimg[newRom].price);
				par.find('.five_p').children('del').html(dataimg[newRom].del);
			})
		})
		
		newaroundfour.click(function(){
			var $this = $(this);
			$.getJSON('js/jsonall/stairsRight.json',function(data){
				var dataimg = data.starightimg;
				var len = dataimg.length-4;
				var newRom = Math.floor(Math.random()*len);
				var par = $this.parent().parent();
				var four_list =  par.find('.four_list');
				var four_li = four_list.children('a');			
				for (var i = 0;i < 4;i++) {
					four_li.eq(i).find('img').attr('src',dataimg[newRom+i].images);
					four_li.eq(i).find('.goods_info').html(dataimg[newRom+i].txt);
					four_li.eq(i).find('.goods_price').html(dataimg[newRom+i].price);
				}
			
			})
		})
		
		
	}
	
	newBatch();
	/*楼梯右侧换一批功能结束*/
	
	/*无缝轮播开始*/
	
	function slBanner(){
		var slNum = 1;
		var slbox = $('.seamless_left_box');
		var slbtn = $('.seamless_title_btn>li');
		var slbtn_ul = $('.seamless_title_btn');
		var slleft = $('.seamless_left');
		var sltimer = null;
		
		slleft.mouseenter(function(){
			$('.slbtn1').css('display','block');
			clearInterval(sltimer);
		}).mouseleave(function(){
			$('.slbtn1').css('display','none');
			sltimer = setInterval(function(){
				$('.next').trigger('click');
			},3000);
		})
		
		
		$('.next').click(function(){
			slNum++;
			if(slNum>5){slNum = 1;slbox.stop().css('left','0px')}
			slbtn.eq(slNum-1).addClass('seamless_show').siblings().removeClass('seamless_show');
			slbox.stop().animate({'left':(-960*slNum)+'px'});
		});
		
		$('.prev').click(function(){
			slNum--;
			if(slNum<1){slNum = 5;slbox.stop().css('left','-5760px')}
			slbtn.eq(slNum-1).addClass('seamless_show').siblings().removeClass('seamless_show');
			slbox.stop().animate({'left':(-960*slNum)+'px'});

		});
		
		slbtn.click(function(){
			slbox.stop().animate({'left':(-960*($(this).index()+1))+'px'});
			$(this).addClass('seamless_show').siblings().removeClass('seamless_show');
			slNum = ($(this).index())+1;
		})
		
		sltimer = setInterval(function(){
			$('.next').trigger('click');
		},3000);
		
	}
	slBanner();
	/*无缝轮播结束*/
	
	/*底部动态新商品开始*/
	function newItem(){
		var needwidthbox = $(".needwidthbox");
		$.getJSON('js/jsonall/item.json',function(data){
			var dataCont = data.items;
			
			for (var i = 0;i <dataCont.length;i++) {
				var labers = '';
				for (var j = 0;j < dataCont[i].laber.length;j++) {
					labers +=  '<img src="img/item-laber'+dataCont[i].laber[j]+'.png" alt="img" />';
					console.log(labers);
				}
				
				var boxCont = '<div class="goods_item">'+
							'<a href="javascript:void(0);" class="item_wrap">找相似</a>'+
							'<a href="javascript:void(0);" class="goods_img">'+
								'<img  src="'+dataCont[i].src+'" alt="img" />'+
							'</a>'+
							'<a href="javascript:void(0);" class="goods_item_info">'+
								'<p class="item_info_p1">'+dataCont[i].info+'</p>'+
								'<p class="item_info_p2">'+labers+
								'</p>'+
								'<div class="item_money clearfix">'+
									'<p>&yen;'+dataCont[i].newp+'</p>'+
									'<del>&yen;'+dataCont[i].oldp+'</del>'+
									'<span>'+
										'<img src="img/stra1.png" alt="" />'+dataCont[i].colletion+
									'</span>'+
								'</div>'+
							'</a>'+
						'</div>';
			needwidthbox.append(boxCont);		
			}
		})
	}
	newItem();
	/*底部动态新商品结束*/
	
})
