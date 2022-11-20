/* número para manipular as animações no card */
let numb = 2;

const search = async() =>{
    const loader = document.getElementsByClassName("loader");

    const pokemonName = document.getElementById("name");
 
    
    loader[0].style.display = "flex";

    // Variavel para auxiliar na condição de verificação 
    var condition = 0;

        for(x = 1; x < 906; x++ ){
            /*  Consumindo API */
            var pokAPI = await fetch(`https://pokeapi.co/api/v2/pokemon/${x}`)
            var result = await pokAPI.json()
             
            /* condição para verificar se o nome buscado existe na API consumida, já fazendo tratamento de dados pra evitar possiveis erros de digitação*/
            if(result.name.toLowerCase().replace(/-/g, "") == pokemonName.value.toLowerCase().replace(/-/g, "").replace(/ /g, "")){
                condition = 1;
                break;
            }
        }
        if(condition == 0){
            alert("Digite um nome de pokemon válido!");
            loader[0].style.display = "none";
        }else{
            
            const footer = document.getElementsByTagName("footer");
            const descriptionCardPokemon = document.getElementsByClassName("descriptionCardPokemon");
            const cardPokemon = document.getElementsByClassName("cardPokemon");
            const titleSearch = document.getElementsByClassName("titleSearch");
            /* trazendo os elementos para tela caso o pokemon buscado exista na API */
            footer[0].style.position = "unset";
            footer[0].style.bottom = "unset";
            loader[0].style.display = "none";
            descriptionCardPokemon[0].style.display = "flex";
            cardPokemon[0].style.display = "flex";
            titleSearch[0].style.marginTop = "10px";

            /* Pegando os elementos do card principal */
            const image = document.getElementById("imagePokemon");
            const name = document.getElementById("namePokemon");
            const nationalNumber = document.getElementById("nationalNumber");
            const types = document.getElementById("types");
            const species = document.getElementById("species");
            const height = document.getElementById("height");
            const weight = document.getElementById("weight");
            const abilities = document.getElementById("abilities");
            const description = document.getElementsByClassName('description');
            const descriptionLabel = document.getElementsByClassName('descriptionLabel');
            
            /* Animação card */
            if(numb == 1 ){
                cardPokemon[0].style.animationName = `move${numb}`;
                numb+=1;
            }else{
                cardPokemon[0].style.animationName = `move${numb}`;
                numb-=1;
            }
          
            /* Atribuindo Os Valores gerados na API para os Elementos do Card Principal */
            image.src = result.sprites.other["official-artwork"].front_default;
            name.textContent= result.name+ ".";
            nationalNumber.textContent= result.id+ ".";
            
            types.textContent = "";
            result.types.forEach(element => {
                types.textContent += ", " + element.type.name;
            });
            types.textContent = types.textContent.replace(',','') + ".";

            /* consumindo a API que estava dentro da API inicial, para buscar mais informações importantes*/
            const specieAPI= await fetch(result.species.url);
            const resultSpecieAPI = await specieAPI.json(); 
            species.textContent = resultSpecieAPI.genera[7].genus + ".";
            
            height.textContent = (result.height*10)/100 + "m"+ ".";
            weight.textContent = (result.weight*10)/100 + "kg"+ ".";

            abilities.textContent = "";
            result.abilities.forEach(element =>{
                abilities.textContent += ", " + element.ability.name
            })
            abilities.textContent = abilities.textContent.replace(',',' ') + ".";

            /* atribuindo cores ao card e letras */
            cardPokemon[0].style.backgroundColor = resultSpecieAPI.color.name;
         
            /* Fazendo correção de possiveis erros caso o card venha a se tornar a mesma cor das letras da descrição*/
            if(resultSpecieAPI.color.name == "white"){
                for(x = 0; x < 14; x++){
                    description[x].style.color = "black";
                }
            }else{
                for(x = 0; x < 14; x++){
                    description[x].style.color = "white";
                }
            }if(resultSpecieAPI.color.name == "black"){
                for(x = 0; x < 14; x++){
                    descriptionLabel[x].style.color = "white";   
                }
            }else{
                for(x = 0; x < 14; x++){
                    descriptionLabel[x].style.color = "black";
                }
            }
            /* Pegando a Segunda coluna de Elementos no Card Principal*/

            const hp = document.getElementById("hpPokemon");
            const atk = document.getElementById("atkPokemon");
            const def = document.getElementById("defPokemon");
            const spAtk = document.getElementById("spAtkPokemon");
            const spDef = document.getElementById("spDefPokemon");
            const speed = document.getElementById("speedPokemon");
            const total = document.getElementById("total");

            /* Atribuindo os valores da segunda coluna*/
            hp.textContent = result.stats[0].base_stat +".";
            atk.textContent = result.stats[1].base_stat +".";
            def.textContent = result.stats[2].base_stat +".";
            spAtk.textContent = result.stats[3].base_stat +".";
            spDef.textContent = result.stats[4].base_stat +".";
            speed.textContent = result.stats[5].base_stat +".";
            total.textContent = parseInt(hp.textContent) + parseInt(atk.textContent) + parseInt(def.textContent) + parseInt(spAtk.textContent) + parseInt(spDef.textContent) + parseInt(speed.textContent) +".";

             /* Pegando os lementos do Segundo card */

             const captureRate = document.getElementById("captureRate");
             const baseHappiness = document.getElementById("baseHappiness");
             const baseExperience = document.getElementById("baseExperience");
             const growthRate = document.getElementById("growthRate");
             const color = document.getElementById("color");
             const generation = document.getElementById("generation");
             const habitat = document.getElementById("habitat");
             const shape = document.getElementById("shape");
           
 
             captureRate.textContent = resultSpecieAPI.capture_rate;
             baseHappiness.textContent = resultSpecieAPI.base_happiness;
             baseExperience.textContent = result.base_experience;
             growthRate.textContent = resultSpecieAPI.growth_rate.name;
             color.textContent = resultSpecieAPI.color.name;
             generation.textContent = resultSpecieAPI.generation.name;
             
             if(resultSpecieAPI.habitat == null){
                habitat.textContent = "não tem";
             }else{  habitat.textContent = resultSpecieAPI.habitat.name  }

            shape.textContent = resultSpecieAPI.shape.name;

            
            const node = document.getElementById("moves");
            const divMoves = document.getElementById("divMoves");
            /* removendo a lista ordenada caso ela já exista, para poder recriar com os novos elementos */
            if (node) {
                node.parentNode.removeChild(node);
              }
            /* criando a lista ordenada  */
            const moves = document.createElement("ol");
            moves.className="moves";
            moves.id="moves";
            divMoves.appendChild(moves);

            /* laço para criar uma lista onde cada elemento recebe um movimento  */
            for(x = 0; x < result.moves.length; x++){
                var li = document.createElement("li");
                li.className = "description liMoves";
                li.innerHTML = result.moves[x].move.name;
                moves.appendChild(li);
                
                if(x == 150){
                    break;
                }
            }
        }

       
}
