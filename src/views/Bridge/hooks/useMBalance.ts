import { useCallback, useState } from "react";
import Web3 from "web3";
import { useWallet } from "use-wallet";
import { provider } from "web3-core";
import useInterval from "./useInterval";

interface UseNFTInfoProps {
  address?: string;
  delay?: number;
}

const useMBalance: (params: UseNFTInfoProps) => Array<string | any> = ({
  address,
  delay,
}) => {
  const {
    account,
    ethereum,
    chainId,
  }: {
    account: string | null;
    ethereum: provider;
    chainId: number | null;
  } = useWallet();
  const [userBalance, setUserBalance] = useState<string>("0");

  // Get eth balance
  const fetchBalance = useCallback(async () => {
    if (!account || !ethereum) {
      setUserBalance("0");
      return;
    }
    const web3 = new Web3(ethereum);
    const ethBalance = await web3.eth.getBalance(address || account);
    setUserBalance(ethBalance);
  }, [account, ethereum, address]);

  useInterval(
    () => {
      fetchBalance();
    },
    delay,
    [account, chainId]
  );

  return [userBalance, fetchBalance];
};
export default useMBalance;
