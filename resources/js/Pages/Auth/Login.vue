<script setup>
import Checkbox from '@/Components/Checkbox.vue';
import GuestLayout from '@/Layouts/GuestLayout.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';

defineProps({
    canResetPassword: {
        type: Boolean,
    },
    status: {
        type: String,
    },
});

const form = useForm({
    email: '',
    password: '',
    remember: false,
});

const submit = () => {
    form.post(route('login'), {
        onFinish: () => form.reset('password'),
    });
};
</script>

<template>
    <Head title="Log in" />

    <div class="flex px-2 gap-2 mt-3 ml-6">

        <Link href="/">
            <img width="60" src="/img/the-torch.png" alt="" />
        </Link>

        <div class="bg-green-950 w-1"></div>

        <div class="text-green-950">
            <h1 class="font-unifrak text-2xl">The Torch</h1>
            <h2 class="font-bold tracking-widest">PUBLICATION SYSTEM</h2>
        </div>
    </div>


    <div class="min-h-screen flex justify-center items-center">
        <div class="shadow-2xl border border-green-600 p-10 rounded-md">

            <h2>Log In</h2>
            <div class="message error">
                <p>Invalid Log In Credentials</p>
            </div>
           
            <form @submit.prevent="submit">
                <div>
                    <InputLabel for="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        class="mt-1 block w-full"
                        v-model="form.email"
                        required
                        autofocus
                        autocomplete="username"
                    />

                    <InputError class="mt-2" :message="form.errors.email" />
                </div>

                <div class="mt-4">
                    <InputLabel for="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        class="mt-1 block w-full"
                        v-model="form.password"
                        required
                        autocomplete="current-password"
                    />

                    <InputError class="mt-2" :message="form.errors.password" />
                </div>

                <div class="block mt-4">
                    <label class="flex items-center">
                        <Checkbox name="remember" v-model:checked="form.remember" />
                        <span class="ms-2 text-sm text-gray-600">Remember me</span>
                    </label>
                </div>

                <div class="flex items-center justify-end mt-4">
                    <Link
                        v-if="canResetPassword"
                        :href="route('password.request')"
                        class="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Forgot your password?
                    </Link>

                    <PrimaryButton class="ms-4" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                        Log in
                    </PrimaryButton>
                </div>
            </form>
     
            <p class="register_btn">
                Don't have an account?
                <a href="./register.html">Register</a>
            </p>
        </div>
    </div>

    <!-- <div class="">
        <div class="">
          
            <div class="line"></div>
            
        </div>
        <div class="auth_form_container">
            
        </div>
    </div> -->
    

    
</template>
