import { Link, Head } from '@inertiajs/react';

export default function ApplicationLogo() {
    return (
        <>
            <div className="flex justify-center items-center gap-2">
                <div className="">
                    <Link href="/">
                        <img width="60" src="/img/the-torch.png" alt="torch-logo" />
                    </Link>
                </div>
                
                <div className='w-1 min-h-full bg-green-950'></div>

                <div className="">
                    <h1 className='font-primary text-textColorDefault-1'>The Torch</h1>
                    <h2 className='font-secondary font-bold text-textColorDefault-1'>Publication System</h2>
                </div>
            </div>
           
        </>
    );
}
