import React, { useEffect, useState } from 'react';
import { useNetwork, useSwitchNetwork } from 'wagmi';

export default
function Switch() {
  const network = useNetwork();
  const switchNetwork = useSwitchNetwork();
  const [hydrated, setHydrated] = React.useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) return <></>;
  return <div></div>;
}
