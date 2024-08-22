import ApplicationLogo from '@/Components/ApplicationLogo';
import MenuBtn from '@/Components/MenuBtn';
import { PropsWithChildren } from 'react';
import '../../css/welcome.css';
import { Link } from '@inertiajs/react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="bg-page-1">

            {/* page container */}
            <div className='relative w-full
                xl:max-w-screen-xl xl:mx-auto
                '>

                <header className="flex items-center justify-between z-10 bg-page-1
                    w-full px-4
                    fixed top-0 h-[100px]  
                    sm:px-0 sm:mx-auto
                    xl:max-w-screen-xl">
                    <ApplicationLogo />
                    
                    <div className="">
                        <MenuBtn  />
                    </div>
                </header>
                
                <div className="custom-nav">
                    <Link href="/" className="">Home</Link>
                    <a href="/reccommedation">Recommendation</a>
                    <a href="/torch-feed">The Torch Articles</a>
                    <a href="/studentFeed.html">Students Feed</a>
                    <a href="/freedomWall.html">Freedom Wall</a>
                </div>

                {children}
                
            </div>
            
        </div>
    );
}
