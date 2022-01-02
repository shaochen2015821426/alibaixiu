//a:实现轮播图的展示功能
//a1：调用获取轮播图列表接口
$.ajax({
    type: 'get',
    url: '/slides',
    success: function(response) {
        //a2:将获取的数据与模板进行拼接
        var html = template('slideTpl', { data: response });
        $('#slideBox').html(html);
        //a3：将轮播图功能放在页面拼接之后
        var swiper = Swipe(document.querySelector('.swipe'), {
            auto: 3000,
            transitionEnd: function(index) {
                // index++;

                $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
            }
        });
        // 上/下一张
        $('.swipe .arrow').on('click', function() {
            var _this = $(this);

            if (_this.is('.prev')) {
                swiper.prev();
            } else if (_this.is('.next')) {
                swiper.next();
            }
        })
    }
})

//b:实现：最新发布页面展示
//b1:调用最新发布列表接口
$.ajax({
    type: 'get',
    url: '/posts/lasted',
    success: function(response) {
        console.log(response);
        //使用模板引擎，让模板和数据进行拼接
        var html = template('lastedTpl', { data: response });
        $('#lastedBox').html(html);

    }
})