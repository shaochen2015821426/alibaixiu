//a:实现所有评论的展示
//a1：调用接口，获取评论数据
$.ajax({
    type: 'get',
    url: '/comments',
    success: function(response) {
        //a2:将获取的评论数据与模板结合
        var html = template('commentsTpl', response);
        $('#commentsBox').html(html);
        //b:实现页码，上一页，下一页的展示
        var pagesHtml = template('pagesTpl', response);
        $('#pagesBox').html(pagesHtml);
    }
})

//c:实现页码，上下页功能
function changePage(currentPage) {
    //c2:调用获取评论接口，传递当前页
    $.ajax({
        type: 'get',
        url: '/comments',
        data: {
            page: currentPage
        },
        success: function(response) {
            //a2:将获取的评论数据与模板结合
            var html = template('commentsTpl', response);
            $('#commentsBox').html(html);
            //b:实现页码，上一页，下一页的展示
            var pagesHtml = template('pagesTpl', response);
            $('#pagesBox').html(pagesHtml);
        }
    })

}

//d:批准和驳回功能实现：
//d1:对批准、驳回按钮进行事件委托
$('#commentsBox').on('click', '.state', function() {
    //d2：获取评论的id
    var id = $(this).attr('data-id');
    //d3:获取接口需要的评论状态，如果当前评论为0，我们需要修改为1，再调用接口
    var state = $(this).attr('data-state') == 0 ? 1 : 0;
    // d4：调用接口，更改评论状态
    $.ajax({
        type: 'put',
        url: '/comments/' + id,
        data: {
            state: state
        },
        success: function() {
            location.reload();
        }
    })
})

//e:实现删除评论功能
//e1：对删除按钮点击事件进行委托
$('#commentsBox').on('click', '.delete', function() {
    if (confirm('确定要删除该评论吗？')) {
        //e2:获取删除评论接口需要的参数：id
        var id = $(this).attr('data-id');
        //e3:调用删除评论接口
        $.ajax({
            type: 'delete',
            url: '/comments/' + id,
            success: function() {
                location.reload();
            }
        })
    }
})