// ----------------------------------------------------------------------------
// Safe maths
// ----------------------------------------------------------------------------
contract SafeMath {
    function safeAdd(uint a, uint b) internal pure returns (uint c) {
        c = a + b;
        require(c >= a);
    }
    function safeSub(uint a, uint b) internal pure returns (uint c) {
        require(b <= a);
        c = a - b;
    }
    function safeMul(uint a, uint b) internal pure returns (uint c) {
        c = a * b;
        require(a == 0 || c / a == b);
    }
    function safeDiv(uint a, uint b) internal pure returns (uint c) {
        require(b > 0);
        c = a / b;
    }
}
contract ERC20Interface {
    function totalSupply() public constant returns (uint);
    function balanceOf(address tokenOwner) public constant returns (uint balance);
    function allowance(address tokenOwner, address spender) public constant returns (uint remaining);
    function transfer(address to, uint tokens) public returns (bool success);
    function approve(address spender, uint tokens) public returns (bool success);
    function transferFrom(address from, address to, uint tokens) public returns (bool success);

    event Transfer(address indexed from, address indexed to, uint tokens);
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
}
// ----------------------------------------------------------------------------
// FUTURE
// ----------------------------------------------------------------------------
contract Future is ERC20Interface,SafeMath {

	address public buyer;
	address public seller;
	address public broker;
	uint public margin;
	// 0.15 ETH = 150000000000000000 WEI = $101.230 at 674 USD/ETH
	uint public initial_price;
	uint public current_price;

	mapping (address => uint) balances;


	function Future(address buyer_address, address seller_address,uint current_margin, uint _cp) public payable {
		buyer = buyer_address;
		seller = seller_address;
		margin = current_margin;
		current_price = _cp;
		initial_price = _cp;
		broker = msg.sender;

	}

	function() public payable {}


	function buy(uint256 quantity) public payable {
		require(safeMul(msg.value,quantity) >= safeMul(current_price,quantity));
		// uint tokens;
		// tokens = msg.value * rtsprice/10000000000000000;
		balances[msg.sender] = safeAdd(balances[msg.sender], quantity);
		Transfer(address(0), msg.sender, tokens);
	}

	function redeem(uint tokens) public returns (bool success) {
        // address to;
        // to = bigowner;
        balances[msg.sender] = safeSub(balances[msg.sender], tokens);
        balances[broker] = safeAdd(balances[broker], tokens);
        // Transfer(msg.sender, to, tokens);
        // uint redeem_amount;
        // redeem_amount = tokens*10000000000000000/rtsprice;
        // address redeem_address = msg.sender;
        redeem_address.transfer(safeMul(current_price,quantity));
        return true;
    }

	function sendEtherToOwner() {
      bigowner.transfer(this.balance);
    }


}
