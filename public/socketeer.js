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





// Invitation(testdata)
socket.emit('getinvites',rapo.username)
socket.on('getinvites', function(data){
  console.log(data)
  var oap = d3.select('#organization_activity_page')
  data.forEach(function(d) {
    var tr = oap.append('tr')
    tr.append('td').text(d.sender)
    tr.append('td').text(d.reciever)
    tr.append('td').text(d.title)
    tr.append('td').text(d.message)
  })
})


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
