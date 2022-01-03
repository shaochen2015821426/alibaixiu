//a:实现：文章详情的展示
//a1:获取文章id
var postId = getUrlParams('id');
//d3：定义评论审核的状态
var review;
//a2:根据id调用文章详情接口
$.ajax({
    type: 'get',
    url: '/posts/' + postId,
    success: function(response) {
        var html = template('postTpl', response);
        $('#postBox').html(html);
    }
})

//b:实现文章点赞功能
//b1:对‘赞’进行点击事件委托
$('#postBox').on('click', '#likes', function() {

    //  调用文章点赞接口
    $.ajax({
        type: 'post',
        url: '/posts/fabulous/' + postId,
        success: function() {
            alert('感谢你的点赞');
        }
    })
})

//c:根据要求展示评论框
$.ajax({
    type: 'get',
    url: 'settings',
    success: function(response) {
        review = response.review;
        if (response.comment) {
            //如果评论功能开启，则渲染模板
            var html = template('commentTpl');
            $('#commentBody').html(html);
        }
    }
})

//d:实现评论提交功能
//d1:对提交评论进行事件委托
$('#commentBody').on('submit', 'form', function() {
    //d2：获取调用创建评论需要的参数
    var content = $(this).find('textarea').val();
    var state;
    review ? state = 0 : state = 1;
    //d4:获取到参数后，调用接口
    $.ajax({
        type: 'post',
        url: '/comments',
        data: {
            content: content,
            post: postId,
            state: state,
        },
        success: function() {
            alert('评论成功');
            location.reload();
        },
        error: function() {
            alert('评论失败');
        }
    })

    return false;
})