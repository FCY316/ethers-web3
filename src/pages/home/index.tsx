import useWallet from "@/store/useWallet"
import { Button } from "antd"


const Home = () => {
  const { wallet: { address } } = useWallet()
  return (
    <div >
      <Button className="max-tablet:bg-red-500  tablet:bg-slate-950" type="primary">Primary Button</Button>
      {address}
    </div>
  )
}

export default Home