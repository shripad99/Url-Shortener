import React from 'react'
import axiosInstance from '../utils/axiosInstance';
import { Button } from "@/components/ui/button"

const LinkShortner = () => {
    const [url, setUrl] = React.useState("");
    const [shortUrl, setShortUrl] = React.useState("");
    const [qrCode, setQrCode] = React.useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const {data} = await axiosInstance.post("/url/shorten", {
                originalUrl: url,
                userId: localStorage.getItem("userId"),
            });
            setShortUrl(data.shortUrl);
            setQrCode(data.qrCode);
            setUrl("");
        } catch(error){
            console.error("Error shortening URL:", error.response?.data || error.message);
        }
    }

  return (
    <div className='max-w-xl mx-auto p-6'>
        <form onSubmit={handleSubmit}>
            <input type='url' value={url} onChange={(e) => setUrl(e.target.value)} placeholder='Enter URL to shorten' className='w-full text-sm bg-transparent border-[1.5px] px-5 py-3 rounded mb-4 outline-none' />
            <Button type='submit' className='w-full'>
                Shorten URL
            </Button>
        </form>
        {/* {
            shortUrl && (
                <div className='mt-4'>
                    <h5 className='text-lg font-semibold text-center'>Shortened URL:</h5>
                    <div className='flex justify-between !gap-5 items-baseline'>
                        <a href={shortUrl} target="_blank" rel="noopener noreferrer" className='text-blue-500 underline text-center'>
                        {shortUrl}
                        <button className='text-sm text-gray-500 text-center border border-black px-2 py-2 ml-3'>Copy</button>
                    </a>
                    </div>
                    <div className='mt-2 flex justify-center flex-col items-center'>
                        <h5 className='text-lg font-semibold text-center'>QR Code:</h5>
                        <img src={qrCode} alt="QR Code" className='w-36 h-36' />
                    </div>
                    <p className='text-sm text-gray-500 text-center'>Scan the QR code to access the shortened URL</p>
                </div>
            )
        } */}
    </div>
  )
}

export default LinkShortner