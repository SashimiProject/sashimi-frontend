/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import BigNumber from 'bignumber.js'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation, usePrevious } from 'react-use'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import config from '../config'
import { isUTCToday } from '../utils'
import { ContractBasic } from '../utils/contract'
import { callERC20ViewMethod } from '../utils/erc20'
import { useBalances } from './useBalances'
const { CrossChainAddress, feeDecimals } = config
type bridge = {
  crossChainInfo: {
    reqFee: BigNumber
    maxAmount: BigNumber
    maxAmountPerDay: BigNumber
    sendTotalAmount: BigNumber
    paused: boolean
  }
  address: string
  dBalance: BigNumber
  fee: BigNumber
  showFee: string
  balance: BigNumber
  decimals: number
  showBalance: BigNumber
  maxAmount: BigNumber
  setToken: React.Dispatch<any>
  account: string
  getCrossChainInfo: () => void
  ethereum: provider
  symbol: string
}[]
export const useBridge = (defaultValue: any, toChainID: number): bridge => {
  const [crossChainInfo, setCrossChainInfo] = useState<any>({})
  const { fee } = crossChainInfo
  const [token, Token] = useState(defaultValue ?? {})
  const { address, decimals } = token
  const [[balance], onGetBalance] = useBalances(address)

  const {
    account,
    ethereum,
  }: { account: string | null; ethereum: provider } = useWallet()
  const setToken = useCallback((i) => {
    Token(i)
  }, [])

  const onGetDecimal = useCallback(async () => {
    const decimals = await callERC20ViewMethod('decimals', ethereum, address)
    const obj = {
      ...token,
      decimals: isNaN(Number(decimals)) ? '0' : Number(decimals),
    }
    if (JSON.stringify(obj) !== JSON.stringify(token)) setToken(obj)
  }, [ethereum, address, setToken, token])
  const onGetToken = useCallback(() => {
    if (account && address && ethereum) {
      if (!decimals) {
        onGetDecimal()
      }
    }
  }, [account, address, decimals, ethereum, onGetDecimal])
  const getChainInfo = useCallback(async () => {
    if (!address) return

    const contract = new ContractBasic({
      contractName: 'CrossChainABI',
      provider: ethereum,
      contractAddress: CrossChainAddress,
    })
    const [
      reqFee,
      maxAmount,
      maxAmountPerDay,
      sendTotalAmount,
      timestamp,
      paused,
    ] = await Promise.all([
      contract.callViewMethod('fee', [toChainID]),
      contract.callViewMethod('maxAmount', [address]),
      contract.callViewMethod('maxSendAmountPerDay', [address]),
      contract.callViewMethod('sendTotalAmount', [address]),
      contract.callViewMethod('timestamp'),
      contract.callViewMethod('paused'),
    ])
    console.log(
      reqFee,
      maxAmount,
      maxAmountPerDay,
      sendTotalAmount,
      timestamp,
      paused,
    )

    const obj: any = {}
    if (!reqFee.error) obj.fee = new BigNumber(reqFee)

    if (!maxAmount.error) obj.maxAmount = new BigNumber(maxAmount)

    if (!maxAmountPerDay.error)
      obj.maxAmountPerDay = new BigNumber(maxAmountPerDay)

    if (!sendTotalAmount.error)
      obj.sendTotalAmount = new BigNumber(
        isUTCToday(timestamp) ? sendTotalAmount : 0,
      )
    if (!paused.error) {
      obj.paused = paused
    }
    setCrossChainInfo(obj)
  }, [address, ethereum, toChainID])
  const getCrossChainInfo = useCallback(() => {
    onGetBalance()
    onGetToken()
    getChainInfo()
  }, [getChainInfo, onGetBalance, onGetToken])
  useEffect(() => {
    getCrossChainInfo()
  }, [getCrossChainInfo])
  const dBalance = decimals && balance ? balance.dividedBy(10 ** decimals) : '-'
  return [
    {
      decimals: decimals || 18,
      ethereum,
      crossChainInfo,
      account: account ?? '',
      balance,
      ...token,
      showFee: fee ? fee.dividedBy(10 ** Number(feeDecimals)).toFixed() : '-',
      dBalance,
      showBalance:
        decimals && balance && !balance.isNaN()
          ? balance.dividedBy(10 ** decimals).toFixed()
          : '-',
    },
    { setToken, getCrossChainInfo },
  ]
}
export const useUrlParams = () => {
  const obj: any = {}
  const { search } = useLocation()
  if (typeof search === 'string') {
    const pairs = search.slice(1).split('&')
    Array.isArray(pairs) &&
      pairs.forEach((i) => {
        const pair: any = i.split('=')
        obj[pair[0]] = pair[1]
      })
  }
  return obj
}
export const useAccountEffect = (
  callback: (account: string, prevAccount?: string) => void,
) => {
  const savedCallback = useRef<
    (account: string, prevAccount?: string) => void
  >()
  useEffect(() => {
    savedCallback.current = callback
  })
  const { account }: { account: string | null } = useWallet()
  const prevAccount = usePrevious(account)

  useEffect(() => {
    if (prevAccount !== account) {
      savedCallback.current?.(account, prevAccount)
    }
  }, [account, prevAccount])
}
