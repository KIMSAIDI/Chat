import { useState } from 'react';
import './css/Message.css';
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";

const Message = (props) => {
    const [message, setMessage] = useState("");
    const [author, setAuthor] = useState(props.user.login);



    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('/api/message/',{
            message: message,
            author : author
        })      
    }
    return(
        <form>

            <button type="button">Like</button>
            <button type="button">Dislike</button>

            <br />
            <label>
                Message :  
                <input type="text" placeholder='Ajouter un commentaire' value={message} onChange={(e) => setMessage(e.target.value)} name = "message" />
            </label>
            <button type="button" onClick={handleSubmit}>Send</button>
            

           
           

        </form>
    )
}


export default Message;
