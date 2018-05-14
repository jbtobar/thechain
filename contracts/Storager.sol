pragma solidity^0.4.17;

contract Storager {
  address public owner;


  mapping (bytes32 => uint) public uints1;

  event CallbackGetPrices();

  function Storager() public {
    owner = msg.sender;
  }

  function updatePrices() public {
    // Calls the callback function
    CallbackGetPrices();
  }
  function setPrice(bytes32 code, uint cap) public {
    // If it isn't sent by a trusted oracle
    // a.k.a ourselves, ignore it
    require(msg.sender == owner);
    uints1[code] = cap;
  }
  function setPrices(bytes32[] inx, uint[] cap) public {
    // If it isn't sent by a trusted oracle
    // a.k.a ourselves, ignore it
    require(inx.length == cap.length);
    require(msg.sender == owner);

    for(uint i;i<inx.length;i++) {
      bytes32 mush = inx[i];
      uint val = cap[i];
      uints1[mush] = val;
    }
  }

  function getPrice(bytes32 code) constant public returns (uint) {
    return uints1[code];
  }



}
