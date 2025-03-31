interface NewChatButtonProps {
    setChatModal: (value: string) => void;
}

export default function NewChatButton({ setChatModal } : NewChatButtonProps) {
    return(
        <button
        className=" text-white bg-[#484848]/76 px-4 py-2 rounded-xl 
                    tracking-widest text-lg cursor-pointer font-semibold hover:scale-90 transition-all 
                    duration-200"
        onClick={() => setChatModal("createChat")}
        >
            New chat
        </button>
    )
}