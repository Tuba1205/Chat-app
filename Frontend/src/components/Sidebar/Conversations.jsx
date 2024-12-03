import React from 'react'
import Conversation from './conversation';
import useGetConversation from '../../hooks/useGetConversation';
import { getRandomEmoji } from '../../utils/emojis';

const Conversations = () => {
 const {loading, conversations} = useGetConversation(); 
 console.log("CONVERSATIONS: " , conversations);
  return (
    <div className='py-2 flex flex-col overflow-auto'>
   { conversations.map((conversation, idx) => (
    <Conversation 
       key={conversation._id}
       conversation={conversation}
       emoji={getRandomEmoji()}
       lastidx = {idx === conversations.length -1}
    />
   ))}
        
      {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
    </div>
  );
};

export default Conversations;


// starter code snippet
// import React from 'react'
// import Conversation from './conversation';

// const Conversations = () => {
//   return (
//     <div className='py-2 flex flex-col overflow-auto'>
//         <Conversation />
//         <Conversation />
//         <Conversation />
//         <Conversation />
//         <Conversation />
//         <Conversation />
//         <Conversation />
//         <Conversation />
//     </div>
//   )
// }

// export default Conversations;