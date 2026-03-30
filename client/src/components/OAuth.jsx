import { signInWithPopup, GoogleAuthProvider, getAuth } from 'firebase/auth';
import { app } from '../../firebase.js';
import { Button } from 'flowbite-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signinFailure, signinSuccess } from '../redux/userSlice';

function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    try {
        const result = await signInWithPopup(auth, provider);
        const res = await fetch('http://localhost:3002/api/auth/google',{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: result.user.displayName,
                email: result.user.email,
                avatar: result.user.photoURL
            })
    })
        // console.log(result.user)
        const data = await res.json();
        dispatch(signinSuccess(data))
        navigate('/')
    } catch (error) {
        dispatch(signinFailure(error.message))
    }
}

return (
    <Button onClick={handleGoogleClick} className='bg-red-500 text-white cursor-pointer'>
        Continue with google
    </Button>
)
}

export default OAuth