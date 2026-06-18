const fs = require('fs');
const path = require('path');

const colorMap = {
  '#F5F9F5': 'APP_COLORS.base',
  '#FFFFFF': 'APP_COLORS.surface',
  '#EDF5ED': 'APP_COLORS.elevated',
  '#E2EFE2': 'APP_COLORS.sunken',
  '#C8E0C8': 'APP_COLORS.border',
  '#1A3A0F': 'APP_COLORS.primary',
  '#3D6B28': 'APP_COLORS.secondary',
  '#6B9E50': 'APP_COLORS.muted',
  '#A8C896': 'APP_COLORS.disabled',
  '#2E8B4E': 'APP_COLORS.green.DEFAULT',
  '#1F6B38': 'APP_COLORS.green.dark',
  '#E85454': 'APP_COLORS.danger',
  '#E8A020': 'APP_COLORS.warning',
  '#F5A623': 'APP_COLORS.gold',
};

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;
      
      for (const [hex, appColor] of Object.entries(colorMap)) {
        // 1. color="#HEX" -> color={APP_COLORS.xxx}
        const regex1 = new RegExp(`(\\w+)="${hex}"`, 'gi');
        if (regex1.test(content)) {
          content = content.replace(regex1, `$1={${appColor}}`);
          modified = true;
        }

        // 2. '#HEX' or "#HEX"
        const regex2 = new RegExp(`['"]${hex}['"]`, 'gi');
        if (regex2.test(content)) {
          content = content.replace(regex2, appColor);
          modified = true;
        }
      }
      
      if (modified) {
        if (!content.includes('import { APP_COLORS }')) {
          content = `import { APP_COLORS } from '@shared/constants/theme';\n` + content;
        }
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Refactored: ' + fullPath);
      }
    }
  }
}

processDirectory('./src/features');
