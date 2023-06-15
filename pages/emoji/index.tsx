import React, { useEffect } from 'react';
import { useContractRead } from 'wagmi';
import style from './index.module.scss';
import { EmojiInfo } from '../../contract/emoji';

export default
function Emoji() {
  const { data, isError, isLoading } = useContractRead({
    address: EmojiInfo.address,
    abi: EmojiInfo.abi,
    functionName: 'name',
  });
  const [hydrated, setHydrated] = React.useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) return <></>;
  return <div className={style.page}>{data as any}</div>;
}
