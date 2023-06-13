import type { NextPage } from 'next';
import style from './index.module.scss';
import { Button } from 'antd/lib';
import { useSignMessage } from 'wagmi';
import { ethers } from 'ethers';

const Home: NextPage = () => {
  const { data, isError, isLoading, isSuccess, signMessageAsync } = useSignMessage({
    message: 'jimao'
  });
  return <div>
    <Button type="primary" loading={isLoading} onClick={async () => {
      const data = await signMessageAsync();
      console.log(data);
      const address = ethers.verifyMessage('jimao', data);
      console.log(address);
    }}>签名消息</Button>
    {isSuccess && <div>Signature: {data}</div>}
    {isError && <div>Error signing message</div>}
  </div>;
};

export default Home;
