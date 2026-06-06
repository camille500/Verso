import type { VersoContent } from './content.types'

// ─────────────────────────────────────────────────────────────
// PERSONALISATION LIVES HERE.
// Replace `artist`, `hero`, `edition`, `artistNote`, `lineage` with the real
// artist's details and drop his files in /public/artwork + /public/audio.
// Everything else is the (Dutch) script of the film.
// ─────────────────────────────────────────────────────────────

export const content: VersoContent = {
  artist: {
    firstName: 'Dimitri',
    fullName: 'Dimitri',
    discipline: 'schilder',
  },

  brand: {
    name: 'Verso',
    tagline: 'Elke print een gedocumenteerd object. Met een ziel.',
  },

  hero: {
    src: '/artwork/hero.svg',
    alt: 'Het kunstwerk van de kunstenaar',
    aspect: 0.8,
  },

  edition: {
    number: 3,
    total: 10,
    title: 'Ochtendlicht',
    year: 2026,
    technique: 'Pigmentinkt op katoenpapier',
  },

  artistNote: {
    audioSrc: '/audio/artist-note.wav',
    durationSec: 14,
    label: 'Hoor Dimitri over dit werk',
    transcript:
      'Dit werk maakte ik op een ochtend dat het licht precies goed viel. Het is nummer drie van tien — en ik wilde dat het zich dat zou herinneren.',
  },

  lineage: [
    { year: '2026', owner: 'Dimitri', place: 'Atelier' },
    { year: '2027', owner: 'Eerste verzamelaar', place: 'Antwerpen' },
    { year: '2031', owner: 'Galerie Nordlys', place: 'Gent' },
    { year: '2034', owner: 'Privécollectie', place: 'Amsterdam' },
  ],

  capabilityLabels: {
    editionCoa: 'Editie & echtheidscertificaat',
    phoneTap: 'Telefoon-tik · magisch moment',
    fusedToObject: 'Versmolten aan het object',
    offlineResale: 'Offline doorverkoop volgen',
    noWallet: 'Zonder wallet of crypto',
  },

  competitors: [
    {
      name: 'Verso',
      isVerso: true,
      note: 'Alles versmolten tot één: tik, vingerafdruk, levend verhaal — en doorverkoop die offline meereist.',
      caps: {
        editionCoa: true,
        phoneTap: true,
        fusedToObject: true,
        offlineResale: true,
        noWallet: true,
      },
    },
    {
      name: 'Verisart',
      note: 'Sterke certificaten en edities — maar "doorverkoop" betekent NFT-royalty’s op OpenSea, niet de fysieke print die offline van hand tot hand gaat.',
      caps: {
        editionCoa: true,
        phoneTap: 'partial',
        fusedToObject: false,
        offlineResale: false,
        noWallet: false,
      },
    },
    {
      name: 'Tagsmart',
      note: 'Forensische DNA-tags op het werk — maar verificatie vraagt een lab, geen telefoontik. Geen marktplaats, geen herkomst-keten.',
      caps: {
        editionCoa: true,
        phoneTap: false,
        fusedToObject: true,
        offlineResale: false,
        noWallet: true,
      },
    },
    {
      name: 'Avant Arte',
      note: 'Verkoopt al phygital edities met fysiek + blockchain certificaat — maar als gesloten uitgever, niet als open platform voor elke kunstenaar.',
      caps: {
        editionCoa: true,
        phoneTap: 'partial',
        fusedToObject: false,
        offlineResale: false,
        noWallet: true,
      },
    },
    {
      name: 'Arcual / Fairchain',
      note: 'Goed gefinancierd en jagen op royalty’s bij doorverkoop — maar crypto-native, met wallets, en nog zonder kritische massa.',
      caps: {
        editionCoa: true,
        phoneTap: false,
        fusedToObject: false,
        offlineResale: 'partial',
        noWallet: false,
      },
    },
  ],

  economics: [
    {
      label: 'Standaard print',
      value: '€250',
      detail: 'Een mooie print. Maar anoniem.',
    },
    {
      label: 'Verso-editie',
      value: '€350',
      detail: 'Met chip, vingerafdruk, certificaat én een levend verhaal.',
    },
    {
      label: 'Bij doorverkoop',
      value: '+ %',
      detail: 'Later: een klein percentage telkens hij van eigenaar wisselt.',
      future: true,
    },
  ],

  ask: {
    title: 'Wil jij Kunstenaar #001 zijn?',
    lines: ['Jouw werk verdient een geheugen.'],
    cta: 'Ja — laten we de eerste editie maken.',
    tail: 'Het verhaal stopt niet meer bij de voordeur.',
  },

  // ── The script ──────────────────────────────────────────────
  scenes: {
    opening: {
      eyebrow: 'Voor Dimitri',
      title: 'Je maakt iets dat echt is.',
      lines: ['Laten we ervoor zorgen dat het dat blijft.'],
      note: 'Scroll',
    },
    leaving: {
      title: 'Het verlaat je atelier als een verhaal.',
      lines: ['En arriveert overal daarna…', 'als een ding.'],
    },
    anonymous: {
      eyebrow: 'Het probleem',
      title: 'Een print kan niet bewijzen wie hij is.',
      lines: [
        'Niet dat jij hem maakte.',
        'Niet dat het #3 van 10 is.',
        'Niet wie hem ooit liefhad.',
      ],
      note: 'Het verhaal stopt bij de voordeur.',
    },
    whatif: {
      eyebrow: 'De wending',
      title: 'Wat als de print het zélf wist?',
      lines: [
        'Dat hij #3 van 10 is.',
        'Dat jij zijn maker bent.',
        'En zich elke eigenaar herinnerde die hij ooit had.',
      ],
    },
    reveal: {
      title: 'Verso.',
      lines: ['Elke print een gedocumenteerd object. Met een ziel.'],
      note: 'Geen NFT. Geen crypto. Het kunstwerk hangt aan de muur — Verso bewijst dat het echt is.',
    },
    tap: {
      eyebrow: 'Het magische moment',
      title: 'Tik. En het verhaal opent.',
      lines: ['Tik je telefoon tegen de print.'],
      note: 'En het verhaal opent.',
    },
    memory: {
      eyebrow: 'Een levend geheugen',
      title: 'Elke eigenaar voegt een hoofdstuk toe.',
      lines: ['Niet ouder.', 'Rijker.'],
    },
    anchor: {
      eyebrow: 'De techniek',
      title: 'Twee bewijzen. Versmolten tot één.',
      lines: [
        'Een verzegelde NFC-chip. Elke tik is cryptografisch uniek. Ingebed — wie hem losmaakt, vernietigt hem.',
        'Bij het signeren leggen we het oppervlak van déze print optisch vast. Eén keer. Onnavolgbaar.',
      ],
      note: 'Verplaats de chip naar een vervalsing? De vingerafdruk klopt niet.',
      fine: 'We zeggen nooit “onkraakbaar”. We maken vervalsen te duur, te traag en te riskant om de moeite waard te zijn.',
    },
    transfer: {
      eyebrow: 'Doorgeven',
      title: 'Verkocht. Van hand tot hand.',
      lines: ['Twee telefoons. Eén tik.', 'De herkomst verhuist mee.'],
      note: 'Geen wallet. Geen seed phrase. Gewoon… doorgegeven.',
    },
    compare: {
      eyebrow: 'De vergelijking',
      title: 'Iedereen probeert het. Niemand heeft dít.',
      lines: [
        'Slimme mensen werken hieraan. Echt waar.',
        'Maar één ding heeft niemand opgelost: een print volgen als hij offline wordt doorverkocht. Zonder wallet.',
      ],
      note: 'Verso = PSA voor kunstprints. Maar dan levend.',
      fine: 'Verso is een herkomst- en echtheidsbewijs. Geen eigendomsakte, geen auteursrecht. En nee: #1 is niet meer waard dan #7 — waarde komt uit oplage, reputatie, staat en herkomst.',
    },
    vision: {
      eyebrow: 'De potentie',
      title: 'Begin met één. Open naar duizenden.',
      lines: [
        'We beginnen met één kunstenaar. Jij.',
        'De enige bron van waarheid. Het ijkpunt.',
        'Daarna: vele kunstenaars. Eén standaard.',
      ],
      note: 'Elke nieuwe herkomst maakt het netwerk sterker. De gracht groeit vanzelf.',
    },
    ask: {
      eyebrow: 'De vraag',
      title: 'Wil jij Kunstenaar #001 zijn?',
    },
  },
}
