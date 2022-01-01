//a:实现：文章已审核篇数，未审核篇数的展示
$.ajax({
    type: 'get',
    url: '/posts/count',
    success: function(response) {
        $('#postCount').html('<strong>' + response.postCount + '</strong>篇文章（<strong>' + response.draftCount + '</strong>篇草稿）')
    }
})

//b:实现：总分类的展示
$.ajax({
    type: 'get',
    url: '/categories/count',
    success: function(response) {
        $('#categoryCount').html('<strong>' + response.categoryCount + '</strong>个分类')
    }
})

//b:实现：已审核总评论数的展示
$.ajax({
    type: 'get',
    url: '/comments/count',
    success: function(response) {
        $('#commentCount').html('<strong>' + response.commentCount + '</strong>条评论')
    }
})