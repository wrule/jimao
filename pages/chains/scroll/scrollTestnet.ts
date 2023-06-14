import { scrollTestnet } from 'wagmi/chains';
import scrollLogo from './scroll.ico';

const chain: any = { ...scrollTestnet };
chain.hasIcon = true;
chain.iconBackground = 'rgb(235, 113, 6)';
chain.iconUrl = scrollLogo.src;

export default chain;
