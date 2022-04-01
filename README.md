# json-replace-secrets

Replaces secret placeholders in app config json file with values from vault secret json file

To Install RUN : 
npm i -g json-replace-secrets

To use
1. create a new directory : mkdir replacement
2. Add 2 new files - configfile.json and secretfile.json (Samples available in repository)
3. From the same folder RUN :
    json-replace-secrets -c configfile -s secretfile
