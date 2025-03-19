import TextField from "@mui/material/TextField";

interface RegisterFormProps {
    type: string;
    setType: (type: string) => void;
};

export default function RegisterForm({ type, setType }: RegisterFormProps) {
    return(
        <div className="w-[42%] h-4/5 bg-[#555252]/35 rounded-3xl flex flex-col items-center py-9 px-10">
            <h1 className="text-white text-3xl tracking-widest font-semibold mb-7">Register</h1>

            <form action="" className="">
                <TextField
                label="Email"
                variant="outlined"
                className="bg-black/54 rounded-lg shadow-md "
                fullWidth
                type="email"
                required
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
                type="password"
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
                />

                <TextField
                label="Repeat Your Password"
                variant="outlined"
                className="bg-black/54 rounded-lg shadow-md "
                fullWidth
                type="password"
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
                />
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

            <span className="text-white tracking-widest mt-4 text-sm">Do you have an account?</span>
            <button 
            className="tracking-widest mt-2 text-sm 
                    text-white border-b-[1px] pb-0.5 cursor-pointer hover:text-white/50
                    transition-all duration-200"
            onClick={() => setType("login")}
            >
            Login
            </button>
        </div>
    )
}