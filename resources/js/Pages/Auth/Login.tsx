import { useEffect, FormEventHandler, useState, ChangeEvent } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

import { InfoCircleOutlined, LoginOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';


import axios from 'axios';

import { log } from 'console';

export default function Login({ status, canResetPassword }: { status?: string, canResetPassword: boolean }) {

    // const { data, setData, post, errors, reset } = useForm({
    //     username: '',
    //     password: '',
    //     remember: false,
    // });

    const [form] = Form.useForm();

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        username: '',
        password: ''
    });

    useEffect(() => {
        return () => {
            //reset('password');
        };
    }, []);

    const submit = (values: object) => {
        setLoading(true)
        setErrors({
            username: '',
            password: ''
        })

        console.log(values)
        axios.post('/login', values).then(res=>{

            if(res.data.role === 'ADMINISTRATOR'){
                router.visit('/admin/dashboard')
            }

            if(res.data.role === 'USER'){
                router.visit('/dashboard')
            }

            //console.log(res.data)
            setLoading(false)

        }).catch(err => {
            setErrors(err.response.data.errors)
            setLoading(false)
        })
        
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
                        
                    <div className='mb-2'>

                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={submit}
                            autoComplete='off'
                            initialValues={{
                                username: '',
                                password: '',
                            }}>

                            <Form.Item label="USERNAME" 
                                name="username"
                                required 
                                tooltip="This is a required field"
                                validateStatus={errors.username ? 'error' : ''}
                                help={errors.username ? errors.username[0] : ''}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your Username!",
                                    }
                                ]}>
                                <Input placeholder="Username" size="large" />
                            </Form.Item>

                            <Form.Item label="PASSWORD" 
                                name="password"
                                required 
                                tooltip="This is a required field"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your Password!",
                                    }
                                ]}>
                                <Input placeholder="Password" size="large" type="password"/>
                            </Form.Item>

                            <div className='flex justify-end'>
                                <Button type="primary" 
                                    htmlType="submit"
                                    icon={<LoginOutlined />} size='large' loading={loading}>
                                    Login
                                </Button>
                            </div>
                        </Form>
                    </div>

                </div> 
                {/* card */}

            </div>
        </>
    );
}
