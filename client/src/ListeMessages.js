/*
import { useState } from 'react';
import Message from './Message';

function ListeMessages(props){
    //états
    const [filtreMessage, setFiltreMessage] = useState(false);
    const [filtre, setFiltre] = useState("auteur");


    //comportements


    return (
        <div>

            <nav id = "message"> 
                <Message user = {props.user} />  
            </nav>

        </div>
    )
}
export default ListeMessages;
*/

import React from 'react';
import Message from './Message';


const ListeMessages = (props) => {
  return (
    <div>
      <nav id="page">
        {props.messages.map((message) => (
          <Message key={message._id} message={message} setPage={props.setPage} setSelectedUser = {props.setSelectedUser} handleUserClick = {props.handleUserClick} />
        ))}
      </nav>
    </div>
  );
};

// const ListeMessages = (props) => {
//   return (
//     <div>
//       <nav id="page">
      
//       {props.messages.map((message) => (
//         <Message key={message._id} message={message} setPage={props.setPage}/>
//       ))} 
     
    
//       </nav>
//     </div>
//   );
// };

export default ListeMessages;