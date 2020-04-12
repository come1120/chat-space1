$(function(){
  function buildHTML(message){
    if (message.image) {
      var html =
      `<div class="chat_main__space-message">
        <div class="chat_main__space--message_title">
          <div class="message_user">
            ${message.user_name }
          </div>
          <div class="message_date">
            ${message.created_at }
          </div>
        </div>
        <div class="chat_main__space--message_comment">
          <p class="lower-message__content">
            ${message.content }
          </p>
          <img src="${message.image } >
        </div>
      </div>`
      return html;
    } else {
      var html = 
       `<div class="chat_main__space-message">
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
})
});