import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [notes, setNotes] = useState([]);

    function getNotes() {
        axios.get('http://localhost:3000/api/notes').then((res) => {
            console.log(res.data.notes);
            setNotes(res.data.notes);
        });
    }
    useEffect(() => {
        getNotes();
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        const { title, description } = e.target.elements;

        console.log(title.value, description.value);

        axios.post('http://localhost:3000/api/notes', { title: title.value, description: description.value }).then((res) => {
            console.log(res.data);
            getNotes();
        });

    }

    function handleDelete(id) {
      axios.delete(`http://localhost:3000/api/notes/${id}`).then((res) => {
        console.log(res.data);
        getNotes();
      });
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input name="title" type="text" placeholder="Enter title" />
                <input name="description" type="text" placeholder="Enter description" />
                <button>Submit</button>
            </form>
            <div className="notes">
                {notes.map((item, idx) => {
                    return (
                        <div className="note" key={idx}>
                            <h1>{item.title}</h1>
                            <p>{item.description}</p>
                            <button onClick={()=>handleDelete(item._id)}>Delete</button>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default App;
