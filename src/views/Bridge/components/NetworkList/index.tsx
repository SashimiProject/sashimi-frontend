import { Col, Row, Menu, Dropdown } from 'antd'
import React, { useMemo, useState } from 'react'
import { useMedia } from 'react-use'
import config from '../../config'
import images from '../../images'
import metamaskLogo from '../../../../assets/img/metamask-fox.svg'
import walletConnectLogo from '../../../../assets/img/wallet-connect.svg'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { useWallet } from 'use-wallet'
import useTranslation from '../../utils/useTranslation'
const { formNetwork, toNetwork, formNetworkID } = config
interface Props {
  modal?: boolean
  toChainID: any
  setToChainId?: (v: number) => void
}
const NetworkList: React.FC<Props> = ({ modal, toChainID, setToChainId }) => {
  const below768 = useMedia('(max-width: 768px)')
  const { account, connector } = useWallet()

  const { t } = useTranslation()
  const icon = connector === 'injected' ? metamaskLogo : walletConnectLogo
  const [visible, setVisible] = useState<boolean>(false)
  const menu = useMemo(() => {
    return (
      <Menu
        selectedKeys={[String(toChainID)]}
        onClick={({ key }) => {
          setVisible(false)
          const num = Number(key)
          if (num === toChainID) return
          setToChainId?.(num)
        }}
      >
        {Object.entries(toNetwork).map(([key, item]: [any, any]) => {
          return (
            <Menu.Item key={key}>
              <img className="network-menu-img" src={item.src} alt="" />
              {item.title}
            </Menu.Item>
          )
        })}
      </Menu>
    )
  }, [setToChainId, toChainID])
  const toMemo = useMemo(() => {
    return (
      <Col
        span={below768 ? 24 : 10}
        className={`to-box${modal ? ' to-box-modal' : ''}`}
      >
        <span className="item-title">{t('To')}</span>
        {modal ? (
          <Row className="item-row">
            <img className="chain-icon" src={toNetwork[toChainID].src} alt="" />
            <span>{toNetwork[toChainID].title}</span>
          </Row>
        ) : (
          <Dropdown
            trigger={['click']}
            overlay={menu}
            onVisibleChange={(v) => setVisible(v)}
            visible={visible}
          >
            <Row className="item-row item-click">
              <img
                className="chain-icon"
                src={toNetwork[toChainID].src}
                alt=""
              />
              <span>{toNetwork[toChainID].title}</span>
              <div className="bridge-line">
                {visible ? <UpOutlined /> : <DownOutlined />}
              </div>
            </Row>
          </Dropdown>
        )}
      </Col>
    )
  }, [below768, menu, modal, t, toChainID, visible])
  if (below768) {
    return (
      <Col className="network-list">
        {!modal && (
          <Col className="arrows-box">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={toNetwork[toChainID].arrowsHref}
            >
              <img src={images.arrows} alt="" />
            </a>
          </Col>
        )}
        <Col span={24} className={`from-box${modal ? ' from-box-modal' : ''}`}>
          <span className="item-title">{t('From')}</span>
          <Row className="item-row">
            <img className="chain-icon" src={formNetwork.src} alt="" />
            <span>{formNetwork.title}</span>
            {!modal && account ? (
              <Row className="wallet-icon">
                <span className="wallet-text">{t('Connected')}</span>
                <img src={icon} alt="" />
              </Row>
            ) : null}
          </Row>
        </Col>
        {toMemo}
      </Col>
    )
  }
  return (
    <Row className="network-list">
      <Col span={10} className="from-box">
        <span className="item-title">{t('From')}</span>
        <Row className="item-row">
          <img className="chain-icon" src={formNetwork.src} alt="" />
          <span>{formNetwork.title}</span>
          {!modal && account ? (
            <Row className="wallet-icon">
              <span className="wallet-text">{t('Connected')}</span>
              <img src={icon} alt="" />
            </Row>
          ) : null}
        </Row>
      </Col>
      <Col className="arrows-box">
        {modal ? (
          <img src={images.arrowRight} alt="" />
        ) : (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`${toNetwork[toChainID].arrowsHref}?toChainId=${formNetworkID}`}
          >
            <img src={images.arrows} alt="" />
          </a>
        )}
      </Col>
      {toMemo}
    </Row>
  )
}

export default NetworkList
