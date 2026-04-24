/**
 * UTILS.JS - The High-Performance Engine for Finsweet Client-First MAS
 * Optimized for: Visual Fidelity 1:1, Unit Safety (REM), & Layout Translation.
 */

const CONFIG = {
  baseFontSize: 16,
  colorThreshold: 15, // Ngưỡng hòa hợp màu sắc (Euclidean)
  // Scale chuẩn Finsweet Client-First cho spacing
  spacingScale: {
    tiny: 4,
    small: 8,
    medium: 16,
    large: 32,
    huge: 64,
    "section-small": 40,
    "section-medium": 80,
    "section-large": 120
  }
};

const Utils = {
  /**
   * 1. CONVERSION: PX TO REM
   * Hỗ trợ số đơn, chuỗi (vd: "20px 40px"), hoặc mảng.
   */
  toRem: (input) => {
    if (input === undefined || input === null) return "0rem";

    const convert = (val) => {
      const num = parseFloat(val);
      if (isNaN(num) || num === 0) return "0rem";
      return `${(num / CONFIG.baseFontSize).toFixed(3).replace(/\.?0+$/, "")}rem`;
    };

    if (Array.isArray(input)) {
      return input.map(v => convert(v)).join(" ");
    }

    if (typeof input === 'string' && input.includes(" ")) {
      return input.split(" ").map(v => convert(v)).join(" ");
    }

    return convert(input);
  },

  /**
   * 2. NAMING: CLIENT-FIRST SLUGIFY
   * Khử dấu tiếng Việt, giữ lại dấu gạch dưới (_) cho Custom Class.
   */
  slugify: (str) => {
    if (!str) return "";
    return str
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-_]/g, "") // Cho phép dấu gạch dưới (_)
      .replace(/\s+/g, "-") // Chỉ chuyển khoảng trắng thành gạch ngang
      .replace(/-+/g, "-");
  },

  /**
   * 3. CLASS FORMATTER
   * Định dạng class theo đúng chuẩn Finsweet Client-First.
   */
  formatClass: (prefix, element = null, isUtility = false) => {
    const cleanPrefix = Utils.slugify(prefix);
    if (isUtility) {
      return cleanPrefix; // Utility class chỉ dùng gạch ngang
    }
    const cleanElement = element ? Utils.slugify(element) : "";
    return cleanElement ? `${cleanPrefix}_${cleanElement}` : cleanPrefix;
  },

  /**
   * 4. LAYOUT MAPPING: FIGMA TO WEBFLOW
   * Dịch thuộc tính Auto Layout sang CSS Flexbox/Grid.
   */
  mapLayout: {
    flex: (figmaProps) => {
      const mapping = {
        PRIMARY: { START: 'flex-start', CENTER: 'center', END: 'flex-end', SPACE_BETWEEN: 'space-between' },
        COUNTER: { START: 'flex-start', CENTER: 'center', END: 'flex-end', STRETCH: 'stretch' }
      };

      return {
        display: 'flex',
        direction: figmaProps.direction === 'VERTICAL' ? 'column' : 'row',
        justify: mapping.PRIMARY[figmaProps.primaryAxisAlignItems] || 'flex-start',
        align: mapping.COUNTER[figmaProps.counterAxisAlignItems] || 'stretch',
        gap: Utils.toRem(figmaProps.itemSpacing || 0)
      };
    },
    sizing: (figmaValue) => {
      if (figmaValue === 'FIXED') return 'fixed';
      if (figmaValue === 'FILL') return '100%';
      if (figmaValue === 'HUG') return 'auto';
      return 'auto';
    }
  },

  /**
   * 5. COLOR: ADVANCED HARMONIZATION
   */
  parseColor: (input) => {
    if (typeof input === 'object' && input.r !== undefined) {
      return {
        r: Math.round(input.r * 255),
        g: Math.round(input.g * 255),
        b: Math.round(input.b * 255),
        a: input.a !== undefined ? parseFloat(input.a.toFixed(2)) : 1
      };
    }
    if (typeof input === 'string') return Utils.hexToRgba(input);
    return null;
  },

  hexToRgba: (hex) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b, a) => 
      r + r + g + g + b + b + (a ? a + a : "")
    );
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
      a: result[4] ? parseFloat((parseInt(result[4], 16) / 255).toFixed(2)) : 1
    } : null;
  },

  getColorDistance: (color1, color2) => {
    const c1 = Utils.parseColor(color1);
    const c2 = Utils.parseColor(color2);
    if (!c1 || !c2) return 1000;
    return Math.sqrt(
      Math.pow(c2.r - c1.r, 2) +
      Math.pow(c2.g - c1.g, 2) +
      Math.pow(c2.b - c1.b, 2) +
      Math.pow((c2.a - c1.a) * 255, 2)
    );
  }
};

module.exports = Utils;