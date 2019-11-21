# app-questionnaire-vue

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

28/10/2019:
Objectif : Créer un questionnaire dynamique et finir l'enregistrement des utilisateurs
- Objectif atteint : Enregistrement des utilisateurs dans coucheDB

19/11/2019:
Objectif: finir l'application et amélioration du compte admin
- Objectif atteint : Finition totale de l'application et amélioration de l'espace admin

L'admin à la possibilité de regarder le résultat des utilisateurs avec un détail 
pour chaque utilisateur ayant répondu au questionnaire
de toute les questions aux quelles il a répondu.

Info sur l'application:
Le mot de passe admin est : admin

Info pouchdb

Pour avoir toute la configuration de pouchdb sur le github 
Pour que le site fonctionne il faut créer (sur pouchdb):
- Une table config : Pour cela il faut copier le fichier src/utils/a45067be05ced19ec4fde4e0d2000ce0.json
Le contenu se trouve à l'intérieur du fichier

- Pour finir il faut créer une table users 

Si un problème avant de faire un scandale :joy: envoie moi un msg au 06 64 96 40 31

Dans pouchdb il faut ajouter "baptistemagoni.github.io" dans les configuration de pouchdb 
(il faut aller dans l'oglet config et ensuite dans cors et l'ajouter en nom de domaine)

Attention : Sans cette configuration le site ne fonctionnera pas
