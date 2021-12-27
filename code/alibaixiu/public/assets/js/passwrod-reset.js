//a:为修改密码表单添加提交行为的监听
$('#modifyForm').on('submit', function() {
    //a1:获取用户密码数据
    var dataForm = $(this).serialize();
    //a2：获取数据后调接口
    $.ajax({
        type: 'put',
        url: '/users/password',
        data: dataForm,
        success: function() {
            //a3：修改成功后页面跳转到登录页面
            location.href = '/admin/login.html';
        },
        error: function() {

        }
    })

    //阻止默认提交行为
    return false;
})