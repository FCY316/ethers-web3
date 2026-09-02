import { Button, Empty, Modal } from "antd";
import { useEffect, useState } from "react";

import useConnectWallet from "@/store/wallet/useConnectWallet";
import useWalletPop from "@/store/walletPop";

/**
 * 钱包选择弹窗。
 *
 * EIP-6963 可能同时发现多个注入钱包，因此连接前必须把 provider 列表呈现给用户。
 * 此组件挂载在 MyApp 根部，任意页面调用 connectWalletStore() 都能打开同一个弹窗。
 */
const WalletProviderModal = () => {
  // openWallet 由连接 store 在未传 UUID 时设置；这里仅负责展示和关闭弹窗。
  const { openWallet, setOpenWallet } = useWalletPop();
  const {
    connectWalletStore,
    discoverWalletProviders,
    walletProviders,
  } = useConnectWallet();
  // 只让用户当前点击的钱包按钮进入 loading，其他钱包仍保持可选。
  const [connectingUuid, setConnectingUuid] = useState<string>();

  useEffect(() => {
    // 每次打开都请求钱包重新公告，处理扩展在首次应用加载后才注入 provider 的场景。
    if (openWallet) discoverWalletProviders();
  }, [discoverWalletProviders, openWallet]);

  /**
   * 将用户点击的 UUID 传给连接 store。
   * 连接失败时保持弹窗打开，以便用户改选其他钱包或重试；成功后才关闭。
   */
  const connectProvider = async (providerUuid: string) => {
    setConnectingUuid(providerUuid);
    const connected = await connectWalletStore(providerUuid);
    setConnectingUuid(undefined);
    if (connected) setOpenWallet(false);
  };
  return (
    <Modal
      title="选择钱包"
      open={openWallet}
      footer={null}
      onCancel={() => setOpenWallet(false)}
    >
      {/* 没有 provider 时提示重新扫描，直到钱包扩展公告可用的 EIP-6963 provider。 */}
      {walletProviders.length ? (
        <div className="flex flex-col gap-2">
          {walletProviders.map(({ info }) => (
            <Button
              block
              key={info.uuid}
              className="flex h-12 items-center justify-start"
              loading={connectingUuid === info.uuid}
              onClick={() => connectProvider(info.uuid)}
            >
              {/* EIP-6963 的 SVG icon 仅以 img 渲染，避免执行不受信任的脚本。 */}
              <img
                alt=""
                className="mr-3 h-6 w-6 rounded"
                src={info.icon}
              />
              <span>{info.name}</span>
            </Button>
          ))}
        </div>
      ) : (
        <Empty description="未发现支持 EIP-6963 的钱包扩展">
          {/* 再次派发 requestProvider，不需要刷新页面。 */}
          <Button type="primary" onClick={discoverWalletProviders}>
            重新检测
          </Button>
        </Empty>
      )}
    </Modal>
  );
};

export default WalletProviderModal;
