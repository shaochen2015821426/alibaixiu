//a:退出功能实现:
$('#logout').on('click', function() {
    //a1:首先调用conform（）方法，启动弹框询问是否想退出,方法返回值为boolean值
    var isConfirm = confirm('确认退出登录吗？')
    if (isConfirm) {
        //a2：如果点击确定,进行退出操作
        $.ajax({
            type: 'post',
            url: '/logout',
            success: function(response) {
                location.href = 'login.html';
            },
            error: function() {
                alert('退出失败');
            }
        })
    }
})

//b:定义一个处理日期的函数，用户日期的格式化
function formateDate(date) {
    //因为传过来的参数是字符串类型，需要转换成date对象
    var date = new Date(date);
    //设置需要转换的时间格式,然后返回，转：post.html中调用该函数
    var time = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
    return time;
}