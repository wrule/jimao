import React, { useEffect, useState } from 'react';
import { Button, Form, FormInstance, Select, Space, Input, InputNumber } from 'antd/lib';
import { ethers } from 'ethers';
import { useWalletClient } from 'wagmi';
import { NFTSelector } from '../NFTSelector';

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
  const [type, setType] = useState<string>('ETH');

  useEffect(() => {
    formRef.current?.setFieldValue('type', type);
  }, []);

  const handleTypeChange = (newType: string) => {
    setType(newType);
  };

  return <Form ref={formRef} layout="vertical">
    <Form.Item label="发送类型" name="type">
      <Select onChange={handleTypeChange}>
        <Select.Option value="ETH">ETH</Select.Option>
        <Select.Option value="ERC20">Token（ERC20）</Select.Option>
        <Select.Option value="ERC721">NFT（ERC721）</Select.Option>
      </Select>
    </Form.Item>
    {type === 'ERC721' && <Form.Item label="选择NFT" name="nft">
      <NFTSelector address="0x28dF8c4d5fc59cA685546e817772181Fb717E503" />
    </Form.Item>}
    <Form.Item label="目标地址" name="address">
      <AddressInput />
    </Form.Item>
    {type !== 'ERC721' && <Form.Item label="金额" name="amount">
      <AmountInput />
    </Form.Item>}
    <Form.Item>
      <Button type="primary">发送</Button>
    </Form.Item>
  </Form>
}
