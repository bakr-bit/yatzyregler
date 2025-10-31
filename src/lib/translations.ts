export const authorDescriptions: Record<string, string> = {
  sv: 'Fredrik är lite av en självutnämnd Yatzy-kung som har älskat spelet i över tjugo år. Han har en imponerande vinstlista mot sina vänner och familj, i alla fall om du frågar Fredrik själv. 😏 Med en passion för Yatzy och naturlig talang för strategi samt taktik, är han den du vänder dig till för de bästa knepen. När han inte utmanar oss, hjälper han alla på Yatzyregler.com att förbättra sitt spel. Tack vare honom har många av oss slutat komma sist i vid Yatzykvällarna!',
  en: 'Fredrik is something of a self-proclaimed Yatzy king who has loved the game for over twenty years. He has an impressive winning record against his friends and family, at least if you ask Fredrik himself. 😏 With a passion for Yatzy and a natural talent for strategy and tactics, he is the one you turn to for the best tips. When he\'s not challenging us, he helps everyone at Yatzyregler.com improve their game. Thanks to him, many of us have stopped coming last at Yatzy nights!',
  no: 'Fredrik er en slags selvutnevnt Yatzy-konge som har elsket spillet i over tjue år. Han har en imponerende seiersstatistikk mot venner og familie, i hvert fall hvis du spør Fredrik selv. 😏 Med en lidenskap for Yatzy og et naturlig talent for strategi og taktikk, er han den du vender deg til for de beste tipsene. Når han ikke utfordrer oss, hjelper han alle på Yatzyregler.com med å forbedre spillet sitt. Takket være ham har mange av oss sluttet å komme sist på Yatzy-kveldene!',
  da: 'Fredrik er noget af en selvudnævnt Yatzy-konge, som har elsket spillet i over tyve år. Han har en imponerende sejrsstatistik mod sine venner og familie, i hvert fald hvis du spørger Fredrik selv. 😏 Med en passion for Yatzy og et naturligt talent for strategi og taktik er han den, du henvender dig til for at få de bedste tips. Når han ikke udfordrer os, hjælper han alle på Yatzyregler.com med at forbedre deres spil. Takket være ham er mange af os holdt op med at komme sidst til Yatzy-aftenerne!',
  fi: 'Fredrik on itsejulistautunut Yatzy-kuningas, joka on rakastanut peliä yli kaksikymmentä vuotta. Hänellä on vaikuttava voittotilasto ystäviään ja perhettään vastaan, ainakin jos kysyt Fredrikiltä itseltään. 😏 Intohimolla Yatzyyn ja luonnollisella lahjakkuudella strategiaan ja taktiikkaan hän on se, jonka puoleen kääntyä parhaiden vinkkien saamiseksi. Kun hän ei haasta meitä, hän auttaa kaikkia Yatzyregler.comissa parantamaan peliään. Hänen ansiostaan monet meistä ovat lakanneet tulemasta viimeisiksi Yatzy-iltoina!',
  es: 'Fredrik es una especie de autoproclamado rey del Yatzy que ha amado el juego durante más de veinte años. Tiene un récord de victorias impresionante contra sus amigos y familiares, al menos si le preguntas a Fredrik. 😏 Con una pasión por Yatzy y un talento natural para la estrategia y las tácticas, él es a quien recurres para obtener los mejores consejos. Cuando no nos desafía, ayuda a todos en Yatzyregler.com a mejorar su juego. ¡Gracias a él, muchos de nosotros hemos dejado de quedar últimos en las noches de Yatzy!',
};

export function getAuthorDescription(locale: string): string {
  return authorDescriptions[locale] || authorDescriptions.sv;
}

export const tocTitles: Record<string, string> = {
  sv: 'Navigera',
  en: 'Navigate',
  no: 'Naviger',
  da: 'Naviger',
  fi: 'Navigoi',
  es: 'Navegar',
};

export function getTocTitle(locale: string): string {
  return tocTitles[locale] || tocTitles.sv;
}

export const aboutYatzyregler: Record<string, { title: string; content: string }> = {
  sv: {
    title: 'Om Yatzyregler.com',
    content: 'Här på yatzyregler.com delar ett gäng passionerade Yatzy entusiaster med oss av vår kärlek för spelet. Vi strävar efter att ge dig den bästa informationen, yatzy reglerna, tipsen och strategierna för att förbättra ditt spel och maximera din upplevelse. Tack för att du valde oss som din guide i Yatzy-världen.'
  },
  en: {
    title: 'About Yatzyregler.com',
    content: 'Here at yatzyregler.com, a group of passionate Yahtzee enthusiasts share our love for the game. We strive to provide you with the best information, Yahtzee rules, tips, and strategies to improve your game and maximize your experience. Thank you for choosing us as your guide in the Yahtzee world.'
  },
  no: {
    title: 'Om Yatzyregler.com',
    content: 'Her på yatzyregler.com deler en gjeng lidenskapelige Yatzy-entusiaster vår kjærlighet for spillet. Vi streber etter å gi deg den beste informasjonen, Yatzy-reglene, tipsene og strategiene for å forbedre spillet ditt og maksimere opplevelsen din. Takk for at du valgte oss som din guide i Yatzy-verdenen.'
  },
  da: {
    title: 'Om Yatzyregler.com',
    content: 'Her på yatzyregler.com deler en flok passionerede Yatzy-entusiaster vores kærlighed til spillet. Vi stræber efter at give dig den bedste information, Yatzy-reglerne, tipsene og strategierne for at forbedre dit spil og maksimere din oplevelse. Tak fordi du valgte os som din guide i Yatzy-verdenen.'
  },
  fi: {
    title: 'Tietoa Yatzyregler.comista',
    content: 'Täällä yatzyregler.comissa joukko intohimoisia Yatzy-harrastajia jakaa rakkautensa peliin. Pyrimme tarjoamaan sinulle parhaan tiedon, Yatzy-säännöt, vinkit ja strategiat parantaaksesi peliäsi ja maksimoidaksesi kokemuksesi. Kiitos, että valitsit meidät oppaaksesi Yatzy-maailmassa.'
  },
  es: {
    title: 'Acerca de Yatzyregler.com',
    content: 'Aquí en yatzyregler.com, un grupo de entusiastas apasionados del Yatzy comparte nuestro amor por el juego. Nos esforzamos por brindarte la mejor información, las reglas de Yatzy, consejos y estrategias para mejorar tu juego y maximizar tu experiencia. Gracias por elegirnos como tu guía en el mundo del Yatzy.'
  }
};

export function getAboutYatzyregler(locale: string) {
  return aboutYatzyregler[locale] || aboutYatzyregler.sv;
}
