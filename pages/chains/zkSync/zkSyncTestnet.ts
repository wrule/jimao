import { zkSyncTestnet } from 'wagmi/chains';
import zkSyncLogo from './zkSync.png';

const chain: any = { ...zkSyncTestnet };
chain.hasIcon = true;
chain.iconBackground = 'black';
chain.iconUrl = zkSyncLogo.src;

export default chain;
