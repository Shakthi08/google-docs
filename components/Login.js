import Icon from '@material-tailwind/react/Icon'
import Image from "next/image"
import Button from '@material-tailwind/react/Button'
import { signIn } from "next-auth/client";
import Head from 'next/head';


function Login() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Head>
            <title>Sign in to continue</title>
            </Head>
           <Image
              src="https://links.papareact.com/1ui"
              height="300"
              width="550"
              objectFit="contain"
           />

            <Button className="mt-10 w-44" color="" buttonType="filled" ripple="dark" onClick={signIn}><img src="http://assets.stickpng.com/images/5847f9cbcef1014c0b5e48c8.png" alt="" height="30" width="30" /><h1 className="ml-3 text-lg font-bold" style={{color: "black"}}>Sign in</h1></Button>

        </div>
    )
}

export default Login;
