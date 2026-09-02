import useConnectWallet from "@/store/wallet/useConnectWallet"
import useConnectWalletInt from "@/store/wallet/useConnectWalletInt"
import { Button } from "antd"

const Header = () => {
  const { connectWalletStore, address } = useConnectWallet()
  useConnectWalletInt()
  return (
    <div>
      <Button onClick={() => { connectWalletStore() }}>连接{address}</Button>
    </div>
  )
}

export default Header
