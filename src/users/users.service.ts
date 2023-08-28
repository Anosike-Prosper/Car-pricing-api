import { Injectable, NotFoundException } from '@nestjs/common';
import {Repository} from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm';
import {User} from './user.entity'


@Injectable()

export class UsersService {
    repo:Repository<User>
    constructor(@InjectRepository(User) repo:Repository<User>){
        this.repo = repo

    }

    create(email:string, password:string){
        const user = this.repo.create({email,password})

        return this.repo.save(user)
    }

    async findOne(id:number){
        // return this.repo.findOne({where:{id:id}})
        return await this.repo.findOneBy({id:id})
    }

    find(email:string){
        return this.repo.find({where:{email:email}})
    }

    async update(id:number, attrs: Partial<User>){
        const user = await this.findOne(id)

        if(!user){
            throw new NotFoundException('user not found')
        }

        Object.assign(user, attrs)
        console.log('the item to be updated is ',user)
        return this.repo.save(user)

    }

    async remove(id:number){
        const user = await this.findOne(id)

        if(!user){
            throw new NotFoundException ('user not found')
        }

        console.log('item to be deleted', user)

        return this.repo.remove(user)

       
    }
}
