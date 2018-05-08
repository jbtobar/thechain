console.log('socketeer')
// var socket = io('http://localhost:3000');
// socket.on('connect', function(){});
// socket.on('event', function(data){});
// socket.on('disconnect', function(){});
//
//
// registerHandler('Mueller')
//
// const io = require('socket.io-client')
const socket = io.connect('http://localhost:3000')


/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// Invitation(testdata)
// socket.emit('getinvites',rapo.username)
socket.on('getinvites', function(data){
  console.log(data)
  window.duds = data
  var rec_msg = data.filter(function(d){if (d.reciever == rapo.username){return d}})
  var sent_msg = data.filter(function(d){if (d.sender == rapo.username){return d}})

  console.log('fumpy')
  var oap = d3.select('#messages_page_body_recieved')
  $('#messages_page_body_recieved').empty()
  rec_msg.forEach(function(d) {
    var tr = oap.append('tr')
    tr.append('td').text(d.sender)
    tr.append('td').text(d.reciever)
    tr.append('td').text(d.title)
    tr.append('td').text(d.message)
    try {
      var act = d.actions[0]
      tr.append('td')
      tr.append('td')
      tr.append('td').text(act)
    } catch(err) {
      tr.append('td').append('button').attr('value',d.id).attr('onclick','replyInvite(this)').attr('id','confirm_invite_button_'+d.id).text('Confirm')
      tr.append('td').append('button').attr('value',d.id).attr('onclick','replyInvite(this)').attr('id','dismiss_invite_button_'+d.id).text('Dismiss')
      tr.append('td').attr('id','dismiss_confirm_result_'+d.id)
      // console.log('changed')
    }
  })

  var oap = d3.select('#messages_page_body_sent')
  $('#messages_page_body_sent').empty()
  sent_msg.forEach(function(d) {
    var tr = oap.append('tr')
    tr.append('td').text(d.sender)
    tr.append('td').text(d.reciever)
    tr.append('td').text(d.title)
    tr.append('td').text(d.message)
    try {
      var act = d.actions[0]
      tr.append('td')
      tr.append('td')
      tr.append('td').text(act)
    } catch(err) {
      // tr.append('td').append('button').attr('value',d.id).attr('onclick','replyInvite(this)').attr('id','confirm_invite_button_'+d.id).text('Confirm')
      // tr.append('td').append('button').attr('value',d.id).attr('onclick','replyInvite(this)').attr('id','dismiss_invite_button_'+d.id).text('Dismiss')
      // tr.append('td').attr('id','dismiss_confirm_result_'+d.id)
      tr.append('td')
      tr.append('td')
      tr.append('td').text('Waiting for response...')
      // console.log('changed')
    }
  })


})
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
function replyInvite(action) {
  var id = action.value
  var notification = duds.filter(function(d){if (d.id == id){return d}})[0]
  var organization = notification.message.split(' ')[1]
  var daters = {
    username:rapo.username,
    id:id,
    action:action.id.split('_')[0],
    organization:organization
  }
  console.log(daters)
  socket.emit('respondinvites',daters)
}
socket.on('respondinvites',function(data){
  console.log(data)
  var id = data.id
  var action = data.action
  $('#confirm_invite_button_'+id).hide()
  $('#dismiss_invite_button_'+id).hide()
  d3.select('#dismiss_confirm_result_'+id).text(action)
  // console.log('respondinvites')
})
socket.on('notifications',function(data){
  console.log('You have a notification:')
  console.log(data)
  $('#GeneralModalDiv').empty()
  $('#GeneralModalClose').attr('onclick','closeModal()')
  d3.select('#GeneralModalDiv').append('p').text(data)
  openModal()
})
socket.on('notification_with_data',function(data){
  console.log('You have a notification:')
  console.log(data)
  $('#GeneralModalDiv').empty()
  $('#GeneralModalClose').attr('onclick','closeModal()')
  d3.select('#GeneralModalDiv').append('p').text(data.message)
  window.nwd = data
  openModal()
  loadBalance(data)
})
socket.on('btctx',function(data){
  console.log('btctx')
  window.btctx = data

  window.transferData = data.body

  var curr = 'BTC'
  var from = transferData.tx.addresses[0]
  var to = transferData.tx.addresses[1]
  var amount = transferData.tx.outputs[0].value
  var username = starg.recipient_username.value

  $('#GeneralModalDiv').empty()
  d3.select('#modal_content').transition().style('width','50%').style('height','50%')
  var gmdiv = d3.select('#GeneralModalDiv').append('div').attr('class','txconfclass')
  gmdiv.append('p').text('You are about to send:')
  // var asset = curr_account.issueTransaction.name.split('_')[0]
  gmdiv.append('p').text(amount +' '+curr)
  gmdiv.append('p').text('to')
  gmdiv.append('p').text('@'+username)
  gmdiv.append('p').text(to)
  var triv = gmdiv.append('form').append('tr')
  triv.append('input').attr('type','button').attr('value','Cancel').attr('onclick','confirmSignTx(this)').attr('class','ghost-button')
  triv.append('input').attr('type','button').attr('value','Confirm').attr('onclick','confirmSignTx(this)').attr('class','ghost-button')
  d3.select('#modal_content').transition().style('width','min-content').style('height','min-content')
})
socket.on('btctxpush',function(data){
  console.log('btctxpush')
  window.btctxp = data
  window.responseData = data
  signedTxResult(data)

})
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
function makeEscrow(arg) {
  console.log('makeEscrow')
  window.kark = arg
  var invite = $(arg).serializeArray()
  var buyer = kark.contract_buyer_address.value
  var seller = kark.contract_seller_address.value
  socket.emit('make_escrow',{buyer:buyer,seller:seller})
  return false
}
makeEscrowData = []
socket.on('make_escrow',function(data) {
  console.log('make escrow reciept')
  makeEscrowData.push(data)
})
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
function sendInvitation(cb) {
  socket.emit('invitation', null, cb)
}
socket.on('invitation', function(data){
  console.log('invitation')
  console.log(data)
  $('#GeneralModalDiv').empty()
  openModal()
  d3.select('#GeneralModalClose').attr('onclick','closeInviteModal()')
  d3.select('#GeneralModalDiv').append('p').text('Invitation has been send to:')
  d3.select('#GeneralModalDiv').append('p').text(data)
});
function closeInviteModal() {
  MyOrgs()
  closeModal()
}

socket.on('connect', function(){
  console.log('connect')
});

socket.on('disconnect', function(){
  console.log('disconnect')
});

  // function registerHandler(onMessageReceived) {
  //   socket.on('message', onMessageReceived)
  // }
  //
  // function unregisterHandler() {
  //   socket.off('message')
  // }

  socket.on('error', function (err) {
    console.log('received socket error:')
    console.log(err)
  })

  // function register(name, cb) {
  //   socket.emit('register', name, cb)
  // }
  //
  // function join(chatroomName, cb) {
  //   socket.emit('join', chatroomName, cb)
  // }
  //
  // function leave(chatroomName, cb) {
  //   socket.emit('leave', chatroomName, cb)
  // }
  //
  // function message(chatroomName, msg, cb) {
  //   socket.emit('message', { chatroomName, message: msg }, cb)
  // }
  //
  // function getChatrooms(cb) {
  //   socket.emit('chatrooms', null, cb)
  // }
