// https://github.com/wavesplatform/waves-api
const transferData = {
    // An arbitrary address; mine, in this example
    recipient: '3PMgh8ra7v9USWUJxUCxKQKr6PM3MgqNVR8',
    // ID of a token, or WAVES
    assetId: 'WAVES',
    // The real amount is the given number divided by 10^(precision of the token)
    amount: 10000000,
    // The same rules for these two fields
    feeAssetId: 'WAVES',
    fee: 100000,
    // 140 bytes of data (it's allowed to use Uint8Array here)
    attachment: '',
    timestamp: Date.now()
};

Waves.API.Node.v1.assets.transfer(transferData, seed.keyPair).then((responseData) => {
    console.log(responseData);
});
