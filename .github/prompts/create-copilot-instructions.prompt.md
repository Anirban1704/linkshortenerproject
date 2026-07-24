---
name: create-copilot-instructions
agent: instructions-generator
description: Custom prompt to generate a new instructions file for the project.
---

Take the information below and generate a [NAME].instructions.md file in the /.github/instructions/ directory. Generate an appropriate name for the [NAME] placeholder based on the generated content. Make sure the instructions are concise and not too long. If no information is provided below, prompt the user to give necessary information about the layer of architecture or coding standards to generate the instructions file. The .md file should have front matter with the following attributes: name, description that informs copilot when to use this set of instructions.


