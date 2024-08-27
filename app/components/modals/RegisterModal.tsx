"use client";

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import {useCallback, useState } from "react";
import { FieldValues , SubmitHandler , useForm } from "react-hook-form";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modals from "./Modals";
import Heading from "../Heading";
import Input from "../Input/Input";
import toast from "react-hot-toast";
import  Button from "../Button";
import { signIn } from "next-auth/react";
import useLoginModal from "@/app/hooks/useLoginModal";

function RegisterModal() {
    const RegisterModal = useRegisterModal();
    const LoginModal = useLoginModal();
    const [isLoading , setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        }
    });

    const onsubmit: SubmitHandler<FieldValues> = (data) =>{
        setIsLoading(true);
        axios.post("/api/register" , data)
        .then(() => {
            RegisterModal.Onclose();
            LoginModal.Onopen();
            toast.success('account created successfully');
        })
        .catch((error) =>{
            toast.error('error');
        })
        .finally(() => {
            setIsLoading(false);
        });
    }

    const toggle = useCallback(() => {
        RegisterModal.Onclose();
        LoginModal.Onopen();
    },[LoginModal, RegisterModal]);

const bodyContent = (
    <div className="flex flex-col gap-4">
        <Heading title="welcome to Airbnb"
        subtitle="Create an account "
        />
    <Input 
    id="email"
    label="Email"
    disabled={isLoading}
    register={register}
    errors={errors}
    required
    />
       <Input 
    id="name"
    label="name"
    disabled={isLoading}
    register={register}
    errors={errors}
    required
    />
       <Input 
    id="password"
    type="password"
    label="password"
    disabled={isLoading}
    register={register}
    errors={errors}
    required
    />
    </div>
)

const footerContent=(
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
      outline
      label = "continue with google"
      icon = {FcGoogle}
      onClick={() => signIn('google')}
      />
      <Button
      outline
      label = "continue with gitHub"
      icon = {AiFillGithub}
      onClick={() => signIn('github')}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
    <div className=" justify-center flex flex-row items-center gap-2">
       <div >
        already have an account?
        </div>
        <div 
        onClick={toggle}
        className="text-neutral-800 cursor-pointer hover:underline">
        Log in
        </div>
    </div>
        </div>
    </div>
)


  return (
   <Modals
    disabled={isLoading}
    isopen={RegisterModal.isOpen}
    title="Register"
    actionlabel="continue"
    onClose={RegisterModal.Onclose}
    onSubmit={handleSubmit(onsubmit)}
    body={bodyContent}
    footer={footerContent}
   />
  )
}

export default RegisterModal