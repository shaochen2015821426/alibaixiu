//a:实现：热门推荐的展示
//a1：调用热门推荐列表接口
$.ajax({
    type: 'get',
    url: '/posts/recommend',
    success: function(response) {
        //创建变量放置html模板
        var recommendTpl = `
        {{each data}}
        <li>
            <a href="/detail.html?id={{$value._id}}">
                <img src="{{$value.thumbnail}}" alt="">
                <span>{{$value.title}}</span>
            </a>
        </li>
        {{/each}}
        `
        var html = template.render(recommendTpl, { data: response });
        $('#recommendBox').html(html);
    }
})