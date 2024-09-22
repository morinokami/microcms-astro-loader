import { defineAction } from "astro:actions";
import { z } from "astro:content";

export const submitContact = defineAction({
  input: z.object({
    lastname: z.string().min(1, { message: '姓を入力してください' }),
    firstname: z.string().min(1, { message: '名を入力してください' }),
    company: z.string().min(1, { message: '会社名を入力してください' }),
    email: z
      .string()
      .min(1, { message: 'メールアドレスを入力してください' })
      .email({ message: 'メールアドレスの形式が誤っています' }),
    message: z.string().min(1, { message: 'メッセージを入力してください' }),
  }),
  handler: async (input) => {
    // Handle the contact form submission
    console.log(input);
  }
})