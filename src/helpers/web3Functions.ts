export {};
// import type { BigNumber, BigNumberish, BytesLike, Contract } from "ethers"
// import { concat } from "ethers/lib/utils"
// import { AllStandardOps } from "rain-sdk"
//
// // UI stuff
// export enum CreateSteps {
//   Configure,
//   Confirm,
//   Complete
// }
//
// // Config
// export interface Vapour721AConfig {
//   name: string,
//   symbol: string,
//   description: string,
//   imageFile: File,
//   maxSupply: number,
//   currency: string,
//   royalty: number,
//   recipient: string,
//   owner: string,
//   admin: string,
//   useNativeToken: boolean,
//   currencyContract: Contract,
//   phases: Phase[],
//   soulbound: boolean,
//   erc20info: ERC20Info,
//   mediaUploadResp: any,
//   baseURI: string,
//   image?: string
// }
//
// export interface ERC20Info {
//   ready: boolean,
//   name: string,
//   symbol: string,
//   decimals: BigNumber,
//   balance: BigNumber,
// }
//
// export interface Phase {
//   start: string,
//   pricing: PriceRule,
//   walletCap: number,
//   allowedGroups?: Group[]
// }
//
// // Pricing rules
// export enum PricingRules {
//   FixedPrice,
//   StartEndPrice,
//   // LinearIncrease
// }
//
// export type PriceRule = FixedPrice | StartEndPrice
// // | LinearIncrease
//
// export interface FixedPrice {
//   type: PricingRules.FixedPrice
//   startPrice: number
// }
//
// export interface StartEndPrice {
//   type: PricingRules.StartEndPrice
//   startPrice: number,
//   endPrice: number
// }
// // export interface LinearIncrease {
// //     type: PricingRules.LinearIncrease
// //     startPrice: number,
// //     increase: number,
// //     period: number
// // }
//
// export const pricingOptions = [
//   { value: PricingRules.FixedPrice, label: "Fixed Price" },
//   { value: PricingRules.StartEndPrice, label: "Start/End Price" },
//   // { value: PricingRules.LinearIncrease, label: "Increasing Price" },
// ];
//
// // Access groups
// export enum AllowedGroup {
//   Allowlisters,
//   NFTHolders,
//   SBTHolders
// }
//
// export type Group = NFTHolders | SBTHolders | AllowListers
//
// export interface NFTHolders {
//   type: AllowedGroup.NFTHolders
//   contractAddress: string,
//   minBalance: number
// }
//
// export interface SBTHolders {
//   type: AllowedGroup.SBTHolders
//   contractAddress: string,
//   minBalance: number
// }
//
// export interface AllowListers {
//   type: AllowedGroup.Allowlisters
//   contractAddress: string,
// }
//
// export const groupOptions = [
//   { value: AllowedGroup.Allowlisters, label: "Allow list" },
//   { value: AllowedGroup.NFTHolders, label: "NFT Holders" },
//   { value: AllowedGroup.SBTHolders, label: "SBT Holders" },
// ];
//
// // For the contract
//
// export type StateConfigStruct = {
//   sources: BytesLike[];
//   constants: BigNumberish[];
// };
//
// export type InitializeConfigStruct = {
//   name: string;
//   symbol: string;
//   baseURI: string;
//   supplyLimit: BigNumberish;
//   recipient: string;
//   owner: string;
//   admin: string;
//   royaltyBPS: BigNumberish;
//   currency: string;
//   vmStateConfig: StateConfigStruct;
// };
//
// // Opcode stuff
//
// enum LocalOpcodes {
//   IERC721A_TOTAL_SUPPLY = AllStandardOps.length,
//   IERC721A_TOTAL_MINTED = AllStandardOps.length + 1,
//   IERC721A_NUMBER_MINTED = AllStandardOps.length + 2,
//   IERC721A_NUMBER_BURNED = AllStandardOps.length + 3,
// }
//
// export const Opcode = {
//   ...AllStandardOps,
//   ...LocalOpcodes,
// };
//
// export enum StorageOpcodes {
//   SUPPLY_LIMIT,
//   AMOUNT_WITHDRAWN,
//   AMOUNT_PAYABLE,
// }
//
//
//
//
//
// //
// // const WARNING_MESSAGE="Are you connected with your Web3 Wallet? (Click the button at the top right)!\n\nYou also need to be connected to Polygon Mumbai Testnet (how to: https://www.youtube.com/watch?v=I4C5RkiNAYQ)!\n\nYou will also need testnet Matic tokens (https://faucet.polygon.technology/)";
// //
// // /**
// //  * Deploy a Sale and Start it (2txs)
// //  */
// // export async function deployToken(
// //   signer: any,  setButtonLock: any, setLoading: any, reserveName: string, reserveSymbol: string, account: string,
// //   reserveDecimals: string, reserveClaimable: string
// // ) {
// //   try {
// //     if (account === "" || typeof account === 'undefined') {
// //       alert(WARNING_MESSAGE);
// //       return;
// //     }
// //
// //     setButtonLock(true);
// //     setLoading(true);
// //
// //     const emissionsERC20Config = {
// //       allowDelegatedClaims: false, // can mint on behalf of someone else
// //       erc20Config: {
// //         name: reserveName,
// //         symbol: reserveSymbol,
// //         distributor: account, // initialSupply is given to the distributor during the deployment of the emissions contract
// //         initialSupply: ethers.utils.parseUnits("0", reserveDecimals), // todo change this to 0 if possible, or tell the deployer that they will get an amoujnt of tokens
// //       },
// //       vmStateConfig: {
// //         // todo should really change 'initialSupply' to now be 'faucetSupply' or something
// //         constants: [ethers.utils.parseUnits(reserveClaimable, reserveDecimals)], // mint a set amount at a time (infinitely), if set to 10, will mint 10 at a time, no more no less (infinitely)
// //         sources: [
// //           ethers.utils.concat([
// //             rainSDK.utils.op(rainSDK.Sale.Opcodes.VAL, 0),
// //           ]),
// //         ],
// //         stackLength: 1,
// //         argumentsLength: 0,
// //       },
// //     };
// //
// //     console.log(`Deploying and Minting ERC20 Token with the following parameters:`, emissionsERC20Config);
// //     // @ts-ignore
// //     const emissionsErc20 = await rainSDK.EmissionsERC20.deploy(signer, emissionsERC20Config);
// //     // // todo claim function will mint another token (in addition to initial supply)??
// //     const emissionsERC20Address = emissionsErc20.address;
// //     console.log(`Result: deployed emissionsErc20, with address: ${emissionsERC20Address}.`, emissionsErc20);
// //     console.log('Info: to see the tokens in your Wallet, add a new token with the address above. ALSO, REMEMBER TO NOTE DOWN THIS ADDRESS, AS IT WILL BE USED AS RESERVE_TOKEN IN FUTURE TUTORIALS.');
// //
// //     // wait so subgraph has time to index
// //     setTimeout(() => {
// //       console.log(`Redirecting to Token Faucet: ${emissionsERC20Address}`);
// //       window.location.replace(`${window.location.origin}/${emissionsERC20Address}`);
// //     }, 5000)
// //   } catch (err) {
// //     console.log(err);
// //     setLoading(false);
// //     setButtonLock(false);
// //     alert('Failed Deployment.');
// //   }
// // }
// //
// // /**
// //  * Called within the modal for making a buy
// //  * THIS MUST NOT BE SHOWN BEFORE getSaleData() HAS FINISHED OR THE DATA WILL BE FROM .ENV
// //  */
// // export async function initiateClaim(
// //   signer: any, setButtonLock: any, setLoading: any, account: string, setConsoleData: any, setConsoleColor: any, tokenAddress: string, setClaimComplete: any
// // ) {
// //   try {
// //     if (account === "" || typeof account === 'undefined') {
// //       alert(WARNING_MESSAGE);
// //       return;
// //     }
// //
// //     setButtonLock(true);
// //     setLoading(true);
// //
// //     // @ts-ignore
// //     const emissionsErc20 = new rainSDK.EmissionsERC20(tokenAddress, signer);
// //
// //     // TODO FIGURE OUT WHAT IS HAPPENING WITH ADDRESSZERO
// //     const claimTransaction = await emissionsErc20.claim(account, ethers.constants.AddressZero);
// //     const claimReceipt = await claimTransaction.wait();
// //     console.log('Success', claimReceipt);
// //
// //     setConsoleData(`Complete!`);
// //     setConsoleColor(`green`); // todo add to struct
// //     setClaimComplete(true);
// //     //   setButtonLock(false); // don't set to true to disincentive users from continuing to click it
// //     setLoading(false);
// //   } catch(err) {
// //     setLoading(false);
// //     setButtonLock(false);
// //     setConsoleData(`Claim Failed (Check console for more data).`);
// //     setConsoleColor(`red`); // todo add to struct
// //     console.log(`Info: Something went wrong:`, err);
// //   }
// // }
// //
// // /**
// //  * Reserve Token Balance for User
// //  */
// // export async function getReserveBalance(signer: any, account: string, reserveTokenAddress: string, setReserveTokenBalance: any) {
// //   try {
// //     console.log(`Reserve token address`, reserveTokenAddress)
// //     const token = new rainSDK.EmissionsERC20(reserveTokenAddress, signer);
// //
// //     let balance = await token.balanceOf(account);
// //     let humanReadableBalance = `${parseInt(balance.toString())/10**18}`;
// //
// //     console.log(`User Balance`, humanReadableBalance)
// //     setReserveTokenBalance(humanReadableBalance); // todo does it need /10**18?
// //
// //   } catch(err) {
// //     console.log(`Info: Something went wrong:`, err);
// //   }
// // }
