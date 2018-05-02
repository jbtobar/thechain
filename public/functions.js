const Waves = WavesAPI.create(WavesAPI.TESTNET_CONFIG);
// const password = '0123456789';
// const encrypted = seed.encrypt(password);
// const restoredPhrase = Waves.Seed.decryptSeedPhrase(encrypted, password);
// const seed = Waves.Seed.fromExistingPhrase('a seed from an account with some funds');
// const seed,
// const restoredPhrase,


function checkBalance() {
  var myad_2 = address
  console.log(myad_2)
  const transferData = {
      recipient: myad_2,
      assetId: 'WAVES',
      // am 1000000000 <- this amount is 10 WAVES
      amount: 100000,
      feeAssetId: 'WAVES',
      fee: 100000,
      // 140 bytes of data (it's allowed to use Uint8Array here)
      attachment: '',
      timestamp: Date.now()
  };

  Waves.API.Node.v1.assets.transfer(transferData, seed_1.keyPair).then((responseData) => {
      console.log(responseData);
      window.responseData = responseData

      // res.send(JSON.stringify({ usercreated: responseData }));
  });
}


function createUser(form,seed,encrypted) {
	var user = forma.children[0].value
  // window.rapo = seed
	$.post( "usercreation", {
      method:"POST",
      username:user,
      seedaddress:seed.address,
      seedphrase:encrypted,
    })
  .done(function( data ) {
    window.rapo = data
    openWalletWindow(data)
    // openNewWallet(data)
  })

}




var open_account_sent = 0

function openAccount(arg) {
  if (open_account_sent == 1) {
    console.log('you already tried to open')
    return false
  } else {
    window.open_account_sent = 1
    var user = arg.children.user.value
    window.accounter = arg
    console.log('openaccount')
    $.post( "wallet", {
        method:"POST",
        username:user,
      })
    .done(function( data ) {
      var data = JSON.parse(data)
      // var data['data'] = JSON.parse(data['data'])
      window.rapo = data
      // window.rapo.data =  JSON.parse(rapo['data'])
      console.log(data)
      var topaz = arg.children.password1.value
      console.log(topaz)
      // const password = '0123456789';
      // const encrypted = seed.encrypt(topaz);
      const encrypted = data.encrypted
      console.log(encrypted)
      try {
          window.restoredPhrase = Waves.Seed.decryptSeedPhrase(encrypted, topaz);
          window.seed = Waves.Seed.fromExistingPhrase(restoredPhrase);
          window.rapo['unlocked'] = true
          // window.rapo['data'] =  JSON.parse(rapo['data'])
          // console.lod()
          // console.log('oi')
          openWalletWindow(seed)
      }
      catch(err) {
          alert(err.message);
      }




    })
    return false
  }
}


function registerForm() {
  console.log('register Form')
  $('#div_form1').hide()
  $('#div_form2').show()
}




function checkUser(input) {
  // console.log(input)
  window.inni = input
	$.post( "usercheck", {
      method:"POST",
      username:input.value,
    })
  .done(function( data ) {

  	window.data = data;
    // alert( "Data Loaded: " + data );
    if (data['a'] == true) {
      if (input.name == 'user') {
        input.setCustomValidity('Username not found');
      } else {
        input.setCustomValidity('');
      }
    	// input.setCustomValidity('');
    } else {
        // input is valid -- reset the error message
        if (input.name == 'user') {
          input.setCustomValidity('');
          // console.log('User found')
        } else {
          input.setCustomValidity('Username already taken');
        }

    }

  });

}


function check(input) {
    if (input.value != document.getElementById('password').value) {
        input.setCustomValidity('Password Must be Matching.');
    } else {
        // input is valid -- reset the error message
        input.setCustomValidity('');
    }
}



function validate(form) {
	window.forma = form
	const password = forma.children.password.value
	// console.log(form)

  var alert_message = "The only two ways to access your account are through your password and through the Pass Phrase that will be created next.\n Your password cannot be restored.\n As a backup, we recommend storing the Pass Phrase that will appear in the following window in a piece of paper and keeping it safe"


	if (confirm(alert_message) == false) {
		return false
	} else {
		const seed = Waves.Seed.create();
	  // console.log(seed.phrase);
		// console.log(seed.address);
		const encrypted = seed.encrypt(password);
		// console.log(encrypted);
    alert("The Following is your Pass Phrase. Please keep it safe!\n \n \n "+seed.phrase)
		console.log('creatinguser')
		createUser(form,seed,encrypted)
		return false
	}


}

// function openNewWallet(data) {
//   $('#div_form2').hide()
//   $('#div_form1').hide()
//   $('#walletwindow').show()
//   var address = rapo.address
//   window.duta = data
//   // window.rapo = {}
//   console.log('new')
//   console.log(data)
//   try {
//     Waves.API.Node.v1.assets.balances(address).then((balancesList) => {
//       console.log('fluubber')
//        console.log(balancesList);
//        rapo.balances = balancesList
//     });
//   } catch(err) {
//     alert(err)
//   }
//   try {
//     Waves.API.Node.v1.addresses.balance(address).then((balance) => {
//         console.log(balance);
//         rapo.balance = balance
//     });
//   } catch(err) {
//     alert(err)
//   }
//
//
//
//   d3.select('#name1').attr('value','@'+rapo.username)
//   rapo.balances.balances.forEach(function(d){
//       var name = d.issueTransaction.name
//       var peg_or_not = name.split('_')[1]
//       if (peg_or_not == 'Pegger'){
//         var name = name.split('_')[0]
//         d3.select('#walletwindowform')
//             .append('label')
//             .attr("class","ghost-input ghost-label-top")
//             .text(name+' Balance')
//         d3.select('#walletwindowform')
//             .append('input')
//             .attr("class","ghost-input ghost-label-bottom")
//             .attr('value',d.balance)
//             .attr('readonly',true)
//       }
//
//   })
//
//   resetConf()
//   // d3.select('#conf3').attr('value','green')
//   buildMenus()
//   pageControl('button1')
//   settingsUpdate('load')
// }


function openWalletWindow(data) {
  $('#div_form2').hide()
  $('#div_form1').hide()
  $('#walletwindow').show()
  console.log('open wallet window data')
  console.log(data)
  try {
    var myad = rapo.insert_body.seedaddress
  } catch(err) {
    var myad = rapo.balance.address
  }

    // myad = data.balance.address

  Waves.API.Node.v1.addresses.balance(myad).then((balance) => {
      console.log(balance);
      window.rapo.balance = balance
  }).catch(function(err){console.log(err)});
  Waves.API.Node.v1.assets.balances(myad).then((balancesList) => {
    console.log('fluubber')
     console.log(balancesList);
     window.rapo.balances = balancesList
     rapo.balances.balances.forEach(function(d){
         var name = d.issueTransaction.name
         var peg_or_not = name.split('_')[1]
         if (peg_or_not == 'Pegger'){
           var name = name.split('_')[0]

           d3.select('#walletwindowform')
               .append('label')
               .attr("class","ghost-input ghost-label-top")
               .text(name+' Balance')
           var irow = d3.select('#walletwindowform').append('tr')
           irow.append('input')
               .attr('id',name+'_send_input')
               .attr("class","ghost-input ghost-label-bottom bwd_rs")
               .attr('value','Send')
               .attr('onclick','DepositWithdrawSend(this)')
               .attr('readonly',true)
           // d3.select('#walletwindowform')
           irow.append('input')
               .attr('id',name+'_balance_input')
               .attr("class","ghost-input ghost-label-bottom bwd_l")
               .attr('value',d.balance)
               .attr('readonly',true)
           // d3.select('#walletwindowform')
           irow.append('input')
               .attr('id',name+'_deposit_input')
               .attr("class","ghost-input ghost-label-bottom bwd_r")
               .attr('value','Deposit')
               .attr('onclick','DepositWithdrawSend(this)')
               .attr('readonly',true)
           // d3.select('#walletwindowform')
           irow.append('input')
               .attr('id',name+'_withdraw_input')
               .attr("class","ghost-input ghost-label-bottom bwd_r")
               .attr('value','Withdraw')
               .attr('onclick','DepositWithdrawSend(this)')
               .attr('readonly',true)

         }
     })
     settingsUpdate('load')
  }).catch(function(err){console.log(err)});


  d3.select('#name1').attr('value','@'+rapo.username)
  // var balance = rapo.balance.balance/100000000
  // d3.select('#name2').attr('value',balance)
  // try {
  //
  // } catch(err) {
  //   console.log('0 balances')
  //   // var
  //   d3.select('#walletwindowform')
  //       .append('label')
  //       .attr("class","ghost-input ghost-label-top")
  //       .text(' Balance')
  //   d3.select('#walletwindowform')
  //       .append('input')
  //       .attr("class","ghost-input ghost-label-bottom")
  //       .attr('value',0)
  //       .attr('readonly',true)
  //
  // }
  resetConf()
  // d3.select('#conf3').attr('value','green')
  buildMenus()
  pageControl('button1')
  // settingsUpdate('load')
}
// mapo = rapo.balances.balances
// mapo
// rapo.balances.balances.find(funcit)



function DepositWithdrawSend(action) {
  window.acta = action
  console.log(action)
  openModal()
  // d3.select('#GeneralModalDiv').empty()
  // $('#GeneralModalDiv').empty()
  var gmdiv = d3.select('#GeneralModalDiv')
  console.log(gmdiv)
  if (action.value == 'Send') {
    var curr = acta.id.split('_')[0]
    var curr_name = curr+'_Pegger'
    var curr_account = rapo.balances.balances.find(function(x){if (x.issueTransaction.name == curr_name){return x}})
    var curr_balance = curr_account.balance
    gmdiv.append('p').text('Hello there')
    gmdiv.append('p').text('Send Transaction')
    // gmdiv.append('p').text('Your '+curr+' Balance is: '+curr_balance.toString())
    var forma = gmdiv.append('form').attr('action','/').attr('onsubmit','return SendTransaction(this)').attr('method','post').attr('id',curr+'_transaction_form')
    forma.append('label').attr('class','ghost-input ghost-label-left').text('From')
    forma.append('input').attr('name','account').attr('type','text').attr('class','ghost-input ghost-label-right').attr('value',curr+' Account').attr('readonly','true')

    forma.append('label').attr('class','ghost-input ghost-label-left').text('Amount')
    forma.append('input').attr('name','amount').attr('type','number').attr('class','ghost-input ghost-label-right').attr('placeholder',0.00).attr('required','required')

    forma.append('label').attr('class','ghost-input ghost-label-left').text('To')
    forma.append('input').attr('name','recipient').attr('type','text').attr('class','ghost-input ghost-label-right').attr('placeholder','Search for User').attr('required','required')
    forma.append('div').attr('id','TxResponse')

    forma.append('label').attr('class','ghost-input ghost-label-left').text('Message')
    forma.append('input').attr('name','attachment').attr('type','text').attr('class','ghost-input ghost-label-right').attr('placeholder','Enter up to 140 characters')

    forma.append('input').attr('type','submit').attr('class','ghost-button').attr('value','Send Transaction')
  } else {
    gmdiv.append('p').text('Hello there')
    gmdiv.append('p').text(action.value+' functionality is coming soon.')
  }
}



function SendTransaction(arg) {
  // window.parg = arg
  var curr = arg.id.split('_')[0]
  var curr_name = curr+'_Pegger'
  var curr_account = rapo.balances.balances.find(function(x){if (x.issueTransaction.name == curr_name){return x}})
  var formdata = $(arg).serializeArray()
  var fd_dict = {}
  formdata.forEach(function(d){
    a = d.name,
    b = d.value,
    fd_dict[a] = b
  })
  // formdata = d3.entries()
  console.log('send transaction')
  $.post("sendtransaction", {
    method:'POST',
    username:rapo.username,
    formdata:fd_dict,
    curr_account:curr_account,
  }).done(function(data) {
    console.log(data)
    var daters = JSON.parse(data)
    window.fata = daters
    var input = arg.recipient
    if (daters.account_name == 0) {
      $('#TxResponse').empty()
      d3.select('#TxResponse').append('p').text('Username not found')
    } else {
      $('#TxResponse').empty()
      d3.select('#TxResponse').append('p').text('')
      TxSend(curr_account,input,daters,fd_dict)
    }
    return false
  })
  return false
}

function TxSend(curr_account,input,daters,fd_dict) {
  window.gorki = [curr_account,input,daters,fd_dict]
  console.log('gorki')
  // var form_id = formdata.account.split('_')[0]
  // var form = d3.select('#'+curr+'_transaction_form')
  // form.hide()
  $('#GeneralModalDiv').empty()
  d3.select('#modal_content').transition().style('width','50%').style('height','50%')
  // d3.select('#modal_content').transition().style('height','100%')

  var gmdiv = d3.select('#GeneralModalDiv').append('div').attr('class','txconfclass')
  var recipient = daters.recipient_address
  const transferData = {
      // An arbitrary address; mine, in this example
      recipient: recipient,
      // ID of a token, or WAVES
      assetId: curr_account.assetId,
      // The real amount is the given number divided by 10^(precision of the token)
      amount: Number(fd_dict.amount),
      // The same rules for these two fields
      feeAssetId: 'WAVES',
      fee: 100000,
      // 140 bytes of data (it's allowed to use Uint8Array here)
      attachment: '',
      timestamp: Date.now()
  };
  window.transferData = transferData

  gmdiv.append('p').text('You are about to send:')
  var asset = curr_account.issueTransaction.name.split('_')[0]
  gmdiv.append('p').text(transferData.amount +' '+asset)
  gmdiv.append('p').text('to')
  // var address = '3MqWgNDKeJhA8poSfAgXvhEhKTSzYVwkqx9'
  $.post('confirm_ua',{
    method:'POST',
    address:recipient,
  }).then(function(data){
    window.blala = JSON.parse(data)
    console.log('blala')
    var reciever = blala.recipient[0].username
    gmdiv.append('p').text('@'+reciever)
    window.transferDataSummary = {
      reciever:reciever,
      asset:asset,
    }
    var triv = gmdiv.append('form').append('tr')
    triv.append('input').attr('type','button').attr('value','Cancel').attr('onclick','confirmTx(this)').attr('class','ghost-button')
    triv.append('input').attr('type','button').attr('value','Confirm').attr('onclick','confirmTx(this)').attr('class','ghost-button')
    d3.select('#modal_content').transition().style('width','min-content').style('height','min-content')
  }).catch(function(err){console.log(err)})

  // console.log(transferData)
  // Waves.API.Node.v1.assets.transfer(transferData, seed.keyPair).then((responseData) => {
  //     console.log(responseData);
  //     window.responseData = responseData
  //     var gmdiv = d3.select('#GeneralModalDiv').text(responseData)
  // });
}
// $.post("va")


function confirmTx(arg) {
  // transferData
  window.miss = arg
  if (miss.value == 'Cancel') {closeModal()}
  if (miss.value == 'Confirm'){
    $('#GeneralModalDiv').empty()
    $('#GeneralModalClose').hide()
    var loader_svg = d3.select('#GeneralModalDiv').append('img').attr('id','loading_svg').attr('src',"/public/assets/Rolling-1s-200px.svg").attr('alt',"embedded SVG")
    console.log(transferData)
    Waves.API.Node.v1.assets.transfer(transferData, seed.keyPair).then((responseData) => {
        console.log(responseData);
        window.responseData = responseData
        var rd_id = responseData.id
        var rd_date = new Date(responseData.timestamp)
        var rd_amount = responseData.amount
        $.post('log_tx',{txData:responseData}).then(function(data){
          var parsed_data = JSON.parse(data)
          console.log(data)
          loader_svg.remove()
          $('#GeneralModalClose2').show()
          var gmdiv = d3.select('#GeneralModalDiv')
                        // .transition(10000)
          gmdiv.append('p').text('Transaction Send!')
          gmdiv.append('p').text('Transaction ID').attr('style','color: #4b545f;width:600px')
          gmdiv.append('p')
                .text(parsed_data.id)
          gmdiv.append('p').text('Date').attr('style','color: #4b545f;')
          gmdiv.append('p')
                .text(rd_date.toLocaleString())
          gmdiv.append('p').text('Amount').attr('style','color: #4b545f;')
          gmdiv.append('p')
                .text(rd_amount+' '+transferDataSummary.asset)
          gmdiv.append('p').text('To').attr('style','color: #4b545f;')
          gmdiv.append('p')
                .text(transferDataSummary.reciever)
        }).catch(function(err){console.log(err)})

    }).catch(function(err){console.log(err)});
  }
}


function reloadBalances(arg){
  if (arg == 'tx') {
    var name = transferDataSummary.asset
    var prev_bal = Number($('#'+name+'_balance_input').val())
    var transfer_amount = responseData.amount
    var new_bal = prev_bal - transfer_amount
    d3.select('#'+name+'_balance_input').attr('value',new_bal)
  } else {
    var myad = rapo.balance.address
    Waves.API.Node.v1.assets.balances(myad).then((balancesList) => {
      window.rapo.balances = balancesList
      rapo.balances.balances.forEach(function(d){
      var name = d.issueTransaction.name.split('_')[0]
      if (arg == name) {
        d3.select('#'+name+'_balance_input').attr('value',d.balance)
        console.log('updated: '+name)
      }
      })
    }).catch(function(err){console.log(err)})
  }
}

// var mok = d3.select('body').append('img').attr('src',"/public/assets/Rolling-1s-200px.svg").attr('alt',"embedded SVG")

function notyetfinished(){
  var address = '3MqWgNDKeJhA8poSfAgXvhEhKTSzYVwkqx9'
  $.post('confirm_ua',{
    method:'POST',
    address:address,
  }).then(function(data){
    window.blala = data
    console.log('blala')
  })

}

// $.post("account_config", {
//   method:"POST",
//   username:user,
//   action:'load',
//   account_config:configs,
// }).done(function(data){
//   window.account_config = data
//   console.log('account_config')
// })



function resetConf() {
  try {
    var email = rapo.account_config.email
    var account_name = rapo.account_config.account_name
  } catch(err) {
    console.log(err)
    var gmdiv = d3.select('#GeneralModalDiv')
    gmdiv.append('p').text("Please update your Email and Account Name under Account Settings")
    openModal()
    rapo.account_config = rapo.insert_body.account_config
    // var email = rapo.insert_body.account_config.email
    // var account_name = rapo.insert_body.account_config.account_name
  }

  $('#conf3').prop('value',email)
  $('#conf5').prop('value',account_name)
  // var searchable = rapo.account_config.searchable
  if (rapo.account_config.searchable == 'true') {
    $('#contactChoice1').prop('checked',true)
  } else {
    $('#contactChoice2').prop('checked',true)
  }
  $(':radio:not(:checked)').attr('disabled', true);
}
// { address: '3MzMwvrenZgDAoCkHqVcvgRZDi8yRYzcQvm', balances: [] }
// { address: '3MzMwvrenZgDAoCkHqVcvgRZDi8yRYzcQvm',

// rapo['acccount_config'] = {}


//
// $.post("account_config", {
//   method:"POST",
//   username:user,
//   action:'load',
//   account_config:configs,
// }).done(function(data){
//   window.account_config = data
//   console.log('account_config')
// })


function sendUpdateForm(arg) {
  if ($('#lock_or_not_input').val() == 'lock') {
    return false
  }
  window.mario = arg
  var username = arg.conf1.value
  var email = arg.conf3.value
  var account_name = arg.conf5.value
  if (mario.contactChoice1.checked == true) {
    var searchable = true
  } else {
    var searchable = false
  }
  var config = {
    email:email,
    searchable:searchable,
    account_name:account_name,
  }
  if (confirm("You are about to update:\n Email: "+email+"\n Searchable: "+searchable)) {
    $.post("account_config", {
      method:"POST",
      username:rapo.username,
      action:'push',
      updates:['email','searchable','account_name'],
      account_config:config,
    }).done(function(data){
      window.account_config = JSON.parse(data)


      var email = account_config.updated.email
      rapo.account_config.email = email
      var searchable = account_config.updated.searchable
      rapo.account_config.searchable = searchable
      var account_name = account_config.updated.account_name
      rapo.account_config.account_name = account_name
      $('#conf3').prop('value',email)
      $('#conf5').prop('value',account_name)
      // var searchable = rapo.account_config.searchable
      if (account_config.updated.searchable == 'true') {
        $('#contactChoice1').prop('checked',true)
      } else {
        $('#contactChoice2').prop('checked',true)
      }
      $(':radio:not(:checked)').attr('disabled', true);
      securityconfirm({id:'lockagain'})
      console.log('account_config')
    })
    d3.select('#conf4_label').attr('style','')
    d3.select('#conf3').attr('style','')
    d3.select('#conf5').attr('style','')

    return false
  } else {

    return false
  }

}

$('#lockagain').hide()
$('#securityconfirmwindow').hide()



function securityconfirm(arg) {
  window.macha = arg
  if (arg.id == 'show_pass_input') {
    $('#securityconfirmwindow').toggle()
    console.log('securityconfirm')
  }
  else if (arg.id == 'lockagain') {
    resetConf()

    $(':radio:not(:checked)').attr('disabled', true);
    // $('#conf1').prop('readonly', true);
    $('#conf3').prop('readonly', true);
    $('#conf5').prop('readonly', true);
    // $('#contactChoice2').prop('readonly', true);
    // $('#contactChoice2').prop('readonly', true);
    $('#lockagain').hide()
    d3.select('#lock_or_not').text('  locked')
    $('#lock_or_not_input').val('lock')
    d3.select('#conf4_label').attr('style','')
    d3.select('#conf3').attr('style','')
    d3.select('#conf5').attr('style','')
  } else {
    console.log('valid or not')
    var username = rapo.username
    const encrypted = rapo.encrypted
    var topaz = macha.password_for_settings.value
    try {
      var restoredPhrase = Waves.Seed.decryptSeedPhrase(encrypted, topaz);
      window.seed = Waves.Seed.fromExistingPhrase(restoredPhrase);
      $('#securityconfirmwindow').toggle()
      $('#lockagain').show()
      // d3.select('#show_pass_input').text()
      d3.select('#lock_or_not').text('  unlocked')
      $('#lock_or_not_input').val('unlock')
      // $('#conf1').prop('readonly', false);
      $('#conf3').prop('readonly', false);
      $('#conf5').prop('readonly', false);
      // $('#contactChoice2').prop('readonly', false);
      // $('#contactChoice2').prop('readonly', false);
      $(':radio:not(:checked)').attr('disabled', false);
      d3.select('#conf4_label').attr('style','border:5px solid red;')
      d3.select('#conf3').attr('style','border:5px solid red;')
      d3.select('#conf5').attr('style','border:5px solid red;')
      console.log('good')
    } catch(err) {
      alert(err)
    }

    // alert(seed)
    console.log('seed')

    return false
  }
}
// d3.select('#securityconfirmwindow').attr('style','height:0%')



function settingsUpdate(arg) {
  if (arg == 'load') {
    // username
    d3.select('#conf1').attr('value',rapo.username)
    // address
    d3.select('#conf2').attr('value',rapo.balance.address)
    // d3.select('#conf2').attr('value',rapo.balance.account_name)
    console.log('settingsupdate')
    console.log(rapo.balance.address)
    // d3.select('#conf2').attr('value',rapo.balance.account_name)
    // email
    // d3.select('#conf3').attr('value','')
    // searchable
    // d3.select('#contactChoice1').attr('checked','')
    // d3.select('#contactChoice2').attr('checked','')
  }
  if (arg == 'push') {


  }

}
// $.post("account_config", {
//   method:"POST",
//   username:user,
//   action:'load',
//   account_config:configs,
// }).done(function(data){
//   window.account_config = data
//   console.log('account_config')
// })

// <div class="btn-group">
//   <button>Apple</button>
//   <button>Samsung</button>
//   <button>Sony</button>
// </div>
function buildMenus() {
  ww = d3.select('#walletfieldset')

  wwdiv = ww.append('div').attr('class','btn-group')
  wwdiv.append('button').attr('class','ghost-button3').attr('id','button1').attr('onclick','pageControl(this)').text('Main')
  wwdiv.append('button').attr('class','ghost-button3').attr('id','button2').attr('onclick','pageControl(this)').text('Contracts')
  wwdiv.append('button').attr('class','ghost-button3').attr('id','button3').attr('onclick','pageControl(this)').text('Transactions')


  // $('#walletwindowform').hide()
  // $('#ContractsMenu').show()

  cm = d3.select('#ContractsMenu')
  cmdiv = cm.append('div').attr('class','btn-group')
  cmdiv.append('button').attr('class','ghost-button4').attr('id','button_1').attr('onclick','contractSlider(this)').text('Options')
  cmdiv.append('button').attr('class','ghost-button4').attr('id','button_2').attr('onclick','contractSlider(this)').text('Futures')
  cmdiv.append('button').attr('class','ghost-button4').attr('id','button_3').attr('onclick','contractSlider(this)').text('Coins')
  cmdiv.append('button').attr('class','ghost-button4').attr('id','button_4').attr('onclick','contractSlider(this)').text('Tokens')

}

function pageControl(arg) {
  if (arg.id) {var id = arg.id}
  else {var id = arg}
  console.log(id+' switching pages')
  if (id == 'button1') {
    $('#Page_1').hide()
    $('#walletwindowform').show()
    $('#Page_3').hide()
  }
  if (id == 'button2') {
    $('#Page_1').show()
    $('#walletwindowform').hide()
    $('#Page_3').hide()
  }
  if (id == 'button3') {
    $('#Page_1').hide()
    $('#walletwindowform').hide()
    $('#Page_3').show()
    showMyData(id)
  }
}

function contractSlider(arg) {
  var id = arg.id.split('_')[1]
  slide = 'slide_'+id
  console.log(slide)
  var slides = ['slide_1','slide_2','slide_3','slide_4']
  slides.forEach(function(d) {
    d3.select('#'+d).text('')
    if (d == slide) {$('#'+d).show();showMyData(d)}
    else {$('#'+d).show()}
  })
}

function showMyData(arg) {
  // d3.select('#'+arg).text(arg)
  if (arg == 'slide_1') {showMyOptionData(arg)}
  if (arg == 'slide_2') {console.log('no function yet')}
  if (arg == 'slide_3') {console.log('no function yet')}
  if (arg == 'slide_4') {console.log('no function yet')}
  if (arg == 'button3') {showTransactions()}
}

var coin_mask = {
  FPGVxbpCePWaRXYy6CEuygM3rQaAR3WN51Xy7q978qZK:'USD_Pegger',
  HNfBr9j2QfEgDQR6mE2LVLeQUy4aHRPGHscpZqtzbCzd:'RUB_Pegger'
}
var fee_mask = {}

transaction_cols = ['DATE','TYPE','FROM','TO','ASSET','UNITS','txID','FEE']

function refreshTransactions ()  {
    window.transactions_recieved = 0
    showTransactions()
}
var transactions_recieved = 0

function showTransactions() {
    if (transactions_recieved == 1) {
      console.log('you already have transactions')
      return false
    } else {
      // $('#transactionTable').empty()
      d3.select('#transactionTable').remove()
      var tabla = d3.select('#Page_3').append('table').attr('id','transactionTable')
      var tabla_head = tabla.append('thead').append('tr')
      var tabla_body = tabla.append('tbody')
      transaction_cols.forEach(function(d){tabla_head.append('th').text(d)})
      Waves.API.Node.v1.transactions.getList(rapo.balance.address).then((txList) => {
        //
        console.log(txList);
        window.txList = txList
        var user_address_mask = []
        txList.forEach(function(d){
            user_address_mask.push(d.sender)
		        user_address_mask.push(d.recipient)
        })
        var ua_mask = $.unique(user_address_mask)
        $.post('ua_mask',{ua_mask:ua_mask}).done(function(data){
          window.mask_base = {}
          window.mask = JSON.parse(data)
          mask.rows.forEach(function(d){
            mask_base[d.address] = d.username
          })
          console.log('masked')
          txList.forEach(function(d){
            var trow = tabla_body.append('tr')
            var date = new Date(d.timestamp)
            date = date.toLocaleString()
            trow.append('td').text(date)
            // trow.append('td').text(d.type)
            trow.append('td').text()
            trow.append('td').text(mask_base[d.sender])
            trow.append('td').text(mask_base[d.recipient])
            try {
              coin_mask[d.assetId].split('_')[0]
              trow.append('td').text(coin_mask[d.assetId].split('_')[0])
            } catch(err) {
              trow.append('td').text(coin_mask[d.assetId])
            }
            trow.append('td').text(d.amount)
            trow.append('td').text(d.id)
            trow.append('td').text(d.fee)
          })
          window.transactions_recieved = 1
        })
        // d3.select('#Page_3').text(txList)
      })
    }
}


function showMyOptionData(arg) {
  var slide = d3.select('#'+arg)
  datums = {}
  $.post( "options", {
      method:"POST",
      data:'optiondata',
      query:'underlying_list',
    })
  .done(function( data ) {
    window.dati = data;console.log('datums')
    var rows = JSON.parse(data).result.rows
    datums['option_bases'] = rows
    window.o_b = datums['option_bases']
    putSelectors(o_b)
  })

  function putSelectors(arg) {

    o_b.forEach(function(d) {
      var base = d.option_base.slice(0,2)
      d.underlying_base = base
    })

    window.u_bases = d3.nest().key(function(d){return d.underlying_base}).entries(o_b)


    var slide = d3.select('#'+'slide_1')

    var slide_form = slide.append('form')
                        .attr('action','/')
                        .attr('method','post')
                        .attr('onsubmit','return chainforMe(this)')
    var slide_select = slide_form.append('select').attr('name','slide_select').attr('id','slide_select')
    u_bases.forEach(function(d) {
      slide_select.append('option').attr('value',d.key).text(d.key)
    })
    slide_form.append('input').attr('type','submit')
  }

}



function chainforMe(arg) {
  console.log("chainforMe")
  var selection = $('#slide_select').val();
  var instruments = u_bases.find(function(d){if (d.key == selection){return d}})
  var underlyings = instruments.values.map(function(d) {return d.option_base})
  $.post( "options", {
      method:"POST",
      data:'optiondata',
      query:'chain',
      underlying_base:selection,
      underlyings:underlyings,
    })
  .done(function( data ) {
    var chaina = JSON.parse(data)
    window.chaina = chaina;
    console.log('chainer')

    // var rows = JSON.parse(data).result.rows
    // datums['option_bases'] = rows
  })
  return false
}

function confetti() {
  var modal = d3.select('#myModal')

}







// Get the modal
var modal = document.getElementById('myModal');
// Get the button that opens the modal
var btn = document.getElementById("myBtn");
// Get the <span> element that closes the modal
var span = document.getElementById("myBtnClose");
// When the user clicks on the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

console.log('did I reach the end?')
// Get the modal
var modalG = document.getElementById('GeneralModal');
// Get the button that opens the modal
// var btn = document.getElementById("myBtn");
// Get the <span> element that closes the modal
var spanG = document.getElementById("GeneralModalClose");
// When the user clicks on the button, open the modal
// btn.onclick = function() {
//
// }
function openModal() {
  // Get the modal
  var modalG = document.getElementById('GeneralModal');
  modalG.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
spanG.onclick = function() {
    var spanG = document.getElementById("GeneralModalClose");
    modalG.style.display = "none";
    $('#GeneralModalDiv').empty()
    d3.select('#modal_content').attr('style','')
}
function closeModal() {
  modalG.style.display = "none";
  $('#GeneralModalDiv').empty()
  d3.select('#modal_content').attr('style','')

}
function closeModal2(arg) {
  console.log('close modal 2')
  window.sarg = arg
  modalG.style.display = "none";
  $('#GeneralModalDiv').empty()
  d3.select('#modal_content').attr('style','')
  $('#GeneralModalClose2').hide()
  $('#GeneralModalClose').show()
  reloadBalances('tx')
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modalG.style.display = "none";
    }
}






//
// mena_pre = chaina.result.rows
// mena_pre2 = d3.nest().key(function(d){return d.id}).entries(mena_pre)
// mena = mena_pre2.map(function(d){
//   m = {key:'',value:{}},
//   m['key'] = d.key
//   m['value'] = d.values[0];
//   return m
// })
//
// d3.select('#slide_1').append('div').attr('id','mid_pane')

//
// <select name="cars">
//   <option value="volvo">Volvo</option>
//   <option value="saab">Saab</option>
//   <option value="fiat">Fiat</option>
//   <option value="audi">Audi</option>
// </select>

// d3.select('#'+d).text(d)
