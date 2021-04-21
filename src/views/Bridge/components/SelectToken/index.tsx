import { Select } from 'antd'
import React from 'react'
type options = { address: string; symbol: string }[]
interface SelectTokenProps {
  defaultValue: string
  options?: options
  onChange: (item: any) => void
}
const SelectToken: React.FC<SelectTokenProps> = ({ defaultValue, options, onChange }) => {
  return (
    <Select
      onChange={v => {
        onChange(options?.find(i => i.address === v))
      }}
      style={{ width: '100%' }}
      defaultValue={defaultValue}
    >
      {options?.map(i => (
        <Select.Option key={i.address} value={i.address}>
          {i.symbol}
        </Select.Option>
      ))}
    </Select>
  )
}

export default SelectToken
