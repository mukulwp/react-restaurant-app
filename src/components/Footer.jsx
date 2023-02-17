import React from 'react';
import { Link } from 'react-router-dom';
import NewsletterImg from "../images/newsletter.png";

const Footer = () => {
  return (
    <footer className="w-full pt-16 pb-4 bg-black">
      {/* Newsletter */}
      <div className="flex flex-col md:flex-row gap-5 items-center pb-10 px-8 justify-between">
        <div className="flex items-center w-full gap-5">
          <img src={NewsletterImg} alt="newsletter" />
          <h2 className="text-primary text-2xl md:text-4xl">
            Sign Up for Newsletter
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 items-center w-auto md:w-full">
          <input
            className="relative border-0 h-16 pl-4 w-auto md:w-480 rounded-l-md focus-visible:outline-none"
            type="text"
            placeholder="Enter Your Email Address"
          />
          <button className="md:absolute right-11 border bg-black h-16 px-8 text-primary uppercase text-lg">
            Subscribe
          </button>
        </div>
      </div>
      <div className="border-textColor px-8 py-10 border-t border-b grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div>
          <h4 className="text-white text-2xl mb-4">Halal Food</h4>
          <p className="text-gray-300 text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia in
            necessitatibus minima reprehenderit iusto beatae cumque
          </p>
        </div>
        <div>
          <h4 className="text-white text-2xl mb-4">Quick Links</h4>
          <div className="flex flex-col gap-3">
            <Link to="/" className="text-white">
              Home
            </Link>
            <Link to="/menu" className="text-white">
              Menu
            </Link>
            <Link to="/about" className="text-white">
              About Us
            </Link>
            <Link to="/contact" className="text-white">
              Contact Us
            </Link>
          </div>
        </div>
        <div>
          <h4 className="text-white text-2xl mb-4">Policy</h4>
          <div className="flex flex-col gap-3">
            <Link to="/privacy" className="text-white">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-white">
              Terms & Conditions
            </Link>
            <Link to="/refund" className="text-white">
              Refund Policy
            </Link>
            <Link to="/sitemap" className="text-white">
              Site Map
            </Link>
          </div>
        </div>
        <div>
          <h4 className="text-white text-2xl mb-4">Contact Information</h4>
          <div className="flex flex-col gap-3">
            <p className='text-white'>Email: halalfood@halafood.com</p>
            <p className='text-white'>Phone: +88 01584939548</p>
            <p className='text-white'>Address: Malibagh, Dhaka, Bangladesh</p>
          </div>
        </div>
      </div>
      <p className='text-gray-400 text-center mt-4'>&copy;All right reserved by Hala Food</p>
    </footer>
  );
}

export default Footer