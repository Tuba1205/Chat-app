// for global variable we are using zustand

import { create } from "zustand";

const useConversation = create((set) => ({
    newConversation: null,
    setSelectedConversation: (selectedConversation) => set({ selectedConversation}),
    messages: [],
    setMessages: (messages) => set({ messages}),

    loggedInUser: null,
    setLoggedInUser: (User) => set({ loggedInUser: User }), // Function to update logged-in user
}));

export default useConversation;