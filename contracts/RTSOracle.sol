pragma solidity ^0.4.17;

contract RTSOracle {
  // Contract owner
  address public owner;

  // BTC Marketcap Storage
  // uint public btcMarketCap;
  uint public RTSprice;

  // Callback function
  event CallbackGetRTS();

  function RTSOracle() public {
    owner = msg.sender;
  }

  function updateRTS() public {
    // Calls the callback function
    CallbackGetRTS();
  }

  function setRTS(uint cap) public {
    // If it isn't sent by a trusted oracle
    // a.k.a ourselves, ignore it
    require(msg.sender == owner);
    RTSprice = cap;
  }

  function getRTS() constant public returns (uint) {
    return RTSprice;
  }
}
