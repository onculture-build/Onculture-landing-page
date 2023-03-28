import React from "react";
import { apiArticles, apiBooks } from "../../../constants/data";
import ResCard from "../components/ResCard";
import Styles from "../../../styles/Resource/Resource.module.css";
import { capitalizeFirstLetter } from "../../../utils/helper";

export const RESOURCE_VIEW = Object.freeze({
  ARTICLES: { label: "Articles", value: "Articles" },
  BOOKS: { label: "Books", value: "Books" },
});

const Resource = () => {
  const [currentTab, setCurrentTab] = React.useState(
    RESOURCE_VIEW.ARTICLES.value
  );
  return (
    <div className={Styles.rsContainer}>
      <h1>Articles & Books for HR professionals and people leaders</h1>

      <div className={Styles.linkResource}>
        {Object.values(RESOURCE_VIEW).map((nav, i) => {
          return (
            <div
              key={i}
              className={`${currentTab === nav.value && Styles.hoverLink}  ${
                Styles.linkRes
              }`}
              onClick={() => setCurrentTab(nav.value)}
            >
              {capitalizeFirstLetter(nav.label)}
            </div>
          );
        })}
      </div>

      {currentTab === RESOURCE_VIEW.ARTICLES.value ? (
        <div className={Styles.articles}>
          {apiArticles.map((article) => {
            return (
              <ResCard
                key={article.id}
                classBg={article.headBg}
                topLabel={article.textLabel}
                mainLabel={article.mainContent}
                contentId={article.id}
                routeTo="article"
              />
            );
          })}
        </div>
      ) : (
        <div className={Styles.articles}>
          {apiBooks.map((book) => {
            return (
              <ResCard
                key={book.id}
                classBg={book.headBg}
                topLabel={book.textLabel}
                mainLabel={book.mainContent}
                routeTo="book"
                contentId={book.id}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Resource;
