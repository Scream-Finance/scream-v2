import { HomeIcon, MenuAlt3Icon } from '@heroicons/react/solid'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import useSWR from 'swr'
import ConnectWalletButton from './WalletConnect/ConnectWalletButton'

interface ButtonProps {
    href: string
    children: any
}

export function Button({ href, children }: ButtonProps) {
    const router = useRouter()

    const isActive = router.pathname.endsWith(href.slice(-6))

    return (
        <Link href={href}>
            <a>
                <p className={classNames('font-medium text-xs opacity-75', isActive && 'text-pink-600')}>{children}</p>
            </a>
        </Link>
    )
}

export default function Header() {
    const [isExpanded, setIsExpanded] = useState(false)

    const { data } = useSWR('https://api.coingecko.com/api/v3/coins/scream')
    const screamPrice = data?.market_data?.current_price?.usd

    return (
        <>
            <div className="relative z-10 pb-1 bg-animated-rainbow">
                <p Style="min-height: 4px; max-height: 4px; height: 4px"></p>

                <AnimatePresence>
                    {isExpanded && (
                        <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="flex flex-col overflow-hidden bg-white border-b md:hidden border-color-100">
                            <div className="p-6 space-y-4">
                                {/* <div className="flex flex-col space-y-2">
                                    <Link href="/apps" passHref>
                                        <a className="text-3xl font-extrabold">All Apps</a>
                                    </Link>
                                </div> */}
                                <div className="">
                                    <ConnectWalletButton type="rainbow" />
                                </div>
                                <div className="flex items-center">
                                    <img className="h-6 mr-2" src="/img/tokens/scream.png" alt="" />
                                    <p className="font-mono text-xs text-center">${screamPrice}</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div className="bg-white">
                    <div className="flex items-center max-w-5xl p-6 py-4 mx-auto space-x-2 md:px-12 whitespace-nowrap">
                        <Button href="/">
                            <HomeIcon className="w-4" />
                        </Button>
                        {/* <Button href="/apps">Apps</Button> */}
                        <Button href="https://analytics.scream.sh">Analytics</Button>
                        <Button href="/lend">Lending</Button>
                        <Button href="/stake">veScream</Button>
                        <Button href="https://v1.scream.sh/lend" target="_blank">V1</Button>
                        <div className="flex-1" />

                        <div className="items-center hidden md:flex">
                            <img className="h-5 mr-2" src="/img/tokens/scream.png" alt="" />
                            <p className="font-mono text-xs">${screamPrice}</p>
                        </div>

                        <div className="hidden md:block">
                            <ConnectWalletButton type="rainbow" />
                        </div>

                        <button className="md:hidden" type="button" onClick={() => setIsExpanded((_) => !_)}>
                            <MenuAlt3Icon className={classNames('w-4 transform ease-in-out duration-300', isExpanded && 'rotate-90')} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
