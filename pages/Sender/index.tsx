import React from 'react';
import { Button, Form, FormInstance, Select, Space, Input, InputNumber } from 'antd/lib';
import { ethers } from 'ethers';
import { useWalletClient } from 'wagmi';

export
function AddressInput(props: { value?: string, onChange?: (value: string) => void }) {
  return <Space.Compact style={{ width: '100%' }}>
    <Input
      value={props.value}
      onChange={(e) => props.onChange?.(e.target.value)}
      placeholder="请输入地址"
      allowClear
    />
    <Button type="primary" onClick={() => {
      props.onChange?.(ethers.Wallet.createRandom().address);
    }}>随机</Button>
  </Space.Compact>;
}

export
function AmountInput(props: { value?: number, onChange?: (value: number | null) => void }) {
  return <Space.Compact style={{ width: '100%' }}>
    <InputNumber
      style={{ width: '100%' }}
      value={props.value}
      onChange={(value) => props.onChange?.(value)}
      placeholder="请输入金额"
    />
    <Button type="primary" onClick={() => {

    }}>随机</Button>
  </Space.Compact>;
}

export
function Sender() {
  const formRef = React.useRef<FormInstance>(null);

  const handleRandomAddress = () => {
    const address = ethers.Wallet.createRandom().address;
    formRef.current?.setFieldValue('address', address);
  };

  return <Form ref={formRef} layout="vertical">
    <Form.Item label="发送类型" name="type">
      <Select>
        <Select.Option value="ETH">ETH</Select.Option>
        <Select.Option value="ERC20">Token（ERC20）</Select.Option>
        <Select.Option value="ERC751">NFT（ERC721）</Select.Option>
      </Select>
    </Form.Item>
    <Form.Item label="目标地址" name="address">
      <AddressInput />
    </Form.Item>
    <Form.Item label="金额" name="amount">
      <AmountInput />
    </Form.Item>
  </Form>
}
