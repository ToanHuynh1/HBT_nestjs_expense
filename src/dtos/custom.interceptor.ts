import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map } from "rxjs";


export class CustomInterceptor implements NestInterceptor {
    intercept(contex: ExecutionContext, handler: CallHandler){

        console.log("THIS IS INTERCEPTING THE REQUEST")

        return handler.handle().pipe(
            map((data) => {
                const reponse = {
                    ...data,
                    createdAt: data.created_at
                }

                delete reponse.updated_at
                delete reponse.created_at

                return reponse

            })
        )
    }
}