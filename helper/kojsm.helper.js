require("dotenv").config();
const ethers = require("ethers");
const KatsuraOjisan = require("../contract/KatsuraOjisan.json");
const provider = ethers.getDefaultProvider(process.env.RPC_URL);

const smartContract = new ethers.Contract(
  "0x3a9cad3314f88238e2985f252a92f27449eb153c",
  KatsuraOjisan.abi,
  provider
);

const balanceOf = async address => {
  let balance = 0;
  let err = null;
  try {
    balance = await smartContract.balanceOf(address);
  } catch (error) {
    err = error;
  }
  return { error: err, balance: balance };
};

module.exports = {
  balanceOf
};
