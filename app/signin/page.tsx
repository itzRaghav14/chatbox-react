"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import FormInputField from "@/components/form-input-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

const formSchema = z
  .object({
    email: z.string().min(2).max(50),
    password: z.string().min(2).max(50),
  })

export default function SigninPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { email, password } = values;
      const userCredentials = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredentials.user;
      const userId = user.uid;
      console.log(userId);
    } 
    catch (e: any) {
      console.log(`Authentication failed: ${e}`)
    }
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient text-foreground">
      <div className="max-w-xl p-10 bg-background text-foreground rounded-2xl">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">
            Chatster - A Chat App
          </h1>
          <small className="block text-center text-muted-foreground">Signin</small>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormInputField
              name="email"
              label="Email"
              placeholder="Enter your email"
              form={form}
            />
            <FormInputField
              name="password"
              label="Password"
              placeholder="Enter your password"
              inputType="password"
              form={form}
            />
            <Button type="submit" className="w-full">
              SIGN IN
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
