import React, { useEffect, useState } from 'react'
import { addDoc, collection } from "firebase/firestore"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, auth ,storage } from '../firebase-config'
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom'
export default function CreatePosts({ isAuth }) {

  const [tital, setTital] = useState("")
  const [postText, setPostText] = useState("")
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [per, setPer] = useState(null);


  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name
      console.log(name);
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on('state_changed', 
(snapshot) => {
  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  console.log('Upload is ' + progress + '% done');
  setPer(progress)
  switch (snapshot.state) {
    case 'paused':
      console.log('Upload is paused');
      break;
    case 'running':
      console.log('Upload is running');
      break;
    default:
      break;

  }
}, 
(error) => {
  console.log(error);
}, 
() => {
  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    setData((prev)=> ({...prev, img:downloadURL}))
  });
}
);


    };
    file && uploadFile();
},[file])

  


  // const [image,setImage] =useState("")
  // const storage = getStorage();
  



  const postsCollectionRef = collection(db, "posts")

  let navigate = useNavigate();

  const createPost = async () => {
    await addDoc(postsCollectionRef, { tital, postText,  author : { name: 
    auth.currentUser.displayName, id: auth.currentUser.uid } })
    navigate("/")
  }
  useEffect(() => {
    if (!isAuth) {
      navigate("/login")
    }
  }, []);

  return (
    <div className='createPostPage'>
      <div className='cpContainer'>
        <h1>Create A Post</h1>
        <div className='inputGp'>
          <label>Tital</label>
          <input 
          placeholder='tital...' 
          onChange={(event) => 
          setTital(event.target.value)}>
          </input>
        </div>
        <div className='inputGp'>
          <label>Post:</label>
          <textarea
           placeholder='Post...'
           onChange={(event) =>
           setPostText(event.target.value)} />
        </div>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Upload Image</Form.Label>
          <Form.Control
           type="file" 
           accept='image/*' 
           onChange={(e) =>
           setFile(e.target.files[0])}
             />
        </Form.Group>
        <Button onClick={createPost}>Submit Post</Button>
      </div>
    </div>
  )
}
