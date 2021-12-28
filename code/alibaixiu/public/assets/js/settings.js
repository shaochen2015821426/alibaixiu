//a:实现图标文件的上传
//a1：对file控件进行监听
$('#logo').on('change', function() {
    //a2:获取本地选择的文件
    var file = this.files[0];
    //a3:将获取的文件保存在formdata对象中便于传递参数
    var formData = new FormData();
    formData.append('logo', file);
    //a4:获取到本地文件后，调用上传图片接口，实现上传
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            //a5：将url赋值给隐藏域，用于上传
            $('#hiddenLogo').val(response[0].logo);
            $('#preview').attr('src', response[0].logo);
        }
    })
})

//b:实现：网站设置表单的提交功能
//b1:对表单提交进行事件监听
$('#settingForm').on('submit', function() {
    //b2:设置setting.html中的控件，添加name属性
    var formData = $(this).serialize();
    //b3：调用网站配置的接口，实现数据上传
    $.ajax({
        type: 'post',
        url: '/settings',
        data: formData,
        success: function() {
            location.reload();
        }
    })
    return false;
})