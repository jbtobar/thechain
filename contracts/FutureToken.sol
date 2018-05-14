pragma solidity ^0.4.18;

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

contract FutureToken is SafeMath {
	string public name;
  address public owner;

	mapping(address => uint) public balances_buyers;
	mapping(address => uint) public balances_sellers;

	mapping(address => uint) public deposits_buyers;
	mapping(address => uint) public deposits_sellers;

	mapping(address => uint) public balances;

	uint public price;

	uint public collateral_seller;
	uint public collateral_buyer;




	function FutureToken() public {
		name = 'RTSX';
		owner = msg.sender;
		// 0.3 ETH
		// $ 211
		collateral_seller = 300000000000000000;
		// 0.15 ETH
		// $ 105
		collateral_buyer  = 150000000000000000;
		price = 1000000000000000000;
		// 1 ETH
		// 705 $
	}


	function openLongSide() public payable returns (bool success) {
		require(msg.value >= collateral_buyer);
		balances_buyers[msg.sender] = safeAdd(balances_buyers[msg.sender], safeDiv(msg.value,collateral_buyer));
		deposits_buyers[msg.sender] = safeAdd(deposits_buyers[msg.sender], msg.value);
		balances[msg.sender] = safeAdd(balances[msg.sender], safeDiv(msg.value,collateral_buyer));
		return true;
	}

	function openShortSide() public payable returns (bool success) {
		require(msg.value >= collateral_seller);
		balances_sellers[msg.sender] = safeAdd(balances_sellers[msg.sender], safeDiv(msg.value,collateral_seller));
		deposits_sellers[msg.sender] = safeAdd(deposits_sellers[msg.sender], msg.value);
		balances[msg.sender] = safeAdd(balances[msg.sender], safeDiv(msg.value,collateral_seller));
		return true;
	}

	function closeLongSide(uint tokens) public payable returns (bool success) {
    require(balances_buyers[msg.sender] >= tokens);
		balances[msg.sender] = safeSub(balances[msg.sender], tokens);
		balances_buyers[msg.sender] = safeSub(balances_buyers[msg.sender], tokens);
		deposits_buyers[msg.sender] = safeSub(deposits_buyers[msg.sender], safeMul(collateral_buyer,tokens));
		// balances[broker] = safeAdd(balances[broker], tokens);
		msg.sender.transfer(safeMul(collateral_buyer,tokens));
		return true;
	}

	function closeShortSide(uint tokens) public payable returns (bool success) {
    require(balances_sellers[msg.sender] >= tokens);
		balances[msg.sender] = safeSub(balances[msg.sender], tokens);
		balances_sellers[msg.sender] = safeSub(balances_sellers[msg.sender], tokens);
		deposits_sellers[msg.sender] = safeSub(deposits_sellers[msg.sender], safeMul(collateral_seller,tokens));
		// balances[broker] = safeAdd(balances[broker], tokens);
		msg.sender.transfer(safeMul(collateral_seller,tokens));
		return true;
	}

  function setCollateralSeller(uint cap) public {
        require(msg.sender == owner);
        collateral_seller = cap;
  }
  function setCollateralBuyer(uint cap) public {
        require(msg.sender == owner);
        collateral_buyer = cap;
  }
  function setPrice(uint cap) public {
        require(msg.sender == owner);
        price = cap;
  }
  function withdrawAll() public {
      require(msg.sender == owner);
      owner.transfer(this.balance);
  }

}
