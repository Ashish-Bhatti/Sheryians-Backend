import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [notes, setNotes] = useState([]);

    const [toggle, setToggle] = useState(false);

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
        const { title, description, image } = e.target.elements;

        console.log(title.value, description.value, image.value);

        axios.post('http://localhost:3000/api/notes', { title: title.value, description: description.value, image: image.value }).then((res) => {
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

    function handleUpdate(id) {
        setToggle((prev) => !prev);
    }

    function handleUpdateSubmit(e, id) {
        e.preventDefault();
        const { new_title, new_description, new_image } = e.target.elements;

        console.log(new_title.value, new_description.value, new_image.value);

        axios.patch(`http://localhost:3000/api/notes/${id}`,
            { title: new_title.value == "" ? item.title : new_title.value,
                description: new_description.value == "" ? item.description : new_description.value,
                image: new_image.value == "" ? item.image : new_image.value }).then((res) => {
            console.log(res.data);
            getNotes();
            setToggle(false);
        });
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input name="title" type="text" placeholder="Enter title" />
                <input name="description" type="text" placeholder="Enter description" />
                <input name="image" type="text" placeholder="Enter Image Link" />
                <button>Submit</button>
            </form>
            <div className="notes">
                {notes.map((item, idx) => {
                    return (
                        <>
                            <div className="note" key={idx}>
                                <img src={item.image} alt="img" />
                                <h1>{item.title}</h1>
                                <p> {item.description}</p>
                                <div className="btns">
                                    <button onClick={() => handleDelete(item._id)}>Delete</button>
                                    <button onClick={() => handleUpdate(item._id)}>Update</button>
                                </div>
                            </div>
                            {toggle && (
                                <div className="update-form">
                                    <form onSubmit={(e) => handleUpdateSubmit(e, item._id)}>
                                        <input name="new_title" type="text" placeholder="Enter title" />
                                        <input name="new_description" type="text" placeholder="Enter description" />
                                        <input name="new_image" type="text" placeholder="Enter Image Link" />
                                        <button onClick={() => handleUpdate(item._id)}>Submit</button>
                                    </form>
                                </div>
                            )}
                        </>
                    );
                })}
            </div>
        </>
    );
};

export default App;
