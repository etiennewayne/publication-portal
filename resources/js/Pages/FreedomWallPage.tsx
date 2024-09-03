import GuestLayout from "@/Layouts/GuestLayout";
import { Category } from "@/types";
import { Head } from "@inertiajs/react";
import React from "react";

export default function FreedomWallPage({categories} : {categories:Category[]}) {
    return (

        <GuestLayout>
            <Head title="Freedom Wall"></Head>
            <div className="min-h-screen">
                <div></div>
                
            </div>
        </GuestLayout>
        
    )
}
    
    
