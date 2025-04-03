"use client"
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { RegisterAuth } from "../services/RegisterAuth";
import { useRouter } from "next/navigation";
import "./authComponent.css"
import LinearProgress from '@mui/material/LinearProgress';

interface RegisterFormProps {
    setType: (type: string) => void;
};

export default function RegisterForm({ setType }: RegisterFormProps) {
    const router = useRouter();
    const [mail, setMail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [repeatPassword, setRepeatPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    
    const handleSubmit = async (e: React.FormEvent) => {
        setError("");
        setLoading(true);
        e.preventDefault();
        const res = await RegisterAuth(mail, password, repeatPassword);

        if (res === 201) {
            router.push("/dashboard");
        }
        else{
            if(typeof res !== "number" && "backendMessage" in res){
                if(res.backendMessage === "Passwords does not match"){
                    setError("Passwords does not match.");
                    setLoading(false);
                    return;
                }

                if(res.backendMessage.slice(0, 44) === "could not execute statement [Duplicate entry"){
                    setError("Mail already in use.");
                    setLoading(false);
                    return;
                }

                if(res.backendMessage.slice(0, 10) === "Validation"){
                    setError("Password must be at least 8 characters long.");
                    setLoading(false);
                    return;
                }
            }
            setError("An error has ocurred, try again later.");
        }
        setLoading(false);
    };
    
    return(
        <div className="w-[52%] h-4/5 bg-[#555252]/35 rounded-3xl flex flex-col items-center py-9 px-10
                        max-sm:w-[100%] max-lg:h-auto max-sm:mb-7 justify-center fade-in-auth">
            <h1 className="text-white text-3xl tracking-widest font-semibold mb-7 max-sm:text-2xl">Register</h1>

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
                className="bg-black/54 rounded-lg shadow-md "
                fullWidth
                type={showPassword ? "text" : "password"}
                required
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                    marginTop: "20px",
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

                <TextField
                label="Repeat Your Password"
                variant="outlined"
                className="bg-black/54 rounded-lg shadow-md "
                fullWidth
                type={showRepeatPassword ? "text" : "password"}
                onChange={(e) => setRepeatPassword(e.target.value)}
                required
                sx={{
                    marginTop: "20px",
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
                                <IconButton onClick={() => setShowRepeatPassword(!showRepeatPassword)} edge="end">
                                {showRepeatPassword ? <VisibilityOff sx={{ color: "white" }} /> : <Visibility sx={{ color: "white" }} />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    },
                }}
                />
                {error !== "" && (
                    <div className="w-full mt-2 flex items-center justify-center">
                        <span className="text-red-500 tracking-widest font-semibold text-sm text-center">
                            {error}
                        </span>
                    </div>
                )}
                <div className="w-full flex flex-col items-center mt-5">
                    <button type="submit" 
                    className="mx-auto tracking-widest font-semibold bg-[#737373]/35 
                                px-6 py-2 rounded-4xl hover:bg-[#737373]/50 transition duration-200
                                text-white cursor-pointer"
                    >
                    Register
                    </button>
                </div>
            </form>

            <span className="text-white tracking-widest mt-4 text-sm max-lg:text-center">Do you have an account?</span>
            <button 
            className="tracking-widest mt-2 text-sm 
                    text-white border-b-[1px] pb-0.5 cursor-pointer hover:text-white/50
                    transition-all duration-200"
            onClick={() => setType("login")}
            >
            Login
            </button>
            {}
            {loading &&(
                <div className="w-full mt-5">
                    <LinearProgress />
                </div>
            )}
        </div>
    )
}