import React, { useEffect, useState } from 'react';
import style from './index.module.scss';
import axios from 'axios';
import { Image } from 'antd';

export
function NFTSelector(props: { address: string }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [ownedNfts, setOwnedNfts] = useState<any[]>([]);

  const updateNfts = async () => {
    const rsp = await axios.post(`http://localhost:9999/api/my/nft/getNftsForOwner`);
    console.log(rsp);
    setOwnedNfts(rsp.data.ownedNfts);
  };

  useEffect(() => {
    updateNfts();
  }, []);

  return <div>
    <div>NFT选择器</div>
    <div>{props.address}</div>
    <div>
      {ownedNfts.map((nft) => <Image
        width={64}
        height={64}
        src={nft.rawMetadata.image_url || nft.rawMetadata.image}
      />)}
    </div>
  </div>;
}
