import React, { useState } from "react";
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
import Refrigerateurh from '/public/image/cuisine/refri-h.webp'
import Refrigerateurb from '/public/image/cuisine/refri-p.webp'

const equipementsChambre = [
  {
    nom: "Lit",
    taille_mettre_carre: 6,
    carton: 5,
    scotch: 2,
  },
  // Ajoutez d'autres equipements de la chambre ici
];

const equipementsCuisine = [
  {
    nom: "Réfrigérateur",
    taille_mettre_carre: 4,
    carton: 6,
    scotch: 2,
  },
  // Ajoutez d'autres equipements de la cuisine ici
];

const salon = [
  {
    nom: "Canapé d'angle",
    taille_mettre_carre: 4,
    carton: 6,
    scotch: 2,
    image: Canaper,
  },
  {
    nom: "Table (8 pers.)",
    taille_mettre_carre: 4,
    carton: 6,
    scotch: 2,
    image: Table8p,
  },
  {
    nom: "Canapé 3 places",
    taille_mettre_carre: 4,
    carton: 6,
    scotch: 2,
    image: Canaper3p,
  },
  {
    nom: "Canapé 2 places",
    taille_mettre_carre: 4,
    carton: 6,
    scotch: 2,
    image: Canaper2p,
  },
]


const cuisine = [
  {
    nom: "Réfrigérateur américain",
    taille_mettre_carre: 4,
    carton: 6,
    scotch: 2,
    image: Refrigerateur,
  },
  {
    nom: "Table (4 pers.)",
    taille_mettre_carre: 4,
    carton: 6,
    scotch: 2,
    image: Table4p,
  },
  {
    nom: "Réfrigérateur haut",
    taille_mettre_carre: 4,
    carton: 6,
    scotch: 2,
    image: Refrigerateurh,
  },
  {
    nom: "Réfrigérateur bas",
    taille_mettre_carre: 4,
    carton: 6,
    scotch: 2,
    image: Refrigerateurb,
  },
]

export default function Material() {
  const [panier, setPanier] = useState([]);

  // Fonction pour ajouter un equipement au panier
  const ajouterAuPanier = (equipement) => {
    const nouveauPanier = [...panier];
    const index = nouveauPanier.findIndex(item => item.nom === equipement.nom);
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
    return panier.reduce((total, equipement) => total + (equipement.taille_mettre_carre * equipement.quantite), 0);
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
              defaultActiveKey="home"
              id="fill-tab-example"
              className="mb-3"
              fill
            >
              <Tab className="taG" eventKey="home" title="Salon & salle à manger">
                <Row xs={10} md={7} className="g-3">
                  {salon.map((equipement, index) => (
                    <Col key={index}>
                      <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={equipement.image} style={{ maxWidth: '100%', textAlign: 'center' }} />
                        <Card.Body>
                          <Card.Title>{equipement.nom}</Card.Title>
                          <Card.Text>

                            {panier.some(item => item.nom === equipement.nom) ? (
                              <div className="number_qty">
                                <span className="span" onClick={() => diminuerQuantite(index)}>-</span>
                                <span>  {panier.find(item => item.nom === equipement.nom).quantite}</span>
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
              <Tab eventKey="profile" title="Cuisin & électromenagère">
              <Row xs={10} md={7} className="g-3">
                  {cuisine.map((equipement, index) => (
                    <Col key={index}>
                      <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={equipement.image} style={{ maxWidth: '100%', textAlign: 'center' }} />
                        <Card.Body>
                          <Card.Title>{equipement.nom}</Card.Title>
                          <Card.Text>

                            {panier.some(item => item.nom === equipement.nom) ? (
                              <div className="number_qty">
                                <span className="span" onClick={() => diminuerQuantite(index)}>-</span>
                                <span>  {panier.find(item => item.nom === equipement.nom).quantite}</span>
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
              <Tab eventKey="longer-tab" title="Chambre & bureau">
                Tab content for Loooonger Tab
              </Tab>
              <Tab eventKey="divers" title="Divers garage" >
                Tab content for Contact
              </Tab>
              <Tab eventKey="ajouter" title="Ajouter" >
                Tab content for Contact
              </Tab>
            </Tabs>
          </div>
          <div className="section-2">
            

            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <div className="dimension">
                  <Card.Title ><span className="titre">{calculerVolumeTotalPanier()} m²</span> </Card.Title>
                 {/*  <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
                </div>
                  <hr/>

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