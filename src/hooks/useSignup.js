import { useState, useEffect } from "react";
import { projectAuth, projectStorage } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () =>
{
    const [ isCancelled, setIsCancelled ] = useState( false );
    const [ error, setError ] = useState( null );
    const [ isPending, setIsPending ] = useState( false );
    const { dispatch } = useAuthContext();

    const signup = async ( email, password, displayName, thumbnail ) =>
    {
        setError( null );
        setIsPending( true );
        try
        {
            //Signup with email and password
            const res = await projectAuth.createUserWithEmailAndPassword( email, password );

            if ( !res )
            {
                throw new Error( "Could not complete signup" );
            }

            //Upload user thumbnail
            const uploadPath = `thumbnails/${ res.user.uid }/${ thumbnail.name }`;
            const img = await projectStorage.ref( uploadPath ).put( thumbnail );
            const imgUrl = await img.ref.getDownloadURL();

            //Update display name
            await res.user.updateProfile( { displayName, photoURL: imgUrl } );

            // Dispatch login action
            dispatch( {
                type: "LOGIN", payload: res.user
            } );

            // Update state
            if ( !isCancelled )
            {
                setIsPending( false );
                setError( null );
            }
        }
        catch ( err )
        {
            if ( !isCancelled )
            {
                console.log( err.message );
                setError( err.message );
                setIsPending( false );
            }
        }
        setIsPending( false );
    };
    // Cleanup function
    useEffect( () =>
    {
        return () => setIsCancelled( true );
    }, [] );

    return { error, isPending, signup };
};