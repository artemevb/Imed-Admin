
"use client";
import { useState, useEffect } from "react";

const formatNumber = (number) => {
  return new Intl.NumberFormat('ru-RU').format(Math.round(number));
};

export default function ProductInfo({
  emptyProduct,
  setEmptyProduct,
  closeModal,
  updateCreatedList
}) {
  const [product, setProduct] = useState(emptyProduct);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    // Fetch brands
    fetch("http://213.230.91.55:8110/partner/get-all-partner-name")
      .then((response) => response.json())
      .then((data) => setBrands(data.data));

    // Fetch categories
    fetch("http://213.230.91.55:8110/category")
      .then((response) => response.json())
      .then((data) => setCategories(data.data.item));
  }, []);

  useEffect(() => {
    const selectedCategory = categories.find(
      (category) => category.title === product.category
    );
    setSubcategories(selectedCategory ? selectedCategory.catalog : []);
  }, [product.category, categories]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleTagChange = (tag) => {
    const newTags = product.tag.includes(tag)
      ? product.tag.filter((t) => t !== tag)
      : [...product.tag.filter((t) => t !== "Promotion"), tag]; // Only allow one tag if Promotion is selected
    setProduct({ ...product, tag: newTags });
  };

  const handleSave = () => {
    setEmptyProduct(product);
    updateCreatedList(product);
    closeModal();
  };

  const handlePriceChange = (e) => {
    const { value } = e.target;
    const price = Math.min(parseFloat(value) || 0, 1e9);
    setProduct({ ...product, originalPrice: price });
  };

  const handleDiscountChange = (e) => {
    const { value } = e.target;
    const discount = Math.min(parseFloat(value) || 0, 100);
    const originalPrice = parseFloat(product.originalPrice) || 0;
    const discountPrice = originalPrice - (originalPrice * discount) / 100;
    setProduct({
      ...product,
      discount: discount,
      priceWithDiscount: discountPrice,
    });
  };

  return (
    <div className="fixed inset-0 z-[10000] flex justify-center items-center bg-modalBg overflow-y-auto overflow-hidden">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] lg:w-[60%] max-h-[100vh] overflow-y-auto overflow-hidden">
        <div className="flex justify-between items-center mb-6 top-0 bg-white z-10">
          <h2 className="text-2xl font-semibold">Информация о товаре</h2>
          <button onClick={closeModal} >
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
              <path d="M12.4994 9.85083L21.7806 0.56958L24.4319 3.22083L15.1506 12.5021L24.4319 21.7833L21.7788 24.4346L12.4975 15.1533L3.21814 24.4346L0.566895 21.7815L9.84815 12.5002L0.566895 3.21896L3.21814 0.571455L12.4994 9.85083Z" fill="black" />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <label>
            Название товара
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            />
          </label>
          <label>
            Категория
            <select
              name="category"
              value={product.category}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.title}>
                  {category.title}
                </option>
              ))}
            </select>
          </label>
          <label>
            Подкатегория
            <select
              name="subcategory"
              value={product.subcategory}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            >
              {subcategories.map((sub) => (
                <option key={sub.id} value={sub.name}>
                  {sub.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Тег
            <div className="flex gap-2">
              <button
                onClick={() => handleTagChange("New")}
                className={`py-2 px-4 rounded ${product.tag.includes("New")
                  ? "bg-[#E94B50] text-white"
                  : "bg-gray-200"
                  }`}
              >
                Новинка
              </button>
              <button
                onClick={() => handleTagChange("Promotion")}
                className={`py-2 px-4 rounded ${product.tag.includes("Promotion")
                  ? "bg-[#E94B50] text-white"
                  : "bg-gray-200"
                  }`}
              >
                Акция
              </button>
            </div>
          </label>
          {product.tag.includes("Promotion") && (
            <>
              <label>
                Размер скидки (%)
                <input
                  type="number"
                  name="discount"
                  value={product.discount || ""}
                  onChange={handleDiscountChange}
                  className="border p-2 rounded w-full"
                />
              </label>
              <label>
                Изначальная цена (у.е.)
                <input
                  type="number"
                  name="originalPrice"
                  value={product.originalPrice || ""}
                  onChange={handlePriceChange}
                  className="border p-2 rounded w-full"
                />
              </label>
              <label>
                Цена со скидкой (у.е.)
                <input
                  type="text"
                  name="priceWithDiscount"
                  value={formatNumber(product.priceWithDiscount) || ""}
                  readOnly
                  className="border p-2 rounded w-full bg-gray-100"
                />
              </label>
            </>
          )}
          <label>
            Бренд
            <select
              name="brand"
              value={product.brand.id}
              onChange={(e) =>
                setProduct({
                  ...product,
                  brand: {
                    id: Number(e.target.value),
                    ...brands.find((brand) => brand.id === Number(e.target.value)),
                  },
                })
              }
              className="border p-2 rounded w-full"
            >
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.title}
                </option>
              ))}
            </select>
          </label>
          <label>
            Описание
            <textarea
              name="shortDescription"
              value={product.shortDescription}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            />
          </label>
          <label>
            Условия
            <input
              type="text"
              name="conditions"
              value={product.conditions}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            />
          </label>
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSave}
            className="py-2 px-14 bg-[#E94B50] text-white"
          >
            Готово
          </button>
        </div>
      </div>
    </div>

  );
}