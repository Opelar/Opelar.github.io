$(document).ready(function(){

	var i = 0;
	// var time = setInterval(move, 5000);
	var winWidth = $(window).width();
	var footerH = -$('#footer').height();
	//滑动函数
	function animate(i) {
		if (i == 1) {
			$.ajax({
				url: 'https://api.douban.com/v2/book/1220562',
				type: 'GET',
				dataType: 'jsonp',
			})
			.done(function(obj) {
				console.log(obj);
				console.log("success");
				var tpl1 = $('#tpl_book').html();

				var template = Handlebars.compile(tpl1);
				// 调用渲染方法 ， 生成html dom
				var dom = template(obj);
				// console.log(dom);
				$('.content').html(dom);
				// $('.tra-result').show();
			})
			.fail(function() {
				console.log("error");
			})
			.always(function() {
				console.log("complete");
			});
		}

		$('#list').children().eq(i).addClass('active').siblings().removeClass('active');

		// $('#section>div').eq(0).css({ 'marginLeft': winWidth + 'px'});

		$('#section').css({ left: -winWidth*i + 'px' });
	}

	//向右滑动函数
	function move() {

		if (i < 3 ) {

			i++;

			animate(i);
		}

	}

	//向左滑动函数
	function moveLeft() {

		if (i > 0) {

			i--;

			animate(i);
		}

	}


	//小圆点点击事件
	$('#list li,#side li').on('click', function() {
		$(this).addClass('active').siblings().removeClass('active');

		var index = $(this).index();

		// i = index; //与定时器统一

		animate(index);

	});

	// $('#list').children().hover(function(){
	// 	$(this).addClass('animated swing').siblings().removeClass('animated swing');
	// });

	//绑定键盘事件
	$(window).on('keydown', function(e) {

		var keyCode = e.keyCode;

		if (keyCode == 37 || keyCode == 38) {

			moveLeft();
			// console.log('向左');
		} else if (keyCode == 39 || keyCode == 40) {

			move();
			// console.log('向右');
		}
	});

	//绑定鼠标滚轮事件
	// $(document).on('mousewheel DOMMouseScroll', function(e) {
	// 	e.preventDefault();
	// 	var value = e.originalEvent.wheelDelta || -e.originalEvent.deltail;
	// 	var delta = Math.max(-1, Math.min(1, value));
	// 	if (delta > 0) {
	// 		moveLeft();
	// 		// console.log('向左');
	// 	} else if (delta < 0) {
	// 		move();
	// 		// console.log('向右');
	// 	}
	// 	return false;
	// });

	//鼠标移入定时器结束，移出开始
	/*$('body').hover(function() {

		clearInterval(time);

	}, function() {

		time = setInterval(move,5000);

	});*/

	$('#nav-left').click(function(){
		// console.log('123');
		// $(this).hide();
		// $('#footer').css({bottom: footerH + 'px'});
		$('.box').fadeIn();
		$('.side').css('left', 0);

	});
	$('#nav-bottom').click(function(){
		if ($(this).hasClass('show')) {
			$(this).removeClass('show').html('底部菜单')
			$('#footer').css({bottom: footerH + 'px'});
		} else {

			$(this).addClass('show').html('隐藏底部');
			$('#footer').css('bottom', 0);
		}
	});

	$('#box,.side>ul>li').click(function(){
		// console.log('123321');
		$('#box').fadeOut();
		$('#side').css('left', '-200px');
	});

/**
 *  translate
 */

	 $('input[type="text"]').change(function() {
		//  alert('123213');
		 ajax_translate();
	 });
	 $('.btn').click(function() {
		 ajax_translate();
 	 });
	 function ajax_translate() {
		 var trans = $('input[type="text"]').val();
 		 if (trans == '') {
 			alert('请输入您需要翻译的文本');
 		 } else {
 			var url = 'http://fanyi.youdao.com/openapi.do?keyfrom=static-trans&key=252365449&type=data&doctype=jsonp&version=1.1&q='+trans;
 		    $.ajax({
 				url: url,
 				type: 'GET',
 				dataType: 'jsonp',
 			})
 			.done(function(obj) {
 				console.log("success");
 				console.log(obj);
 				var err = obj.errorCode;
 				switch (err) {
 					case 0:
 						show(obj);
 						break;
 					case 20:
 						alert('要翻译的文本过长');
 						break;
 					case 30:
 						alert('无法进行有效的翻译');
 						break;
 					case 40:
 						alert('不支持的语言类型');
 						break;
 					case 50:
 						alert('无效的key');
 						break;
 					case 60:
 						alert('无词典结果，仅在获取词典结果生效');
 						break;
 					default:
 				}

 				function show(obj) {
					// 获取模板字符串
					var tpl = $('#tpl').html();
 					// 生成模板render方法 （预编译）
 					var template = Handlebars.compile(tpl);
 					// 调用渲染方法 ， 生成html dom
 					var dom = template(obj);
					// console.log(dom);
 					$('.list').html(dom);
 					$('.tra-result').show();
 				}
 			})
 			.fail(function() {
 				console.log("error");
 			})
 			.always(function() {
 				console.log("complete");
 			});
 		}
	 }

});
