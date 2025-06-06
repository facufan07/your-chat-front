"use client"

import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { loginAuth } from "../services/LoginAuth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "./authComponent.css"
import LinearProgress from '@mui/material/LinearProgress';
import LoginOAuth from "./LoginOAuth";

interface LoginFormProps {
    setType: (type: string) => void
};

export default function LoginForm({ setType }: LoginFormProps) {
    const router = useRouter();
    const [mail, setMail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        setError("");
        setLoading(true);
        e.preventDefault();
        const res = await loginAuth(mail, password);

        if (res === 200) {
            setTimeout(() => {
                router.push("/dashboard");
            }, 1000);
        }
        else{
            if (typeof res !== "number" && "backendMessage" in res && "message" in res) {

                if(res.backendMessage === "Bad credentials"){
                    setError("Incorrect password.");
                    setLoading(false);
                    return;
                }
                if(res.message === "Objeto no encontrado"){ 
                    setError("Mail not found.")
                    setLoading(false);
                    return;
                };
            }
            setError("An error has ocurred, try again later.");
            setLoading(false);
        }

    };

    return(
        <div className="w-[52%] h-4/5 bg-[#555252]/35 rounded-3xl flex flex-col items-center py-9 px-10
                        max-sm:w-[100%] max-lg:h-auto max-sm:mb-7 justify-center fade-in-auth">
            <h1 className="text-white text-3xl tracking-widest font-semibold mb-9 max-sm:text-2xl">Sign in</h1>

            <form onSubmit={handleSubmit} className="">
                <TextField
                label="Email"
                variant="outlined"
                className="bg-black/54 rounded-lg shadow-md "
                fullWidth
                type="email"
                required
                onChange={(e) => setMail(e.target.value)}
                sx={{
                    "& .MuiInputLabel-root": {
                    color: "#fff",
                    letterSpacing: "1.5px",
                    },
                    "& .MuiOutlinedInput-root": {
                    "& input": {
                        color: "#fff",
                        letterSpacing: "1.5px",
                    },
                    
                    },
                }}
                />

                <TextField
                label="Password"
                variant="outlined"
                className="bg-black/54 rounded-lg shadow-md"
                fullWidth
                type={showPassword ? "text" : "password"}
                required
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                    marginTop: "30px",
                    "& .MuiInputLabel-root": {
                    color: "#fff",
                    letterSpacing: "1.5px",
                    },
                    "& .MuiOutlinedInput-root": {
                    "& input": {
                        color: "#fff",
                        letterSpacing: "1.5px",
                    },
                    },
                }}
                slotProps={{
                    input: {
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                {showPassword ? <VisibilityOff sx={{ color: "white" }} /> : <Visibility sx={{ color: "white" }} />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    },
                }}
                />
                {
                    error !== "" &&(
                        <div className="w-full flex items-center justify-center mt-2">
                            <span className="text-red-500 text-sm tracking-widest font-semibold text-center">
                                {error}
                            </span>
                        </div>
                    )
                }
                <div className="w-full flex flex-col items-center mt-10 max-lg:mt-5">
                    <button type="submit" 
                    className="mx-auto tracking-widest font-semibold bg-[#737373]/35 
                                px-6 py-2 rounded-4xl hover:bg-[#737373]/50 transition duration-200
                                text-white cursor-pointer"
                    >
                    Login
                    </button>
                </div>
            </form>

            <LoginOAuth/>

            <span className="text-white tracking-widest mt-7 text-sm max-lg:text-center">Don't have an account?</span>
            <button 
            className="tracking-widest mt-2 text-sm 
                    text-white border-b-[1px] pb-0.5 cursor-pointer hover:text-white/50
                    transition-all duration-200"
            onClick={() => setType("register")}
            >
            Register now
            
            </button>
            
            {loading && (
            <div className="w-full mt-6">
                <LinearProgress/>
            </div>
            )}
            
        </div>
    )
}