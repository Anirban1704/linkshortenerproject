---
name: create-instructions
agent: instructions-generator
description: For a given layer of architecture or coding standards within this app, generate a concise and clear .md instructions file in the /docs directory.
---
Take the information below and generate an agent instructions .md file in the /docs directory. If a .md filename is provided, use that, otherwise generate an appropiate filename based on the generated content. Make sure the instructions are concise and not too long. Make sure to update the AGENTS.md file to reference the new instructions file. Make sure to follow the existing style and structure of the other .md files in the /docs directory. If no information is provided below, prompt the user to give necessary information about the layer of architecture or coding standards to generate the instructions file.