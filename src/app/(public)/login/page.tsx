import { useAuth } from "@/app/components/modules/auth/AuthContext";
import LoginForm from "@/app/components/modules/auth/LoginForm";


const LoginPage = () => {
    // const {loading} = useAuth();
    // if(loading){
    //     return <div>Loading...</div>
    // }
    return (
        <div>
            <LoginForm/>
        </div>
    );
};

export default LoginPage;