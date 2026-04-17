# MAS Figma to Webflow

This project implements a Multi-Agent System (MAS) workflow to automate the conversion of Figma designs to Webflow sites using the Client-First naming convention.

## Agent Roles
- **@Reader (The Scout):** Extracts Figma data, distinguishes between Static Nodes and Instances/Components.
- **@Analyst (The Architect):** Manages logic, decides when to use Classes vs Variables.
- **@Executor (The Builder):** Executes the Webflow build via MCP (Model Context Protocol), utilizing native tools if supported by the IDE, or a generic CLI fallback (`tools/webflow.mjs`).

## Workflow Pipeline
1. **Pre-flight Audit:** Scans existing Webflow Variables & Classes.
2. **Chunked Discovery:** Extracts data section by section.
3. **Logic Analysis:** Creates a structural blueprint.
4. **Human-in-the-loop:** User approves the blueprint.
5. **Execution & Validation:** Builds and validates via Checkpoints.

## Directory Structure
- `agents/`: Agent definitions.
- `knowledge-base/`: Stored learning and styles.
- `skills/`: Specific skills for agents.
- `tools/`: Utility functions.
- `workspace/`: Execution logs and blueprints.
