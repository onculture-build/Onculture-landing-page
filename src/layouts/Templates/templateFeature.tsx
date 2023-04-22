import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TemplateList } from "../../constants/data";
import { RiArrowRightSLine } from "react-icons/ri";
import Nav from "../../components/Nav";
import rocket from "../../Assets/Images/Rocket.svg";
import Bullet from "../../Assets/Images/bullet.svg";
// import Slackteam from "../../../src/Assets/Images/slack-team.svg";
import CustomButton from "../../components/custom-button";
import templateStyle from "../../styles/Template/templateFeature.module.css";

// const textContent = [
//   "Team members are required to share what they worked on daily, and blockers they had and what they plan to work on the following day.",
//   "Lorem ipsum dolor sit amet consectetur. Non suspendisse sit a eget eu. Molestie molestie pellentesque dui bibendum in nibh tristique sit posuere. Elementum massa ut aenean suspendisse ut pharetra quis.",

//   " Tortor amet consectetur ullamcorper sem aliquam amet. Auctor sapien lorem tincidunt risus enim blandit volutpat scelerisque in. Auctor eu egestas ullamcorper consequat venenatis massa id pulvinar.",

//   " Orci massa maecenas urna tortor. Scelerisque vestibulum dictumst praesent malesuada tristique aliquam. Non vestibulum ac mauris malesuada egestas lectus. Porttitor sed vitae laoreet sit id habitant a. Imperdiet varius sed arcu ipsum enim lacus. Nam ac arcu quis diam nulla sem pellentesque. Vulputate at tincidunt nullam ipsum leo aenean consequat commodo.",

//   " Eget ultrices integer eget quam. Faucibus sit lorem ipsum odio. Nullam ut ipsum blandit turpis orci blandit eu quam.",
// ];

interface TemplateFeature {
  icon: any;
  title: string;
  slug: string;
  tag: string;
  description: string;
}

const TemplateFeature = () => {
  const params = useParams();
  //   const [content, setContent] = React.useState({});

  console.log(params);

  //   React.useState(() => {
  //     const data = TemplateList.filter((template) => template.slug === params.id);

  //     console.log(data);
  //     setContent(data[0]);
  //   });

  function renderView() {
    switch (params.id) {
      case "team-sum-up":
        return <TemplateFeaturePreview data={TemplateList[0]} />;

      case "spark":
        return <TemplateFeaturePreview data={TemplateList[1]} />;

      case "shout-outs":
        return <TemplateFeaturePreview data={TemplateList[2]} />;
      case "peer":
        return <TemplateFeaturePreview data={TemplateList[3]} />;

      case "feedback":
        return <TemplateFeaturePreview data={TemplateList[4]} />;

      case "value-star":
        return <TemplateFeaturePreview data={TemplateList[5]} />;

      default:
        return null;
    }
  }

  return (
    <>
      <Nav />
      <div className={templateStyle.main}>
        <div className={templateStyle.feature_container}>{renderView()}</div>
      </div>
    </>
  );
};

export default TemplateFeature;

function TemplateFeaturePreview({ data }: any) {
  const navigate = useNavigate();

  return (
    <>
      <div className={templateStyle.feature_content}>
        <div className={templateStyle.feature_nav}>
          <span
            // onClick={() => navigate(-1)}
            onClick={() => navigate("/templates")}
          >
            Templates
          </span>
          <RiArrowRightSLine fontSize={20} />
          {/* <span>{content?.title}</span> */}
          <span>Team sum up</span>
        </div>

        <div className={templateStyle.feature_title}>
          <div>
            <img src={rocket} alt="rocket" />
            <div>
              <h3>{data.title}</h3>
              <span>{data.tag}</span>
            </div>
          </div>

          <CustomButton look="primary" className={templateStyle.featureBtn}>
            Get Started
          </CustomButton>
        </div>

        <div className={templateStyle.contentIntro}>
          {data.body.intro.map((txt: any, i: number) => (
            <p key={i}>{txt}</p>
          ))}
        </div>

        <div className={templateStyle.contentBody}>
          {data.body.through && <h5>Through:</h5>}
          <ul>
            {data.body.firstList.map((text: string, i: number) => {
              return (
                <li className={templateStyle.listItem} key={i}>
                  <div>
                    <img src={Bullet} alt="bullet" />
                  </div>

                  <p>{text}</p>
                </li>
              );
            })}
          </ul>

          <ul>
            <h5>Data Analytics:</h5>
            {data.body.secondList.map((text: string, i: number) => {
              return (
                <li className={templateStyle.listItem} key={i}>
                  <div>
                    <img src={Bullet} alt="bullet" />
                  </div>

                  <p>{text}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className={templateStyle.illustration}>
        <img src={data.body.image} alt="slack" />
      </div>
    </>
  );
}
