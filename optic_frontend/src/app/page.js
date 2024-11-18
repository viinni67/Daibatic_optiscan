"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Front from "./main/Front";
import "./globals.css";


export default function Home() {

  const router = useRouter();


  const [form, setform] = useState({
    file:null,
    first_name: " ",
    last_name: " ",
    age: " ",
    gender: " ",
    previous: "",
    pregnant: "",

  })
  const handlefilechange=(e)=>{
    const selectedFile=e.target.files[0];
    setform({...form,file:selectedFile});

  }

  const handleonchange = (e) => {
    const { name, value } = e.target;
    setform((prevForm) => ({
      ...prevForm,
      [name]: value,

    }));
  }
 








 const handleonsubmit = async (e) => {
    e.preventDefault();

    // file: UploadFile = ,gender other_diseases: age:  pregnant: 
    const formData=new FormData();
    formData.append('file',form.file);
    // formData.append('first_name',form.first_name);
    // formData.append('last_name',form.last_name);
    formData.append('gender',form.gender);

    formData.append('other_diseases',form.previous);
    formData.append('age',form.age);
    
    formData.append('pregnant',form.pregnant);
    formData.append('first_name',form.first_name);
    formData.append('last_name',form.last_name);

    
    try {
      router.push('/Results');
      const apis= await fetch("http://127.0.0.1:5000/members",{
        method:"POST",
        body:formData,
      });

      const res= await apis.json();
      if(res){
        
        sessionStorage.setItem("api response",res.report);
        // console.log(res);
      }
      else{
        console.log("error",res);
      }



    } catch (error) {
      console.log('Eror druing',error);

    }

  };




return (
  <>


    {/* Main content container */}

    {/* Wrap the content in a narrower container */}
    <div className="container mx-auto w-3/4 lg:w-2/3 bg-slate-700 shadow-lg p-8 rounded-lg">
      {/* Heading: Upload retina images */}
      <h1 className="text-2xl font-bold text-dark mb-6 text-center">
        Upload your retina imags
      </h1>

      {/* Input bar */}
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-80 border-2 border-dark border-dashed rounded-lg cursor-pointer bg-dark hover:bg-gray-100 dark:hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 mb-8"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-white">
            <span className="font-semibold">Click to upload retina images</span> or drag and drop
          </p>
          <p className="text-xs text-white">
            SVG, PNG, JPG or GIF (MAX. 800x400px)
          </p>
        </div>
        <input id="dropzone-file" name="file"   onChange={handlefilechange} type="file" className="hidden" />
      </label>

      {/* Submit button */}


      {/* forms to add info  */}


      <form className=" max-w-2xl  mx-auto  w-3/4  " >


        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group   ">
            <input placeholder="first name" value={form.first_name} onChange={handleonchange} type="text" name="first_name" id="floating_first_name" className="block py-4 px-0 w-full text-lg text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
            <label for="floating_first_name" className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> First name </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input value={form.last_name} onChange={handleonchange} type="text" name="last_name" id="floating_last_name" className="block py-4 px-0 w-full text-lg text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label for="floating_last_name" className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
          </div>
        </div>


        <div className="relative z-0 w-full mb-5 group">
          <input value={form.age} onChange={handleonchange} type="number" name="age" id="floating_age" className="block py-4 px-0 w-full text-lg text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label for="floating_age" className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Age</label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <select value={form.gender} onChange={handleonchange} name="gender" id="floating_gender" className="block py-4 px-0 w-full text-lg text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required>
            <option value=""  >Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <label for="floating_gender" className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Gender</label>
        </div>

        {form.gender === 'female' && (
          <div className="relative z-0 w-full mb-5 group">
            <select
              value={form.pregnant}
              onChange={handleonchange}
              name="pregnant"
              id="floating_pregnancy"
              className="block py-4 px-0 w-full text-lg text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
            >
              <option value="">Are you pregnant?</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            <label
              htmlFor="floating_pregnancy"
              className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Pregnancy Status
            </label>
          </div>
        )}


        <div className="relative z-0 w-full mb-5 group">
          <textarea value={form.previous} onChange={handleonchange} name="previous" id="floating_previous_illness" rows="3" className="block py-4 px-0 w-full text-lg text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required></textarea>
          <label for="floating_previous_illness" className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Previous illness (if any)</label>
        </div>


      </form>
      <div className="flex justify-center items-center w-full">
        <button
          onClick={handleonsubmit}
          type="button"
          className=" flex mt-4 py-2.5 px-5 mb-2 text-lg font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Submit
        </button>



      </div>




      {/* Text Box for Diabetes Information */}
      <div className="p-6 mt-10 rounded-lg bg-gray-100 border border-gray-300">
        <h2 className="text-xl font-semibold mb-4">Diabetes and Its Effect on the Retina</h2>
        <p className="text-base text-gray-700 mb-4">
          Diabetes can significantly impact various parts of the body, including the eyes. One of the most common complications is <b>diabetic retinopathy</b>, a condition where high blood sugar levels damage the blood vessels in the retina. Over time, this can lead to vision problems and even blindness.
        </p>
        <h3 className="font-semibold mb-2">The stages of diabetic retinopathy include:</h3>
        <ul className="list-disc list-inside mb-4">
          <li><b>Mild Non-Proliferative Retinopathy</b>: Small areas of swelling in the blood vessels of the retina, usually with no noticeable symptoms.</li>
          <li><b>Moderate Non-Proliferative Retinopathy</b>: Some blood vessels become blocked, affecting the retinal tissue.</li>
          <li><b>Severe Non-Proliferative Retinopathy</b>: More blood vessels are blocked, leading to signals for new vessels to grow.</li>
          <li><b>Proliferative Diabetic Retinopathy</b>: The most advanced stage, where new, abnormal blood vessels grow and can lead to severe vision problems.</li>
        </ul>
        <p className="text-base text-gray-700">
          Regular eye exams and controlling blood sugar levels are key in preventing or managing diabetic retinopathy.
          For more information, <a className="text-blue-600" href="https://www.kcretina.com/blog/retinal-disease-and-glaucoma" target="_blank">visit this page</a>.
        </p>
      </div>
    </div>

  </>
);
}
