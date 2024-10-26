import { useState, useContext } from "react";
import { uploadImage } from "../../services/images";
import { UserContext } from "../../UserContext";
import "./Upload.css";
import "./Upload.css";
import { useNavigate } from "react-router-dom";

function ImageUpload() {
const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [imageDescr, setImageDescr] = useState("");
  const [imageCategory, setImageCategory] = useState("");

  const { user } = useContext(UserContext);

  const handleError = (e: string) => {
    const errorBar = document.getElementById("error");
    errorBar!.innerText = e;
    errorBar!.style.display = "block";

    setTimeout(() => {
      errorBar!.style.display = "none";
    }, 2000);
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    uploadImage(image, user.user, imageName, imageDescr, imageCategory)
      .then(() => navigate("/"))
      .catch((e) => handleError(e));
  };

  return (
    <fieldset id="uploadContainer" className="container-sm">
      <form className="upload-form">
        <div className="form-group">
          <div role="alert" className="fade alert alert-danger show" id="error">
            Error
          </div>
          <div className="form-file">
            <label htmlFor="custom-file" className="form-file-label">
              Choose image to upload
            </label>
            <input
              id="custom-file"
              type="file"
              className="form-control-file"
              onChange={handleChange}
            ></input>
          </div>
        </div>
        <input
          name="imageName"
          placeholder="Image Name"
          label="Image Name"
          type="text"
          id="imageName"
          className="form-control"
          onChange={(e) => setImageName(e.target.value)}
        ></input>
        <input
          name="imageDescr"
          placeholder="Image Description"
          label="Image Description"
          type="text"
          id="imageDescr"
          className="form-control"
          onChange={(e) => setImageDescr(e.target.value)}
        ></input>
        <select
          name="imageCategory"
          className="form-control"
          onChange={(e) => setImageCategory(e.target.value)}
        >
          <option value="Nature">Nature</option>
          <option value="People">People</option>
          <option value="Other">Other</option>
        </select>

        <button className="btn btn-primary" onClick={handleUpload}>
          Upload
        </button>
      </form>
    </fieldset>
  );
}

export default ImageUpload;
