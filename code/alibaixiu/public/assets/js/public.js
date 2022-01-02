//该页面功能：为用户界面公共方法
//a：实现随机推荐功能
$.ajax({
    type: 'get',
    url: '/posts/random',
    success: function(response) {
        //a1:创建模板
        var randomTpl = `
        {{each data}}
        <li>
            <a href="detail.html?id={{$value._id}}">
                <p class="title">{{$value.title}}</p>
                <p class="reading">阅读({{$value.meta.views}})</p>
                <div class="pic">
                    <img src="{{$value.thumbnail}}" alt="">
                </div>
            </a>
        </li>
        {{/each}}
        `;
        //a2：使用render（）方法将模板和数据进行拼接
        var html = template.render(randomTpl, { data: response });
        $('#randomBox').html(html);
    }

})

//b:实现：最新评论展示
$.ajax({
    type: 'get',
    url: '/comments/lasted',
    success: function(response) {
        //b1:创建模板
        var commentTpl = `
        {{each data}}
        <li>
            <a href="javascript:;">
                <div class="avatar">
                    <img src="{{$value.author.avatar}}" alt="">
                </div>
                <div class="txt">
                    <p>
                        <span>{{$value.author.nickName}}</span>{{$imports.formateDate($value.createAt)}}说:
                    </p>
                    <p>{{$value.content}}</p>
                </div>
            </a>
        </li>
        {{/each}}
        `;
        var html = template.render(commentTpl, { data: response });
        $('#commentBox').html(html);
    }
})

//c:定义一个处理日期的函数，用户日期的格式化
function formateDate(date) {
    //因为传过来的参数是字符串类型，需要转换成date对象
    var date = new Date(date);
    //设置需要转换的时间格式,然后返回，转：post.html中调用该函数
    var time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    return time;
}

//d:实现：分类展示功能
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(response) {
        var categoryTpl = `
        {{each data}}
        <li>
            <a href="list.html?categoryId={{$value._id}}">
                <i class="fa {{$value.className}}"></i>{{$value.title}}
            </a>
        </li>
        {{/each}}
        `
        var html = template.render(categoryTpl, { data: response });
        $('#navBox').html(html);
        $('#topNavBox').html(html);
    }
})

//e:获取传递过来的url中参数值，用函数去获取
function getUrlParams(paramName) {
    //e2:使用location.search获取到url//['id=61c2d95f8c4a962c50bd71b2', 'age=18', 'title=china']
    var paramArr = location.search.substring(1).split('&');
    //e3：接续分割数组中的元素
    for (var i = 0; i < paramArr.length; i++) {
        //e4：获取到单个参数名=参数值的数组 ['id', '61c2d95f8c4a962c50bd71b2']
        var param = paramArr[i].split('=');
        if (param[0] == paramName) {
            //e5：如果存在对应的参数名，返回对应的参数值
            return param[1];
        }
    }
    //如果没有对应的参数名，返回-1
    return -1;
}