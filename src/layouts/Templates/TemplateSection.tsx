import React from "react";
import { useNavigate } from "react-router-dom";
import { TemplateList } from "../../constants/data";
import CustomButton from "../../components/custom-button";
import sectionStyle from "../../styles/Template/templateSection.module.css";

const TemplateSection = () => {
  const navigate = useNavigate();
  return (
    <div className={sectionStyle.section_container}>
      <h2>Templates</h2>
      <p className={sectionStyle.intro}>
        Build a Culture of performance and synergy through our productivity,
        engagement, and recognition templates and tools, all integrated with
        Slack, Teams and Google Workspace.{" "}
      </p>
      <div className={sectionStyle.templatelist_container}>
        {TemplateList.map((template, i) => {
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
      <div className={sectionStyle.bgBlurObject}></div>
    </div>
  );
};

export default TemplateSection;
