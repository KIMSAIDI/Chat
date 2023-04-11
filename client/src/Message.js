import { useState } from 'react';
import './css/Message.css';

function Message(){


    return(
        <div>

            
            <button type="button">Like</button>
            <button type="button">Dislike</button>
            <button type="button">Send</button>
            

            <br />
            <input type="text" placeholder='Ajouter un commentaire'/>


        </div>
    )
}


export default Message;
