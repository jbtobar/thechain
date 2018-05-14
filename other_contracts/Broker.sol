pragma solidity^0.4.17;

contract Broker {

  uint balance;
  address public owner;
  address public client;

  uint varmar;
  uint realvm;

  mapping (bytes32 => uint) public portfolio_qty;
  mapping (bytes32 => uint) public portfolio_price;

  mapping (bytes32 => uint) public balance_sold_value;
  mapping (bytes32 => uint) public balance_sold_codes;

  bytes32[] public active;


  function Broker(address client_address) public {
    owner = msg.sender;
    client = client_address;
  }

  function addSecurity(bytes32 code, uint val, uint qty) {
    require(msg.sender == client_address);

    if (portfolio_qty[code] > 0) {

      uint pre_qty = portfolio_qty[code]
      uint pre_price = portfolio_price[code]

      portfolio_qty[code] = pre_qty + qty
      portfolio_price[code] = (pre_qty * pre_price + qty*val) / (pre_qty + qty)

    } else {
      portfolio_qty[code] = qty
      portfolio_price[code] = val
    }

  }

  function removeSecurity(bytes32 code, uint val, uint qty) {
    uint pre_qty = portfolio_qty[code]
    uint pre_price = portfolio_price[code]
    require(pre_qty >= qty)

    if (pre_qty - qty == 0) {
      portfolio_price[code] = 0
      portfolio_qty[code] = 0
    } else {
      portfolio_price[code] = (qty*val - pre_qty * pre_price) / (pre_qty - qty)
      portfolio_qty[code] = pre_qty - qty
    }

  }








}
