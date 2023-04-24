import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { TemplateList } from "../../constants/data";
import CustomButton from "../../components/custom-button";
import sectionStyle from "../../styles/Template/browseTemplates.module.css";

const BrowseTemplates = () => {
  const navigate = useNavigate();
  const templatesPreview = TemplateList.slice(0, 3);
  return (
    <div className={sectionStyle.section_container}>
      <h2>Templates</h2>
      <p className={sectionStyle.intro}>
        Build and drive a culture of performance and synergy through our
        <span> productivity, engagement, and recognition templates</span> and
        tools, all integrated with Slack, Teams and Google Workspace.
      </p>
      <div className={sectionStyle.templatelist_container}>
        {templatesPreview.map((template, i) => {
          return (
            <div key={i} className={sectionStyle.template_Card}>
              <div>
                <img src={template.icon} alt="icon" />
                <h4 className={sectionStyle.template_title}>
                  {template.title}
                </h4>
                <span
                  className={sectionStyle.template_tag}
                  onClick={() =>
                    navigate(
                      `/templates/category/${template.tag.toLowerCase()}`
                    )
                  }
                >
                  {template.tag}
                </span>
                <p>{template.description}</p>
              </div>

              <CustomButton
                look="primary"
                className={sectionStyle.template_CardBtn}
                onClick={() => navigate(`/templates/${template.slug}`)}
              >
                See details
              </CustomButton>
            </div>
          );
        })}
      </div>
      <div className={sectionStyle.browseBtnContainer}>
        <CustomButton
          look="primary"
          onClick={() => navigate("/templates")}
          className={sectionStyle.browseBtn}
        >
          <span> Browse all templates</span>
          <FiArrowRight fontSize={25} />
        </CustomButton>
      </div>
    </div>
  );
};

export default BrowseTemplates;
