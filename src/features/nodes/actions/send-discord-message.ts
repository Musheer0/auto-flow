import z from "zod";
import { discordSchema } from "../schemas/node-forms.schema";
import Handlebars from "handlebars";
Handlebars.registerHelper("json", (obj) => JSON.stringify(obj));
export const sendDiscordMessageAction = async(input:z.infer<typeof discordSchema>, data:any)=>{
  discordSchema.parse(input)
    const url = Handlebars.compile(input.webhookUrl)(data)
    const content = Handlebars.compile(input.message)(data)
    await  fetch(url, {method:"POST",body:JSON.stringify({content})})
    return {success:true}
}