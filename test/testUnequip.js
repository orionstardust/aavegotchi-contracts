const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('Test uneqipping', async function () {
  const diamondAddress = '0x86935F11C86623deC8a25696E1C19a8659CbF95d'

  

  const totalUnequip=[
    0, 0, 0, 0, 0, 0,
    0, 0, 0,  0, 0, 0,
    0, 0, 0,  0
  ]

  let headequip=[
    88, 0, 0, 39, 0, 0,
    0, 0, 0,  0, 0, 0,
    0, 0, 0,  0
  ]

  before(async function () {
    global.account="0xF3a57FAbea6e198403864640061E3abc168cee80"
    global.signer=ethers.provider.getSigner(global.account)
    gotchiFacet = (await ethers.getContractAt('contracts/Aavegotchi/facets/AavegotchiFacet.sol:AavegotchiFacet', diamondAddress))
    itemsFacet = (await ethers.getContractAt('contracts/Aavegotchi/facets/ItemsFacet.sol:ItemsFacet', diamondAddress)).connect(global.signer)
   
    const impersonate=await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [global.account]
   })

console.log(impersonate)

let owner= await gotchiFacet.ownerOf(6845)
console.log(owner)
    let currentGotchiBal= await (itemsFacet.equippedWearables(6845))
    console.log(currentGotchiBal)
  })
  it('sends item back after unequipping', async function () {

    let owner=global.account

  
   const signer = ethers.provider.getSigner(global.account)

   await global.itemsFacet.equipWearables(6845,totalUnequip)

   let currentSlotBal1=await(itemsFacet.balanceOf(owner,88))
   let currentSlotBal2=await(itemsFacet.balanceOf(owner,39))
   let currentGotchiBal= await (itemsFacet.equippedWearables(6845))
   console.log(currentGotchiBal)

    expect(currentSlotBal1.toString()).to.equal('1')
    expect(currentSlotBal2.toString()).to.equal('1')
     
  })

})