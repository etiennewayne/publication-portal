import ApplicationLogo from '@/Components/ApplicationLogo';
import MenuBtn from '@/Components/MenuBtn';
import { Link, Head } from '@inertiajs/react';
import '../../css/welcome.css';
import GuestLayout from '@/Layouts/GuestLayout';
import { useEffect, useState } from 'react';

import axios from 'axios';
import FeaturedArticle from '@/Components/Article/FeaturedArticle';
import SideArticles from '@/Components/Article/SideArticles';

export default function Welcome() {

   

    const loadArticles = () => {

    }

    
    return (
        <>
        <GuestLayout>

            <Head title="Welcome" />
            
            <main className="flex flex-col mx-2 md:flex-row mt-6 gap-6">

                <div className='w-full md:w-[65%]'>
                    <FeaturedArticle />
                </div>


                {/* <!-- Main side post (most popular) --> */}
               <div className='w-full md:w-[35%]'>
                    <SideArticles />
               </div>
            </main>
            <div className="to_top">
                <i className="bx bx-up-arrow-alt"></i>
            </div>
            <footer>
                <div className="line"></div>
                <div className="footer_content">
                    <div className="torch">
                        <h2>The Torch Publication</h2>
                        <p>
                            The Torch is Tangub City Global College's official
                            publication. "Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua.
                        </p>
                    </div>
                    <div className="socials">
                        <div className="social">
                            <i className="bx bxl-facebook-circle"></i>
                            <a href="">The Torch</a>
                        </div>
                        <div className="social">
                            <i className="bx bxs-envelope"></i>
                            <a href="">torch@gmail.com</a>
                        </div>
                    </div>
                </div>
                <small className="copy">©Torch Publication| All Rights Reserved</small>
            </footer>
        </GuestLayout>
          
        </>
    );
}
