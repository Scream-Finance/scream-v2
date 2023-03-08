import { GeistProvider } from '@geist-ui/react'
import { Web3ReactProvider } from '@web3-react/core'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useState } from 'react'
import Meta from '../components/Meta'
import SafetyModal from '../components/SafetyModal'
import TermsModal from '../components/TermsModal'
import Web3ReactManager from '../components/Web3ReactManager'
import { UseAlertsWrapper } from '../hooks/useAlerts'
import { FarmDataWrapper } from '../hooks/useFarmData'
import { MarketsWrapper } from '../hooks/useMarkets'
import { GoogleAnalytics } from '../lib/ga'
import '../styles/global.css'
import getLibrary from '../utils/getLibrary'

const Web3ReactProviderDefault = dynamic(() => import('../components/Provider'), { ssr: false })

export default function App({ Component, pageProps }: AppProps) {

    const [showSafetyModal, setShowSafetyModal] = useState(true)

    return (
        <>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
                    integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
                    crossOrigin="anonymous"
                />
                <script src="/js/three.min.js" />
                <script src="/js/p5.min.js" />
            </Head>
            <Meta />

            <GoogleAnalytics />

            <GeistProvider themeType='dark'>
                <Web3ReactProvider getLibrary={getLibrary}>
                    <Web3ReactProviderDefault getLibrary={getLibrary}>
                        <Web3ReactManager>
                            <MarketsWrapper>
                                <FarmDataWrapper>
                                    <UseAlertsWrapper>
                                        <SafetyModal open={showSafetyModal} hide={() => setShowSafetyModal(false)} />
                                        <Component {...pageProps} />
                                    </UseAlertsWrapper>
                                </FarmDataWrapper>
                            </MarketsWrapper>
                        </Web3ReactManager>
                    </Web3ReactProviderDefault>
                </Web3ReactProvider>
            </GeistProvider>
        </>
    )
}
