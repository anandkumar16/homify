"use client";

import { useEffect } from "react";
import Emptystate from "./components/Emptystate";

interface ErrorProps {
    error: Error;
}

const ErrorState:React.FC<ErrorProps> = ({
    error
}) =>{
    useEffect(()=>{
        console.error(error);
    }, [error]);

    return (
        <div>
           <Emptystate
           title="Uh Oh"
           subtitle="Something went wrong"
           />
        </div>
    );
}

export default ErrorState;