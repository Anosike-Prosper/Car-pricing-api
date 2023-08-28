import {
   UseInterceptors,
   NestInterceptor,
   ExecutionContext,
   CallHandler 
} from '@nestjs/common'

import { Observable } from 'rxjs'
import {map} from 'rxjs/operators'
import { plainToClass, plainToInstance } from 'class-transformer'

interface ClassConstructor{
    new(...args: any[]):{}
}


export function Serialize(dto:ClassConstructor){

    return UseInterceptors (new SerializeInterceptor(dto))
}


export class SerializeInterceptor implements NestInterceptor{

    private dto:any

    constructor(dto:any){
        this.dto = dto
    }
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>  {

        //run something before the request is handled by the request handler

        // console.log('i am running before the handler',context)

        return next.handle().pipe(
            map((data:any)=>{
                //run something before the response is sent out
                // console.log('i am running before the response is sent out',data)
                return plainToInstance(this.dto, data, {
                    excludeExtraneousValues:true
                })
            })
        )
        
    }
}