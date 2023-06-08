import React from 'react';
import { Button, Form, FormInstance, Select, Space, Input } from 'antd/lib';
import { ethers } from 'ethers';
import { useWalletClient } from 'wagmi';

export
function AddressInput(props: { value?: string, onChange?: (value: string) => void }) {
  return <Space.Compact>
    <Input
      value={props.value}
      onChange={(e) => props.onChange?.(e.target.value)}
      placeholder="请输入地址"
    />
    <Button type="primary">随机</Button>
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
        <Select value="ETH">ETH</Select>
        <Select value="ERC751">NFT（ERC751）</Select>
        <Select value="ERC20">Token（ERC20）</Select>
      </Select>
    </Form.Item>
    <Form.Item label="目标地址" name="address">
      <AddressInput />
    </Form.Item>
  </Form>
}
