import z from "zod";
import { webhookSchema } from "../schemas/node-forms.schema";

export const handleWebhookEvent = (input:z.infer<typeof webhookSchema>, headers:Record<string,string>,body:any)=>{
    const headers_keys = Object.keys(input.headers||{})
    for (const key in headers_keys){
        if(!headers[key] || headers[key]!==(input.headers||{})[key] ){
            throw new Error("Webhook header mismatch")
        }
    }
    return body
}