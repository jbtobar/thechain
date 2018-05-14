pragma solidity^0.4.17;

contract testStorage {
  address public owner;
  mapping (string => uint) uints1;

  event CallbackGetPrices();

  function testStorage() public {
    owner = msg.sender;
  }

  function updatePrices() public {
    // Calls the callback function
    CallbackGetPrices();
  }
  function setPrices(string code, uint cap) public {
    // If it isn't sent by a trusted oracle
    // a.k.a ourselves, ignore it
    require(msg.sender == owner);
    uints1[code] = cap;
  }

  function getPrice(string code) constant public returns (uint) {
    return uints1[code];
  }


}
