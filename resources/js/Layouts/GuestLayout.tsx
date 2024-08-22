import ApplicationLogo from '@/Components/ApplicationLogo';
import MenuBtn from '@/Components/MenuBtn';
import { PropsWithChildren } from 'react';
import '../../css/welcome.css';
import { Link } from '@inertiajs/react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="bg-primary-1 h-full">

            {/* page container */}
            <div className='relative w-full
                xl:max-w-screen-xl xl:mx-auto
                '>

                <header className="flex items-center justify-between z-10 bg-primary-1
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

      
            <footer className='bg-gradient p-8 mt-8 flex flex-col lg:items-center'>
                
                <div className="my-4 bg-white h-[1px] w-full"></div>

                <div className="flex flex-col justify-between gap-6 lg:flex-row">
                    <div className='flex-1'>
                        <h1 className='font-bold text-white mb-4'>TCGC</h1>
                        <ul className='text-white'>
                            <li>Tangub City, Misamis Occidental</li>
                            <li>(088)-545-2793</li>
                            <li>gadtc@gadtc.edu.ph</li>
                            <li>www.facebook.com/gadtcluxmundi</li>
                        </ul>
                    </div>
                    <div className="flex-1">
                        <h2 className='font-bold text-white mb-4'>The Torch Publication</h2>
                        <p className='text-white'>
                            The Torch is Tangub City Global College's official
                            publication. "Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua.
                        </p>
                    </div>

                    <div className="flex-1">
                        <div className="text-white font-bold mb-4">
                            <a href="">The Torch</a>
                        </div>
                        <div className="text-white">
                            <a href="">torch@gmail.com</a>
                        </div>
                    </div>
                </div>

                <div className="text-white mt-6 text-left">©Torch Publication | All Rights Reserved</div>
            </footer>

        </div>
    );
}
