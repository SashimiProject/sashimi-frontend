import { message } from 'antd'
import BigNumber from 'bignumber.js'
import { isAddress } from '@ethersproject/address'
import config from '../config'
import { t } from './useTranslation'
import { provider } from 'web3-core'
import { ContractBasic } from './contract'
import { checkAllowanceAndApprove } from './erc20'

const { CrossChainAddress } = config

export const addressValidator = (_: unknown, value: string): any => {
  if (!isAddress(value)) {
    return Promise.reject(new Error(t('Invalid address')))
  }
  return Promise.resolve()
}
export const getMillisecond = (time: any): any => {
  const { seconds } = time || {}
  const tim = seconds || time
  if (String(tim).length <= 10) {
    return tim * 1000
  }
  if (typeof tim !== 'number') {
    return Number(tim)
  }
  return tim
}
export const isUTCToday = (str: string | number): boolean => {
  const newDate = new Date()
  const lastDate = new Date(getMillisecond(str))
  if (
    newDate.getUTCDate() === lastDate.getUTCDate() &&
    newDate.getUTCFullYear() === lastDate.getUTCFullYear() &&
    newDate.getUTCMonth() === lastDate.getUTCMonth()
  ) {
    return true
  }
  return false
}
export const isToday = (str: string | number): boolean => {
  if (
    new Date(getMillisecond(str)).toDateString() === new Date().toDateString()
  ) {
    return true
  }
  return false
}

export const checkCrossChainTransfer = async (
  contract: ContractBasic,
  ethereum: provider,
  account: string,
  address: string,
  userBalanceBN: number | string,
  timesDigits: (v: BigNumber | string | undefined) => BigNumber,
  divDigits: (v: BigNumber | string | undefined) => BigNumber,
  amount: string,
  toChainID: number,
): Promise<any> => {
  const [
    reqFee,
    // maxAmount,
    maxAmountPerDay,
    sendTotalAmount,
    timestamp,
  ] = await Promise.all([
    contract.callViewMethod('fee', [toChainID]),
    // contract.callViewMethod("maxAmount", [address]),
    contract.callViewMethod('maxSendAmountPerDay', [address]),
    contract.callViewMethod('sendTotalAmount', [address]),
    contract.callViewMethod('timestamp'),
  ])

  if (new BigNumber(reqFee).gt(userBalanceBN)) {
    message.error(t('Insufficient Fees'))
    return false
  }

  const send = isUTCToday(timestamp) ? sendTotalAmount : 0
  const sendAmount = divDigits(new BigNumber(maxAmountPerDay)?.minus(send))
  if (new BigNumber(amount).gt(sendAmount)) {
    message.error(
      t('Insufficient Contract Balance', {
        balance: sendAmount.toFixed(),
      }),
    )
    return false
  }

  // if (new BigNumber(amount).lte(timesDigits(maxAmount))) {
  //   setLoading(false);
  //   getCrossChainInfo();
  //   return message.error(t("maxAmount", { balance: dBalance }));
  // }

  const lpContract = new ContractBasic({
    contractName: 'ERC20',
    provider: ethereum,
    contractAddress: address,
  })
  const approveResult = await checkAllowanceAndApprove(
    lpContract,
    CrossChainAddress,
    account,
    amount,
  )
  if (typeof approveResult !== 'boolean' && approveResult.error) {
    message.error(t('Check allowance and Approved failed'))
    message.error(approveResult.error.message)
    return false
  }

  return [reqFee]
}
export const getHoursOffset = (): number => {
  return 0 - new Date().getTimezoneOffset() / 60
}
