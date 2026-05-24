# ROAD RUNNER 

Un joc d'esquivar obstacles per carrers urbans, desenvolupat amb Phaser 3 i JavaScript pur.

---

## i. Introducció

**ROAD RUNNER** és un joc d'arcada en perspectiva vertical on el jugador condueix un vehicle per una carretera de tres carrils i ha d'esquivar cotxes enemics i obstacles que apareixen de manera aleatòria. El joc és continu i la dificultat augmenta progressivament a mesura que passa el temps: la velocitat s'incrementa constantment, fent que els obstacles apareguin amb més freqüència i que les reaccions hagin de ser cada cop més ràpides.

L'objectiu del projecte ha estat crear un joc complet i jugable directament al navegador, aplicant els conceptes de programació orientada a objectes, gestió d'escenes, física d'arcade i animacions, tot emprant el framework Phaser 3.

---

## ii. Descripció del disseny del joc

### Concept i mecànica principal

El jugador controla un cotxe que es mou en tres carrils fixos. El cotxe sempre es troba a la part inferior de la pantalla i la carretera desplaça cap avall per simular el moviment. L'única acció del jugador és canviar de carril (esquerra o dreta) per evitar els obstacles que baixen des de la part superior de la pantalla.

### Progressió i puntuació

La puntuació s'acumula de forma proporcional a la velocitat actual, de manera que aguantar més temps dona puntuacions creixentment altes. El millor resultat es desa al `localStorage` del navegador i es mostra a la pantalla de Game Over.

### Obstacles i elements visuals

Hi ha tres tipus d'obstacles:
- **Cotxe enemic vermell** : vehicle clàssic de color vermell.
- **Cotxe enemic taronja** : vehicle de color ambre/groc.
- **Arbre**: obstacle estàtic que apareix en carril de manera aleatòria.

A banda dels obstacles, hi ha **decoració lateral** (arbres petits triangulars als marges de la carretera) que es desplacen a una velocitat lleugerament inferior a la dels obstacles, creant sensació de profunditat.

### Flux d'escenes

```
Boot → Menu → Game ⇄ Pause
                ↓
            GameOver → Menu / Game
```

| Escena     | Funció                                                                 |
|------------|------------------------------------------------------------------------|
| `Boot`     | Carrega i genera totes les textures del joc amb gràfics procedurals    |
| `Menu`     | Pantalla principal amb títol animat i botó d'inici                     |
| `Game`     | Lògica principal del joc                                               |
| `Pause`    | Superposada sobre `Game`; permet continuar o tornar al menú           |
| `GameOver` | Mostra la puntuació final, el rècord i opcions de reinici              |

---

## iii. Descripció de les parts més rellevants de la implementació

### Generació procedural de textures 

Totes les textures del joc (carretera, cotxes, arbres, espurna) es generen en temps d'execució mitjançant l'API de gràfics de Phaser, sense cap fitxer d'imatge extern.

### Sistema de carrils i canvi de carril amb tween 

El jugador no es mou lliurement: es desplaça entre tres posicions X predefinides . Quan es detecta una tecla de moviment, s'activa una animació cap a la posició X del nou carril.

### Velocitat adaptativa i planificació d'obstacles

La velocitat s'incrementa cada frame en funció del temps transcorregut. L'interval d'aparició dels obstacles s'ajusta a la velocitat actual per evitar que a velocitats molt altes els obstacles apareguin de forma impossible:

D'aquesta manera, com més ràpid va el joc, menys temps passa entre obstacles, però mai per sota d'un mínim garantit (300 ms).

### Rècord persistent

La millor puntuació es desa amb `localStorage.setItem('roadrunner_best', score)` i es recupera en cada partida. Si la puntuació actual supera el rècord, es mostra un missatge especial de nou rècord.


## iv. Conclusions i problemes trobats

### Conclusions

El projecte ha permès aprofundir en l'ús de Phaser 3 com a framework de jocs web i en la gestió modular d'escenes. La decisió de generar totes les textures de manera procedural ha simplificat la distribució del joc (un únic directori sense dependències externes d'imatges), tot i afegir complexitat a la fase de càrrega inicial.

L'arquitectura d'escenes de Phaser resulta molt adequada per a jocs amb pantalles ben diferenciades (menú, joc, pausa, game over): cada escena és independent i la comunicació entre elles es fa de manera neta passant dades a través del mètode `init`.

### Problemes trobats

- **Encadenament involuntari de moviments:** Inicialment era possible prémer ràpidament les tecles i saltar dos carrils alhora. Es va solucionar amb la variable booleana `this.moving` que bloqueja nous inputs fins que el tween anterior acaba.

- **Generació d'obstacles massa freqüent a velocitats altes:** Quan la velocitat augmentava molt, els obstacles apareixien quasi solapats. Es va corregir amb el factor `speedFactor` que redueix l'interval mínim d'aparició proporcionalment.

- **Textures no disponibles en escenes posteriors:** En un primer disseny, algunes textures s'intentaven generar a `GameScene`. Es va centralitzar tota la generació a `BootScene` perquè estiguin disponibles globalment des de l'inici.

- **Pausa incompleta:** En les primeres versions, aturar la física no aturava la decoració lateral (arbres dels marges), que continuava movent-se. Es va afegir `this.scTimer.paused = true/false` per sincronitzar-ho.

---

## v. Manual d'usuari

### Requisits

Qualsevol navegador modern amb JavaScript activat (Chrome, Firefox, Edge, Safari). No cal instal·lació ni connexió a Internet (excepte per carregar Phaser 3 des de CDN).

### Com executar el joc

1. Descomprimiu el fitxer ZIP en una carpeta local.
2. Obriu el fitxer `index.html` en un navegador web.

### Controls

| Acció             | Teclat                    |
|-------------------|---------------------------|
| Moure a l'esquerra | `←` (fletxa) o `A`       |
| Moure a la dreta  | `→` (fletxa) o `D`        |
| Pausar / reprendre | `SPACE`                  |
| Iniciar partida (menú) | `ENTER`             |
| Reiniciar (game over) | `ENTER`              |

### Pantallas del joc

**Menú principal**
Mostra el títol del joc i un cotxe animat. Premeu **JUGAR** o **ENTER** per començar.

**Partida**
- La carretera es desplaça cap avall simulant el moviment del cotxe.
- Eviteu els cotxes enemics (vermells i taronges) i els arbres que baixa per la carretera.
- La puntuació actual i la velocitat es mostren a la part superior esquerra.
- La velocitat augmenta contínuament: com més temps sobreviu, més difícil és i més punts es guanyen.

**Pausa**
Premeu `SPACE` per pausar. Des d'aquí podeu continuar la partida o tornar al menú principal.



[Enllaç github page](https://ecardosa.github.io/JocWeb/) 

**Game Over**
Mostra la puntuació final i el millor rècord personal. Si heu superat el rècord anterior, apareixerà el missatge **🏆 NOU RÉCORD!** Podeu reiniciar o tornar al menú.
