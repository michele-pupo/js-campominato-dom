// Consegna
// - Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco 
//   (attenzione: non bisogna copiare tutta la cartella dell'esercizio ma solo l'index.html, 
//   e le cartelle js/ css/ con i relativi script e fogli di stile, 
//   per evitare problemi con l'inizializzazione di git).
// - Il computer deve generare 16 numeri casuali e inserirli in un array, 
//   in base al range della difficoltà prescelta 
//   (se abbiamo scelto facile l'array conterrà numeri casuali da 1 a 100, 
//   se invece abbiamo scelto difficile l'array dovrà contenerne da 1 a 49): 
//   questi rappreseranno le posizioni delle nostre bombe :bomba:.
// - Attenzione: nella stessa cella può essere posizionata al massimo una bomba, 
//   perciò nell’array delle bombe non potranno esserci due numeri uguali.
// - In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - 
//   abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. 
//   Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// - La partita termina quando il giocatore clicca su una bomba o quando raggiunge 
//   il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
// - Al termine della partita il software deve comunicare il punteggio, 
//   cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.

// BONUS 1
// - Quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle.

// BONUS 2
// - Quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste.


// creo la costante per il button
const buttonElement = document.querySelector("#generate-grid");

// al click del pulsante la griglia viene generata in base alla difficoltà scelta
buttonElement.addEventListener('click', function(){

        // Aggiungiamo un flag per indicare se il gioco è terminato
        let gameEnded = false;

        // dichiaro un array vuoto per tenere traccia dei numeri delle caselle già premuti
        let clickedNumbers = [];

        // cambio la visualizzazione della grid e del punteggio al click   
        document.querySelector("#grid").style.display = "flex";
        document.querySelector("#moves").style.display = "flex";
        document.querySelector("#score").style.display = "flex";

        //creo una variabile che prenda il grado di difficoltà scelto dall'utente 
        const choiceDifficulty = document.querySelector("#difficulty-select");

        // creiamo la griglia con un ciclo for
        const gridElement = document.querySelector("#grid");
        // console.log(gridElement);

        // inizialmente la griglia non avrà dimensione
        gridElement.innerHTML = "";

         // Aggiungo una classe per l'impaginazione in base alla dimensione scelta
        // cambio il numero di celle da creare in base alla difficoltà
        if(choiceDifficulty.value == "easy") {
            gridSize = 100;
        } else if (choiceDifficulty.value == "medium") {
            gridSize = 81;
        } else {
            gridSize = 49;
        }

        // imposto la classe della griglia in base alla difficoltà
        // questa verrà gestita dal css per ridimensionare correttamente i quadrattini
        gridElement.className = choiceDifficulty.value;

        // creiamo la griglia scelta dall'utente
        for(let i = 0; i < gridSize; i++){

            // creo un elemento, gli metto la classe e lo aggiungo alla griglia
            const newElement = document.createElement("div");
            newElement.classList.add("square");
            // console.log(newElement);

            // aggiungiamo il numero in ogni elemento della griglia
            newElement.innerText = i + 1;

            // aggiungiamo un click ad ogni elemento della griglia
            newElement.addEventListener("click", function() {
                // console.log("click");

                // verifico se il gioco è già terminato
                if (gameEnded) return;

                // numero della casella premuta
                const numberPressed = parseInt(this.innerText);

                // verifico se il numero della casella è già stato premuto e ne caso lo aggiungo all'array vuoto per contare il numero di mosse
                if ( ! clickedNumbers.includes(numberPressed)){
                    clickedNumbers.push(numberPressed);
                }    

                // stampo in pagina il numero di mosse effettuate
                document.querySelector("#moves").innerHTML = clickedNumbers.length;
                // per sapere quale elemento è stato cliccato useremo il "this"
                // console.log(this);
                this.classList.add("active");
                // console.log(this.innerText);
                
                let clickedNumbersrecord = clickedNumbers.length;
                console.log(clickedNumbersrecord);

                // converto il valore avuto tramite "this" in numero
                const convertedNumber = parseInt(numberPressed);
                console.log(convertedNumber);


                //controlliamo se il numero corrispondente alla casella premuta corrisponde al numero presente nell'array 
                if (arrayrandomNumbers.includes(convertedNumber)) {
                    this.classList.add("bomb");
                    
                    console.log("Il numero è presente nell'array.");

                    // Rivelare tutte le altre bombe alla scoperta della prima tramite il metodo "forEach"
                    gridElement.querySelectorAll('.square').forEach(square => {
                        const boxNumber = parseInt(square.innerText);
                        if (arrayrandomNumbers.includes(boxNumber)) {
                            square.classList.add('bomb');
                        }

                        // Impedisce ulteriori clic se il gioco è terminato
                        gameEnded = true;

                        // quando si preme su una bomba il conteggio delle mosse si azzera
                        document.querySelector("#moves").innerHTML = `il tuo record è ${clickedNumbers.length}`;
                        
                        document.querySelector("#record-count").innerHTML = `${clickedNumbers.length}`;
                    });

                    } else {

                         console.log("Il numero non è presente nell'array.");
                    }
            }
            )

            // "appendiamo" gli elementi creati
            gridElement.append(newElement);
        }


        // funzione per genarare un array di 16 numeri "diversi" casuali da 1 a "scelta utente in base al grado di difficoltà (100,81,49)"
        function randomNumber() {
            let randomNumbers = [];

            // creo un ciclo while per riempire l'array con 16 elementi
            while (randomNumbers.length < 16) {
            const randomNumber = Math.floor(Math.random() * gridSize + 1);
            

                // inserisci il numero solo se non è già presente nell'array
                if ( ! randomNumbers.includes(randomNumber)){
                    randomNumbers.push(randomNumber);
                }
            }
            return randomNumbers;
            }
        
            const arrayrandomNumbers = randomNumber();
            console.log(arrayrandomNumbers);
    }
)
