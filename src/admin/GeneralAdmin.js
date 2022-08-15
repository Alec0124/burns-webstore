import { useEffect, useState } from "react";
import storeLogo from "../images/storeLogo.png";
import {saveStoreLogoImage} from "../api/"
// import * as fs from 'node:fs';


const GeneralAdmin = ({ user, setSelectedCat, verifyToken }) => {
  const reader = new FileReader();
  reader.onload = (async (e) => {
    console.log(e.target.result);

  });
  //states
  const [logoImage, setLogoImage] = useState(storeLogo);
  const [logoImageFile, setLogoImageFile] = useState(null);

  //funtions

  const onClickSaveChanges = async (e) => {
    e.preventDefault();
    await saveStoreLogoImage(user.token, logoImageFile);
  }

  const onChangeLogo = (e) => {
    const file = e.target.files[0];
    const namedFile = new File([file], "storeLogo.jpg")
    setLogoImageFile(namedFile);
    const newImg = URL.createObjectURL(file)
    setLogoImage(newImg);

    // reader.( (e)=>{
    //   console.log("readerResult: ", e.target.result);
    // })
  };
  const mapDescriptionRows = (row) => {

    return (<div key={row.id} className="row" accept="image/*" >
      {row.description}
    </div>)
  };
  const mapInputRows = (row) => {

    return (<div key={row.id} className="row">
      <span style={{color:"purple"}}>{row.inputDescription} </span>
      {row.input}
    </div>)
  };

  const mapPreviewtRows = (row) => {

    return (<div key={row.id} className="row">
      {row.preview}
    </div>)
  };
  const printSaveChangesButton = () => {
    if (logoImage !== storeLogo) {
      return (<button onClick={onClickSaveChanges}>Save Changes</button>)
    } else {
      return
    }
  }

  // CONSTANTS
  const ROWS_OBJECTS = [
    {
      id: 0,
      description: "Webstore Logo",
      inputDescription: "Only supports .png images.",
      input: (<input type="file" accept=".png" name="storeLogo" id="webstore-logo" onChange={onChangeLogo} />),
      preview: (<div style={{display:"flex", flexFlow:"column nowrap", width:"300px"}}>
        <img className="store-logo" src={logoImage} alt="logo" />
        {printSaveChangesButton()}
      </div>)

    }
  ];

  useEffect(() => {
    setSelectedCat('general');
  });




  return (
    <form method="post" encType="multipart/form-data" className="admin-body">
      <div className="admin-descriptions">
        {ROWS_OBJECTS.map(mapDescriptionRows)}
      </div>
      <div className="admin-fields">
        {ROWS_OBJECTS.map(mapInputRows)}
      </div>
      <div className="admin-values">
        {ROWS_OBJECTS.map(mapPreviewtRows)}
      </div>
    </form>
  )
};

export default GeneralAdmin;