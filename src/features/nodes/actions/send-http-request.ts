import {httpSchema} from '@/features/nodes/schemas/node-forms.schema'
import z from 'zod'
import Handlebars from "handlebars";
Handlebars.registerHelper("json", (obj) => JSON.stringify(obj));
export const sendHttpRequestAction =async(input:z.infer<typeof httpSchema>,data:Record<string ,any>)=>{
    httpSchema.parse(input)
    const url = Handlebars.compile(input.url)(data)
    const body = Handlebars.compile(input.body||"")(data)
    const method = input.method ||"GET"
    const headers =  Object.fromEntries(
  Object.entries(input.headers ?? {}).map(([key, value]) => [
     Handlebars.compile(key)(data),
    Handlebars.compile(value)(data),
  ]));
  const req = await fetch(url,{
    method,
    headers,
    body
  })
  if(!req.ok) {
    if(req.status>500) throw new Error("Internal server error")
    const res = await req.json()
    throw new Error(res)
  }
  const res = await req.json()
  return res
}