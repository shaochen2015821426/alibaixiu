//a:实现：图片轮播的图片上传功能
//a1:对选择本地的文件的file控件进行进行
$('#file').on('change', function() {
    //a2:获取选择的本地文件
    var file = this.files[0];
    //a3:使用formdata对象存贮file文件
    var formData = new FormData();
    formData.append('image', file);
    //a3：获取到需要传递的参数后，调用接口实现图片上传功能
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            $('#image').val(response[0].image);
        }
    })

})

//b:实现：轮播图页面数据上传
//b1：对提交事件进行监听
$('#slideForm').on('submit', function() {
    //b2:在slide.html对应的表单中添加name属性
    var formData = $(this).serialize();
    //b3:获取到参数后，调用添加轮播图接口
    $.ajax({
        type: 'post',
        url: '/slides',
        data: formData,
        success: function() {
            location.reload();
        }
    })
    return false;
})

//c:展示轮播图列表
//c1：调用获取轮播图列表的接口
$.ajax({
    type: 'get',
    url: '/slides',
    success: function(response) {
        //c2:将获取的列表数据与模板进行拼接
        var html = template('slideListTpl', { data: response })
        $('#slideListBox').html(html);
    }
})

// d:实现：删除轮播图
//d1：对删除按钮点击事件进行委托
$('#slideListBox').on('click', '.delete', function() {
    if (confirm('确定要删除该轮播图吗？')) {
        //d2：获取删除接口需要的id值
        var id = $(this).attr('data-id');
        //d3：调用删除接口，删除id值对应的轮播图
        $.ajax({
            type: 'delete',
            url: '/slides/' + id,
            success: function() {
                location.reload();
            }
        })
    }
})