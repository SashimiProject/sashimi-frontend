import BigNumber from 'bignumber.js'
import { useCallback, useMemo, useState } from 'react'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { getBalance } from '../../../utils/erc20'
import useInterval from './useInterval'

export const useBalances = (
  address?: string | Array<string | undefined>,
): [BigNumber[], () => void] => {
  const deArr = useMemo(
    () => (Array.isArray(address) ? address.map(() => new BigNumber('')) : []),
    [address],
  )
  const [balances, setBalances] = useState<BigNumber[]>(deArr)
  const [balance, setBalance] = useState<BigNumber>(new BigNumber(''))
  const {
    ethereum,
    account,
    chainId,
  }: {
    ethereum: provider
    account: string | null
    chainId: number | null
  } = useWallet()
  const onGetBalance = useCallback(async () => {
    if (Array.isArray(address)) {
      if (!account) return setBalances(address.map(() => new BigNumber('')))
      const promise = address.map((i) => {
        if (!i) return undefined
        return getBalance(ethereum, i, account)
      })
      const bs = await Promise.all(promise)
      setBalances(bs?.map((i) => new BigNumber(i ?? '')))
      return
    }
    if (!account || !address) {
      return setBalance(new BigNumber(''))
    }
    const b = await getBalance(ethereum, address, account)
    setBalance(new BigNumber(b))
  }, [account, address, ethereum])
  useInterval(
    () => {
      onGetBalance()
    },
    10000,
    [account, address, chainId],
  )
  return [Array.isArray(address) ? balances : [balance], onGetBalance]
}
