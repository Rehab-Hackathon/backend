export interface TokenTransaction {
    from?: string
    to?: string
    tokenAddress: string
    tokenSymbol: string
    tokenName: string
    tokenBalance: number
    tokenBalanceFormat: number
    usdAmount: number
    price: number
    timestamp: Date
    txhash: string
    direction: string
}