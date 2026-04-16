/**
 * UTILS.JS - The High-Performance Engine for Figma-to-Webflow MAS
 * Optimized for: Variable-First, Alpha Channel Sensing, & Webflow API Compliance.
 */

const CONFIG = {
  baseFontSize: 16,
  snapThreshold: 2, // px - Ngưỡng để bắt đầu snap
  colorThreshold: 15, // Ngưỡng hòa hợp màu sắc (Euclidean)
  // Scale chuẩn cho Client-First, bảo vệ các giá trị nhỏ (0, 1, 2)
  spacingScale: [0, 1, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128]
};

const Utils = {
  /**
   * 1. CONVERSION: PX TO REM
   * Đảm bảo số thập phân sạch và không có số 0 thừa.
   */
  toRem: (px, base = CONFIG.baseFontSize) => {
    const value = parseFloat(px);
    if (isNaN(value) || value === 0) return "0rem";
    // Giới hạn 3 chữ số thập phân và xóa số 0 vô nghĩa ở cuối
    return `${(value / base).toFixed(3).replace(/\.?0+$/, "")}rem`;
  },

  /**
   * 2. LOGIC: SMART SNAP
   * Đưa giá trị về grid 4px/8px nhưng bảo vệ Border-width (1px, 2px).
   */
  snapValue: (px) => {
    const val = parseFloat(px);
    if (isNaN(val)) return 0;
    if (val <= CONFIG.snapThreshold) return val; // Không snap border/stroke nhỏ
    
    const closest = CONFIG.spacingScale.reduce((prev, curr) => 
      Math.abs(curr - val) < Math.abs(prev - val) ? curr : prev
    );
    
    // Chỉ snap nếu độ lệch nằm trong ngưỡng cho phép
    return Math.abs(closest - val) <= CONFIG.snapThreshold ? closest : val;
  },

  /**
   * 3. COLOR: ADVANCED HARMONIZATION
   * Hỗ trợ RGBA và tính khoảng cách màu bao gồm độ trong suốt.
   * Công thức Euclidean: $$d = \sqrt{(r_2-r_1)^2 + (g_2-g_1)^2 + (b_2-b_1)^2 + (a_2-a_1)^2}$$
   */
  parseColor: (input) => {
    // Xử lý object màu trực tiếp từ Figma API {r, g, b, a} (0-1)
    if (typeof input === 'object' && input.r !== undefined) {
      return {
        r: Math.round(input.r * 255),
        g: Math.round(input.g * 255),
        b: Math.round(input.b * 255),
        a: input.a !== undefined ? parseFloat(input.a.toFixed(2)) : 1
      };
    }
    // Xử lý chuỗi HEX (hỗ trợ cả 3, 6, 8 ký tự)
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
      Math.pow((c2.a - c1.a) * 255, 2) // Cân bằng trọng số Alpha
    );
  },

  shouldHarmonize: (color1, color2) => {
    return Utils.getColorDistance(color1, color2) <= CONFIG.colorThreshold;
  },

  /**
   * 4. NAMING: API-SAFE SLUGIFY
   * Đảm bảo tên Class/Variable không bao giờ làm gãy Webflow API.
   */
  slugify: (str) => {
    if (!str) return "";
    return str
      .toLowerCase()
      .trim()
      .normalize("NFD") // Khử dấu tiếng Việt
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "") 
      .replace(/[\s_]+/g, "-") // Chuyển gạch dưới và khoảng trắng thành gạch ngang
      .replace(/-+/g, "-");
  },

  /**
   * 5. STRUCTURE: CLASS INTENT BUILDER
   * Tách biệt Base và Modifiers để Executor có thể map sang Webflow Class IDs.
   */
  generateClassIntent: (folder, part, modifiers = []) => {
    const base = `${Utils.slugify(folder)}_${Utils.slugify(part)}`;
    const cleanModifiers = modifiers
      .filter(m => m)
      .map(m => `is-${Utils.slugify(m)}`);
    
    return {
      base: base, // Dùng để tìm kiếm ID của Class chính
      modifiers: cleanModifiers, // Dùng để tìm kiếm ID của các Combo Classes
      fullPath: [base, ...cleanModifiers].join(".") // Chỉ dùng để log/audit cho User
    };
  }
};

module.exports = Utils;