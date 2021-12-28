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