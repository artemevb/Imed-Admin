import { useState } from "react";
import ProductPreview from "./ProductPreview";
import CreatedList from "./CreatedList";

export default function ProductsMain({ setProductModal }) {
  const [canClose, setCanClose] = useState(true);
  const [idCount, setIdCount] = useState(1);
  const [emptyProduct, setEmptyProduct] = useState({
    id: idCount,
    name: "Заголовок",
    tag: ["new"],
    description: "Полное описание продукта",
    shortDescription: "Описание",
    discount: null,
    originalPrice: null,
    conditions: "Гарантия от производителя Техническая поддержка",
    brand: {
      id: 0,
      title: "",
      photo: {
        url: "",
      },
    },
    catalog: {
      id: 0,
    },
    characteristics: [
      {
        parameterName: "Имя параметра",
        description: ["Описание параметра1", "Описание параметра2", "Описание параметра3"],
      },
    ],
    clients: [
      { name: "Vitamed Medical", checked: true },
      { name: "Akfa Medline", checked: true },
      { name: "ZARMED PRATIKSHA", checked: true },
      { name: "Fergana Premium Medical", checked: true },
      { name: "NOVO MEDICS", checked: false },
      { name: "Meridian Diagnostic Hospital EKO", checked: false },
      { name: "SAYDANA", checked: false },
    ],
  });

  const [createdList, setCreatedList] = useState([emptyProduct]);
  const [productGallery, setProductGallery] = useState([]);

  // Function to update the product in createdList
  const updateCreatedList = (updatedProduct) => {
    setCreatedList((prevList) =>
      prevList.map((item) =>
        item.id === updatedProduct.id ? updatedProduct : item
      )
    );
  };

  return (
    <div className="fixed inset-0 z-[9999] h-screen w-screen bg-white flex">
      <CreatedList createdList={createdList} setProductModal={setProductModal} />
      <ProductPreview
        productGallery={productGallery}
        setProductGallery={setProductGallery}
        emptyProduct={emptyProduct}
        setEmptyProduct={setEmptyProduct}
        updateCreatedList={updateCreatedList} // Pass the update function here
      />
    </div>
  );
}