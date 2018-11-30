import React from "react";
import PETBCC from "../../../images/logos/petbcc.png";
const LinkRapido = ({ imagem = PETBCC, link, alt, key }) => (
  <a
    className="links-rapidos p-2 hoverable rounded border mr-2 mb-2"
    href={link}
    rel="noopener noreferrer"
    target="_blank"
    key={key}
  >
    <img src={imagem} alt={alt} className="img-fluid" />
  </a>
);

export default LinkRapido;