import { Contract, ethers } from 'ethers'
import { useEffect, useState } from "react";
import contract from '@/abi/index'
import CounterContainer from "@/web3Hooks/useConnectedWallet";
import { createContainer } from 'unstated-next';
import useGetChainID from './useGetChainID';
type objKeyObjectType = {
    [key: string]: object;
}
type walletType = {
    erc20: Contract | null
}
const initialState: walletType = {
    erc20: null,
}
// new出合约，
const useNewContract = (props = initialState) => {
    // 获取chainid
    const { chainID } = useGetChainID()
    // new 出来的合约
    const [contracts, setContracts] = useState(props)
    // 得到signer
    const { signer } = CounterContainer.useContainer();
    // 当signer有后new出合约
    useEffect(() => {
        setContracts(initialState)
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
                setContracts((obj as walletType))
            }
            catch (e) {
                console.log('useNewContract', e);
            }
        } else {
            setContracts(initialState)
        }
    }, [chainID, signer])
    return contracts
}
const newContracts = createContainer(useNewContract)
export default newContracts
