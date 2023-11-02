import React from "react";
import Image from '/public/logo.png';

export default function Header() {
    return (
        <>
            <div className="headerElement">

                <div className="header container">
                    <div className="image">
                        <img className="logo" src={Image} alt="image" />
                    </div>
                    <div className="mot">
                        <p className="textColor">Votre déménagement partout en France</p>
                        <p className="text">Plus de 100 000 personnes nous ont fait une demande !</p>
                    </div>
                    <div className="contact">
                        <p>Votre devis par téléphone</p>
                        <span className="phone">09 88 10 01 51</span>
                    </div>
                </div>

            </div>


        </>
    )
}