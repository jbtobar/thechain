// d3.select('#slide_1').append('div').attr('id','mid_pane')
function switchSecurities(codax) {


	seccode = codax
	stockprice = 112500

	d3.select('#mid_pane_table').remove()
	// mena = d3.entries(mona)
	// mena = mena.filter(function(d){if(d.key.startsWith(seccode)) {return d}})
	nastya = 'blye'
	s1 = d3.nest()
	  .key(function(d) { return d.value.time_to_maturity; })
	  .entries(mena)
	s1 = s1.sort(function(a,b){return a.key - b.key})
	s1 = s1.filter(function(d){if (d.key > 0){return d}})
	bomba = d3.select('#mid_pane')
	table = bomba.append('table').attr('class','mid_pane_table').attr('id','mid_pane_table')
	pstepval = 11.58196
	global_margin = 0.3
	price_step = 10
	price_step_price = pstepval
	for (var i in s1) {
		if (s1[i].values.length < 10) {
			console.log('you have a weird expiration at s1 i')
		} else {
	//	table = bomba.append('table').attr('class','mid_pane_table')
		var exp_head = table.append('thead').attr('class','expiration_head')
	//	exp_head.append('tr').append('th').attr('colspan','11').text(s1[i].key+' Days to Expiration')
		exp_row = exp_head.append('tr')
		append_headers(table)
		exp_row.append('th').attr('colspan',columns-3).attr('class','expiration_head_col').text(s1[i].key+' Days to Expiration')
		exp_row.append('td').attr('class','strike_selector_col').text(10)
		exp_row.append('td').attr('class','strike_selector_col').text(30)
		exp_row.append('td').attr('class','strike_selector_col').text('All')
	//	append_headers(table)
		tbody = table.append('tbody').attr('value',s1[i].key)
		s1_0 = d3.nest().key(function(d) {return d.value.strike}).entries(s1[i].values).sort(function(a,b){return a.key - b.key})
		for (var j in s1_0) {
		stk_row = tbody.append('tr').attr('class','strike_row')
		s1_0_0 = d3.nest().key(function(d) {return d.value.option_type}).entries(s1_0[j].values)
		var pc = 1
		if (s1_0_0[1].key == 'Call') {
			pc = 1
		} else {pc = 0}
		var sec = s1_0_0[pc].values[0].value
		var sec_id = s1_0_0[pc].values[0].key.split(' ')[0]
		var call_id = sec_id
	//	stk_row.append('td').attr('id',sec_id).text(sec_id)
		var vol = sec.volatility/100
		var oy = 365
		var theo = BlackScholes("CALL",stockprice,sec.strike,sec.time_to_maturity/oy,r_rate,vol)
		theo = Math.ceil(theo / 10) * 10
		stk_row.append('td').attr('id',sec_id+'_theor_price').attr('class','theo_col').attr('value',theo).text()
		var delta = BSM_delta2("CALL",stockprice,sec.strike,0,sec.time_to_maturity/oy,r_rate,vol)
	//	delta = Math.ceil(delta / 10) * 10
		stk_row.append('td').attr('id',sec_id+'_delta').attr('class','delta_col').attr('value',delta).text(delta.toFixed(2))
		var gamma = BSM_gamma(stockprice, sec.strike, 0, sec.time_to_maturity/oy, r_rate,vol)
		gamma = gamma * 100
		stk_row.append('td').attr('id',sec_id+'_gamma').attr('class','gamma_col').attr('value',gamma)
		var theta = BSM_theta(stockprice, sec.strike, 0, sec.time_to_maturity/oy, r_rate,vol)
		theters = theta/price_step/price_step_price * global_margin
		stk_row.append('td').attr('id',sec_id+'_theta').attr('class','theta_col').attr('value',theters)
		var vega = BSM_vega(stockprice, sec.strike, 0, sec.time_to_maturity/oy, r_rate,vol)
		vega = vega/price_step/price_step_price
		vega =  Math.ceil(vega / 10) * 10
		stk_row.append('td').attr('id',sec_id+'_vega').attr('class','vega_col').attr('value',vega)
		stk_row.append('td').attr('id',sec_id+'_open_pos').text(sec.open_pos)
		stk_row.append('td').attr('id',sec_id+'_num_trades').text(sec.num_trades)
		stk_row.append('td').attr('id',sec_id+'_last').text(sec.last)
		stk_row.append('td').attr('id',sec_id+'_bid').attr("onclick","clicker(this,'Call')").text(sec.bid)
		stk_row.append('td').attr('id',sec_id+'_ask').attr("onclick","clicker(this,'Call')").text(sec.ask)
		stk_row.append('td').attr('id',sec_id+'_theo').attr("onclick","clicker(this,'Call')").text(sec.theor_price)
	//	stk_row.append('td').attr('id',sec_id+'_strike').attr('style','text-align:right').attr('class','strike').text(sec.strike)
		if (pc == 1) {pc = 0} else {pc = 1}
		var sec = s1_0_0[pc].values[0].value
		var sec_id = s1_0_0[pc].values[0].key.split(' ')[0]
		var put_id = sec_id
		stk_row.append('td').attr('id',call_id+'_'+put_id+'_strike').attr('style','text-align:right').attr('class','strike').text(sec.strike)
		stk_row.append('td').attr('id',call_id+'_'+put_id+'_volatility').attr('class','volatility').text(sec.volatility.toFixed(3))
		stk_row.append('td').attr('id',sec_id+'_theo').attr("onclick","clicker(this,'Put')").text(sec.theor_price)
		stk_row.append('td').attr('id',sec_id+'_bid').attr("onclick","clicker(this,'Put')").text(sec.bid)
		stk_row.append('td').attr('id',sec_id+'_ask').attr("onclick","clicker(this,'Put')").text(sec.ask)
		stk_row.append('td').attr('id',sec_id+'_last').text(sec.last)
		stk_row.append('td').attr('id',sec_id+'_num_trades').text(sec.num_trades)
		stk_row.append('td').attr('id',sec_id+'_open_pos').text(sec.open_pos)
		var vega = BSM_vega(stockprice, sec.strike, 0, sec.time_to_maturity/oy, r_rate,vol)
		vega = vega/price_step/price_step_price
		vega =  Math.ceil(vega / 10) * 10
		stk_row.append('td').attr('id',sec_id+'_vega').attr('class','vega_col').attr('value',vega)
		var theta = BSM_theta(stockprice, sec.strike, 0, sec.time_to_maturity/oy, r_rate,vol)
		theters = theta/price_step/price_step_price * global_margin
	        stk_row.append('td').attr('id',sec_id+'_theta').attr('class','theta_col').attr('value',theters)
		var gamma = BSM_gamma(stockprice, sec.strike, 0, sec.time_to_maturity/oy, r_rate,vol)
		gamma = gamma * 100
		stk_row.append('td').attr('id',sec_id+'_gamma').attr('class','gamma_col').attr('value',gamma)
	        var delta = BSM_delta2("Put",stockprice,sec.strike,0,sec.time_to_maturity/oy,r_rate,sec.volatility/100)
		stk_row.append('td').attr('id',sec_id+'_delta').attr('class','delta_col').attr('value',delta).text(delta.toFixed(2))
		var theo = BlackScholes("Put",stockprice,sec.strike,sec.time_to_maturity/oy,r_rate,sec.volatility/100)
	        theo = Math.ceil(theo / 10) * 10
	        stk_row.append('td').attr('id',sec_id+'_theor_price').attr('class','theo_col').attr('value',theo)
		stk_row.attr('id',call_id+'_'+put_id+'_'+sec.strike)
		}
	//	stk_row.append('td').attr('id',sec_id).text(sec_id)
	}
	tbody.append('input').attr('hidden','true').attr('value',25)
	}

	// I am hardcoding a midsedction of length 930 here, I might want to alter that
	table.append('tr')
		.append('td')
			.attr('colspan',stk_row._groups[0][0].children.length)
		.append('div')
			.attr('id','the_lengthener')
			.attr('style','width:930px')



	exh = d3.select('body').selectAll('.expiration_head_col')
	exh.attr('onclick','close_body(this)')

	var all_the_strikes = s1_0.map(function(d){return Number(d.key)})
	// sp = d3.select('#left_col').append('div')
	// sp.text(115030)
	if (seccode == 'RI') {var titler = 'RIZ7'}
	if (seccode == 'Si') {var titler = 'SiZ7'}

	sp = stockprice

	for (var i in all_the_strikes) {
		if ((sp > all_the_strikes[i]) && (sp < all_the_strikes[Number(i)+1])) {
			var stuko = all_the_strikes[i]
			var stuko2 = all_the_strikes[Number(i)+1]
			console.log(stuko,stuko2)
		}
	}


	strks = d3.selectAll('.strike')

	//function atm_line(row) {
	//	d3.select('#'+row.id).append("svg").attr("style","position:absolute;width:720px;height:2px").attr('class','atmline').attr("transform","translate(-362,-4)").append("rect").attr("x", 0).attr("y", 0).attr('width',715).attr('height',2).attr('style',"stroke:red;fill:none;stroke-width:5")
	//}
	vol_terms = []
	function atm_line(row) {
		var fauser = row.parentElement.parentElement.attributes.value.value
		console.log('FAUSER')
		var svigo = d3.select('#'+row.id).append("svg")
		svigo.attr("style","position:absolute;width:720px;height:2px").attr('class','atmline').attr("transform","translate(-362,-4)").append("rect").attr("x", 0).attr("y", 0).attr('width',715).attr('height',2).attr('style',"stroke:red;fill:none;stroke-width:5")
		var ido = row.id
		var ido2 = ido.split('_')[0]+'_'+ido.split('_')[1]+'_volatility'
		var atmvol = Number(d3.select('#'+ido2)['_groups'][0][0].innerText)
		svigo.attr('value',atmvol)
		vol_terms.push(fauser,atmvol)
		console.log(ido,atmvol)

	}
	strks["_groups"][0].forEach(function(d){if(d.innerText == stuko){console.log(d);atm_line(d)}})



	d3.select('body').selectAll('.strike_selector_col').attr('onclick','strikeViews(this)')

	d3.select('body').selectAll('.expiration_head_col')["_groups"][0].forEach(function(d) {close_body(d)})

	d3.select('#dashboard_activate').text(titler)



}



function close_body(thing) {
	thing = thing.parentElement.parentElement
	window.close_body_thing = thing
	console.log(thing)
	if (thing.nextElementSibling.style.display != 'none') {
		thing.nextElementSibling.style.display = 'none'
		thing.nextElementSibling.nextElementSibling.style.display = 'none'
		thing.children[0].children[1].hidden = true
		thing.children[0].children[2].hidden = true
		thing.children[0].children[3].hidden = true
		thing.children[0].children[0].colSpan = columns
//		thing.nextElementSibling.style.height = '0px'
//               thing.nextElementSibling.nextElementSibling.style.height = '0px'
//		thing.nextElementSibling.style.overflowY = 'hidden'
//                thing.nextElementSibling.nextElementSibling.style.overflowY = 'hidden'
	} else {
		thing.children[0].children[0].colSpan = columns - 3
		thing.children[0].children[1].hidden = false
                thing.children[0].children[2].hidden = false
                thing.children[0].children[3].hidden = false
		thing.nextElementSibling.style.display = 'table-header-group'
		thing.nextElementSibling.nextElementSibling.style.display = 'table-row-group'
	}
}

// var startTimeWorker = new Date();
// console.log('worker is here')
var colas = ['Th','𝚫','Γ','Θ','V','OP','NUM_T','LAST','BID','ASK','THEO']
var putas = ['THEO','BID','ASK','LAST','NUM_T','OP','V','Θ','Γ','𝚫','Th']
var stockprice = 113380
var r_rate = 0.005





// window.hero = 'hero'
var columns
function append_headers(table) {
	var thead = table.append('thead').attr('class','chain_head')
	for (var i in colas){
		if (i < 5) {
			thead.append('th').attr('class','greek_headcol').attr('onclick','hideGreek(this)').text(colas[i])
		} else {
			thead.append('th').text(colas[i])
		}
	}
	thead.append('th').attr('class','strike_headcol').text('STRK')
	thead.append('th').attr('class','volatility_headcol').text('VOL')
	for (var i in putas){
		if (i > 5) {
			thead.append('th').attr('class','greek_headcol').attr('onclick','hideGreek(this)').text(putas[i])
		} else {
			thead.append('th').text(putas[i])
		}
	}
	window.columns = colas.length+putas.length+2
}
