import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CovalentService } from './covalent.service'
import { RektController } from './rekt.controller'
import { RektService } from './rekt.service'
import { Reaction } from '../../entities/reaction.entity'

@Module({
    imports: [
        TypeOrmModule.forFeature([Reaction]),
        HttpModule
    ],
    controllers: [RektController],
    providers: [RektService, CovalentService],
})
export class RektModule { }
