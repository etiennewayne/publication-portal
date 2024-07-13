import { useEffect, FormEventHandler, useState, ChangeEvent } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';



import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
        
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';

import { Button } from 'primereact/button';
import classNames from 'classnames'; 
import axios from 'axios';
import { log } from 'console';

export default function Login({ status, canResetPassword }: { status?: string, canResetPassword: boolean }) {
    
    const { data, setData, post, errors, reset } = useForm({
        username: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'));

        console.log(errors);
        
    };

    return (
        <>
        <div className='min-h-screen flex justify-center items-center bg-page-1'>
            <Head title="Log in" />


            <div className='bg-white p-6 shadow-md rounded-md w-full m-3 sm:w-[400px]'>
                <div className='mb-5'>
                    <ApplicationLogo></ApplicationLogo>
                </div>

                <div className='font-extrabold text-2xl mb-7'>LOGIN</div>
                <form onSubmit={submit}>
                    
                    <div className='mb-2'>
                        <IconField iconPosition="right">
                            <InputIcon className="pi pi-search"> </InputIcon>
                            <InputText
                                id='username'
                                placeholder='Username'
                                value={data.username}
                                className='w-full'
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setData('username', e.target.value)
                                }
                            />
                        </IconField>
                    </div>


                    <div className="mt-4">
                        <Password
                            id="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            inputClassName="w-full"
                            placeholder='Password'
                            className="w-full"
                            toggleMask
                            pt={{ 
                                input: {  className: '' },
                                iconField: { root: { className: 'w-full' } } 
                            }}
                        />

                    </div>

                    <div className='mt-4'>
                        <Button icon="pi pi-sign-in" iconPos='right' label="LOGIN" />
                    </div>

                </form>
            </div> 
            {/* card */}

        </div>
  
        </>
    );
}
