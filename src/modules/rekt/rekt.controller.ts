import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { PostReaction } from "./rekt.dto";
import { RektService } from "./rekt.service";

@Controller('rekt')
export class RektController {
    constructor(private readonly rektService: RektService) { }

    @Get('/reaction/:postId')
    async getReaction(@Param('postId') postId): Promise<PostReaction[]> {
        return await this.rektService.getReaction(postId)
    }

    @Post('/reaction')
    async postReaction(@Body() reactionDto: PostReaction): Promise<any> {
        await this.rektService.postReaction(reactionDto)
    }

    @Get('/transfers/:chainId/:address/:tokenAddress')
    async getTokenTransactions(
        @Param('chainId') chainId,
        @Param('address') address,
        @Param('tokenAddress') tokenAddress) {
        return await this.rektService.getTokenTransactions(chainId, address, tokenAddress)
    }
}