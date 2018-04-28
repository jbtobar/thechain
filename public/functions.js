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





function openAccount(arg) {
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


function createUser(form,seed,encrypted) {
	var user = forma.children[0].value
	$.post( "usercreation", {
      method:"POST",
      username:user,
      seedaddress:seed.address,
      seedphrase:encrypted,
    })
  .done(function( data ) {openWalletWindow(data)})

}


function openWalletWindow(data) {
  $('#div_form2').hide()
  $('#div_form1').hide()
  $('#walletwindow').show()
  console.log(data)
  try {
    myad = data.balance.address
    // Waves.API.Node.v1.addresses.balance(myad).then((balance) => {
    //     console.log(balance);
    // });
    Waves.API.Node.v1.assets.balances(address).then((balancesList) => {
      console.log('fluubber')
       console.log(balancesList);
    });
  } catch(err) {
    myad = rapo.balance.address
    console.log(rapo)
    // Waves.API.Node.v1.addresses.balance(myad).then((balance) => {
    //     console.log(balance);
    // });
  }
  d3.select('#name1').attr('value','@'+rapo.username)
  // var balance = rapo.balance.balance/100000000
  // d3.select('#name2').attr('value',balance)
  rapo.balances.balances.forEach(function(d){
      var name = d.issueTransaction.name
      var peg_or_not = name.split('_')[1]
      if (peg_or_not == 'Pegger'){
        var name = name.split('_')[0]
        d3.select('#walletwindowform')
            .append('label')
            .attr("class","ghost-input ghost-label-top")
            .text(name+' Balance')
        d3.select('#walletwindowform')
            .append('input')
            .attr("class","ghost-input ghost-label-bottom")
            .attr('value',d.balance)
            .attr('readonly',true)
      }

  })
  buildMenus()
  pageControl('button1')
}


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
  d3.select('#'+arg).text(arg)
  if (arg == 'slide_1') {showMyOptionData(arg)}
  if (arg == 'slide_2') {console.log('no function yet')}
  if (arg == 'slide_3') {console.log('no function yet')}
  if (arg == 'slide_4') {console.log('no function yet')}
  if (arg == 'button3') {showTransactions()}
}

transaction_cols = ['DATE','TYPE','NAME','SENDER','RECIPIENT','FEE','UNITS','txID']

function showTransactions() {
  var tabla = d3.select('#Page_3').append('table').attr('id','transactionTable')
  var tabla_head = tabla.append('thead').append('tr')
  var tabla_body = tabla.append('tbody')
  transaction_cols.forEach(function(d){tabla_head.append('th').text(d)})
  Waves.API.Node.v1.transactions.getList(rapo.balance.address).then((txList) => {
    console.log(txList);
    window.txList = txList
    txList.forEach(function(d){
      var trow = tabla_body.append('tr')
      trow.append('td').text(Date(d.timestamp))
      trow.append('td').text(d.type)
      trow.append('td').text(d.name)
      trow.append('td').text(d.sender)
      trow.append('td').text(d.recipient)
      trow.append('td').text(d.fee)
      trow.append('td').text(d.amount)
      trow.append('td').text(d.id)
    })
    // d3.select('#Page_3').text(txList)
  })
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
