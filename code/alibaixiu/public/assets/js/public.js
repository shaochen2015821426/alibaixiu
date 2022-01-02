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
        console.log(response);
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
        console.log(html);
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