import React, { useState, useEffect } from 'react'
import LinkShortner from '../components/LinkShortner'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../utils/axiosInstance'
import { MdContentCopy } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { IoQrCodeOutline } from "react-icons/io5";
import Modal from 'react-modal';
import { IoCloseOutline } from "react-icons/io5";

const Dashboard = () => {
  const [urls, setUrls] = useState([]);
  const [qrCode, setQrCode] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }

    const fetchUrls = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const { data } = await axiosInstance.get(`/url/dashboard/${userId}`);
        setUrls(data.stats);
      } catch (error) {
        console.error("Error fetching URLs:", error.response?.data || error.message);
      }
    };
    fetchUrls();
  }, [navigate]);

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url.shortUrl);
    alert("URL copied to clipboard!");
  }

  const handleQrCode = (qrCode) => {
    setQrCode(qrCode);
  }

  const handleClose = () => {
    setQrCode(null);
  }
  return (
    <div>
      <div className='flex items-center justify-center mt-12 flex-wrap'>
        <div className='max-w-7xl border rounded bg-white py-10 drop-shadow-md'>
          <h4 className='text-2xl text-center mb-2'>URL Shortener</h4>
          <p className='text-center text-xs text-gray-500 mb-7'>Shorten your long URLS and share them easily</p>
          <LinkShortner />
          {urls.length > 0 && (
            <div className='p-6'>
              <h5 className='text-lg font-semibold mb-2'>Recent URL</h5>
              {urls.map((url) => (
                <div key={url._id} className='flex justify-between !gap-2 items-center border border-gray-300 p-3 md:p-4 rounded mb-2'>
                  <a href={url.shortUrl} target="_blank" rel="noopener noreferrer" className='text-blue-500 underline text-center text-sm'>
                    {url.shortUrl}
                  </a>
                  <button onClick={() => handleCopy(url)}>
                    <MdContentCopy className='text-gray-500' />
                  </button>
                  <button onClick={() => handleQrCode(url.qrCode)}>
                    <IoQrCodeOutline />
                  </button>
                  <IoEyeOutline />
                  <p className='text-xs md:text-sm text-gray-500'>{url.visitCount} views</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {
        qrCode && (
          <Modal
            isOpen={!!qrCode}
            onRequestClose={handleClose}
            style={{
              content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                width: '300px',
                height: '300px',
              },
            }}
          >
            <h2 className='text-lg font-semibold text-center'>QR Code</h2>
            <button onClick={handleClose} className='absolute top-4 right-4 text-gray-500'>
              <IoCloseOutline />
            </button>
            {qrCode && (
              <img src={qrCode} alt="QR Code" className='w-36 h-36 mx-auto mt-4' />
            )}
            <p className='text-sm text-gray-500 text-center mt-2'>Scan the QR code to access the shortened URL</p>
          </Modal>
        )
      }
    </div>
  )
}

export default Dashboard