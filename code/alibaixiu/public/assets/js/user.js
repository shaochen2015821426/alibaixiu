//a：实现创建用户的功能
//a1：对表单提交事件进行监听
$('#userForm').on('submit', function() {
    //a3:获取表单的数据,通过serialize（）一步获取表单数据
    var formData = $(this).serialize(); //email=cc%40it.com&nickName=cc&password=123456&status=1&role=normal
    console.log()
        //a4:访问服务器，获取数据
    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function(response) {
            //a5：创建用户成功后，刷新页面
            location.reload();
        },
        error: function(e) {
            console.log(e);
        }
    })

    //a2：停止表单的默认提交行为
    return false;
})

//b:实现：上传头像功能：
//分析：1.实现获取选择的文件；2.将文件上传到服务器端；3.将服务器中的地址赋值给隐藏域，用户上传到服务器
// $('#avatar').on('change', function() {   //为了使添加和修改（因为修改表单页面时动态添加），这样监听无效果，要使用事件委托
// })
$('#modifyBox').on('change', '#avatar', function() {
    // console.log(this.files);  this.files中包含着我们本地选择的文件
    //b1:通过formdata来保存图片数据
    var formData = new FormData();
    formData.append('avatar', this.files[0]);
    //b2:实现图片上传到服务器端
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        //告诉ajax不要解析请求参数，因为我们这个是二进制文件
        processData: false,
        //告诉ajax不要设置请求参数的类型，因为formdata中已经设置好了
        contentType: false,
        success: function(response) {
            //b3:将服务器端的图片地址赋值给控件，在页面中进行展示：
            $('#preview').attr('src', response[0].avatar);
            //b4:将服务气短的图片地址设置成隐藏与的value值，用户form表单的提交
            $('#hiddenAvatar').val(response[0].avatar);
        },
        error: function() {
            alert('上传失败');
        }

    })
})


//c:实现：展示用户列表功能
//c1：获取用户列表数据
$.ajax({
    type: 'get',
    url: '/users',
    success: function(response) {
        //c2：将获取的数据传递给模板
        var html = template('userTpl', {
            data: response
        });
        //c3：将html数据追加到页面中进行展示
        $('#userBox').html(html);

    },
    error: function(e) {
        console.log(e);
    }
})

//d:实现：点击编辑按钮展示用户信息功能
//d1：使用事件委托的方式给编辑按钮进行监听，原因：编辑是动态添加的，之间设置监听可以编辑按钮还没有创建成功
$('#userBox').on('click', '.edit', function() {
    //d2:获取当前点击的编辑按钮对应的id值//alert($(this).attr('data-id'));注意事件委托中的this指向的是儿子
    var id = $(this).attr('data-id');
    //d3:通过id获取编辑用户的信息
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function(response) {
            var html = template('modifyTpl', response);
            $('#modifyBox').html(html);
        },
        error: function(e) {
            console.log(e);
        }
    })

})

//e:实现：修改用户信息功能：为表单添加提交事件，实现修改用户信息
$('#modifyBox').on('submit', '#modifyForm', function() {
    //e1:获取用户修改的信息
    var formData = $(this).serialize();
    //e2:获取id后根据id提交数据
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'put',
        url: '/users/' + id,
        data: formData,
        success: function(response) {
            //e3：修改成功后刷新页面
            location.reload();
        },
        error: function(e) {
            console.log(e);
        }
    })



    //阻止默认提交行为
    return false;
})

//f:实现：删除用户信息功能：给删除事件添加事件委托，实现删除
$('#userBox').on('click', '.delete', function() {
    if (confirm('确定要删除吗？')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function() {
                location.reload();
            },
            error: function() {

            }
        })
    }
})

//g:实现复选框全选和全不选功能
var selectAll = $('#selectAll');
var deleteMony = $('#deleteMony');
selectAll.on('change', function() {
    // g1:获取全选框的状态
    var state = $(this).prop('checked');
    //g2:将全选框的值赋值给子复选框，保持同步
    $('#userBox').find('input').prop('checked', state);
    //h:根据需求展示"批量删除"按钮，全选框被选中展示；子复选框有被选中的展示；
    if (state) {
        deleteMony.show();
    } else {
        deleteMony.hide();
    }

})

//g3:实现子复选框的值改变影响全选复选框，通过比较全部复选框和选中复选框数目进行实现
//通过时间委托对：子复选框进行监听
$('#userBox').on('change', '.userStatus', function() {
    // g4:首先获取全部子复选框的个数
    var inputs = $('#userBox').find('input');
    //g5：获取选中的子复选框的个数
    var checkedInputs = inputs.filter(':checked');
    if (inputs.length == checkedInputs.length) {
        selectAll.prop('checked', true);
    } else {
        selectAll.prop('checked', false);
    }
    //h1:子复选框有被选中的展示；
    if (checkedInputs.length > 0) {
        deleteMony.show();
    } else {
        deleteMony.hide();
    }

})

//i:为批量删除按钮添加点击事件
deleteMony.on('click', function() {
    if (confirm('确定要批量删除吗？')) {
        //i1:获取需要删除的id，放入数组中
        var ids = [];
        var checkedUsers = $('#userBox').find('input').filter(':checked');
        checkedUsers.each(function(index, element) {
            var dataID = $(element).attr('data-id');
            ids.push(dataID);
        })

        //i2:获取到id后调用接口实现删除功能
        $.ajax({
            type: 'delete',
            url: '/users/' + ids.join('-'),
            success: function(response) {
                location.reload();
            },
            error: function(e) {

            }
        })
    }
})