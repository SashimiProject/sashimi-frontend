import { Button, Col, Modal, Row } from 'antd'
import React from 'react'
import NetworkList from '../NetworkList'
import './styles.less'
import config from '../../config'
import { ModalProps } from 'antd/lib/modal'
import useTranslation from '../../utils/useTranslation'
const { feeSymbol } = config
interface Props extends ModalProps {
  bridgeInfo: any
  values: any
  onConfirm: () => void
  toChainID: any
}
const ConfirmModal: React.FC<Props> = ({
  visible,
  onCancel,
  bridgeInfo,
  values,
  onConfirm,
  toChainID,
}) => {
  const { t } = useTranslation()
  const { symbol, showFee } = bridgeInfo
  const { amount, toAddress } = values || {}
  return (
    <Modal
      className="confirm-modal"
      centered
      footer={null}
      destroyOnClose
      visible={visible}
      title={'Confirm'}
      maskClosable={false}
      onCancel={onCancel}
    >
      <NetworkList modal toChainID={toChainID} />
      <Col span={24} className="modal-item-box">
        <Row justify="space-between" className="modal-item">
          <span>{t('Asset')}</span>
          <span>{symbol}</span>
        </Row>
        <Row justify="space-between" className="modal-item">
          <span>{t('Transfer Amount')}</span>
          <span>
            {amount}&nbsp;
            {symbol}
          </span>
        </Row>
        <Row justify="space-between" className="modal-item">
          <span>{t('Fee')}</span>
          <span>
            {showFee}&nbsp;{feeSymbol}
          </span>
        </Row>
        <Row justify="space-between" className="modal-item">
          <span>{t('Receiving Address')}</span>
          <span>{toAddress}</span>
        </Row>
      </Col>
      <Button
        onClick={onConfirm}
        className="confirm-button"
        type="primary"
        htmlType="submit"
      >
        {t('Confirm')}
      </Button>
      {/* <div className="confirm-note">
        {t('Note')}:&nbsp;
        {t('Bridge Note')}
      </div> */}
    </Modal>
  )
}

export default ConfirmModal
