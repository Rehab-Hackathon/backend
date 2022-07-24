import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Reaction } from 'src/entities/reaction.entity';
import { Repository } from 'typeorm';
import { CovalentService } from './covalent.service';
import { PostReaction } from './rekt.dto';

@Injectable()
export class RektService {

    constructor(
        private readonly configService: ConfigService,
        private readonly covalentService: CovalentService,
        @InjectRepository(Reaction)
        private readonly reactionRepository: Repository<Reaction>,
    ) {

    }

    async postReaction(reactionDto: PostReaction) {
        const reaction = this.reactionRepository.create(reactionDto)
        reaction.id = `${reactionDto.postId}-${reactionDto.address}`
        await this.reactionRepository.save(reaction)
    }

    async getReaction(postId: string): Promise<PostReaction[]> {
        const reactions = await this.reactionRepository.createQueryBuilder('r')
            .where('r.postId = :postId', { postId })
            .getMany()
        const postReactions = reactions.map(react => {
            return {
                postId: react.postId,
                address: react.address,
                reaction: react.reaction
            }
        })
        return postReactions
    }

    async getTokenTransactions(chainId: string, address: string, tokenAddress: string): Promise<any> {
        return await this.covalentService.getTokenTransactions(chainId, address, tokenAddress)
    }
}
