export const generalConfig = () => ({
    covalent: {
        key: process.env.COVALENT_KEY || '',
        chainId: process.env.CHAIN_ID || ''
    }
})