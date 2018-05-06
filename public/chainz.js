function loadBalance(nwd) {
  if (nwd.action == 'ETH') {
    ad1 = rapo.insert_body.ethaddress
    if (nwd.data.to != ad1) {alert('PROBLEM!!!!')}

    web3.eth.getBalance(ad1).then(function(d){
      console.log(d);
      window.ethbalance = Number(d)
      var name = 'ETH'
      var balance = Number(d)
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
    })
  }
  if (nwd.action == 'WAV') {
    nwd.data.forEach(function(d){
      var name = coin_mask[d.assetId].split('_')[0]
      var balance = Number(d.amount)
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

    })
    // WAVES
    var name = 'WAVES'
    var balance = Number(rapo.usercreated.amount)
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
}



// wallet = {}
function Balancia() {
  var myad = wallet.address.wav
  var ad1 = wallet.address.eth

  Waves.API.Node.v1.assets.balances(myad).then((balancesList) => {
    window.rapo.balances = balancesList
    console.log('WAV balances updated')
    balancesList.balances.forEach(function(d){
        var name = d.issueTransaction.name
        console.log(name+' balance updated')
        var peg_or_not = name.split('_')[1]
        if (peg_or_not == 'Pegger'){
          var name = name.split('_')[0]
          d3.select('#'+name+'_balance_input').attr('value',d.balance)
        }
        wallet.balance[name] = d.balance
    })
  }).catch(function(err){console.log(err)})

  Waves.API.Node.v1.addresses.balance(myad).then((balance) => {
      console.log(balance.balance);
      console.log('WAV balance updated')
      // window.rapo.balance = balance
      wallet.balance['WAV'] = balance.balance
      d3.select('#WAV_balance_input').attr('value',balance.balance)
  }).catch(function(err){console.log(err)});

  web3.eth.getBalance(ad1).then(function(d){
    // rapo.eth = {address:ad1,balance:Number(d)}
    wallet.balance['ETH'] = Number(d)
    console.log('ETH balance updated')
    d3.select('#ETH_balance_input').attr('value',Number(d))
  }).catch(function(err){console.log(err)})

}


function faucet(myad_2) {
  const transferData = {
      // An arbitrary address; mine, in this example
      recipient: myad_2,
      // ID of a token, or WAVES
      assetId: usd_id,
      // The real amount is the given number divided by 10^(precision of the token)
      // am 1000000000 <- this amount is 10 WAVES
      amount: 50,
      // The same rules for these two fields
      feeAssetId: 'WAVES',
      fee: 100000,
      // 140 bytes of data (it's allowed to use Uint8Array here)
      attachment: '',
      timestamp: Date.now()
  };
  Waves.API.Node.v1.assets.transfer(transferData, seed_1.keyPair).then((responseData) => {
    console.log('USD TRANSFER DONE')
    const transferData2 = {
        // An arbitrary address; mine, in this example
        recipient: myad_2,
        // ID of a token, or WAVES
        assetId: rub_id,
        // The real amount is the given number divided by 10^(precision of the token)
        // am 1000000000 <- this amount is 10 WAVES
        amount: 1000,
        // The same rules for these two fields
        feeAssetId: 'WAVES',
        fee: 100000,
        // 140 bytes of data (it's allowed to use Uint8Array here)
        attachment: '',
        timestamp: Date.now()
    };
    Waves.API.Node.v1.assets.transfer(transferData2, seed_1.keyPair).then((responseData2) => {
        console.log(responseData2);
        console.log('RUB TRANSFER DONE')
        io.emit('notification_with_data',{message:'Your account has been funded with USD and RUB',data:[responseData,responseData2],action:'WAV'})
    }).catch(function(err){console.log(err)});
  }).catch(function(err){console.log(err)});
}
