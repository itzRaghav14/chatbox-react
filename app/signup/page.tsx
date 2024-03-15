"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import FormInputField from "@/components/form-input-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const formSchema = z
  .object({
    name: z.string().min(2).max(50),
    email: z.string().min(2).max(50),
    password: z.string().min(2).max(50),
    confirm: z.string().min(2).max(50),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

export default function SignupPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { name, email, password } = values;

      const userId = (await createUserWithEmailAndPassword(auth, email, password)).user.uid;
      const usersRef = doc(db, "users", userId);
      await setDoc(usersRef, { name, email });

      console.log("User has been created");
    } 
    catch (e: any) {
      console.error(e);
    }
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient text-foreground">
      <div className="max-w-xl p-10 bg-background text-foreground rounded-2xl">

        <div className="mb-4">
          <h1 className="text-2xl font-bold">
            Chatster - A Chat App
          </h1>
          <small className="block text-center text-muted-foreground">Signup</small>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormInputField
              name="name"
              label="Name"
              placeholder="Enter your name"
              form={form}
            />
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
            <FormInputField
              name="confirm"
              label="Confirm Password"
              placeholder="Enter your password again"
              inputType="password"
              form={form}
            />

            <Button type="submit" className="w-full">
              SIGN UP
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
