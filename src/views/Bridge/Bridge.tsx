import {
  Alert,
  Button,
  Col,
  Form,
  Input,
  message,
  Row,
  Tag,
  Tooltip,
} from 'antd'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import SelectToken from './components/SelectToken'
import { useAccountEffect, useBridge, useUrlParams } from './hooks'
import './styles.less'
import { addressValidator, checkCrossChainTransfer } from './utils'
import config from './config'
import BigNumber from 'bignumber.js'
import ConfirmModal from './components/ConfirmModal'
import NetworkList from './components/NetworkList'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { FormInstance } from 'antd/lib/form'
import useMBalance from './hooks/useMBalance'
import useTranslation from './utils/useTranslation'
import WalletProviderModal from '../../components/WalletProviderModal'
import useModal from '../../hooks/useModal'
import { ContractBasic } from './utils/contract'
const { BRIDGE_TOKEN_LIST, CrossChainAddress, feeSymbol, toNetwork } = config
const defaultToChainId = Number(Object.keys(toNetwork)[0])
const defaultToken = BRIDGE_TOKEN_LIST[0]
const delay = 30000
const Bridge: React.FC = () => {
  const { toChainId } = useUrlParams()
  const numToChainId = Object.keys(toNetwork).includes(toChainId)
    ? Number(toChainId)
    : null
  const form = useRef<FormInstance>(null)
  const timer = useRef<any>()
  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)
  const [userBalanceBN] = useMBalance({ delay })
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState<boolean>(false)
  const [values, setValues] = useState<{ amount: string; toAddress: string }>()
  const [toChainID, setToChainId] = useState(numToChainId || defaultToChainId)
  const [bridgeInfo, { setToken, getCrossChainInfo }] = useBridge(
    defaultToken,
    toChainID,
  )
  const {
    balance,
    symbol,
    address,
    ethereum,
    showBalance,
    account,
    showFee,
    decimals,
    dBalance,
    crossChainInfo: { maxAmountPerDay, sendTotalAmount, paused },
  } = bridgeInfo
  const minAmount = useMemo(() => new BigNumber(10 ** -decimals), [decimals])
  const { t } = useTranslation()
  const divDigits = useCallback(
    (v: BigNumber | string | undefined) => {
      return (BigNumber.isBigNumber(v) ? v : new BigNumber(v || 0))?.dividedBy(
        10 ** decimals,
      )
    },
    [decimals],
  )
  const timesDigits = useCallback(
    (v: BigNumber | string | undefined) => {
      return (BigNumber.isBigNumber(v) ? v : new BigNumber(v || 0))?.times(
        10 ** decimals,
      )
    },
    [decimals],
  )
  const Max = divDigits(balance)
  const sendAmount = divDigits(maxAmountPerDay?.minus(sendTotalAmount))
  useEffect(() => {
    return () => timer.current && clearTimeout(timer.current)
  }, [])
  const onFinish = useCallback((v) => {
    setVisible(true)
    setValues(v)
  }, [])
  const onConfirm = useCallback(async () => {
    try {
      const { amount, toAddress } = values || {}
      const CrossChain = new ContractBasic({
        contractName: 'CrossChainABI',
        provider: ethereum,
        contractAddress: CrossChainAddress,
      })
      setVisible(false)
      setLoading(true)
      const check = await checkCrossChainTransfer(
        CrossChain,
        ethereum,
        account,
        address,
        userBalanceBN,
        timesDigits,
        divDigits,
        amount ?? '',
        toChainID,
      )
      if (check === false) {
        setLoading(false)
        getCrossChainInfo()
        return
      }
      const [reqFee] = check
      const result = await CrossChain.callSendMethod(
        'crossChainTransfer',
        account,
        [address, timesDigits(amount).toFixed(0), toAddress, toChainID],
        {
          from: account,
          value: new BigNumber(reqFee).toFixed(0),
        },
      )
      if (result.error) {
        message.error(t('Transaction Failed'))
        message.error(result.error.message)
        getCrossChainInfo()
        setLoading(false)
        return
      }
      setLoading(false)
      form.current?.resetFields()
      message.success(t('Transaction Successful'))

      timer.current && clearTimeout(timer.current)
      timer.current = setTimeout(() => getCrossChainInfo(), 3000)
    } catch (error) {
      setLoading(false)
      console.log(error, '======error')
    }
  }, [
    values,
    ethereum,
    account,
    address,
    userBalanceBN,
    timesDigits,
    divDigits,
    toChainID,
    t,
    getCrossChainInfo,
  ])
  const amountValidator = useCallback(
    (_, value) => {
      if (!value) {
        return Promise.reject(new Error(t('Please input Amount')))
      }
      if (sendAmount.isZero() || new BigNumber(value).gt(sendAmount)) {
        return Promise.reject(
          new Error(
            t('Insufficient Contract Balance', {
              balance: sendAmount.toFixed(),
            }),
          ),
        )
      }
      if (minAmount.gt(value)) {
        return Promise.reject(
          new Error(
            t(
              'The input value is too small, transaction is not supported, please input again.',
            ),
          ),
        )
      }
      if (new BigNumber(value).gt(dBalance)) {
        return Promise.reject(
          new Error(
            t('Insufficient balance, current balance is', {
              balance: dBalance,
            }),
          ),
        )
      }
      return Promise.resolve()
    },
    [dBalance, minAmount, sendAmount, t],
  )
  useAccountEffect((account, prevAccount) => {
    const to = form.current?.getFieldValue('toAddress')
    if (to === undefined || to === prevAccount) {
      form.current?.setFieldsValue({ toAddress: account || undefined })
    }
    form.current?.setFieldsValue({ amount: undefined })
  })
  return (
    <div className="sharding-bridge">
      {paused && (
        <Alert
          showIcon
          message={t(
            'Contract is under upgrading and maintenance. Trading has been paused. Thanks for your patience.',
          )}
          type="warning"
        />
      )}
      <p className="tradable-balance">
        <span>{t('Current tradable balance')}</span>
        <Tooltip
          placement="bottomRight"
          title={t('Current tradable balance Tip')}
        >
          <QuestionCircleOutlined className="tip" />
        </Tooltip>
        <span className="amount">
          {sendAmount?.toFixed()}&nbsp;
          {symbol}
        </span>
      </p>
      <NetworkList toChainID={toChainID} setToChainId={setToChainId} />
      <div className="bridge-note">
        {t('Note')}:
        <br />
        {t('Bridge Note')}
      </div>
      <Form ref={form} onFinish={onFinish}>
        <Col span={24}>
          <span className="item-title">{t('Asset')}</span>
          <Form.Item>
            <SelectToken
              onChange={setToken}
              defaultValue={defaultToken.address}
              options={BRIDGE_TOKEN_LIST}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <span className="item-title">{t('Amount')}</span>
          <Form.Item
            extra={
              <Row className="tip-box" justify="space-between">
                <Col>
                  {t('Fee')} ≈ {showFee}&nbsp;{feeSymbol}
                </Col>
                <Col>
                  {t('Available Balance')}: {showBalance}&nbsp;{symbol}
                </Col>
              </Row>
            }
            name="amount"
            rules={[{ validator: amountValidator }]}
          >
            <Input
              // placeholder={`${minAmount} ${symbol} - ${showBalance} ${symbol}`}
              id="amount"
              type="number"
              className="input-element"
              onChange={(v) => {
                form.current?.setFieldsValue({
                  amount: v.target.value,
                })
              }}
              suffix={
                <Tag
                  className="all-btn"
                  onClick={() => {
                    let amount = '0'
                    if (Max) amount = Max.toFixed()
                    if (sendAmount?.lte(Max)) amount = sendAmount.toFixed()
                    form.current?.setFieldsValue({ amount })
                    form.current?.validateFields(['amount'])
                  }}
                >
                  {t('MAX')}
                </Tag>
              }
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <span className="item-title">{t('Receiving Address')}</span>
          <Form.Item
            extra={
              <Row className="tip-box" justify="space-between">
                <Col>
                  {t('This is the destination address of the To network')}
                </Col>
              </Row>
            }
            name="toAddress"
            rules={[{ validator: addressValidator }]}
          >
            <Input name="toAddress" className="input-address" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item>
            {account ? (
              <Button
                disabled={paused}
                loading={loading}
                className="next-button"
                type="primary"
                htmlType="submit"
              >
                {t('Next Step')}
              </Button>
            ) : (
              <Button
                onClick={onPresentWalletProviderModal}
                className="next-button"
                type="primary"
              >
                {t('Unlock Wallet')}
              </Button>
            )}
          </Form.Item>
        </Col>
      </Form>
      <ConfirmModal
        toChainID={toChainID}
        onConfirm={onConfirm}
        values={values}
        bridgeInfo={bridgeInfo}
        visible={visible}
        onCancel={() => setVisible(false)}
      />
    </div>
  )
}
export default Bridge
