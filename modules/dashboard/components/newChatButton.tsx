interface NewChatButtonProps {
    setChatModal: (value: boolean) => void;
}

export default function NewChatButton({ setChatModal } : NewChatButtonProps) {
    return(
        <button
        className="absolute text-white bottom-5 right-5 bg-[#484848]/76 px-4 py-2 rounded-xl 
                    tracking-widest text-lg cursor-pointer font-semibold hover:scale-90 transition-all 
                    duration-200"
        onClick={() => setChatModal(true)}
        >
            New chat
        </button>
    )
}