$(function(){
  var last_message_id = $('.chat_main__space-message:last').data("message-id");
  console.log(last_message_id);
  function buildHTML(message){
    if (message.image) {
      var html =
      `<div class="chat_main__space-message" data-message-id=${message.id}>
        <div class="chat_main__space--message_title">
          <div class="message_user">
            ${message.user_name}
          </div>  
          <div class="message_date">
            ${message.created_at}
          </div>
        </div>
        <div class="chat_main__space--message_comment">
          <p class="lower-message__content">
            ${message.content}
          </p>
          <img src=${message.image}>
        </div>
      </div>` 
      return html;
    } else {
      var html = 
       `<div class="chat_main__space-message" data-message-id=${message.id}>
          <div class="chat_main__space--message_title">
            <div class="message_user">
              ${message.user_name}
            </div>
            <div class="message_date">
              ${message.created_at} 
            </div>
          </div>
          <div class="chat_main__space--message_comment">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
     .done(function(data){
      var html = buildHTML(data);
      $('.chat_main__space').append(html);
      $('form')[0].reset();
      $('.chat_main__space').animate({ scrollTop: $('.chat_main__space')[0].scrollHeight});
      $('.form_send_btn').attr('disabled', false);
     })
     .fail(function() {
      alert("メッセージ送信に失敗しました");
     });
    });

    
     var reloadMessages = function() {
      var last_message_id = $('.chat_main__space-message:last').data("message-id");
      console.log(last_message_id)
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        if (messages.length !== 0) {
          var insertHTML = '';
          messages.forEach(function (message) {
            insertHTML += buildHTML(message)
          });
          $('.chat_main__space').append(insertHTML);
          $('.chat_main__space').animate({ scrollTop: $('.chat_main__space')[0].scrollHeight});
        }
      })
      .fail(function() {
        alert('error');
      });
    };


    if (document.location.href.match(/\/groups\/\d+\/messages/)) {
      setInterval(reloadMessages, 7000);
    }
})
  