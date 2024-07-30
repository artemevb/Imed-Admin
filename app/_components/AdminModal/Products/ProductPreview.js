import { useState } from 'react';
import Image from 'next/image';
import VerticalCarousel from './VerticalCarousel';
import ProductInfo from './Modal/ProductInfo';
import ProductCharacteristics from './ProductCharacteristics';
import Deletefluent from '@/public/svg/deletefluent.svg';
import ReviewModal from './Modal/Recenzia'; // Import the ReviewModal component
import DeleteModal from './Modal/DeleteModal'; // Import the DeleteModal component

const formatNumber = (number) => {
  return new Intl.NumberFormat('ru-RU').format(Math.round(number));
};

export default function ProductPreview({
  productGallery,
  setProductGallery,
  emptyProduct,
  setEmptyProduct,
  updateCreatedList, // Receive the update function here
}) {
  const [modal, setModal] = useState(false);
  const [reviewModal, setReviewModal] = useState(false); // State for review modal
  const [reviews, setReviews] = useState([]); // State for storing reviews
  const [deleteModal, setDeleteModal] = useState(false); // State for delete modal
  const [reviewToDelete, setReviewToDelete] = useState(null); // State for the review to delete
  const [editReview, setEditReview] = useState(null); // State for editing review

  const handleEditClick = () => {
    setModal(true);
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  const handleOpenReviewModal = (review = null) => {
    setEditReview(review);
    setReviewModal(true);
  };

  const handleCloseReviewModal = () => {
    setEditReview(null);
    setReviewModal(false);
  };

  const handleOpenDeleteModal = (index) => {
    setReviewToDelete(index);
    setDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModal(false);
    setReviewToDelete(null);
  };

  const handleDeleteReview = () => {
    setReviews(prevReviews => prevReviews.filter((_, index) => index !== reviewToDelete));
    handleCloseDeleteModal();
  };

  const addReview = (review) => {
    if (editReview) {
      setReviews(prevReviews => prevReviews.map(r => r === editReview ? review : r));
    } else {
      setReviews(prevReviews => [...prevReviews, review]);
    }
    handleCloseReviewModal();
  };

  return (
    <div className="w-full flex flex-col p-12 overflow-y-scroll no-scrollbar">
      <div className="w-full flex gap-12 p-12">
        {modal && (
          <ProductInfo
            emptyProduct={emptyProduct}
            setEmptyProduct={setEmptyProduct}
            closeModal={handleCloseModal}
            updateCreatedList={updateCreatedList} // Pass the update function here
          />
        )}
        {reviewModal && (
          <ReviewModal closeModal={handleCloseReviewModal} addReview={addReview} review={editReview} />
        )}
        {deleteModal && (
          <DeleteModal
            isVisible={deleteModal}
            onClose={handleCloseDeleteModal}
            onDelete={handleDeleteReview}
          />
        )}
        <div className="flex-1 w-full">
          <VerticalCarousel
            gallery={productGallery}
            setGallery={setProductGallery}
          />
        </div>
        <div className="w-full flex-1 flex flex-col gap-5">
          <div className="flex gap-4 max-lg:hidden">
            <h1 className="text-3xl font-semibold">{emptyProduct.name}</h1>
            {emptyProduct.tag.includes('New') && (
              <div className="py-2 px-5 font-bold rounded-full text-[#E31E24] bg-[#FCE8E9]">
                Новинка
              </div>
            )}
          </div>
          <p className="text-neutral-400 leading-5">
            {emptyProduct.shortDescription}
          </p>
          {emptyProduct.tag.includes('Promotion') ? (
            <div className="flex items-start gap-6 text-lg">
              <div className="flex flex-col">
                <span className="text-[#E31E24] font-bold text-3xl ">
                  {formatNumber(emptyProduct.priceWithDiscount)} ye
                </span>
                <span className="text-gray-500 line-through">
                  {formatNumber(emptyProduct.originalPrice)} ye
                </span>
              </div>
              <span className="text-[#E31E24] bg-green-100 px-4 py-1 flex items-center rounded-full font-bold">
                -{emptyProduct.discount}%
              </span>
            </div>
          ) : (
            <div className="text-lg text-[#E31E24] font-bold">
              {/* {formatNumber(emptyProduct.priceWithDiscount || emptyProduct.originalPrice)} ye */}
            </div>
          )}
          <hr />
          <div className="w-full flex justify-between items-center">
            <p className="w-full text-lg max-w-[250px] font-semibold leading-5">
              {emptyProduct.conditions}
            </p>
            {emptyProduct.brand.id === 0 ? (
              <div></div>
            ) : (
              <Image
                src={emptyProduct.brand.photo.url}
                width={300}
                height={300}
                alt={emptyProduct.brand.title}
                className="w-32 h-10"
              />
            )}
          </div>
          <div className="flex gap-4">
            <button
              className="px-24 py-4 text-sm font-semibold text-white bg-[#E94B50]"
              onClick={handleEditClick}
            >
              Редактировать
            </button>
          </div>
        </div>
      </div>
      <div className="mt-0">
        <ProductCharacteristics
          emptyProduct={emptyProduct}
          setEmptyProduct={setEmptyProduct}
        />
      </div>

      <div className="mt-9">
        <p className="text-3xl font-semibold leading-5 uppercase">Рецензии от врачей</p>
        <button
          className="px-20 py-4 text-sm font-semibold text-white bg-[#E94B50] mt-4"
          onClick={() => handleOpenReviewModal(null)}
        >
          Написать рецензию
        </button>
        {reviews.map((review, index) => (
          <div key={index} className="mt-4 p-4 border rounded-lg">
            <div className="flex items-center">
              {review.photo && (
                <img
                  src={URL.createObjectURL(review.photo)}
                  alt="Doctor"
                  className="w-16 h-16 rounded-full mr-4"
                />
              )}
              <div>
                <h4 className="text-lg font-bold">{review.name}</h4>
                <p className="text-sm text-[#BABABA]">{review.position}</p>
              </div>
            </div>
            <p className="mt-2">{review.conclusion}</p>
            {review.textBlocks.map((block, idx) => (
              <div key={idx} className="mt-2">
                {block.title && <h5 className="font-semibold">{block.title}</h5>}
                <p>{block.text}</p>
              </div>
            ))}
            <div className='flex gap-4'>
              <button
                className='px-20 py-4 text-sm font-semibold border border-[#E94B50] text-[#E94B50] bg-white mt-4'
                onClick={() => handleOpenReviewModal(review)}
              >
                Редактировать
              </button>
              <button className='px-3 border mt-4' onClick={() => handleOpenDeleteModal(index)}>
                <Image
                  src={Deletefluent}
                  width={100}
                  height={100}
                  alt="Delete Icon"
                  className="w-7 h-7 "
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
