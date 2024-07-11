import ApplicationLogo from '@/Components/ApplicationLogo';
import MenuBtn from '@/Components/MenuBtn';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="bg-page-1">
            <div className='relative w-[1366px] mx-20 border border-red-700'>
                <header className="flex py-4 absolute w-full justify-between z-10 bg-page-1">
                    
                    <ApplicationLogo />
                
                    <div className="relative right-0">
                        <MenuBtn  />
                    </div>

                </header>
                
                <nav>
                    <a href="/index.html" className="active">Home</a>
                    <a href="/reccommedation.html">Recommendation</a>
                    <a href="/torchFeed.html">The Torch Articles</a>
                    <a href="/studentFeed.html">Students Feed</a>
                    <a href="/freedomWall.html">Freedom Wall</a>
                </nav>

                {children}
                
            </div>
            

        </div>
    );
}
