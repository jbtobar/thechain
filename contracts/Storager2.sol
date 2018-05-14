pragma solidity^0.4.17;

contract Storager2 {
  address public owner;


  mapping (bytes32 => uint) public uints1;

  event CallbackGetPrices();

  function Storager2() public {
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

  function getPrices(bytes32[] codes) constant public returns (uint[]) {
    uint[] warsaw;

    for(uint i=0;i<codes.length;i++) {
      bytes32 cod = codes[i];
      uint val = uints1[cod];
      warsaw.push(val);
    }

    return warsaw;
  }



}
