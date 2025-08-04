import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { createConfig, http } from 'wagmi';

import {
  base,
} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'gtz',
  projectId: '68b63a5f47ce57460ca4665a0512d147',
  chains: [
    base,  // This will be the first/default chain
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [base] : []),
  ],
  ssr: true,
}
);