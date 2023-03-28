import React, { useEffect, useState } from "react";
import { apiArticles } from "../../../constants/data";
import { Link, useParams } from "react-router-dom";
import Styles from "../../../styles/Resource/Resource.module.css";
import ResCard from "../components/ResCard";

const Article = () => {
  const [content, setContent] = useState<any>(apiArticles);
  const [allcontent, setAllContent] = useState<any>(apiArticles);

  const params = useParams();

  useEffect(() => {
    const findContent = apiArticles.find((article) => article.id === params.id);
    setContent(findContent);
  }, [content]);

  return (
    <>
      <div className={Styles.article}>
        <div className={Styles.articleTop}>
          <h1>{content.mainContent}</h1>
          <img src={content.coverBg} alt="onculture-article" />
          <p>{content.textContent}</p>
        </div>
        <div className={Styles.articleLink}>
          <Link to="/resource">View all articles</Link>
        </div>
        <div className={Styles.vArticles}>
          {allcontent.slice(3).map((article: any) => {
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
      </div>
    </>
  );
};

export default Article;
