import { Link, Head } from '@inertiajs/react';

export default function ApplicationLogo({className=''}) {
    return (
        <>
            <div className="flex gap-2 `${className}">
                <div className="">
                    <Link href="/">
                        <img width="60" src="/img/the-torch.png" alt="torch-logo" />
                    </Link>
                </div>
                
                <div className='w-1 min-h-full bg-green-950'></div>

                <div className="flex flex-col">
                    <h1 className='font-primary text-textColorDefault-1'>The Torch</h1>
                    <h2 className='font-secondary font-bold text-textColorDefault-1'>Publication System</h2>
                </div>
            </div>
           
        </>
    );
}
