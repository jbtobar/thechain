const Waves = WavesAPI.create(WavesAPI.TESTNET_CONFIG);
// if (typeof web3 !== 'undefined') {
//     window.web3 = new Web3(web3.currentProvider)
// } else {
//     window.web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io:443'))
// }
// const password = '0123456789';
// const encrypted = seed.encrypt(password);
// const restoredPhrase = Waves.Seed.decryptSeedPhrase(encrypted, password);
// const seed = Waves.Seed.fromExistingPhrase('a seed from an account with some funds');
// const seed,
// const restoredPhrase,





//var socket = io.connect({transports: ['websocket']});
// var socket = io.connect("http://0.0.0.0:3000/",{transports: ['websocket']});
// var socket = io('http://0.0.0.0:8080/');
// socket.on('fixa', function(msg){
//   console.log('on')
// window.msg = msg
// console.log('on')
//
// });



























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
  window.seed = seed
  const mnemonia = seed.phrase
  // var mnemonia = restoredPhrase
  window.provider = new HDWalletProvider(mnemonia, "https://ropsten.infura.io/gvaDaupFKbFfrBVZ9cyE");
  web3 = new Web3(provider)
  window.kp = BTCK(seed.phrase,'test')
	var user = forma.children[0].value
  // window.rapo = seed
	$.post( "usercreation", {
      method:"POST",
      username:user,
      seedaddress:seed.address,
      seedphrase:encrypted,
      ethaddress: provider.addresses[0]
    })
  .done(function( data ) {
    window.wallet = {
      address: {
        eth:provider.addresses[0],
        wav:seed.address,
        btc:kp.getAddress()
      },
      balance: {

      }
    }
    window.rapo = data
    openWalletWindow(wallet)
    // openNewWallet(data)
  })

}




var open_account_sent = 0
var rootUrl = "https://api.blockcypher.com/v1/btc/test3";
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
          const mnemonia = seed.phrase
          window.provider = new HDWalletProvider(mnemonia, "https://ropsten.infura.io/gvaDaupFKbFfrBVZ9cyE");
          kp = BTCK(seed.phrase,'test')
          window.web3 = new Web3(provider)
          window.wallet = {
            address: {
              eth:provider.addresses[0],
              wav:seed.address,
              btc:kp.getAddress()
            },
            balance: {

            }
          }
          // window.rapo['data'] =  JSON.parse(rapo['data'])
          // console.lod()
          // console.log('oi')
          openWalletWindow(wallet)
      }
      catch(err) {
          alert(err.message);
          window.open_account_sent = 0
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


function checkOrganization(arg) {
  $.post('orgcheck',{
    method:"POST",
    username:input.value,
  }).done(function(data){
    if (data['a'] == true) {
      input.setCustomValidity('Username taken')
    } else {
      input.setCustomValidity('')
    }
  }).catch(function(err){console.log(err)})
}
// THE BELOW ONE IS TO GET THE ADDRESS IN THE ESCROW PROCESS
function usernameChecker2(input) {
  console.log('usernamechecker2')
  var what = 'ETH'
  $.post('usercheckwaddress',{
    method:"POST",
    username:input.value,
    what:what
  }).done(function(data){
    window.reciever_info = data
    console.log(data)
    console.log('usercheckwaddress')
    if (data['a'] == true) {
      input.setCustomValidity('Username not found')
    } else {
      input.setCustomValidity('')
      if (input.id == 'contract_seller_username') {
        d3.select('#contract_seller_address').attr('value',data.data.ethaddress)
      }
      if (input.id == 'contract_buyer_username') {
        d3.select('#contract_buyer_address').attr('value',data.data.ethaddress)
      }

      // d3.select('#contract_seller_address').attr('value',wallet.address.eth)
      // console.log('input.parentElement')
      // window.supra = input.parentElement
      // input.parentElement.contract_seller.value = data.data.ethaddress
    }
  }).catch(function(err){console.log(err)})
}
// THE BELOW ONE IS TO GET THE ADDRESS IN THE SEND PROCESS
function usernameChecker(input) {
  var what = input.parentElement.id.split('_')[0]
  $.post('usercheckwaddress',{
    method:"POST",
    username:input.value,
    what:what
  }).done(function(data){
    window.reciever_info = data
    console.log(data)
    console.log('usercheckwaddress')
    if (data['a'] == true) {
      input.setCustomValidity('Username not found')
    } else {
      input.setCustomValidity('')
      if (what == 'ETH') {
        input.parentElement.recipient_address.value = data.data.ethaddress
      } else if (what == 'BTC') {
        input.parentElement.recipient_address.value = data.data.btcaddress
      } else {
        input.parentElement.recipient_address.value = data.data.address
      }

      // console.log()
    }
  }).catch(function(err){console.log(err)})
}


function checkUser(input) {
  // console.log(input)
  window.inni = input
	$.post( "usercheck", {
      method:"POST",
      username:input.value,
    })
  .done(function( data ) {


    if (input.name.slice(0,6) == 'member') {
      console.log('member')
       // var element = $("#"+input.id)[0];
      if (data['a'] == true) {
        inni.setCustomValidity('Username not Found');
        console.log('member true')
        return
      } else {
        inni.setCustomValidity('');
        console.log('member false')
        return
      }
    }
// console.log('shouldnt')
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
          if (inni.name.slice(0,6) == 'member') {
            input.setCustomValidity('');
          } else {
            input.setCustomValidity('Username already taken');
          }
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

function accountPod(curr) {
  var name = curr
  // var balance = Number(rapo.usercreated.amount)
  var balance = wallet.balance[curr]
  console.log(balance)
  console.log('acount pod')
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
      .attr('value',balance)
      .attr('readonly',true)
  // irow.append('div').attr('class','tooltip')
        // .append('span').attr('class','tooltiptext').text('Check me out man!')
  // d3.select('#walletwindowform')
  irow.append('input')
      .attr('id',name+'_deposit_input')
      .attr("class","ghost-input ghost-label-bottom bwd_r")
      .attr('value','Deposit')
      .attr('onclick','DepositWithdrawSend(this)')
      .attr('readonly',true)
      // .attr('onmouseover',"showMyTooltip(this)")
  // d3.select('#walletwindowform')
  irow.append('input')
      .attr('id',name+'_withdraw_input')
      .attr("class","ghost-input ghost-label-bottom bwd_r")
      .attr('value','Withdraw')
      .attr('onclick','DepositWithdrawSend(this)')
      .attr('readonly',true)
  irow.append('div').attr('class','tooltippy')
        .append('span').attr('class','tooltiptext').attr('id',name+'_deposit_input_tooltip').text('Check me out man!')

  $( '#'+name+'_balance_input' ).hover(
    function() {
      console.log('yes')
      $('#'+name+'_deposit_input_tooltip').show();
    }, function() {
      $('#'+name+'_deposit_input_tooltip').hide();
      // $( this ).find( "span:last" ).remove();
    }
  );
}
// function showMyTooltip(input) {
//   console.log(input)
// }


function openWalletWindow(wallet) {
  $('#div_form2').hide()
  $('#div_form1').hide()
  $('#walletwindow').show()
  console.log('open wallet window data')
  console.log(wallet)
  // try {
  //   var myad = rapo.insert_body.seedaddress
  // } catch(err) {
  //   var myad = rapo.balance.address
  // }
  var myad = wallet.address.wav

    // myad = data.balance.address

  Waves.API.Node.v1.addresses.balance(myad).then((balance) => {
      console.log(balance);
      window.rapo.balance = balance
      wallet.balance['WAV'] = balance.balance
      accountPod('WAV')
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
           wallet.balance[name] = d.balance
           accountPod(name)
         } else {
           wallet.balance[name] = d.balance
           accountPod(name)
         }

     })
     settingsUpdate('load')
  }).catch(function(err){console.log('should be a normal error below');console.log(err)});

  var ad1 = wallet.address.eth
  web3.eth.getBalance(ad1).then(function(d){
    // rapo.eth = {address:ad1,balance:Number(d)}
    wallet.balance['ETH'] = Number(d)
    accountPod('ETH')
  }).catch(function(err){console.log(err)})
  var adbtc = wallet.address.btc
  $.get(rootUrl+'/addrs/'+adbtc+'/balance').then(function(d) {
    console.log(d)
    wallet.balance['BTC'] = d.balance
    accountPod('BTC')
  });


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
// organization_form
// function revealActions(arg) {
//   window.parg = arg
//   console.log('revealActions')
//   var myorgs = d3.select('#my_organizations_page')
//   var myorgs_children = myorgs.selectAll('div')
//   // $('#'+arg.parentElement.id+'_contracts').hide()
//   myorgs_children["_groups"][0].forEach(function(d){
//     // console.log(d)
//     if (arg.parentElement == d){
//       // $(d).show()
//       d3.select(d).transition().style('height','')
//
//     } else {
//       $(d).show()
//     }
//   })
//   $('#'+arg.parentElement.id+'_contracts').hide()
// }
//


function closeOrg(arg) {
  // var myorgs_divs = d3.select('#my_organizations_page').selectAll('div')["_groups"][0]
  var myorgs_divs = $('#my_organizations_page').children()
  myorgs_divs.each(function(a,d){
    $(d).show()
    if (arg.parentElement == d) {
      var id = '#'+d.id+'_contracts'
      $(id).hide()
      d3.select(d).transition().style('height','')
    }
  })
  window.sarg = arg
  console.log('closeOrg')
}

function openOrg(arg) {
  // var myorgs_divs = d3.select('#my_organizations_page').selectAll('div')["_groups"][0]
  var myorgs_divs = $('#my_organizations_page').children()
  myorgs_divs.each(function(a,d){
    if (arg.parentElement == d) {
      var id = '#'+d.id+'_contracts'
      console.log(id)
      $(id).show()
      // console.log('Open This')
      $(d).show()
      d3.select(d).transition().style('height','500px')
      // console.log(arg.parentElement)
    } else {
      // console.log('hide these')
      $(d).hide()
      // console.log(arg.parentElement)
    }
  })

  window.sarg = arg
  console.log('openOrg')
}

// function openOrg(arg) {
//   window.arg = arg
//   console.log('openOrg')
//   var myorgs = d3.select('#my_organizations_page')
//   var myorgs_children = myorgs.selectAll('div')
//   myorgs_children["_groups"][0].forEach(function(d){
//     // console.log(d)
//     if (arg.parentElement == d){
//       $(d).show()
//       d3.select(d).transition().style('height','500px')
//       if (d3.select('#'+arg.parentElement.id+'_contracts')["_groups"][0][0] == null) {
//         var divo = d3.select(d).append('div').attr('id',arg.parentElement.id+'_contracts')
//         var tr = divo.append('form').append('tr')
//         tr.append('td').text('Bongo')
//       } else {
//         $('#'+arg.parentElement.id+'_contracts').show()
//         console.log('showing')
//       }
//
//     } else {
//       $(d).hide()
//     }
//   })
// }
function Sauron(arg) {
  console.log('sauron')
  return false
}

function createContract(arg) {
  console.log(arg)
  window.id = '#'+arg.id.slice(0,-16)
  console.log(id)
  console.log('createContract')
  // $(id).empty()
  console.log('la puta madre')
  var cc = d3.select(id)

  // console.log(cc)
  d3.select(id).select('form').remove()
  var form = cc.append('form').attr('id',id+'_form').attr('onsubmit','return Sauron(this)')

  var tr = form.append('tr')
  tr.append('td').append('label').attr('class','').text('Contract Name')
  tr.append('td').append('input')

  var tr = form.append('tr')
  tr.append('td').append('label').attr('class','').text('Party 1')
  tr.append('td').append('input')
  tr.append('td').append('button').attr('onclick','PlusMinus(this)').attr('value','plus').text('+')
  tr.append('td')
  // .append('button').attr('onclick','PlusMinus(this)').attr('value','minus').text('-')
}

function PlusMinus(arg) {
  console.log('PlusMinus')
  window.ipo = arg
  if (arg.value == 'plus') {
    var form = d3.select(arg.parentElement.parentElement.parentElement)
    var tr = form.append('tr')
    tr.append('td')
    tr.append('td').append('input')
    tr.append('td').append('button').attr('onclick','PlusMinus(this)').attr('value','plus').text('+')
    tr.append('td').append('button').attr('onclick','PlusMinus(this)').attr('value','minus').text('-')
    return false
  }
  if (arg.value == 'minus') {
    d3.select(arg.parentElement.parentElement).remove()
    return false
  }

}

function showCreateForm() {
  $('#organization_form').show()
  console.log('Here comes your org')
  $('#my_organizations_page').hide()
  $('#organization_activity_page').hide()
  // var myorgs = d3.select('#my_organizations_page')
}
function organizationActivity() {
  $('#my_organizations_page').hide()
  $('#organization_form').hide()
  $('#organization_activity_page').show()
}


function MyOrgs() {
  // window.datums
  $.post('myorgs',{
    method:'POST',
    action:'load',
    username:rapo.username,
  }).then(function(data){
    window.datums = JSON.parse(data)
    if (datums.result.length != 0) {
      $('#organization_form').hide()
      $('#organization_activity_page').hide()
      console.log('Here comes your org')
      $('#my_organizations_page').empty()
      $('#my_organizations_page').show()
      var myorgs = d3.select('#my_organizations_page')

      datums.result2.forEach(function(d){

        var orgcell = myorgs.append('div')
                .attr('id',d.username)
                .attr('class','org-cell')

        orgcell.append('span')
            .attr('class','close')
            .attr('style','margin-right: 10%;margin-top: 5%;')
            .attr('onclick','closeOrg(this)')
            .text('X')

        orgcell.append('span')
            .attr('class','close')
            .attr('style','margin-right: 10%;margin-top: 5%;')
            .attr('onclick','openOrg(this)')
            .text('O')

        var tr = orgcell.append('tr')
        tr.append('td').text('Username').attr('style','color:white')
        tr.append('td').text(d.username).attr('style','color: #E64A19')

        var tr = orgcell.append('tr')
        tr.append('td').text('Name:').attr('style','color:white')
        tr.append('td').text(d.name).attr('style','color: #E64A19')

        var tr = orgcell.append('tr')
        var members = d.members.invited
        tr.append('td').text('Members').attr('style','color:white')
        tr.append('td').text('Invited').attr('style','color:blue')
        // Object.keys(members).forEach(function(o){
          // tr.append('td').text(members[o].value).attr('style','color: #E64A19')
        // })
        members.forEach(function(o){
          tr.append('td').text(o).attr('style','color: #E64A19')
        })

        var tr = orgcell.append('tr')
        var members = d.members.joined
        tr.append('td').text('').attr('style','color:white')
        tr.append('td').text('Joined').attr('style','color:blue')
        try {
          // Object.keys(members).forEach(function(o){
            // tr.append('td').text(members[o].value).attr('style','color: #E64A19')
          // })
          members.forEach(function(o){
            tr.append('td').text(o).attr('style','color: #E64A19')
          })
        } catch(err) {
          console.log('below error is probably because members.joined is empty')
          console.log(err)
        }




        var tr = orgcell.append('tr')
        var owners = d.owners
        tr.append('td').text('Owners').attr('style','color:white')
        Object.keys(owners).forEach(function(o){
          tr.append('td').text(owners[o]).attr('style','color: #E64A19')
        })

        var div = orgcell.append('div')
                          .attr('id',d.username+'_contracts')
                          .attr('style','display:none')

        div.append('div').attr('id',d.username+'_contracts_creation')

        div.append('div')
              .append('button')
                .attr('class','ghost-button')
                .attr('onclick','createContract(this)')
                .attr('id',d.username+'_create_contract')
                .text('Create Contract')

        div.append('div').attr('id',d.username+'_contracts_existing')

                // .attr('id',d.username+' contracts')
      })

    } else {
      console.log('No Orgs')
    }
    console.log('oh yeah datums')
  }).catch(function(err){console.log(err)})
}

function togTo(arg) {
  window.sapo = arg
  if (arg.id == 'togto_user') {
    arg.parentElement.recipient_address.required = false
    // arg.parentElement.recipient_address.value = ''
    arg.parentElement.recipient_username.required = true
    $(arg.parentElement.recipient_username).show()
    $(arg.parentElement.recipient_address).hide()
  }
  if (arg.id == 'togto_address') {
    arg.parentElement.recipient_address.required = true
    arg.parentElement.recipient_username.required = false
    arg.parentElement.recipient_username.value = ''
    $(arg.parentElement.recipient_username).hide()
    $(arg.parentElement.recipient_address).show()
  }

  console.log(arg)
}
//
// function DWSBTC(action) {
//   console.log('DWS BTC')
//   openModal()
//   var gmdiv = d3.select('#GeneralModalDiv')
//   if (action.value == 'Send') {
//     //
//   } else {
//     gmdiv.append('p').text('Hello there')
//     gmdiv.append('p').text(action.value+' functionality is coming soon.')
//   }
// }
function DepositStripe() {
 $('#StripeModal').show()
}
function CloseStripeModal(input) {
  $('#StripeModal').hide()
}


function DWS(action) {
  if (action.value == 'Deposit') {DepositStripe();return}
  var curr = action.id.split('_')[0]
  // if (curr == 'BTC') {DWSBTC(action)}
  if (curr != 'WAV') {if (curr != 'ETH') {if (curr != 'BTC') {return}}}
  console.log('DWS')
  openModal()
  var gmdiv = d3.select('#GeneralModalDiv')
  if (action.value == 'Send') {
    console.log(curr)
    // var curr_account = rapo.balances.balances.find(function(x){if (x.issueTransaction.name == curr_name){return x}})
    var curr_balance = wallet.balance[curr]
    gmdiv.append('p').text('Hello there')
    gmdiv.append('p').text('Send Transaction')
    // gmdiv.append('p').text('Your '+curr+' Balance is: '+curr_balance.toString())
    if (curr == 'BTC') {
      var forma = gmdiv.append('form').attr('action','/').attr('onsubmit','return SendTransactionBTC(this)').attr('method','post').attr('id',curr+'_transaction_form')
    } else {
      var forma = gmdiv.append('form').attr('action','/').attr('onsubmit','return SendTransaction2(this)').attr('method','post').attr('id',curr+'_transaction_form')
    }
    forma.append('label').attr('class','ghost-input ghost-label-left').text('From')
    forma.append('input').attr('name','account').attr('type','text').attr('class','ghost-input ghost-label-right').attr('value',curr+' Account').attr('readonly','true')

    forma.append('label').attr('class','ghost-input ghost-label-left').text('Amount')
    forma.append('input').attr('name','amount').attr('type','number').attr('class','ghost-input ghost-label-right').attr('placeholder',0.00).attr('required','required')

    forma.append('label').attr('class','ghost-input ghost-label-left').text('To')
    forma.append('p').attr('id','togto_address').attr('onclick','togTo(this)').text('Address')
    forma.append('p').attr('id','togto_user').attr('onclick','togTo(this)').text('Username')
    forma.append('input').attr('name','recipient_username').attr('type','text').attr('class','ghost-input ghost-label-right').attr('placeholder','Search for User').attr('required','required').attr('oninput','usernameChecker(this)')
    forma.append('input').attr('name','recipient_address').attr('type','text').attr('class','ghost-input ghost-label-right').attr('placeholder','Type '+curr+' address').attr('required','required')
    forma.append('div').attr('id','TxResponse')

    // forma.append('label').attr('class','ghost-input ghost-label-left').text('Message')
    // forma.append('input').attr('name','attachment').attr('type','text').attr('class','ghost-input ghost-label-right').attr('placeholder','Enter up to 140 characters')

    forma.append('input').attr('type','submit').attr('class','ghost-button').attr('value','Send Transaction')
  } else {
    gmdiv.append('p').text('Hello there')
    gmdiv.append('p').text(action.value+' functionality is coming soon.')
  }
}

// function stripePaymdent(input) {
  // $.post('payment',$(input).serializeArray())).then(function(data){
  //   window.mona = data
  //   console.log('stripe payment')
  //   return false
  // })
//   // return false
// }

function DepositWithdrawSend(action) {
  if (action.value == 'Deposit') {DepositStripe();return}
  window.acta = action
  var curr = acta.id.split('_')[0]
  if (curr != 'RUB') {if (curr != 'USD') {DWS(action);return}}
  console.log(action)
  openModal()
  // d3.select('#GeneralModalDiv').empty()
  // $('#GeneralModalDiv').empty()
  var gmdiv = d3.select('#GeneralModalDiv')
  console.log(gmdiv)
  if (action.value == 'Send') {

    var curr_name = curr+'_Pegger'
    console.log(curr)
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

function signedTxResult(arg) {
  waiting_for_btc_push = false
  console.log('signedTxResult')
  var rd_id = btctxp.body.tx.hash
  var rd_date = new Date(btctxp.body.tx.received)
  var rd_amount = btctxp.body.tx.outputs[0].value
  loader_svg.remove()
  $('#GeneralModalClose2').show()
  var gmdiv = d3.select('#GeneralModalDiv')
                // .transition(10000)
  gmdiv.append('p').text('Transaction Sent!')
  gmdiv.append('p').text('Transaction Hash').attr('style','color: #4b545f;width:600px')
  // gmdiv.append('p')
  //       .text(parsed_data.id)
  gmdiv.append('p')
        .text(rd_id)
  gmdiv.append('p').text('Date').attr('style','color: #4b545f;')
  gmdiv.append('p')
        .text(rd_date.toLocaleString())
  gmdiv.append('p').text('Amount').attr('style','color: #4b545f;')
  gmdiv.append('p')
        .text(rd_amount+' BTC')
  gmdiv.append('p').text('To').attr('style','color: #4b545f;')
  gmdiv.append('p')
        .text(reciever_info.data.address)
  gmdiv.append('p')
        .text(reciever_info.username)
}

function confirmSignTx(arg) {
  console.log('confirmSignTx')
  window.miss = arg
  if (miss.value == 'Cancel') {closeModal()}
  if (miss.value == 'Confirm') {

    $('#GeneralModalDiv').empty()
    $('#GeneralModalClose').hide()
    window.loader_svg = d3.select('#GeneralModalDiv').append('img').attr('id','loading_svg').attr('src',"/public/assets/Rolling-1s-200px.svg").attr('alt',"embedded SVG")
    console.log(transferData)
    signSend(transferData)

  }
}
function newTransaction(from,to,val) {

  var newtx = {
    "inputs": [{"addresses": [from]}],
    "outputs": [{"addresses": [to], "value": val}]
  }
  waiting_for_btc_push = true
  socket.emit('btctx',newtx)

}
function signSend(newtx) {
  if (checkError(newtx)) return;
  newtx.pubkeys     = [];
  newtx.signatures  = newtx.tosign.map(function(tosign) {
    newtx.pubkeys.push(source.public);
    return kp.sign(new buffer.Buffer(tosign, "hex")).toDER().toString("hex");
  });
  socket.emit('btctxpush',newtx)
}
function checkError(msg) {
  if (msg.errors && msg.errors.length) {
    alert("Errors occured!!/n" + msg.errors.join("/n"));
    return true;
  }
}
waiting_for_btc_push = false
function SendTransactionBTC(arg) {
  if (waiting_for_btc_push == true) {console.log('you sent request to create transaction, waiting for server response');return false}
  var address = kp.getAddress()
  var priv = kp.toWIF()
  var publ = kp.getPublicKeyBuffer().toString('hex')
  window.source = {
    private : priv,
    public  : publ,
    address : address
  }
  var key = kp
  var dest  = arg.recipient_address.value;
  var val  = Number(arg.amount.value);
  // newTransaction(address,dest,1000)
  var rootUrl = "https://api.blockcypher.com/v1/btc/test3";
  newTransaction(address,dest,val)
  window.starg = arg
  console.log('starg')
  return false
}




function SendTransaction2(arg) {
  var curr = arg.id.split('_')[0]
  if (curr == 'WAV') {
    var ad2 = arg.recipient_address.value
    const transferData = {
        // An arbitrary address; mine, in this example
        recipient: ad2,
        // ID of a token, or WAVES
        assetId: 'WAVES',
        // The real amount is the given number divided by 10^(precision of the token)
        amount: Number(arg.amount.value),
        // The same rules for these two fields
        feeAssetId: 'WAVES',
        fee: 100000,
        // 140 bytes of data (it's allowed to use Uint8Array here)
        attachment: '',
        timestamp: Date.now()
    };
    window.transferData = transferData

    $('#GeneralModalDiv').empty()
    d3.select('#modal_content').transition().style('width','50%').style('height','50%')
    var gmdiv = d3.select('#GeneralModalDiv').append('div').attr('class','txconfclass')
    gmdiv.append('p').text('You are about to send:')
    // var asset = curr_account.issueTransaction.name.split('_')[0]
    gmdiv.append('p').text(transferData.amount +' '+curr)
    gmdiv.append('p').text('to')
    gmdiv.append('p').text('@'+arg.recipient_username.value)
    gmdiv.append('p').text(arg.recipient_address.value)
    var triv = gmdiv.append('form').append('tr')
    triv.append('input').attr('type','button').attr('value','Cancel').attr('onclick','confirmTx2(this)').attr('class','ghost-button')
    triv.append('input').attr('type','button').attr('value','Confirm').attr('onclick','confirmTx2(this)').attr('class','ghost-button')
    d3.select('#modal_content').transition().style('width','min-content').style('height','min-content')


  }
  if (curr == 'ETH') {
    var ad1 = wallet.address.eth
    var ad2 = arg.recipient_address.value
    const transferDataETH = {
        from: ad1,
        to: ad2,
        value: Number(arg.amount.value),
    };
    window.transferDataETH = transferDataETH
    console.log('transferDataETH')



    $('#GeneralModalDiv').empty()
    d3.select('#modal_content').transition().style('width','50%').style('height','50%')
    var gmdiv = d3.select('#GeneralModalDiv').append('div').attr('class','txconfclass')
    gmdiv.append('p').text('You are about to send:')
    // var asset = curr_account.issueTransaction.name.split('_')[0]
    gmdiv.append('p').text(transferDataETH.value +' '+curr)
    gmdiv.append('p').text('to')
    gmdiv.append('p').text('@'+arg.recipient_username.value)
    gmdiv.append('p').text(arg.recipient_address.value)
    var triv = gmdiv.append('form').append('tr')
    triv.append('input').attr('type','button').attr('value','Cancel').attr('onclick','confirmTx2ETH(this)').attr('class','ghost-button')
    triv.append('input').attr('type','button').attr('value','Confirm').attr('onclick','confirmTx2ETH(this)').attr('class','ghost-button')
    d3.select('#modal_content').transition().style('width','min-content').style('height','min-content')

  }




  window.starg = arg
  console.log('starg')
  return false
}

function confirmTx2ETH(arg) {
  window.miss = arg
  if (miss.value == 'Cancel') {closeModal()}
  if (miss.value == 'Confirm') {
    $('#GeneralModalDiv').empty()
    $('#GeneralModalClose').hide()
    window.loader_svg = d3.select('#GeneralModalDiv').append('img').attr('id','loading_svg').attr('src',"/public/assets/Rolling-1s-200px.svg").attr('alt',"embedded SVG")
    console.log(transferDataETH)
    web3.eth.sendTransaction(transferDataETH).then(function(responseData){
      console.log(responseData);
      window.responseData = responseData
      var rd_id = responseData.transactionHash
      var rd_date = new Date()
      var rd_amount = parseInt(transferDataETH.value, 16);
      // var parsed_data = JSON.parse(data)
      // console.log(data)
      loader_svg.remove()
      $('#GeneralModalClose2').show()
      var gmdiv = d3.select('#GeneralModalDiv')
                    // .transition(10000)
      gmdiv.append('p').text('Transaction Sent!')
      gmdiv.append('p').text('Transaction Hash').attr('style','color: #4b545f;width:600px')
      // gmdiv.append('p')
      //       .text(parsed_data.id)
      gmdiv.append('p')
            .text(responseData.transactionHash)
      gmdiv.append('p').text('Date').attr('style','color: #4b545f;')
      gmdiv.append('p')
            .text(rd_date.toLocaleString())
      gmdiv.append('p').text('Amount').attr('style','color: #4b545f;')
      gmdiv.append('p')
            .text(rd_amount+' ETH')
      gmdiv.append('p').text('To').attr('style','color: #4b545f;')
      gmdiv.append('p')
            .text(reciever_info.data.address)
      gmdiv.append('p')
            .text(reciever_info.username)

    }).catch(function(err){console.log(err)})
  }
}
// web3.eth.sendTransaction({from:ad1,to:dd2,value:100}).then(function(d){
//   console.log(d)
//   window.donya = d
// })

function confirmTx2(arg) {
  // transferData
  window.miss = arg
  if (miss.value == 'Cancel') {closeModal()}
  if (miss.value == 'Confirm') {
    $('#GeneralModalDiv').empty()
    $('#GeneralModalClose').hide()
    window.loader_svg = d3.select('#GeneralModalDiv').append('img').attr('id','loading_svg').attr('src',"/public/assets/Rolling-1s-200px.svg").attr('alt',"embedded SVG")
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
          gmdiv.append('p').text('Transaction Sent!')
          gmdiv.append('p').text('Transaction ID').attr('style','color: #4b545f;width:600px')
          gmdiv.append('p')
                .text(parsed_data.id)
          gmdiv.append('p')
                .text(responseData.id)
          gmdiv.append('p').text('Date').attr('style','color: #4b545f;')
          gmdiv.append('p')
                .text(rd_date.toLocaleString())
          gmdiv.append('p').text('Amount').attr('style','color: #4b545f;')
          gmdiv.append('p')
                .text(responseData.amount+' '+transferData.assetId)
          gmdiv.append('p').text('To').attr('style','color: #4b545f;')
          gmdiv.append('p')
                .text(reciever_info.data.address)
          gmdiv.append('p')
                .text(reciever_info.username)
        }).catch(function(err){console.log(err)})

    }).catch(function(err){console.log(err)});
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
    window.loader_svg = d3.select('#GeneralModalDiv').append('img').attr('id','loading_svg').attr('src',"/public/assets/Rolling-1s-200px.svg").attr('alt',"embedded SVG")
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
          gmdiv.append('p').text('Transaction Sent!')
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
    // var name = transferData.assetId.slice(0,3)
    var name = starg.id.split('_')[0]
    var prev_bal = Number($('#'+name+'_balance_input').val())
    // var transfer_amount = responseData.amount
    var transfer_amount = Number(starg.amount.value)
    var new_bal = prev_bal - transfer_amount
    d3.select('#'+name+'_balance_input').attr('value',new_bal)
    d3.select('#'+name+'_balance_input').classed('waiting-confirmation',true)
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
    console.log('should be a normal error below')
    console.log(err)
    // var gmdiv = d3.select('#GeneralModalDiv')
    // var texto = ""
    // gmdiv.append('p').text("Your account has been funded, your balance should appear shortly")
    // gmdiv.append('p').text("Please update your Email and Account Name under Account Settings")
    // openModal()
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


function MessageActions(action) {
  var pre_id = action.id.split('_')[0]
  if (pre_id == 'sent') {
    $('#messages_page_body_new').hide()
    $('#messages_page_body_recieved').hide()
    $('#messages_page_body_sent').show()
  }
  if (pre_id == 'recieved') {
    $('#messages_page_body_new').hide()
    $('#messages_page_body_recieved').show()
    $('#messages_page_body_sent').hide()
  }
  if (pre_id == 'new') {
    $('#messages_page_body_new').show()
    $('#messages_page_body_recieved').hide()
    $('#messages_page_body_sent').hide()
  }
}

window.transaction_message_toggle = 'transactions'
function toggleMessagesTransactions(span) {

  if (span.id == 'transactions_toggle_button') {
    $('#transactionTable').show()
    $('#messages_page').hide()
    window.transaction_message_toggle = 'transactions'
  } else {
    $('#transactionTable').hide()
    $('#messages_page').show()
    window.transaction_message_toggle = 'messages'
  }

  window.pinto = span
  console.log('luga')
}

function buildMenus() {
  ww = d3.select('#walletfieldset')

  wwdiv = ww.append('div').attr('class','btn-group')
  wwdiv.append('button').attr('class','ghost-button3').attr('id','button1').attr('onclick','pageControl(this)').text('Main')
  wwdiv.append('button').attr('class','ghost-button3').attr('id','button2').attr('onclick','pageControl(this)').text('Contracts')
  wwdiv.append('button').attr('class','ghost-button3').attr('id','button3').attr('onclick','pageControl(this)').text('Activity')


  // $('#walletwindowform').hide()
  // $('#ContractsMenu').show()

  cm = d3.select('#ContractsMenu')
  cmdiv = cm.append('div').attr('class','btn-group')
  cmdiv.append('button').attr('class','ghost-button4').attr('id','button_1').attr('onclick','contractSlider(this)').text('Options')
  cmdiv.append('button').attr('class','ghost-button4').attr('id','button_2').attr('onclick','contractSlider(this)').text('Activity')
  cmdiv.append('button').attr('class','ghost-button4').attr('id','button_3').attr('onclick','contractSlider(this)').text('Search')
  cmdiv.append('button').attr('class','ghost-button4').attr('id','button_4').attr('onclick','contractSlider(this)').text('Create')

}
var member_counter = 0
function addMemberToList(arg) {
  member_counter = member_counter + 1
  d3.select('#members_list_form')
      .append('span')
        .attr('class','close')
        .attr('id','member_'+member_counter+'_remover')
        .attr('onclick','removeMe(this)')
        .attr('style','float:left')
        .text('X')
  d3.select('#members_list_form')
      .append('input')
        .attr('name','member_'+member_counter)
        .attr('id','member_'+member_counter)
        .attr('class','ghost-input ghosty')
        .attr('style','width:50%')
        .attr('type','text')
        .attr('placeholder','Member '+member_counter)
        .attr('oninput','checkUser(this)')
        .attr('required','required')
  // member_counter = member_counter + 1
}
function removeMe(arg) {
  console.log('removing')
  window.sarg = arg
  var id1 = arg.id.slice(0,8)
  var id2 = arg.id
  d3.select('#'+id1).remove()
  d3.select('#'+id2).remove()
  member_counter = member_counter - 1
}


function MakeOrganization(arg) {
  window.marg = arg
  var blu = $(arg).serializeArray()
  var membah = blu.filter(function(d){if (d.name.slice(0,6) == 'member'){return d}})
  // var membah_dict = {}
  // membah.forEach(function(d){
  //   membah_dict[d.name] = d.value
  // })
  var members = []
  membah.forEach(function(d){
    members.push(d.value)
  })
  var form_dict = {}
  blu.forEach(function(d){
    form_dict[d.name] = d.value
  })
  $.post('make_org',{
    user:rapo.username,
    members:members,
    form_dict:form_dict,
  }).then(function(result){
    window.bult = result
    console.log('Made Org!')
    // $('#GeneralModalDiv').empty()
    // openModal()

    // var members = []
    // membah.forEach(function(d){
    //   members.push(d.value)
    // })
    var inviteData = {
      sender:rapo.username,
      title:'invitation',
      message:'invitation '+form_dict.organization_username,
      members:members
    }
    sendInvitation(inviteData)
    // $('#GeneralModalDiv').empty()
    // openModal()
    // var sarg = $(arg).serializeArray()
    return false
  }).catch(function(err){
    console.log(err)
    return false
  })
  return false
}


function orgToggle() {
  $('#walletwindowform').toggle()
  $('#org_main_page').toggle()
}
var org_form = d3.select('#organization_form')

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
    // d3.select('#'+d).text('')
    if (d == slide) {$('#'+d).show();showMyData(d)}
    else {$('#'+d).hide()}
  })
}

// var adu = dos.then.address
// web3.eth.getBalance(adu).then(function(d){
//   // rapo.eth = {address:ad1,balance:Number(d)}
//   console.log(d)
// }).catch(function(err){console.log(err)})

// socket.emit('getcontracts',{address:wallet.address.eth})
function SMC() {
  $('#slide_2_active').empty()
  $('#slide_2_new').empty()
  $('#slide_2_past').empty()
  var contract_count = 0
  dancy.forEach(function(d){
    if (d.then) {

      showMyContracts('plot',d,contract_count)
      contract_count = contract_count+1
    }
  })
}

function ContractResponse(arg) {
  window.parka = arg
  var action = parka.id.split('_')[0]
  var contract = parka.id.split('_')[1]
  var cad = $('#address_'+contract).val()
  var date = new Date()
  date = date.toString()
  tca = cad
  // var contract = new web3.eth.Contract(bld.abi,bld.networks['3'].address)
  window.contract = new web3.eth.Contract(fulldance.abi,tca)
  var ad1 = wallet.address.eth
  contract.methods.accept().send({from:ad1}).then(function(result){
    console.log(result)
    window.sila = result
    var data = result
    socket.emit('respond_to_contracts',{username:rapo.username,address:wallet.address.eth,contract:cad,action:action,date:date,data:data})
  })
  // socket.emit('respond_to_contracts',{username:rapo.username,address:wallet.address.eth,contract:cad,action:action,date:date})
}

function ContractActions(input) {
  var id = input.id.split('_')[0]
  if (id == 'past') {$('#slide_2_past').show();$('#slide_2_active').hide();$('#slide_2_new').hide();}
  if (id == 'active') {$('#slide_2_past').hide();$('#slide_2_active').show();$('#slide_2_new').hide();}
  if (id == 'new') {$('#slide_2_past').hide();$('#slide_2_active').hide();$('#slide_2_new').show();}

}

function showMyContracts(arg,d,contract_count) {
  if (arg == 'in') {
    socket.emit('getcontracts',{address:wallet.address.eth})
  } else {
    var dos = d
    var a = dos.a
    var b = dos.b
    var ca = dos.then.address
    if (dos.other) {
      var sal = dos.other
      if (sal[sal.length-1].action == 'reject') {
        var divo = d3.select('#slide_2_past').append('div').attr('class','contract-pod')
        var fresh = 'past'
      } else {
        var divo = d3.select('#slide_2_active').append('div').attr('class','contract-pod')
        var fresh = 'active'
      }

    } else {
      var divo = d3.select('#slide_2_new').append('div').attr('class','contract-pod')
      var fresh = 'new'
    }

    var trow = divo.append('tr')
    trow.append('td').text('Escrow')
    var trow = divo.append('tr')
    trow.append('td').text('Buyer:')
    trow.append('td').text('Seller:')
    trow.append('td').text('')
    var trow = divo.append('tr')
    trow.append('td').append('input').attr('type','text').attr('readonly','readonly').attr('value',a)
    trow.append('td').append('input').attr('type','text').attr('readonly','readonly').attr('value',b)
    trow.append('td').text('')
    var trow = divo.append('tr')
    trow.append('td').append('input').attr('type','text').attr('readonly','readonly').attr('value',fulldance.mask[a])
    trow.append('td').append('input').attr('type','text').attr('readonly','readonly').attr('value',fulldance.mask[b])
    trow.append('td').text('')
    var trow = divo.append('tr')
    trow.append('td').text('Contract Address:\n')
    trow.append('td').append('input').attr('type','text').attr('readonly','readonly').attr('value',ca).attr('id','address_'+contract_count)
    trow.append('td').text('')
    var trow = divo.append('tr')
    console.log(d)
    trow.append('td').text('Balance:\n')
    trow.append('td').append('input').attr('type','text').attr('readonly','readonly').attr('id','contract_pod_'+contract_count)

    if (fresh == 'new') {
      var trow = divo.append('tr')
      trow.append('td').text('Actions:')
      trow.append('td').append('input').attr('type','text').attr('readonly','readonly').attr('value','Accept').attr('onclick','ContractResponse(this)').attr('id','accept_'+contract_count).text('Accept')
      trow.append('td').append('input').attr('type','text').attr('readonly','readonly').attr('value','Reject').attr('onclick','ContractResponse(this)').attr('id','reject_'+contract_count).text('Reject')
    }
    if (fresh == 'past') {
      console.log(sal)
      dos.other.forEach(function(x){
        var trow = divo.append('tr')
        trow.append('td').text('Action: '+x.action)
        trow.append('td').text('User: '+fulldance.mask[x.user])
        trow.append('td').text('Date: '+x.date)
      })
    }
    if (fresh == 'active') {
      console.log(sal)
      var did_i_accept = false
      dos.other.forEach(function(x){
          console.log('jula')
          var trow = divo.append('tr')
          trow.append('td').text('Action: '+x.action)
          trow.append('td').text('User: '+fulldance.mask[x.user])
          trow.append('td').text('Date: '+x.date)
          if (x.user == wallet.address.eth && x.action == 'accept') {
            console.log('you already accepted son')
            did_i_accept = true
          }
      })
      if (did_i_accept == true) {
        var trow = divo.append('tr')
        trow.append('td').text('You have already accepted this Contract, Awaiting confirmation from other party')
      } else {
        var trow = divo.append('tr')
        trow.append('td').text('Actions:')
        trow.append('td').append('input').attr('type','text').attr('readonly','readonly').attr('value','Accept').attr('onclick','ContractResponse(this)').attr('id','accept_'+contract_count).text('Accept')
        trow.append('td').append('input').attr('type','text').attr('readonly','readonly').attr('value','Reject').attr('onclick','ContractResponse(this)').attr('id','reject_'+contract_count).text('Reject')

      }

    }
    web3.eth.getBalance(ca).then(function(d){
      console.log('Balance: ' +ca)
      console.log('#'+'contract_pod_'+contract_count)
      d3.select('#'+'contract_pod_'+contract_count).attr('value',d)
      console.log(d)
    })


  }
}

function showMyData(arg) {
  // d3.select('#'+arg).text(arg)
  // if (arg == 'slide_1') {showMyOptionData(arg)}
  if (arg == 'slide_1') {console.log('no function yet')}
  if (arg == 'slide_2') {showMyContracts('in',null)}
  if (arg == 'slide_3') {console.log('no function yet')}
  if (arg == 'slide_4') {console.log('no function yet')}
  if (arg == 'button3') {showTransactions('in')}
}

var coin_mask = {
  FPGVxbpCePWaRXYy6CEuygM3rQaAR3WN51Xy7q978qZK:'USD_Pegger',
  HNfBr9j2QfEgDQR6mE2LVLeQUy4aHRPGHscpZqtzbCzd:'RUB_Pegger'
}
var fee_mask = {}

transaction_cols = ['DATE','TYPE','FROM','TO','ASSET','UNITS','txID','FEE']

function refreshTransactions ()  {
    if (window.transaction_message_toggle == 'transactions') {
      window.transactions_recieved = 0
      showTransactions()
      console.log('refreshing tx')
    }
    if (window.transaction_message_toggle == 'messages') {
      showMessages()
      console.log('refreshing msg')
    }
}
var transactions_recieved = 0

function showMessages() {
  socket.emit('getinvites',rapo.username)
}

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
        var transaction_mask = []
        txList.forEach(function(d){
            user_address_mask.push(d.sender)
		        user_address_mask.push(d.recipient)
            transaction_mask.push(d.id)
        })
        var ua_mask = $.unique(user_address_mask)
        $.post('ua_mask',{ua_mask:ua_mask,transaction_mask:transaction_mask}).done(function(data){
          window.mask_base = {}
          window.mask = JSON.parse(data)
          mask.rows.forEach(function(d){
            mask_base[d.address] = d.username
          })
          mask.rows2.forEach(function(d){
            mask_base[d.transactionid] = d.id
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
            trow.append('td').text(mask_base[d.id])
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
