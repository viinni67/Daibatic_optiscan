// app/page.js
"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
export default function Home() {
    const router = useRouter();
    useEffect(() => {
        const results = sessionStorage.getItem("api response");
        console.log(results);
        const timer = setTimeout(() => {
            settext(results); // Update the state to show the response
        }, 5000);
        return () => clearTimeout(timer);
    }, []);
    let val = true;
    const [text, settext] = useState("");
    const [showalert, setshowalert] = useState(false);
    if (text != "") {
        val = false;
    }

    const commentRef = useRef(null);

    const handleCopy = () => {
        if (commentRef.current) {
            navigator.clipboard.writeText(commentRef.current.value).then(() => {
                setshowalert(true);

                setTimeout(() => setshowalert(false), 3000);
            }).catch((err) => {
                console.error("Failed to copy text: ", err);
            });
        }
    };

    return (

        <div>


            <h1 class=" items-center text-center justify-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-red-500">Medical Report <span class="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">Generated by AI</span></h1>
            <p class=" text-center text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-900">Your Vision Matters: Diabetic Retinopathy Screening Made Easy</p>


            {val ? <div className=" flex  justify-center">
                <div role="status">
                    <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            </div> : <div>
                {showalert && <div class=" mt-3 p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                    <span class="font-medium">Success alert!</span> report is copied
                </div>}
                <form className="flex justify-center mt-9">
                    <div className="w-3/4 mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                        <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                            <label htmlFor="comment" className="sr-only">Your comment</label>
                            <textarea
                                id="comment"
                                rows="4"
                                ref={commentRef}
                                className="w-[1000px] h-[800px] resize-none mx-auto block text-lg text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                                placeholder="Write a comment..."
                                required
                            >{text}</textarea>
                        </div>
                        <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                            <button type="button" onClick={() => { router.back() }} className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                                <b>Back</b>
                            </button>
                            <div className="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
                                <button onClick={handleCopy} data-tooltip-target="tooltip-website-url" data-copy-to-clipboard-target="website-url" class="flex-shrink-0 z-10 inline-flex items-center py-3 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-e-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 border border-blue-700 dark:border-blue-600 hover:border-blue-800 dark:hover:border-blue-700" type="button">
                                    <span id="default-icon">
                                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                            <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                                        </svg>
                                    </span>
                                    <span id="success-icon" class="hidden inline-flex items-center">
                                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5" />
                                        </svg>
                                    </span>
                                </button>

                                {/* Additional buttons for attach, location, and upload */}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            }
        </div>






    );
}
