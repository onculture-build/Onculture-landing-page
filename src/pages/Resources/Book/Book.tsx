import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiBooks } from "../../../constants/data";
import bookResStyle from "../../../styles/Resource/Resource.module.css";

type Content = {
  id: string;
  textLabel: string;
  headBg: any;
  mainContent: string;
  coverBg: any;
};

const Book = () => {
  const [content, setContent] = useState<any>(apiBooks);

  const params = useParams();

  useEffect(() => {
    const findContent = apiBooks.find((book) => book.id === params.id);
    setContent(findContent);
  }, [content]);

  return (
    <>
      <div className={bookResStyle.book}>
        <h1>{content.mainContent}</h1>
        <img src={content.coverBg} alt="onculture-books" />
        <p>{content.textContent}</p>
        <button>Download</button>
      </div>
    </>
  );
};

export default Book;
