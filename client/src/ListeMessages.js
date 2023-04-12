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
