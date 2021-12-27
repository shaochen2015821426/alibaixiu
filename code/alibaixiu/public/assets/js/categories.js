//a：为添加加分类表单设置提交事件
$('#addCategory').on('submit', function() {
    //a1：获取表单中的数据
    var formData = $(this).serialize();
    //a2:调用接口，实现提交数据
    $.ajax({
        type: 'post',
        url: '/categories',
        data: formData,
        success: function(response) {
            location.reload();
        }
    })
    return false;
})

//b:实现分类列表展示功能
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(response) {
        //b1:将获取的数据传给模板进行拼接
        //转：b2：categories.html
        var html = template('categoriesListTpl', { data: response });
        $('#cotogoriesBox').html(html);
    }
})


//c:为分类的编辑按钮添加事件委托
$('#cotogoriesBox').on('click', '.edit', function() {
    //c1:获取当前编辑分类的id
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'get',
        url: '/categories/' + id,
        success: function(response) {
            //c2:将获取到的用户信息拼接到模板上
            var html = template('modifyCategoryTpl', response);
            $('#modifyBox').html(html);
        }
    })
})

//d:为添加分类表单添加提交事件设置监听
$('#modifyBox').on('submit', '#modifyCategory', function() {
    //d1:获取需要修改分类的id
    var id = $(this).attr('data-id')
    var formData = $(this).serialize();
    //d2:根据id修改分类
    $.ajax({
        type: 'put',
        url: '/categories/' + id,
        data: formData,
        success: function(response) {
            location.reload();
        }
    })
    return false;
})

//e:为删除分类添加事件委托
$('#cotogoriesBox').on('click', '.delete', function() {
    if (confirm('确定要删除该分类吗？')) {
        //e1:获取删除数据对应的id；
        var id = $(this).attr('data-id');
        //e2:调用接口，删除id对应的分裂
        $.ajax({
            type: 'delete',
            url: '/categories/' + id,
            success: function(response) {
                location.reload();
            }
        })
    }
})