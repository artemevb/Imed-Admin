import Image from "next/image";
import close from '@/public/svg/closeblack.svg';

const DeleteModal = ({ isVisible, onClose, onDelete }) => {
    return (
        <div className={`fixed z-20 inset-0 flex items-center justify-center bg-black bg-opacity-50 ${isVisible ? '' : 'hidden'}`}>
            <div className="bg-white p-[30px] w-[30%] mx-auto ">
                <div className='flex flex-row justify-between'>
                    <p className="text-[28px] font-semibold">Удалить рецензию?</p>
                    <button onClick={onClose}>
                        <Image
                            src={close}
                            width={100}
                            height={100}
                            alt="Arrow Back Icon"
                            className="w-5 h-5 mb-[25px]"
                        /></button>
                </div>
                <p className="mt-4 text-[18px] text-gray-600">Вы уверены, что хотите удалить рецензию? Это действие будет невозможно отменить</p>
                <div className="mt-6 flex justify-between">
                    <button onClick={onClose} className=" border border-[#E1E1E1] text-[#E31E24] text-[18px] px-4 py-4 w-[48%] ">Назад</button>
                    <button onClick={onDelete} className="bg-[#E94B50] text-white px-4 text-[18px]  py-4 w-[48%] ">Удалить</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
