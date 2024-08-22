import React, { useState } from 'react'

export function Basic() {
    
    interface Person {
        lname: string;
        fname: string;
        mname: string;
        age: number;
    }



    let objSample = {
        lname : '',
        fname: '',
        mname: ''
    }
    const [name, setName] = useState()


    const [student, setStudent] = useState<Person>()


  return ( 
    <>
        <div>Basic Output</div>
        <div>Design</div>
    </>
    )
       
    
}


