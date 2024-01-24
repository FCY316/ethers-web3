import { Contract, ethers } from 'ethers'
import { useEffect } from "react";
import contract from '@/abi/index'
import useGetChainID from './useGetChainID';
import useWallet from '@/store/useWallet';
import useContract from '@/store/useContract';
type objKeyObjectType = {
    [key: string]: object;
}
type walletType = {
    erc20: Contract | null
}
// new出合约，
const useNewContract = () => {
    // 获取chainid
    const { chainID } = useGetChainID()
    // new 出来的合约
    const { setContract, clearContract } = useContract()
    // 得到signer
    // 拿到provider
    const { wallet: { signer } } = useWallet()    // 当signer有后new出合约
    useEffect(() => {        
        if (Number(chainID) && signer) {
            // 当重新new出合约的时候，初始化合约
            try {
                let obj: objKeyObjectType = {}
                // 遍历出合约
                Object.keys(contract[chainID] || {}).forEach((key) => {
                    if (contract[(chainID)][key].address) {
                        obj[key] = new ethers.Contract(contract[(chainID)][key].address, contract[chainID][key].abi, signer);
                    }
                })
                setContract((obj as walletType))
            }
            catch (e) {
                console.log('useNewContract', e);
            }
        } else {
            clearContract()
        }
    }, [chainID, clearContract, setContract, signer])
}
export default useNewContract
