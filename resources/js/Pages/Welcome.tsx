import ApplicationLogo from '@/Components/ApplicationLogo';
import MenuBtn from '@/Components/MenuBtn';
import { Link, Head } from '@inertiajs/react';

import GuestLayout from '@/Layouts/GuestLayout';

import FeaturedArticle from '@/Components/Article/FeaturedArticle';
import SideArticles from '@/Components/Article/SideArticles';

export default function Welcome() {

   

    const loadArticles = () => {

    }


    return (
        <>
        <GuestLayout>

            <Head title="Welcome" />
            
            <main className="flex flex-col mx-2 md:flex-row mt-6 gap-8">

                <div className='w-full md:w-[65%]'>
                    <FeaturedArticle />
                </div>


                {/* <!-- Main side post (most popular) --> */}
               <div className='w-full md:w-[35%]'>
                    <SideArticles />
               </div>
            </main>
           
            
        </GuestLayout>
          
        </>
    );
}
