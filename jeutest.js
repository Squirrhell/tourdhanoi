function matrice(){
	var grille = new Array();
	var taille = parseInt(document.getElementById("taille").value);
	
	for(var x=0; x<3; x++) {
		grille[x] = new Array();
	}

	for(var x=0; x<3; x++) {
		for(var y=0; y<taille+3; y++) {
			grille[x][y] = 0;
		}
	} // tableau-ception

	for (var y=2; y<taille+2; y++) {
		grille[0][y] = parseInt(y)-1;
	} // defini les palets dans matrice

	for (var x=0; x<3; x++) {
		grille[x][taille+2] = 33;
	} // defini socle donc forcement superieur

	return grille;
}

//activation des déplacement
function activation(event){
	//1=>déplacement du curseur seul
	//2=>déplacement du curseur avec le disque
	var locker =  document.getElementById('lock').value;

	// savoir si on active seulement le selecteur ou si on a grab un disque pour le changer de colonne
	if (locker == 1){
		selecteur(event);
	}
	if (locker == 2){
		deplacement(event);
	}
}

function tableau(){
	//variables locales

	
	taille = document.getElementById("taille").value;
	var j = 0;
	//variables globales
	m = 0;
	//définition de la matrice qui définira les actions a faire.
	

	//génération du tableau
	//vérification du nombre de disques demandés pour que soit compris dans [3;8]

	if (taille > 8||taille<=2){
		alert("Nombre invalide de disque rentrer en choisir un entre 3 et 8 inclus !");
	} 
	else {
		var table = '<table>';
		//création des lignes
		while(j < parseInt(taille)+3){
			if (j>1){
				table = table + '<tr>';
				var i = 0
				//création de trois cases dans chaque lignes
				while (i<3){
					table = table + '<td id="cell'+i+j+'" class="ligne" >'+'</td>';
					i = i+1;
				}
			
				j = j+1;
				//fermeture de la ligne en cours
				table = table + '</tr>';
			}else{
				table = table + '<tr>';
				var i = 0
				//création de trois cases dans chaque lignes
				while (i<3){
					table = table + '<td id="cell'+i+j+'">'+'</td>';
					i = i+1;
				}
			
				j = j+1;
				//fermeture de la ligne en cours
				table = table + '</tr>';
			}
		}
		//fermeture du tableau
		table = table + '</table>';

		//génération du tableau selon les paramètres définis plus haut
		document.getElementById("jeu").innerHTML = table;
		//affichage du sélecteur
		curseur = "<img src='style/crochet1.png' alt='selecteur' id='selecteur'/>"
		document.getElementById("cell10").innerHTML = curseur;

		//remplissage de la première colonne avec le nombre de disque demandé
		var y = 2;
		//affichage un par un des disques dans leur case respective
		while(y<parseInt(taille)+2){
			document.getElementById("cell0"+y).innerHTML= "<img src='style/d0"+(y-1)+".png' alt='disque'/>";
			y++;

			//remplissage de la base en noir
			if(y==parseInt(taille)+2){
				var base = 0
				while(base<3){
					document.getElementById("cell"+base+(y)).innerHTML="<img src='style/black.png' alt='support' id='support'/>";
					base++;
				}
			}
		}

		//initialisation des valeurs de références
		grille = matrice()
		coups = 0;
		document.getElementById('verif').value = 1;
		document.getElementById("lock").value = 1;
		document.getElementById("score").style.display = "inline";
		document.getElementById("score").innerHTML = "<br/><br/>Nombre de coups effectués : "+coups+"<br/><br/>";
		
	}
}

function selecteur(event){
	//récupération du code ASCII de la touche du clavier
	var is_ie = (document.addEventListener ? false : true);
	var event_touche = (!is_ie ? event.keyCode : window.event.keyCode);
	//récupération de la valeur de référence de la position du sélecteur
	var x = parseInt(document.getElementById('verif').value);
	
	//actions selon la touches pressée et selon la valeur de référence de façon a ce que le curseur ne sorte pas du tableau
	//déplacement vers la droite
	if (event_touche == 39 & x+1 != 3){
		//efface l'image du sélecteur
		document.getElementById("cell"+x.toString()+"0").innerHTML = "";
		//mise a jour de la valeur de référence de la position du curseur
		x=x+1;
		document.getElementById("verif").value = x;
		//affichage du curseur dans la case d'arrivée
		document.getElementById("cell"+x.toString()+"0").innerHTML = curseur;
	}

	//déplacement vers la gauche
	if (event_touche == 37 & x-1 != -1){
		document.getElementById("cell"+x.toString()+"0").innerHTML = "";
		x=x-1;
		document.getElementById("verif").value = x;
		document.getElementById("cell"+x.toString()+"0").innerHTML = curseur;
	}

	//récupération du disque et lancement de la fonction déplacement()
	if(event_touche == 38 & m == 0){
			
	var y=0
	// fleche du haut pour prendre palet + check pour quil y ait rien dans la pince
	while (grille[x][y] == 0) {
		y++; //check la descente
		}
	if (grille[x][y] == 33) {
	 //tape le socle
		} else {
			m = grille[x][y];
			disque = document.getElementById("cell"+x.toString()+y.toString()).innerHTML;
			curseur = "<img src='style/crochet2.png' atl='sélecteur' id='selecteur'/>";
			grille[x][y] = 0;

			//vide la case du palet
			document.getElementById("cell"+x.toString()+y.toString()).innerHTML="";
			
			document.getElementById("cell"+x.toString()+"0").innerHTML = curseur;
			document.getElementById("cell"+x.toString()+"1").innerHTML = disque;
			document.getElementById("lock").value = 2;
			}
	}
	
}

function deplacement(event){
	//récupération du code ASCII de la touche du clavier
	var is_ie = (document.addEventListener ? false : true);
	var event_touche = (!is_ie ? event.keyCode : window.event.keyCode);
	//récupération de la valeur de référence de la position du sélecteur
	var x = parseInt(document.getElementById('verif').value);
	
	//actions selon la touches pressée et selon la valeur de référence de façon a ce que le curseur tenant le disque ne sorte pas du tableau
	//déplacement vers la droite
	if (event_touche == 39 & x+1 != 3){
		//efface l'image du sélecteur
		document.getElementById("cell"+x.toString()+"0").innerHTML = "";
		document.getElementById("cell"+x.toString()+"1").innerHTML = "";
		//mise a jour de la valeur de référence de la position du curseur
		x=x+1;
		document.getElementById("verif").value = x;
		//affichage du curseur dans la case d'arrivée
		document.getElementById("cell"+x.toString()+"0").innerHTML = curseur;
		document.getElementById("cell"+x.toString()+"1").innerHTML = disque;
	}

	//déplacement vers la gauche
	if (event_touche == 37 & x-1 != -1){
		document.getElementById("cell"+x.toString()+"0").innerHTML = "";
		document.getElementById("cell"+x.toString()+"1").innerHTML = "";
		x=x-1;
		document.getElementById("verif").value = x;
		document.getElementById("cell"+x.toString()+"0").innerHTML = curseur;
		document.getElementById("cell"+x.toString()+"1").innerHTML = disque;
	}

	//dépôt du disque dans la case choisie et passage en déplacement curseur seul
		
	if(event_touche == 40 & m != 0){
		var y=0;
		var w=1;
		// pour l'instant c'est la fleche du bas + controle pour verifier quon a bien pris le palet 
		while (grille[x][w] == 0) {
			y++;
			w++; // check la case en dessous
		} 
		if (grille[x][w] > m) {
			// ou la variable m est un stockage memoire de la 'quantité' du palet
			grille[x][y]=m;
			document.getElementById("cell"+x.toString()+y.toString()).innerHTML = disque;
			

			//la faut reset les variables dans la pince
			m=0;
			disque = "";
			curseur = "<img src='style/crochet1.png' alt='selecteur' id='selecteur'/>";
			document.getElementById("cell"+x.toString()+"0").innerHTML = curseur;
			document.getElementById("cell"+x.toString()+"1").innerHTML = disque;
			document.getElementById("lock").value = 1;
			coups = coups+1;
			document.getElementById("score").innerHTML = "<br/><br/>Nombre de coups effectués : "+coups+"<br/><br/>";
		}
	}
	if (grille [2][2] == 1) {
		// LA ON AFFICHE LA WIN
		var record = Math.pow(2,taille)-1;
		alert("Félicitations vous avez réussi le défi de "+taille+" disques en "+coups+" coups. Le record est en "+record+" coups.")
		document.getElementById("lock").value=0;
		
	}
}

function affiche(){
	//affiche une page qui grossis l'image des commandes
	document.getElementById("commande_grd").style.display = "inline";
	arret= document.getElementById("lock").value
	document.getElementById("lock").value=0;
	
}

function fermeture(){
	//fermeture de la page
	document.getElementById("commande_grd").style.display = "none";
	document.getElementById("lock").value=arret;
}