"use client"
import React, { useState } from 'react';
import Image from "next/image";
import plus from '@/public/svg/plus.svg';

const Recenzia = ({ closeModal }) => {
    const [review, setReview] = useState({
        title: '',
        text: '',
        name: '',
        Position: '',
        conclusion: '',
    });

    const handleChange = (e) => {
        setReview({
            ...review,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the form submission
        console.log('Review submitted', review);
        closeModal();
    };

    return (
        <div className="z-20 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-x-scroll scrollbar-hide touch-auto">
            <div className="bg-white p-8 w-1/2 ">
                <h2 className="text-[30px] font-bold mb-4">Рецензия</h2>
                <form onSubmit={handleSubmit}>
                    <h2 className='mb-[10px] text-[24px] font-semibold'>Врач</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700">ФИО врача</label>
                        <input
                            name="name"
                            value={review.name}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Должность врача</label>
                        <input
                            name="Position"
                            value={review.Position}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Фото врача<br /><span className='text-[#BABABA] text-[15px]'>рекомендуемый размер 500х500</span></label>
                        <textarea
                            name="conclusion"
                            value={review.conclusion}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded-lg"
                        />
                    </div>
                    <h2 className='mb-[50px] text-[24px] font-semibold'>Рецензия</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700">Заголовок</label>
                        <input
                            type="text"
                            name="title"
                            value={review.title}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Текст</label>
                        <textarea
                            name="text"
                            value={review.text}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded-lg"
                        />
                    </div>
                    <div>
                        <button
                            className="py-2  text-[18px] font-semibold text-[#E31E24] bg-transparent mt-4 flex items-center"
                        // onClick={addNewParameter}
                        >
                            <Image
                                src={plus}
                                width={100}
                                height={100}
                                alt="Arrow Back Icon"
                                className="w-4 h-4 mr-[5px]"
                            />
                            Добавить текстовый блок
                        </button>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-[#E94B50] text-white px-14 py-2 "
                        >
                            Готово
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Recenzia;
