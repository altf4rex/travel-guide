"use client"

import { FormEvent, useState } from "react";

export default function SearchInput() {

    const [inputValue, setInputValue] = useState<string>("");

    //TO DO: function that change uri  
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <form className="flex max-w-[260px] px-4 py-2 rounded-md bg-secondaryBackground" onSubmit={handleSubmit}>
            <button 
                type="submit"
            >
                <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M19.7181 18.9694L15.0241 14.2762C17.8504 10.883 17.5079 5.86693 14.2466 2.88935C10.9853 -0.0882368 5.95884 0.0259986 2.83617 3.14867C-0.286501 6.27134 -0.400737 11.2978 2.57685 14.5591C5.55443 17.8204 10.5705 18.1629 13.9637 15.3366L18.6569 20.0306C18.9499 20.3237 19.4251 20.3237 19.7181 20.0306C20.0112 19.7376 20.0112 19.2624 19.7181 18.9694ZM1.9375 9C1.9375 5.27208 4.95958 2.25 8.6875 2.25C12.4154 2.25 15.4375 5.27208 15.4375 9C15.4375 12.7279 12.4154 15.75 8.6875 15.75C4.96129 15.7459 1.94163 12.7262 1.9375 9Z" fill="#61788A"/>
                </svg>
            </button>
            <input 
                className="w-full ml-3 text-secondary bg-inherit"
                type="text" 
                placeholder="Search"
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)}
            />
      </form>
    );
  }