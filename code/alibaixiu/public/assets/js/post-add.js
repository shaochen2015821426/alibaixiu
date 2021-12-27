//a:获取分类列表，提供下拉列表展示
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(response) {
        //a1:使用template方法将数据与模板进行拼接
        var html = template('categoriesTpl', { data: response });
        $('#category').html(html);
    }
})

//b:给上传文件设置监听，实现上传封面的功能
$('#feature').on('change', function() {
    //b1：获取选择的本地文件
    var file = this.files[0];
    var formData = new FormData();
    formData.append('cover', file);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        //告诉ajax不要解析data参数
        processData: false,
        //告诉ajax不要设置参数类型
        contentType: false,
        success: function(response) {
            $('#thumbnail').val(response[0].cover);
        }
    })

})

//c:为提交表单添加提交事件
$('#addForm').on('submit', function() {
    //c1:为表单里面的控件添加nama属性，便于获取value值：转：post-add.html
    //c2:获取表单数据
    var formData = $(this).serialize();
    //c3:调用接口上传文章
    $.ajax({
        type: 'post',
        url: '/posts',
        data: formData,
        success: function(response) {
            location.href = '/admin/posts.html';
        }
    })

    return false;
})


//d1:接：post.html,获取传递过来的url中参数值，用函数去获取；实现：修改文章页面展示功能
function getUrlParams(paramName) {
    //d2:使用location.search获取到url//['id=61c2d95f8c4a962c50bd71b2', 'age=18', 'title=china']
    var paramArr = location.search.substring(1).split('&');
    //d3：接续分割数组中的元素
    for (var i = 0; i < paramArr.length; i++) {
        //d4：获取到单个参数名=参数值的数组 ['id', '61c2d95f8c4a962c50bd71b2']
        var param = paramArr[i].split('=');
        if (param[0] == paramName) {
            //d5：如果存在对应的参数名，返回对应的参数值
            return param[1];
        }
    }
    //如果没有对应的参数名，返回-1
    return -1;
}

//d6:获取id后，调用接口获取修改文章数据
var postId = getUrlParams('id');
//之所以进行判断后执行，是因为要将写文章和修改文章进行区分，区分方法，url中是否传递id值
if (postId != -1) {
    $.ajax({
        type: 'get',
        url: '/posts/' + postId,
        success: function(response) {
            //var html = template('modifyTpl', response);
            //d7：调用获取分类的列表，将数据拼接到response上，成为response的一个属性
            $.ajax({
                type: 'get',
                url: '/categories',
                success: function(categories) {
                    response.categories = categories;
                    console.log(response);
                    //d8：使用获取的数据与模板进行拼接
                    var html = template('modifyTpl', response);
                    $('#modifyBox').html(html);
                }
            })
        }
    })
}

//e：实现：修改文章功能
$('#modifyBox').on('submit', '#modifyForm', function() {
    //e1:获取需要传递的接口参数
    var formData = $(this).serialize();
    var id = $(this).attr('data-id');
    //e1:访问修改文章接口，实现
    $.ajax({
        type: 'put',
        url: '/posts/' + id,
        data: formData,
        success: function() {
            location.href = '/admin/posts.html'
        }
    });

    return false;
})