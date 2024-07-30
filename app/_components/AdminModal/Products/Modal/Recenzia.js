"use client";
import React, { useState } from 'react';
import Image from "next/image";
import plus from '@/public/svg/plus.svg';
import closeIcon from '@/public/svg/close.svg';
import close from '@/public/svg/closeblack.svg';

const Recenzia = ({ closeModal }) => {
    const [review, setReview] = useState({
        name: '',
        position: '',
        conclusion: '',
        photo: null,
        textBlocks: [{ title: '', text: '' }]
    });

    const handleChange = (e, index = null) => {
        const { name, value } = e.target;
        if (index === null) {
            setReview(prevState => ({
                ...prevState,
                [name]: value,
            }));
        } else {
            const updatedTextBlocks = review.textBlocks.map((block, i) => {
                if (i === index) {
                    return { ...block, [name]: value };
                }
                return block;
            });
            setReview(prevState => ({
                ...prevState,
                textBlocks: updatedTextBlocks
            }));
        }
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setReview(prevState => ({
            ...prevState,
            photo: file,
        }));
    };

    const handlePhotoRemove = () => {
        setReview(prevState => ({
            ...prevState,
            photo: null,
        }));
    };

    const handleAddTextBlock = () => {
        setReview(prevState => ({
            ...prevState,
            textBlocks: [...prevState.textBlocks, { title: '', text: '' }]
        }));
    };

    const handleRemoveTextBlock = (index) => {
        const updatedTextBlocks = review.textBlocks.filter((_, i) => i !== index);
        setReview(prevState => ({
            ...prevState,
            textBlocks: updatedTextBlocks
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Review submitted', review);
        // Simulate form submission or call to an API endpoint here
        // fetch('/api/reviews', {
        //     method: 'POST',
        //     body: JSON.stringify(review),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // }).then(response => response.json())
        // .then(data => {
        //     console.log('Success:', data);
        //     closeModal();
        // }).catch((error) => {
        //     console.error('Error:', error);
        // });
        closeModal();
    };

    return (
        <div className="z-20 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto">
            <div className="bg-white p-8 w-[68%] mx-auto my-8 max-h-[90vh] overflow-y-auto scrollbar-hide">
                <div className='flex flex-row justify-between'>
                    <h2 className="text-[30px] font-bold mb-4">Рецензия</h2>
                    <button onClick={closeModal}>
                        <Image
                            src={close}
                            width={100}
                            height={100}
                            alt="Arrow Back Icon"
                            className="w-6 h-6"
                        /></button>
                </div>
                <form onSubmit={handleSubmit}>
                    <h2 className='mb-[10px] text-[24px] font-semibold'>Врач</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700">ФИО врача</label>
                        <input
                            name="name"
                            value={review.name}
                            onChange={(e) => handleChange(e)}
                            className="w-full border px-3 py-2 rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Должность врача</label>
                        <input
                            name="position"
                            value={review.position}
                            onChange={(e) => handleChange(e)}
                            className="w-full border px-3 py-2 rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Фото врача<br /><span className='text-[#BABABA] text-[15px]'>рекомендуемый размер 500х500</span></label>
                        {review.photo ? (
                            <div className="relative">
                                <img
                                    src={URL.createObjectURL(review.photo)}
                                    alt="Doctor"
                                    className="w-[115px] h-auto rounded-lg"
                                />
                                <button
                                    type="button"
                                    className="absolute top-0 right-[90%] bg-red-500 text-white rounded-full p-1"
                                    onClick={handlePhotoRemove}
                                >
                                    <Image
                                        src={closeIcon}
                                        alt="Remove"
                                        width={16}
                                        height={16}
                                    />
                                </button>
                            </div>
                        ) : (
                            <input
                                type="file"
                                name="photo"
                                onChange={handlePhotoChange}
                                className="w-full border px-3 py-2 rounded-lg"
                                accept="image/*"
                            />
                        )}
                    </div>
                    <h2 className='mb-[50px] text-[24px] mt-[20px] font-semibold'>Рецензия</h2>
                    {review.textBlocks.map((block, index) => (
                        <div key={index} className="relative mb-6">
                            <button
                                className="absolute top-0 right-0 mt-2"
                                onClick={() => handleRemoveTextBlock(index)}
                            >
                                <Image
                                    src={close}
                                    width={100}
                                    height={100}
                                    alt="Arrow Back Icon"
                                    className="w-4 h-4"
                                />
                            </button>
                            <label className="mb-4">
                                Заголовок <br />(необязательно)
                                <input
                                    type="text"
                                    name="title"
                                    value={block.title}
                                    onChange={(e) => handleChange(e, index)}
                                    className="border p-2 rounded w-full mb-4"
                                />
                            </label>
                            <label>
                                Текст
                                <textarea
                                    className="border p-2 rounded w-full h-40 mb-4"
                                    name="text"
                                    value={block.text}
                                    onChange={(e) => handleChange(e, index)}
                                />
                            </label>
                        </div>
                    ))}
                    <div>
                        <button
                            type="button"
                            onClick={handleAddTextBlock}
                            className="py-2 text-[18px] font-semibold text-[#E31E24] bg-transparent mt-4 flex items-center"
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
                            className="bg-[#E94B50] text-white px-14 py-2"
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
