import { useState } from 'react';
import Message from './Message';

function ListeMessages(){
    //états
    const [filtreMessage, setFiltreMessage] = useState(false);
    const [filtre, setFiltre] = useState("auteur");


    //comportements


    return (
        <div>

            <nav id = "message"> 
                <Message />  
            </nav>

        </div>
    )
}
export default ListeMessages;
