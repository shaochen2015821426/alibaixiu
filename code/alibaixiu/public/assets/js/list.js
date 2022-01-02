//a：展示对应分类的文章列表
//a1：获取分类id；
var categoryId = getUrlParams('categoryId');
//a2:根据id调用接口获取分类名称
$.ajax({
    type: 'get',
    url: '/posts/category/' + categoryId,
    success: function(response) {
        //a3:通过模板引擎拼接模板和数据
        var html = template('listTpl', { data: response });
        $('#listBox').html(html);
    }
})

//a4:展示当前分类的名称
$.ajax({
    type: 'get',
    url: '/categories/' + categoryId,
    success: function(response) {
        $('#categoryName').html(response.title);
    }
})