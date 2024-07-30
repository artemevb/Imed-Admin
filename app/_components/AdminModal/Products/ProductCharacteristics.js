"use client";
import { useState } from "react";
import Image from "next/image";
import plus from '@/public/svg/plus.svg';
import close from '@/public/svg/closeblack.svg';

export default function ProductCharacteristics({ emptyProduct, setEmptyProduct }) {
  const [active, setActive] = useState('description');
  const [filtered, setFiltered] = useState(emptyProduct.description);
  const [textBlocks, setTextBlocks] = useState([{ title: '', description: emptyProduct.description }]);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [showCharacteristicsModal, setShowCharacteristicsModal] = useState(false);
  const [showClientModal, setShowClientModal] = useState(false);

  const handleFilter = (catname) => {
    setActive(catname);
    const filteredData = catname === 'description' ? emptyProduct.description : catname === 'characteristics' ? emptyProduct.characteristics : emptyProduct.clients;
    setFiltered(filteredData);
  };

  const handleEditClick = () => {
    if (active === 'description') {
      setShowDescriptionModal(true);
    } else if (active === 'characteristics') {
      setShowCharacteristicsModal(true);
    } else if (active === 'client') {
      setShowClientModal(true);
    }
  };

  const addNewParameter = () => {
    const newParameter = { parameterName: '', description: [''] };
    const updatedCharacteristics = [...emptyProduct.characteristics, newParameter];
    setEmptyProduct({ ...emptyProduct, characteristics: updatedCharacteristics });
  };

  const removeParameter = (index) => {
    const updatedCharacteristics = emptyProduct.characteristics.filter((_, i) => i !== index);
    setEmptyProduct({ ...emptyProduct, characteristics: updatedCharacteristics });
  };

  const addTextBlock = () => {
    setTextBlocks([...textBlocks, { title: '', description: '' }]);
  };

  const removeTextBlock = (index) => {
    const updatedTextBlocks = textBlocks.filter((_, i) => i !== index);
    setTextBlocks(updatedTextBlocks);
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="w-full flex flex-col relative">
        <div className="w-full overflow-x-scroll flex gap-8 lg:gap-12 scrollbar-hide touch-auto">
          <button
            onClick={() => handleFilter('description')}
            className={`z-10 w-auto text-lg transition-text font-medium ${active === 'description' ? 'text-[#E31E24] border-b-2 border-b-[#E31E24]' : 'text-neutral-400'
              }`}
          >
            <h3 className="my-2 whitespace-nowrap">Описание</h3>
          </button>
          <button
            onClick={() => handleFilter('characteristics')}
            className={`z-10 w-auto text-lg transition-text font-medium ${active === 'characteristics' ? 'text-[#E31E24] border-b-2 border-b-[#E31E24]' : 'text-neutral-400'
              }`}
          >
            <h3 className="my-2 whitespace-nowrap">Характеристики</h3>
          </button>
          <button
            onClick={() => handleFilter('client')}
            className={`z-10 w-auto text-lg transition-text font-medium ${active === 'client' ? 'text-[#E31E24] border-b-2 border-b-[#E31E24]' : 'text-neutral-400'
              }`}
          >
            <h3 className="my-2 whitespace-nowrap">Клиент</h3>
          </button>
        </div>
        <hr className="w-full border-t-2 absolute bottom-0 border-slate-300" />
      </div>
      <div>
        {active === 'description' ? (
          <div>
            <p className="text-lg leading-5">{filtered}</p>
            <button
              className="px-24 py-4 text-sm font-semibold text-white bg-[#E94B50] mt-4"
              onClick={handleEditClick}
            >
              Редактировать
            </button>
          </div>
        ) : active === 'characteristics' ? (
          <div className="flex flex-col items-start gap-6 w-full">
            {filtered.map((item, i) => (
              <div key={i} className="w-full flex gap-3">
                <p className="w-full text-neutral-400 max-w-[100px] md:max-w-[150px] mdx:max-w-[200px] lg:max-w-[400px]">
                  {item.parameterName}
                </p>
                <div className="flex w-full flex-col">
                  {item.description.map((desc, j) => (
                    <p key={j}>{desc}</p>
                  ))}
                </div>
              </div>
            ))}
            <button
              className="px-24 py-4 text-sm font-semibold text-white bg-[#E94B50] mt-4"
              onClick={handleEditClick}
            >
              Редактировать
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-start gap-6 w-full">
            {/* Add content for the client section here if needed */}
            <button
              className="px-24 py-4 text-sm font-semibold text-white bg-[#E94B50] mt-4"
              onClick={handleEditClick}
            >
              Редактировать
            </button>
          </div>
        )}
      </div>

      {showDescriptionModal && (
        <div className="fixed inset-0 z-[10000] flex justify-center items-center bg-modalBg">
          <div className="bg-white p-8 shadow-lg w-[90%] lg:w-[80%] h-[90%] overflow-y-scroll no-scrollbar">
            <div className="flex justify-between items-center mb-6 ">
              <h2 className="text-2xl font-semibold">Описание товара </h2>
              <button onClick={() => setShowDescriptionModal(false)}>
                <Image
                  src={close}
                  width={100}
                  height={100}
                  alt="Arrow Back Icon"
                  className="w-6 h-6 mr-[5px]"
                /></button>
            </div>
            {textBlocks.map((block, index) => (
              <div key={index} className="relative mb-6">
                <button
                  className="absolute top-0 right-0 mt-2"
                  onClick={() => removeTextBlock(index)}
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
                    value={block.title}
                    onChange={(e) => {
                      const newBlocks = [...textBlocks];
                      newBlocks[index].title = e.target.value;
                      setTextBlocks(newBlocks);
                    }}
                    className="border p-2 rounded w-full mb-4"
                  />
                </label>
                <label>
                  Описание
                  <textarea
                    className="border p-2 rounded w-full h-40 mb-4"
                    value={block.description}
                    onChange={(e) => {
                      const newBlocks = [...textBlocks];
                      newBlocks[index].description = e.target.value;
                      setTextBlocks(newBlocks);
                    }}
                  />
                </label>
              </div>
            ))}
            <div className="border border-[#E1E1E1]"></div>
            <div className="text-[#E31E24] mt-[30px]">
              <button className="flex flex-row items-center" onClick={addTextBlock}>
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
            <div className="flex justify-end mt-6">
              <button
                className="py-2 px-14 bg-[#E94B50] text-white"
                onClick={() => {
                  setShowDescriptionModal(false);
                  setEmptyProduct({ ...emptyProduct, description: textBlocks.map(block => block.description).join('\n') });
                  setFiltered(textBlocks.map(block => block.description).join('\n'));
                }}
              >
                Готово
              </button>
            </div>
          </div>
        </div>
      )}

      {showCharacteristicsModal && (
        <div className="fixed inset-0 z-[10000] flex justify-center items-center bg-modalBg">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] lg:w-[80%] h-[90%] overflow-y-scroll no-scrollbar">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Характеристики товара</h2>
              <button onClick={() => setShowCharacteristicsModal(false)}>
                <Image
                  src={close}
                  width={100}
                  height={100}
                  alt="Arrow Back Icon"
                  className="w-6 h-6 "
                /></button>
            </div>
            {emptyProduct.characteristics.map((characteristic, index) => (
              <div key={index} className="w-full flex flex-col items-start">
                <div className="w-full grid grid-cols-1 gap-4 mt-4 ">
                  <button
                    className="mt-4 flex flex-col items-end"
                    onClick={() => removeParameter(index)}
                  >
                    <Image
                      src={close}
                      width={100}
                      height={100}
                      alt="Arrow Back Icon"
                      className="w-4 h-4"
                    />
                  </button>
                  <label>
                    Название параметра
                    <input
                      type="text"
                      name="parameterName"
                      value={characteristic.parameterName}
                      onChange={(e) => {
                        const newCharacteristics = [...emptyProduct.characteristics];
                        newCharacteristics[index].parameterName = e.target.value;
                        setEmptyProduct({ ...emptyProduct, characteristics: newCharacteristics });
                      }}
                      className="border p-2 rounded w-full"
                    />
                  </label>
                  <label>
                    Описание
                    <textarea
                      name="description"
                      value={characteristic.description.join('\n')}
                      onChange={(e) => {
                        const newCharacteristics = [...emptyProduct.characteristics];
                        newCharacteristics[index].description = e.target.value.split('\n');
                        setEmptyProduct({ ...emptyProduct, characteristics: newCharacteristics });
                      }}
                      className="border p-2 rounded w-full h-20"
                    />
                  </label>
                </div>
              </div>
            ))}
            <button
              className="py-2  text-[18px] font-semibold text-[#E31E24] bg-transparent mt-4 flex items-center"
              onClick={addNewParameter}
            >
              <Image
                src={plus}
                width={100}
                height={100}
                alt="Arrow Back Icon"
                className="w-4 h-4 mr-[5px]"
              />
              Добавить параметр
            </button>
            <div className="flex justify-end mt-6">
              <button
                className="py-2 px-16 bg-[#E94B50] text-white"
                onClick={() => {
                  setShowCharacteristicsModal(false);
                  setFiltered(emptyProduct.characteristics);
                }}
              >
                Готово
              </button>
            </div>
          </div>
        </div>
      )}

      {showClientModal && (
        <div className="fixed inset-0 z-[10000] flex justify-center items-center bg-modalBg">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] lg:w-[80%] h-[90%] overflow-y-scroll no-scrollbar">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Клиент</h2>
              <button onClick={() => setShowClientModal(false)}>
                <Image
                  src={close}
                  width={100}
                  height={100}
                  alt="Arrow Back Icon"
                  className="w-6 h-6 "
                /></button>
            </div>
            {emptyProduct.clients.map((client, index) => (
              <div key={index} className="w-full flex flex-col items-start">
                <label className="w-full flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={client.checked}
                    onChange={(e) => {
                      const newClients = [...emptyProduct.clients];
                      newClients[index].checked = e.target.checked;
                      setEmptyProduct({ ...emptyProduct, clients: newClients });
                    }}
                  />
                  <span>{client.name}</span>
                </label>
              </div>
            ))}
            <div className="flex justify-end mt-6">
              <button
                className="py-2 px-16 bg-[#E94B50] text-white"
                onClick={() => setShowClientModal(false)}
              >
                Готово
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
