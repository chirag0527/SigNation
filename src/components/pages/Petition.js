import React, {useEffect, useState} from 'react'
import Navbar from '../Navbar';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import {onWritePetition} from '../../App'
import './Petition.css'
import axios from 'axios';

export default function Petition() {


  const [title,setTitle] = useState("");  
  const [desc,setDesc] = useState(""); 

  let image_hash = "";

  const [selectedFile, setSelectedFile] = useState(null);

  const [isActive, setIsActive] = useState([false, false, false, false, false]);


  const handleSubmission = async (event) => {

    const formData = new FormData();

    await formData.append("file", event.target.files[0]);

    const metadata = JSON.stringify({
      name: "File name",
    });
    formData.append("pinataMetadata", metadata);

    const options = JSON.stringify({
      cidVersion: 0,
    });
    formData.append("pinataOptions", options);

    try {
      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          maxBodyLength: "Infinity",
          headers: {
            "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI5MzhkNDM2ZS03Nzg3LTRjYTMtYWZmYi02YWNlN2YyYmNmY2YiLCJlbWFpbCI6ImNoaXJhZ3BhdWwxOTg5QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIyZjQ0ZWM3ZTk2MTI3OWQ0NjRhNSIsInNjb3BlZEtleVNlY3JldCI6ImIzNjZjOTk0M2NjNDBlNzM3ZTAzZGQwMTAxNTc0NmEwMjY0MGRmYzE2MTI4MDAyZGU3NDY5NWFhNWQ5ODE5MmEiLCJpYXQiOjE2NzkxMjUyMTR9.F1FyIi6hVfGA6jEM9ocgpb4CtWChWWzI4E_fbD3__Gk",
          },
        }
      );
      console.log(res.data);
      alert(`Image has been uploaded: ${res.data.IpfsHash}`)
      image_hash = res.data.IpfsHash;
    } catch (error) {
      console.log(error);
    }
  };

  const test = (index) => {
    setIsActive(prevState => {
      return prevState.map((item, i) => {
        if (i === index) {
          return !item;
        }
        return item;
      });
    });
  }


  console.log(isActive)

  return (
    <>
        <Navbar/>
        <div className='main flex flex-row'>
          <div className='petitionTextBox text-black p-4 flex flex-col space-y-8 bg-white rounded-md' >
              <div>
                  <h3 className='text-xl font-extrabold'> Title of the Petition</h3>
                  <TextField onChange={(e) => {
                    setTitle(e.target.value)
                  }} id="outlined-basic " label="Title" variant="outlined" className='my-3 w-[100%]'/>
              </div>
              <div>
                  <h3 className='text-xl font-extrabold'> Describe your problem </h3>
                  <TextField onChange={(e) => {
                    setDesc(e.target.value)
                  }} id="outlined-textarea" label='Description' hiddenLabel placeholder="Description of petition" minRows={20} multiline className='my-3 w-[100%]'/>
              </div>
    
          </div>
          <div className='petitionImageBox bg-white rounded-md text-black p-4 flex flex-col'> 
            <div>
                  <h3 className='text-xl font-extrabold'>Upload Image Cover</h3>
                  <Button variant="contained" component="label" style={{
                      borderRadius: 16,
                      backgroundColor: "#6D64CA",
                      padding: "8px 12px",
                      fontFamily: "ProductSansRegular",
                      color: "#FFFFFF",
                      width:"100%",
                      margin: "10px 0px",
                    }}>
                    Upload Image
                    <input hidden accept="image/*"  type="file" onChange={handleSubmission}/>
                  </Button>
            </div>

            <div>
              <h3 className='text-xl font-extrabold mt-3 mb-3'>Tags</h3>
              <div className ='tagList'>
                {["Education","Environment", "Health", "Politics","Social"].map((value,index)=>{
                  return(
                    <div className={`tags ${isActive[index]?"active":""}`} key={index} onClick={()=>test(index)}>{value}</div>
                  )
                })}
              </div>
            </div>
            <div>
              <h3 className='text-xl font-extrabold mt-6'>Allow signatures from these domain address</h3>
              <TextField onChange={(e) => {
                    setTitle(e.target.value)
                  }} id="outlined-basic " label="@example.com" variant="outlined" className='w-[100%]'/>
            </div>
            <Button variant="contained" 
                style={{
                borderRadius: 16,
                backgroundColor: "#6D64CA",
                padding: "8px 12px",
                fontFamily: "ProductSansRegular",
                fontSize: "23px",
                color: "#FFFFFF",
                width:"150px"}}  
                className ='self-center' onClick={() => {onWritePetition(desc,image_hash,title)}}>
              Submit</Button>
          </div>
          
        </div>
        
    </>
  )
}
