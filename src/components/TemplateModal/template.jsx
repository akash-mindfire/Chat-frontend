import React from "react";
import "./template.css";

class TemplateModal extends React.Component {
  state = {
    template_List: [],
    selectedTemplate: {},
  };

  async componentDidMount() {
    let { baseURL, api_key, website, app_key } = this.props;
    await fetch(`${baseURL}getWhatsappTemplates${app_key}&store_id=1`)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            template_List: result.whatsappTemplates,
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }
  handleClick = (e) => {
    e.preventDefault();
    this.props.handleselectedTemplate(e, this.state.selectedTemplate);
  };
  handleChange = (e, n) => {
    this.setState({ selectedTemplate: n });
  };
  render() {
    let { template_List } = this.state;
    return (
      <>
        <div>
          <div className="ModalOverlay"></div>
          <div className="Modal">
            {" "}
            <div className="header">
              <div style={{ fontSize: "22px", fontWeight: "600" }}>
                Template
              </div>

              <div
                style={{
                  fontWeight: "700",
                  cursor: "pointer",
                  fontSize: "22px",
                }}
                onClick={(e) => this.props.close(e)}
              >
                x
              </div>
            </div>
            <div
              className="template_container"
              style={{ height: "250px", overflowY: "auto" }}
            >
              {template_List.map((n) => {
                return (
                  <div
                    key={n.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "2%",
                    }}
                  >
                    <input
                      type="radio"
                      name="template"
                      onChange={(e) => this.handleChange(e, n)}
                      value={n.template_name}
                      checked={
                        n.template_name ===
                        this.state.selectedTemplate.template_name
                      }
                      style={{ width: "18px", height: "18px" }}
                    />
                    <label
                      for="template"
                      style={{ fontSize: "20px", marginLeft: "1%" }}
                    >
                      {n.template_name}
                    </label>
                  </div>
                );
              })}
            </div>
            <div className="template_footer">
              <button
                className="btn-template-modal"
                onClick={(e) => this.handleClick(e)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default TemplateModal;
