import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Canaper from '/public/image/salon/canape-a-1.webp';
import Table8p from '/public/image/salon/table-p.webp';
import Canaper3p from '/public/image/salon/canape3-1.webp';
import Canaper2p from '/public/image/salon/canape-2.webp';
import Refrigerateur from '/public/image/cuisine/refri-am.webp'
import Table4p from '/public/image/cuisine/table-p.webp'
import Refrigerateurh from '/public/image/cuisine/refri-h.webp';
import Refrigerateurb from '/public/image/cuisine/refri-p.webp';
import { getEntity } from "../services/api";



export default function Material() {
  const [panier, setPanier] = useState([]);
  const [data, empdatachange] = useState([]);

  useEffect(() => {
    getEntity("/biens")
      .then((res) => {
        empdatachange(res.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  // Fonction pour ajouter un equipement au panier
  const ajouterAuPanier = (equipement) => {
    const nouveauPanier = [...panier];
    const index = nouveauPanier.findIndex(item => item.name === equipement.name);
    if (index !== -1) {
      nouveauPanier[index].quantite += 1;
    } else {
      nouveauPanier.push({ ...equipement, quantite: 1 });
    }
    setPanier(nouveauPanier);
  };


  // Fonction pour diminuer la quantite d'un equipement dans le panier
  const diminuerQuantite = (index) => {
    const nouveauPanier = [...panier];
    console.log(nouveauPanier);
    const equipement = nouveauPanier[index];

    console.log(equipement);
    if (equipement.quantite > 1) {
      equipement.quantite -= 1;
      setPanier(nouveauPanier);
    }
  };

  // Fonction pour enlever un equipement du panier
  const enleverDuPanier = (index) => {
    const nouveauPanier = [...panier];
    const equipement = nouveauPanier[index];
    console.log(equipement);
    if (equipement.quantite > 1) {
      equipement.quantite -= 1;
    } else {
      nouveauPanier.splice(index, 1);
    }
    setPanier(nouveauPanier);
  };

  // Fonction pour réinitialiser le panier
  const réinitialiserPanier = () => {
    setPanier([]);
  };

  // Fonction pour calculer le volume total dans le panier
  const calculerVolumeTotalPanier = () => {
    return panier.reduce((total, equipement) => total + (equipement.taille * equipement.quantite), 0);
  };

  // Fonction pour calculer le nombre de cartons nécessaires
  const calculerCartonsNécessaires = () => {
    const volumeTotal = calculerVolumeTotalPanier();
    return Math.ceil(volumeTotal / 1.5); // Volume moyen par carton (en m³)
  };

  // Fonction pour calculer la quantite de ruban adhésif nécessaire
  const calculerRubanAdhésifNécessaire = () => {
    const cartonsNécessaires = calculerCartonsNécessaires();
    return cartonsNécessaires * 50; // Longueur de ruban adhésif par carton (en mètres)
  };

  return (
    <>
      <div className="container contente">
        <h1 className="title">Calculer le volume de votre déménagement</h1>

        <div className="flex-item">
          <div>
            <Tabs
              defaultActiveKey="0"
              id="fill-tab-example"
              className="mb-3"
              fill
            >
              {data.map((item, index) => (
                
                  <Tab key={index} eventKey={index} title={item.name}>
                    <Row xs={10} md={7} className="g-3">
                      {item.biens.map((equipement, index) => (
                        <Col key={index}>
                          <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={equipement.image} style={{ maxWidth: '100%', textAlign: 'center' }} />
                            <Card.Body>
                              <Card.Title>{equipement.name}</Card.Title>
                              <Card.Text>

                                {panier.some(item => item.name === equipement.name) ? (
                                  <div className="number_qty">
                                    <span className="span" onClick={() => diminuerQuantite(equipement.id)}>-</span>
                                    <span>  {panier.find(item => item.name === equipement.name).quantite}</span>
                                    <span onClick={() => ajouterAuPanier(equipement)} className="span">+</span>
                                  </div>

                                ) : (
                                  <div className="number_qty">
                                    <span className="span">-</span>
                                    <span>0</span>
                                    <span onClick={() => ajouterAuPanier(equipement)} className="span">+</span>
                                  </div>
                                )}




                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </Tab>
               
              ))}

             
            </Tabs>
          </div>
          <div className="section-2">


            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <div className="dimension">
                  <Card.Title ><span className="titre">{calculerVolumeTotalPanier()} m²</span> </Card.Title>
                  {/*  <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
                </div>
                <hr />

                <Card.Text>
                  <span>Vous aurez besoin de :</span>
                  <p><b>{calculerCartonsNécessaires()}</b> Carton </p>
                  <p><b>{calculerRubanAdhésifNécessaire()}</b> mètres de scotch </p>
                  <span className="clear" onClick={réinitialiserPanier}>Remettre à zéro</span>
                </Card.Text>

              </Card.Body>
            </Card>
          </div>
        </div>



      </div>



      {/* <Tabs
        defaultActiveKey="chambre"
        id="fill-tab-example"
        className="mb-3"
        fill
      >
        <Tab eventKey="chambre" title="Chambre">
          <div>
            <h3>equipements de la Chambre</h3>
            <ul>
              {equipementsChambre.map((equipement, index) => (
                <li key={index}>
                  {equipement.nom} ({equipement.taille_mettre_carre} m²)
                  <button onClick={() => ajouterAuPanier(equipement)}>Ajouter au panier</button>
                  {panier.some(item => item.nom === equipement.nom) && (
                    <span> Ajouté {panier.find(item => item.nom === equipement.nom).quantite} fois
                      <button onClick={() => diminuerQuantite(index)}>Diminuer</button>
                    </span>

                  )}
                </li>
              ))}
            </ul>
          </div>
        </Tab>
        <Tab eventKey="cuisine" title="Cuisine">
          <div>
            <h3>equipements de la Cuisine</h3>
            Votre déménagement partout en France
            Plus de 100 000 personnes nous ont fait une demande !
            <ul>
              {equipementsCuisine.map((equipement, index) => (
                <li key={index}>
                  {equipement.nom} ({equipement.taille_mettre_carre} m²)
                  <button onClick={() => ajouterAuPanier(equipement)}>Ajouter au panier</button>
                  {panier.some(item => item.nom === equipement.nom) && (
                    <span> Ajouté {panier.find(item => item.nom === equipement.nom).quantite} fois
                      <button onClick={() => diminuerQuantite(index)}>Diminuer</button>
                    </span>

                  )}
                </li>
              ))}
            </ul>
          </div>
        </Tab>
      </Tabs>

      <div>
        <h2>Calculateur de Volume de Déménagement</h2>
        <p>Volume total dans le panier : {calculerVolumeTotalPanier()} m²</p>
        <p>Cartons nécessaires : {calculerCartonsNécessaires()}</p>
        <p>Ruban adhésif nécessaire : {calculerRubanAdhésifNécessaire()} mètres</p>

        <button onClick={réinitialiserPanier}>Réinitialiser le panier</button>

        <h3>Panier</h3>
        <ul>
                    {panier.map((equipement, index) => (
                        <li key={index}>
                            {equipement.nom} ({equipement.taille_mettre_carre} m²) x{equipement.quantite}
                            <button onClick={() => enleverDuPanier(index)}>Enlever du panier</button>
                        </li>
                    )}
                </ul> 
      </div> */}
    </>
  )

}



