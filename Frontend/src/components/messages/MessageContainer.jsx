import React, { useEffect } from 'react';
import Messages from './Messages';
import MessageInput from './MessageInput';
import { TiMessage } from 'react-icons/ti';
import useConversation from '../../zustand/newConversation';
import { useAuthContext } from '../../context/AuthContext';

// Main Component
const MessageContainer = () => {
    const {selectedConversation, setSelectedConversation}= useConversation();

    useEffect(()=>{

        // cleanup function unmounts
       return () => setSelectedConversation(null);
    },[setSelectedConversation]);

    return (
        <div className='md:min-w-[450px] flex flex-col'>
            {!selectedConversation ? (
                <NoChatSelected /> // Render the NoChatSelected component
            ) : (
                <>
                    {/* Header */}
                    <div className='bg-slate-500 px-4 py-2 mb-2'>
                        <span className='label-text'>To: </span>
                        <span className='text-gray-400 font-bold'>{selectedConversation.fullName}</span>
                    </div>
                    <Messages />
                    <MessageInput />
                </>
            )}
        </div>
    );
};

export default MessageContainer;

// Separate NoChatSelected Component
const NoChatSelected = () => {
    const { authUser } = useAuthContext();
    return (
        <div className='justify-center w-full h-full flex items-center'>
            <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
               {/* Display the dynamically fetched user's name */}
               <p>Welcome 👋 {authUser?.fullName || 'User'}</p>
                <p>Tap a chat to start Messages</p>
                <TiMessage className='text-3xl md:text-6xl text-center' />
            </div>
        </div>
    );
};




// const MessageContainer = () => {
//     return (
//       <div className='md:min-w-[450px] flex flex-col '>
//           <>
//           {/* Header */}
//           <div className='bg-slate-500 px-4 py-2 mb-2'>
//               <span className='label-text'>To: </span>
//               <span className='text-gray-400 font-bold  '> John Doe</span>
//           </div>
//            < Messages />
//            <MessageInput />
//           </>
  
//       </div>
//     );
//   };
  
//   export default MessageContainer;