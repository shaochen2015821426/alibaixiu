//a:获取文章列表
//a&b1：调用接口获取页码数据
$.ajax({
    type: 'get',
    url: '/posts',
    success: function(response) {
        //a1：将获取的数据与模板进行拼接
        var html = template('postsTpl', { data: response });
        $('#postsBox').html(html);
        //b2：将获取的页码数据和模板进行拼接
        var pageHtml = template('pageTpl', { data: response });
        $('#pageBox').html(pageHtml);
    }
})

//a3:定义一个处理日期的函数，用户日期的格式化
function formateDate(date) {
    //a4:因为传过来的参数是字符串类型，需要转换成date对象
    var date = new Date(date);
    //a5:设置需要转换的时间格式,然后返回，转：post.html中调用该函数
    var time = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
    return time;
}

//b:页码展示和功能实现
//b3:posts.html中添加点击事件，发生点击事件后调用该函数
function changePage(page) {
    //b4:获取到传递过来的页码后，调用接口，实现跳转页面功能
    $.ajax({
        type: 'get',
        url: '/posts',
        data: {
            page: page
        },
        success: function(response) {
            var html = template('postsTpl', { data: response });
            $('#postsBox').html(html);
            var pageHtml = template('pageTpl', { data: response });
            $('#pageBox').html(pageHtml);
        }
    })

}

//c:实现根据文章分类和状态筛选文章
//c1:获取文章分类列表
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(response) {
        //c2：将获取的数据和模板进行拼接
        var html = template('categoryTpl', { data: response });
        $('#categoryBox').html(html);
    }
})

//c3：为筛选表单添加提交事件
$('#filterForm').on('submit', function() {
    //c4:为表单字段添加name属性
    //c5:获取表单中的数据
    var formData = $(this).serialize();
    console.log(formData);
    //c6:调用接口实现筛选文章的功能
    $.ajax({
        type: 'get',
        url: '/posts',
        data: formData,
        success: function(response) {
            //c7:将获取的数据与模板进行拼接
            var html = template('postsTpl', { data: response });
            $('#postsBox').html(html);
            var pageHtml = template('pageTpl', { data: response });
            $('#pageBox').html(pageHtml);
        }
    })
    return false;
})

//d:实现：删除文章功能
//d1：对删除按钮的进行事件委托
$('#postsBox').on('click', '.delete', function() {
    if (confirm('确定要删除该文章吗？')) {
        //d2:获取文章的id值
        var id = $(this).attr('data-id');
        //d3:访问接口，实现删除功能
        $.ajax({
            type: 'delete',
            url: '/posts/' + id,
            success: function() {
                location.reload();
            }
        })
    }
})