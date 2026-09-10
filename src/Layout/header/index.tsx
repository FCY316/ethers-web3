import useConnectWallet from "@/store/wallet/useConnectWallet"
import useConnectWalletInt from "@/store/wallet/useConnectWalletInt"
import { Button } from "@/components/ui/button"

const Header = () => {
  const { connectWalletStore, address } = useConnectWallet()
  useConnectWalletInt()
  return (
    <div>
      <Button className="" onClick={() => { connectWalletStore() }}>连接{address}</Button>
    </div>
  )
}

export default Header
