import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { lastValueFrom } from 'rxjs'
import { TokenTransaction } from 'src/interfaces/transaction'
import { ethers } from 'ethers'
import * as dayjs from 'dayjs'

@Injectable()
export class CovalentService {

    key: string
    chainId: string
    uri: string
    constructor(private readonly configService: ConfigService,
        private readonly httpService: HttpService) {
        this.key = this.configService.get<string>('covalent.key')
        this.uri = 'https://api.covalenthq.com'
    }

    async getTokenTransactions(
        chainId: string,
        address: string,
        tokenAddress: string
    ): Promise<TokenTransaction[]> {
        const url = `${this.uri}/v1/${chainId}/address/${address}/transfers_v2/`
        const response = await lastValueFrom(this.httpService.get(url, {
            params: {
                'quote-currency': 'USD',
                format: 'JSON',
                'contract-address': tokenAddress,
                key: this.key
            }
        }))
        let tokenTransactions: TokenTransaction[] = []
        response.data.data.items.forEach(item => {
            const balance = item.transfers[0].delta
            const decimals = item.transfers[0].contract_decimals
            console.log(dayjs)
            tokenTransactions.push({
                tokenAddress,
                tokenSymbol: item.transfers[0].contract_ticker_symbol,
                tokenName: item.transfers[0].contract_name,
                price: item.transfers[0].quote_rate,
                usdAmount: item.transfers[0].delta_quote,
                tokenBalance: Number(balance),
                tokenBalanceFormat: Number(ethers.utils.formatUnits(balance, decimals)),
                txhash: item.tx_hash,
                timestamp: dayjs(item.block_signed_at).toDate(),
                direction: item.transfers[0].transfer_type,
                from: item.transfers[0].from_address,
                to: item.transfers[0].to_address
            })
        })
        return tokenTransactions
    }
}
