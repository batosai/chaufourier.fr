import { DateTime } from 'luxon'

export default [
  {
    title: "Utilisation de l'attribut HTML autofocus",
    slug: 'utilisation-de-l-attribut-html-autofocus',
    body: JSON.stringify({
      time: 1705012475249,
      blocks: [
        {
          id: 'ZKINIWxtwm',
          type: 'paragraph',
          data: {
            text: "L'attribut <code class=\"inline-code\">autofocus</code> en HTML est un outil pratique pour améliorer l'expérience utilisateur sur les formulaires en ligne. Il permet de définir automatiquement le champ de saisie qui sera actif dès que la page se charge, sans nécessiter d'action supplémentaire de la part de l'utilisateur.",
          },
        },
        {
          id: 'tpjFZXk-AS',
          type: 'header',
          data: { text: '<b>Comment ça marche ?</b>', level: 2 },
        },
        {
          id: 'rILvMhHzfz',
          type: 'paragraph',
          data: {
            text: 'En intégrant l\'attribut <code class="inline-code">autofocus</code> à un élément de formulaire, tel qu\'un champ de texte (<code class="inline-code">&lt;input type="text"&gt;</code>), cet élément spécifique sera mis en surbrillance ou en état de saisie dès que la page se charge, permettant à l\'utilisateur de commencer à taper directement sans devoir cliquer sur le champ.',
          },
        },
        { id: '87jZG7SrZM', type: 'header', data: { text: '<b>Exemple :</b>', level: 2 } },
        {
          id: 'VzeOWEc9HE',
          type: 'code',
          data: {
            language: "html",
            code: '<form action="/action_page.php">\n  First name: <input type="text" name="firstname" autofocus /><br />\n  Last name: <input type="text" name="lastname" /><br />\n  <input type="submit" />\n</form>\n',
          },
        },
        {
          id: '9U4a1xd8Ju',
          type: 'paragraph',
          data: {
            text: 'Dans cet exemple, le champ "First name" est marqué avec <code class="inline-code">autofocus</code>. Ainsi, lorsque la page se charge, le curseur sera automatiquement positionné dans ce champ, facilitant la saisie pour l\'utilisateur.',
          },
        },
        {
          id: 'JzSzgHLqS0',
          type: 'header',
          data: { text: '<b>Considérations à prendre en compte :</b>', level: 2 },
        },
        {
          id: 'guMx3fZxvz',
          type: 'list',
          data: {
            style: 'unordered',
            items: [
              { content: 'Compatibilité des navigateurs :', items: [] },
              { content: 'Accessibilité :', items: [] },
            ],
          },
        },
        {
          id: 'DYk-EEoS3_',
          type: 'paragraph',
          data: {
            text: 'En somme, l\'attribut HTML <code class="inline-code">autofocus</code> est un outil utile pour optimiser l\'expérience utilisateur en simplifiant le processus de saisie dans les formulaires en ligne, mais son utilisation doit être équilibrée pour garantir une accessibilité et une convivialité optimales.',
          },
        },
      ],
      version: '2.28.2',
    }),
    visible: true,
    publishedOn: DateTime.fromISO('2021-06-06T00:00:00'),
    tags: ['html', 'trick'],
  },
  {
    title: 'Utilisation de la commande git mv pour renommer des fichiers dans Git',
    slug: 'utilisation-de-la-commande-git-mv-pour-renommer-des-fichiers-dans-git',
    body: JSON.stringify({
      time: 1705013579469,
      blocks: [
        {
          id: 'FQ3hQ1nBT6',
          type: 'paragraph',
          data: {
            text: "La gestion des fichiers au sein d'un dépôt Git est cruciale pour maintenir un historique précis des modifications apportées à un projet. Lorsqu'il s'agit de renommer des fichiers, la commande <code class=\"inline-code\">git mv</code> devient un outil précieux.",
          },
        },
        { id: '9oUj9c7ec2', type: 'header', data: { text: "Qu'est-ce que git mv ?", level: 2 } },
        {
          id: 'or_FsZ2YN1',
          type: 'paragraph',
          data: {
            text: '<code class="inline-code">git mv</code> est une commande Git qui permet de déplacer ou renommer des fichiers tout en préservant l\'historique de version. Contrairement à la commande <code class="inline-code">mv</code> du système d\'exploitation, <code class="inline-code">git mv</code> effectue le changement de nom du fichier tout en conservant sa traçabilité au sein du dépôt Git.',
          },
        },
        { id: '4HaMn3WALq', type: 'header', data: { text: "Comment l'utiliser ?", level: 2 } },
        {
          id: 'XrN114VSFL',
          type: 'paragraph',
          data: {
            text: 'La syntaxe de base de <code class="inline-code">git mv</code> est la suivante :',
          },
        },
        { id: '0C1fS8vVAG', type: 'code', data: { language: "shell", code: 'git mv ancien_nom nouveau_nom' } },
        {
          id: 'wQzNNJmx6O',
          type: 'paragraph',
          data: {
            text: 'Dans cette commande, <code class="inline-code">ancien_nom</code> représente le nom actuel du fichier, tandis que <code class="inline-code">nouveau_nom</code> est le nouveau nom que vous souhaitez lui donner. Par exemple, pour renommer un fichier nommé <code class="inline-code">MYFILE.png</code> en <code class="inline-code">myfile.png</code>, on utilisera la commande suivante :',
          },
        },
        { id: 'jz-FOsYEIw', type: 'code', data: { language: "shell", code: 'git mv MYFILE.png myfile.png \n' } },
        {
          id: 'D7ImzOYG3h',
          type: 'header',
          data: { text: 'Pourquoi utiliser git mv ?', level: 2 },
        },
        {
          id: '0TU4NuEIzn',
          type: 'paragraph',
          data: {
            text: "L'intérêt principal de <code class=\"inline-code\">git mv</code> réside dans sa capacité à suivre les changements de noms ou de chemins des fichiers au sein de l'historique Git. En utilisant cette commande, vous assurez que l'historique des modifications du fichier est préservé, ce qui est essentiel pour comprendre l'évolution d'un projet au fil du temps.",
          },
        },
        {
          id: '3AFeDIyTka',
          type: 'paragraph',
          data: {
            text: 'En résumé, <code class="inline-code">git mv</code> simplifie le processus de renommage de fichiers dans un dépôt Git tout en maintenant l\'intégrité de l\'historique de version.',
          },
        },
      ],
      version: '2.28.2',
    }),
    visible: true,
    publishedOn: DateTime.fromISO('2021-06-14T00:00:00'),
    tags: ['git', 'trick'],
  },
  {
    title: 'Obtenir une date en millisecondes en Ruby',
    slug: 'obtenir-une-date-en-millisecondes-en-ruby',
    body: JSON.stringify({
      time: 1705013897834,
      blocks: [
        {
          id: '7fwaWQAv-r',
          type: 'paragraph',
          data: {
            text: "En programmation, il est parfois crucial d'obtenir des timestamps précis pour mesurer le temps écoulé ou pour d'autres opérations chronologiques. En Ruby, obtenir la date en millisecondes peut se faire de manière simple et efficace.",
          },
        },
        {
          id: '3gYsIFn2Fn',
          type: 'header',
          data: { text: '<b>Utilisation de </b><b>DateTime.now.strftime("%Q")</b>', level: 2 },
        },
        {
          id: 'b8v1sX58gD',
          type: 'paragraph',
          data: {
            text: 'En Ruby, la méthode <code class="inline-code">DateTime.now</code> renvoie l\'instant présent, puis en utilisant <code class="inline-code">strftime</code> avec le format "<code class="inline-code">%Q</code>", on peut obtenir la date en millisecondes.',
          },
        },
        {
          id: 'wpthcnEX5B',
          type: 'code',
          data: {
            language: "ruby",
            code: 'require \'date\'\n\nmilliseconds = DateTime.now.strftime("%Q")\nputs "Date en millisecondes : #{milliseconds}"\n',
          },
        },
        {
          id: 'ZGF7wU4zj_',
          type: 'list',
          data: {
            style: 'unordered',
            items: [
              {
                content:
                  '<code class="inline-code">DateTime.now</code> retourne l\'instant actuel.',
                items: [],
              },
              {
                content:
                  '<code class="inline-code">%Q</code> est un format spécifique utilisé avec <b>strftime</b> pour représenter les millisecondes.',
                items: [],
              },
            ],
          },
        },
        {
          id: '17OKhRbEUr',
          type: 'paragraph',
          data: {
            text: "Lorsque vous exécutez ce code, il affichera la date actuelle avec précision jusqu'aux millisecondes.",
          },
        },
        {
          id: 'LnVkafdvpJ',
          type: 'header',
          data: { text: '<b>Utilisation du résultat</b>', level: 2 },
        },
        {
          id: 'Dxn4_knK4B',
          type: 'paragraph',
          data: {
            text: 'La valeur retournée par <code class="inline-code">DateTime.now.strftime("%Q") </code>peut être utilisée dans divers scénarios, notamment pour mesurer les durées, pour des opérations temporelles précises ou pour créer des identifiants uniques basés sur le temps.',
          },
        },
        {
          id: 'RlCKeh1Av0',
          type: 'paragraph',
          data: { text: "Par exemple, pour mesurer le temps d'exécution d'une fonction :" },
        },
        {
          id: '8uLTGARmJH',
          type: 'code',
          data: {
            language: "ruby",
            code: 'start_time = DateTime.now.strftime("%Q").to_i # La fonction ou le code à mesurer\nend_time = DateTime.now.strftime("%Q").to_i \nelapsed_time = end_time - start_time\n\nputs "Temps d\'exécution : #{elapsed_time} millisecondes"\n',
          },
        },
        { id: '2P6DXEzkfv', type: 'header', data: { text: '<b>Conclusion</b>', level: 2 } },
        {
          id: 'IvKZsv1k1J',
          type: 'paragraph',
          data: {
            text: 'Obtenir la date en millisecondes en Ruby est une opération utile pour de nombreux cas d\'utilisation. En utilisant <code class="inline-code">DateTime.now.strftime("%Q")</code>, vous pouvez facilement obtenir un timestamp précis jusqu\'aux millisecondes pour diverses applications dans vos projets Ruby.',
          },
        },
      ],
      version: '2.28.2',
    }),
    visible: true,
    publishedOn: DateTime.fromISO('2021-06-24T00:00:00'),
    tags: ['ruby', 'trick'],
  },
  {
    title: "Comprendre l'importance du séparateur de rupture de mot dans les URL",
    slug: 'comprendre-limportance-du-separateur-de-rupture-de-mot-dans-les-url',
    body: JSON.stringify({
      time: 1705358058429,
      blocks: [
        {
          id: '0WwIYgfoeg',
          type: 'paragraph',
          data: {
            text: "Lorsque nous naviguons sur Internet, nous rencontrons souvent des liens et des adresses URL. Ces dernières peuvent parfois être longues et contenir des termes difficiles à lire ou à interpréter. C'est là qu'intervient le séparateur de rupture de mot, une fonctionnalité cruciale pour améliorer la lisibilité des URL et rendre la navigation en ligne plus conviviale.",
          },
        },
        {
          id: 'xVqaR-vo8n',
          type: 'header',
          data: { text: "<b>Qu'est-ce que le séparateur de rupture de mot ?</b>", level: 2 },
        },
        {
          id: 'gI2jUr1IBX',
          type: 'paragraph',
          data: {
            text: "Le séparateur de rupture de mot est un élément utilisé dans le balisage HTML pour indiquer aux navigateurs où ils peuvent couper un mot long afin de le diviser et d'éviter qu'il ne dépasse la largeur d'un conteneur donné, améliorant ainsi la présentation visuelle.",
          },
        },
        { id: 'qxvHlYRZxd', type: 'header', data: { text: '<b>Un exemple concret</b>', level: 3 } },
        {
          id: 'zeQGAEsGBp',
          type: 'paragraph',
          data: {
            text: 'Prenons l\'exemple d\'une URL : <code class="inline-code">https://chaufourier.fr/blog</code>. Si cette URL est intégrée dans une zone de texte ou un conteneur avec une largeur limitée, le mot "chaufourier" peut poser problème car il est trop long pour s\'adapter à cette zone.',
          },
        },
        {
          id: '3Os1OADJ1v',
          type: 'paragraph',
          data: {
            text: 'Pour résoudre ce problème, le séparateur de rupture de mot peut être utilisé en insérant <code class="inline-code">&lt;wbr&gt;</code> à des endroits stratégiques dans l\'URL, comme illustré dans l\'exemple suivant :',
          },
        },
        {
          id: 'lJRLSLxEMg',
          type: 'code',
          data: {
            language: "html",
            code: '<section>\n  <p>https://<wbr>chaufourier<wbr>.fr<wbr>/blog</p>\n</section>\n',
          },
        },
        {
          id: 'yCvMPeqJ54',
          type: 'paragraph',
          data: {
            text: 'Ici, chaque <code class="inline-code">&lt;wbr&gt;</code> indique un point où le navigateur est autorisé à couper le mot "chaufourier" s\'il dépasse la largeur disponible, améliorant ainsi la lisibilité de l\'URL sans altérer sa signification ou sa fonctionnalité.',
          },
        },
        {
          id: 'mw00GzF6bk',
          type: 'header',
          data: { text: '<b>Avantages du séparateur de rupture de mot</b>', level: 2 },
        },
        {
          id: 'kkk-ywkOuM',
          type: 'paragraph',
          data: {
            text: "L'utilisation du séparateur de rupture de mot présente plusieurs avantages :",
          },
        },
        {
          id: 'tVBuonyJcM',
          type: 'list',
          data: {
            style: 'ordered',
            items: [
              {
                content:
                  "<b>Amélioration de la lisibilité :</b> En évitant les mots trop longs qui dépassent la largeur d'un conteneur, il facilite la lecture des URL.",
                items: [],
              },
              {
                content:
                  '<b>Meilleure expérience utilisateur :</b> En rendant les liens plus lisibles, il contribue à une navigation web plus fluide et agréable.',
                items: [],
              },
              {
                content:
                  "<b>Préservation de l'intégrité des liens :</b> Malgré les ruptures de mots, les liens restent fonctionnels et dirigent toujours vers la bonne destination.",
                items: [],
              },
            ],
          },
        },
        {
          id: 'OizmJ-KwQY',
          type: 'paragraph',
          data: {
            text: 'En conclusion, le séparateur de rupture de mot est un outil simple mais efficace pour améliorer la lisibilité des URL, contribuant ainsi à une expérience de navigation web plus conviviale pour les utilisateurs.',
          },
        },
        { id: 'd08p0vR4MY', type: 'delimiter', data: {} },
        { id: 'EECOEZ2QAw', type: 'header', data: { text: 'Sources', level: 3 } },
        {
          id: '7rCTMAQSy0',
          type: 'list',
          data: {
            style: 'unordered',
            items: [
              {
                content:
                  '<a href="https://jsfiddle.net/rwnsdh15" target="_blank">https://jsfiddle.net/rwnsdh15</a>',
                items: [],
              },
              {
                content:
                  '<a href="https://twitter.com/IMAC2/status/1367462023156690952" target="_blank">https://twitter.com/IMAC2/status/1367462023156690952</a>',
                items: [],
              },
            ],
          },
        },
      ],
      version: '2.28.2',
    }),
    visible: true,
    publishedOn: DateTime.fromISO('2021-07-20T00:00:00'),
    tags: ['html', 'trick'],
  },
  {
    title: 'Gestion des Indexes Elasticsearch avec cURL',
    slug: 'gestion-des-indexes-elasticsearch-avec-curl',
    body: JSON.stringify({
      time: 1705358566947,
      blocks: [
        {
          id: 'JMSPUfE1Qj',
          type: 'paragraph',
          data: {
            text: "Elasticsearch, un moteur de recherche et d'analyse de données, offre une API robuste pour interagir avec ses indexes. Le code ci-dessous utilise cURL, un outil de ligne de commande pour transférer des données avec différentes URL.",
          },
        },
        { id: 'Ify-_n3vhs', type: 'header', data: { text: 'Lister les Indexes', level: 2 } },
        {
          id: 'Qt_VV08b_z',
          type: 'code',
          data: { language: "shell", code: 'curl "http://localhost:9200/_cat/indices?v"\n' },
        },
        {
          id: 'HJZHUIsN0F',
          type: 'paragraph',
          data: {
            text: 'Cette commande interroge Elasticsearch pour obtenir la liste des indexes actuellement présents. L\'option <code class="inline-code">-X</code> spécifie la méthode HTTP utilisée, dans ce cas, une simple requête GET pour récupérer et afficher les indexes existants.',
          },
        },
        {
          id: '0HfJHYq6aa',
          type: 'header',
          data: { text: 'Supprimer tous les Indexes', level: 2 },
        },
        {
          id: 'Esfhydw_rj',
          type: 'code',
          data: { language: "shell", code: "curl -X DELETE 'http://localhost:9200/_all'\n" },
        },
        {
          id: 'jOxgic5PSN',
          type: 'paragraph',
          data: {
            text: "Ici, en utilisant la méthode HTTP DELETE avec l'URL spécifique <code class=\"inline-code\">/_all</code>, tous les indexes présents sur Elasticsearch seront supprimés. C'est une action à exécuter avec précaution car elle efface l'intégralité des données stockées.",
          },
        },
        {
          id: 'SQIFF1BKnB',
          type: 'header',
          data: { text: 'Supprimer un Index Spécifique', level: 2 },
        },
        {
          id: 'odWqfqD3ce',
          type: 'code',
          data: {
            language: "shell",
            code: 'curl -XDELETE "http://localhost:9200/users_development_20181023170138169"\n',
          },
        },
        {
          id: 'dThXE6OipW',
          type: 'paragraph',
          data: {
            text: 'Cette commande particulière vise à supprimer un index nommé <code class="inline-code">users_development_20181023170138169</code>. En utilisant la méthode DELETE avec l\'URL correspondante à cet index, Elasticsearch effacera toutes les données contenues dans cet index.',
          },
        },
        { id: 'FY5P8ezZzB', type: 'delimiter', data: {} },
        {
          id: 'wOK081pMm8',
          type: 'paragraph',
          data: {
            text: "Ces commandes cURL sont des moyens pratiques pour gérer les indexes Elasticsearch. Assurez-vous de comprendre pleinement l'impact de ces actions, en particulier lors de la suppression d'indexes, car cela peut entraîner la perte permanente de données.",
          },
        },
      ],
      version: '2.28.2',
    }),
    visible: true,
    publishedOn: DateTime.fromISO('2021-07-14T00:00:00'),
    tags: ['elasticsearch', 'trick'],
  },
  {
    title: 'Ajout de Classes CSS en JavaScript',
    slug: 'ajout-de-classes-css-en-javascript',
    body: JSON.stringify({
      time: 1705359004720,
      blocks: [
        {
          id: 'mqNePvoPBX',
          type: 'paragraph',
          data: {
            text: 'Ajouter des classes CSS à des éléments HTML en JavaScript est une opération courante pour modifier dynamiquement le style des éléments. Vous pouvez le faire en utilisant la méthode <code class="inline-code">classList.add()</code> sur les éléments sélectionnés.',
          },
        },
        { id: 'tZ5xIIF2lK', type: 'header', data: { text: '<b>Méthode simple</b>', level: 2 } },
        {
          id: '8GFqSjTtP_',
          type: 'code',
          data: {
            language: "js",
            code: 'const element = document.querySelector("selector");\nelement.classList.add("class"); \n',
          },
        },
        {
          id: 'IFCHlk-Zes',
          type: 'paragraph',
          data: {
            text: 'Dans cet exemple, remplacez <code class="inline-code">"selector"</code> par le sélecteur de l\'élément auquel vous souhaitez ajouter la classe, et <code class="inline-code">"class"</code> par le nom de la classe CSS que vous voulez appliquer.',
          },
        },
        {
          id: 'Gg8hK_G8Ux',
          type: 'header',
          data: { text: '<b>Ajout de plusieurs classes</b>', level: 2 },
        },
        {
          id: 'yStFq90Ea4',
          type: 'paragraph',
          data: {
            text: "Il est également possible d'ajouter plusieurs classes en une seule fois :",
          },
        },
        {
          id: 'ywQcufVngi',
          type: 'code',
          data: {
            language: "js",
            code: 'const firstParagraph = document.querySelector("p");\nfirstParagraph.classList.add("text-center", "text-xxl", "italic"); \n',
          },
        },
        {
          id: 'gMcFok4LS8',
          type: 'paragraph',
          data: {
            text: 'Dans cet exemple, la classe <code class="inline-code">text-center</code>, <code class="inline-code">text-xxl</code>, et <code class="inline-code">italic</code> sont ajoutées à l\'élément p sélectionné. Vous pouvez ajouter autant de classes que nécessaire en les séparant par des virgules.',
          },
        },
        {
          id: 'ShpirKwi9C',
          type: 'paragraph',
          data: {
            text: 'N\'oubliez pas que cette méthode ajoute des classes sans supprimer les classes existantes. Si vous souhaitez retirer une classe, utilisez <code class="inline-code">classList.remove()</code> de manière similaire.',
          },
        },
        { id: 'sWuhPx76Nf', type: 'delimiter', data: {} },
        {
          id: 's5JyW61Axj',
          type: 'paragraph',
          data: {
            text: 'En utilisant ces exemples et en ajustant les sélecteurs et les noms de classe, vous pourrez facilement ajouter des classes CSS à vos éléments HTML en JavaScript.',
          },
        },
      ],
      version: '2.28.2',
    }),
    visible: true,
    publishedOn: DateTime.fromISO('2021-07-07T00:00:00'),
    tags: ['javascript', 'css', 'trick'],
  },
]
