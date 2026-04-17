const fs = require('fs');

try {
  const dataStr = fs.readFileSync('workspace/webflow-data.json', 'utf8');
  const data = JSON.parse(dataStr);
  
  const stylesRaw = data.styles.content[0].text;
  const stylesParsed = JSON.parse(stylesRaw);
  
  if (stylesParsed[0] && stylesParsed[0].status === 'success') {
    const webflowStyles = stylesParsed[0].data;
    
    // Load existing style guide map if available
    let styleGuide = {};
    if (fs.existsSync('knowledge-base/style-guide-map.json')) {
        try {
            const existingStr = fs.readFileSync('knowledge-base/style-guide-map.json', 'utf8');
            if(existingStr) {
                styleGuide = JSON.parse(existingStr);
            }
        } catch(e) {}
    }

    const mapping = {
      variables: {},
      classes: {}
    };

    webflowStyles.forEach(style => {
      mapping.classes[style.name] = {
        id: style.id,
        isComboClass: style.isComboClass,
        properties: style.properties
      };
    });

    // Update style guide map
    styleGuide.webflow_mapping = mapping;

    fs.writeFileSync('knowledge-base/style-guide-map.json', JSON.stringify(styleGuide, null, 2));
    console.log("Successfully mapped Webflow styles into knowledge-base/style-guide-map.json");
  } else {
    console.error("Failed to parse success status from styles data.");
  }
} catch(e) {
  console.error("Error processing workspace/webflow-data.json:", e);
}
