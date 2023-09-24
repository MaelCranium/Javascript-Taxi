class Personnage {
    // Le constructeur initialise les attributs du personnage lors de sa création
    constructor(nom, pointsDeVie, probabiliteAttaque, probabiliteContreAttaque, degats) {
      this.nom = nom; // Le nom du personnage
      this.pointsDeVie = pointsDeVie; // Les points de vie du personnage
      this.probabiliteAttaque = probabiliteAttaque; // Probabilité d'attaquer avec succès
      this.probabiliteContreAttaque = probabiliteContreAttaque; // Probabilité de contre-attaque
      this.degats = degats; // Les dégâts infligés par le personnage
    }

    // Méthode pour attaquer un autre personnage
    attaquer(cible) {
        // Vérifie si l'attaque réussit en comparant à la probabilité d'attaque
        if (Math.random() < this.probabiliteAttaque) {
          // Affiche un message d'attaque réussie
          console.log(`${this.nom} parvient à toucher ${cible.nom} et lui fait ${this.degats} dégâts.`);
          // Appelle la méthode encaisserDegats de la cible pour lui infliger des dégâts
          cible.encaisserDegats(this.degats);
        } else {
          // Affiche un message d'échec d'attaque
          console.log(`${this.nom} ne parvient pas à toucher ${cible.nom}.`);
        }
    }
    
    // Méthode pour encaisser des dégâts infligés par un attaquant
    encaisserDegats(degats) {
        // Vérifie si le personnage réussit à contre-attaquer en comparant à la probabilité de contre-attaque
        if (Math.random() < this.probabiliteContreAttaque) {
          // Affiche un message de contre-attaque réussie
          console.log(`${this.nom} contre-attaque et encaisse ${degats + 5} dégâts.`);
          // Réduit les points de vie du personnage en fonction des dégâts reçus
          this.pointsDeVie -= degats + 5; //bonus de 5 de dégats lors que quelqu'un réussi une contre-attaque
        } else {
          // Affiche un message d'encaissement de dégâts
            console.log(`${this.nom} encaisse ${degats} dégâts.`);
            this.pointsDeVie -= degats;
        }
    
        // Vérifie si le personnage est vaincu (points de vie <= 0)
        if (this.pointsDeVie <= 0) {
          // Affiche un message indiquant que le personnage est vaincu
          console.log(`${this.nom} est mort.`);
        }
    }
}


let ListePrenoms = ["Jack", "Julia", "Kevin", "Hope", "Steven", "Dawn", "Bob", "Olivia"]; //liste des prénoms possible
let LesMourrus = []; //liste des survivants décédés

function getRandomName() { 
    const PrenomNum = Math.floor(Math.random() * ListePrenoms.length);
    const prenom = ListePrenoms[PrenomNum];
    ListePrenoms.splice(PrenomNum, 1);
    return prenom;
} // Fonction qui tirera un prénom aléatoirement dans la liste et l'attribura à un survivant
let prenomsurvivant1 = getRandomName();
let survivant1 = new Personnage(prenomsurvivant1, 50, 0.7, 0.3, 10);
let prenomsurvivant2 = getRandomName();
let survivant2 = new Personnage(prenomsurvivant2, 50, 0.3, 0.1, 10);
let prenomsurvivant3 = getRandomName();
let survivant3 = new Personnage(prenomsurvivant3, 50, 0.7, 0.3, 10);
let prenomsurvivant4 = getRandomName();
let survivant4 = new Personnage(prenomsurvivant4, 50, 0.7, 0.3, 10);
let prenomsurvivant5 = getRandomName();
let survivant5 = new Personnage(prenomsurvivant5, 50, 0.7, 0.3, 10);
let slasher = new Personnage("Jason", 100, 0.7, 0.5, 30);

// Boucle de combat avec une limite de 12 tours
let tour = 1;

while (slasher.pointsDeVie > 0 && (survivant1.pointsDeVie > 0 || survivant2.pointsDeVie > 0 || survivant3.pointsDeVie > 0 || survivant4.pointsDeVie > 0 || survivant5.pointsDeVie > 0)) { //tant que tout les survivants sont en vie ou que Jason est encore en vie
    console.log(`Tour ${tour}:`); //donne le tour actuel
    
    // On répertorie tout les survivants encore en vie
    let survivantsEnVie = [survivant1, survivant2, survivant3, survivant4, survivant5].filter(survivant => survivant.pointsDeVie > 0);
    if (survivantsEnVie.length === 0) {
        break; // Fin de boucle si tout les survivants sont morts
    }
    
    let survivantCible = survivantsEnVie[Math.floor(Math.random() * survivantsEnVie.length)]; //choisi aléatoirement un survivant encore en vie pour se battre contre Jason

    // Le survivant attaque le tueur
    survivantCible.attaquer(slasher);
    
    // Vérifie si le tueur est tué
    if (slasher.pointsDeVie <= 0) {
        console.log(`${survivantCible.nom} a tué ` + slasher.nom);
        break; // Le tueur a été vaincu, sortez de la boucle
    }
    
    // Le tueur attaque le survivant 
    slasher.attaquer(survivantCible);
    
    // Vérifie si le survivant est encore en vie
    if (survivantCible.pointsDeVie <= 0) {
        console.log(`${slasher.nom} a tué ` + survivantCible.nom);
        survivantCible.pointsDeVie = 0;
        LesMourrus.push(survivantCible.nom);
    }
    
    // Affiche les points de vie restants des personnages à la fin de chaque tour
    console.log(`${survivant1.nom} : ${survivant1.pointsDeVie} points de vie`);
    console.log(`${survivant2.nom} : ${survivant2.pointsDeVie} points de vie`);
    console.log(`${survivant3.nom} : ${survivant3.pointsDeVie} points de vie`);
    console.log(`${survivant4.nom} : ${survivant4.pointsDeVie} points de vie`);
    console.log(`${survivant5.nom} : ${survivant5.pointsDeVie} points de vie`);
    console.log(`${slasher.nom} : ${slasher.pointsDeVie} points de vie`);
    // Passe au tour suivant
    tour++;
}

// Affiche un message indiquant le résultat du combat
if (survivant1.pointsDeVie + survivant2.pointsDeVie + survivant3.pointsDeVie + survivant4.pointsDeVie + survivant5.pointsDeVie <= 0) {
    console.log("Jason a tué tous les survivants et retourne dans la forêt");
} else if (slasher.pointsDeVie <= 0) {
    console.log("Les survivants ont éliminé Jason et se sont enfuis du campement, mais RIP à : " + LesMourrus.join(", ") + ".");
}