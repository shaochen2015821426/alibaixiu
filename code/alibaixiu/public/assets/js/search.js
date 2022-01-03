//a：实现搜索结果的展示
//a1：获取url中的key值
var key = getUrlParams('key');
//a2:根据获取的key值调用搜索文章接口
$.ajax({
    type: 'get',
    url: '/posts/search/' + key,
    success: function(response) {
        console.log(response);
        //拼接数据和模板
        var html = template('searchTpl', { data: response });
        $('#searchBox').html(html);
    }
})