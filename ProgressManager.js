const fs = require('fs');
const path = require('path');

/**
 * ProgressManager - Quản lý tiến độ build trang Webflow.
 * Giúp AI ghi nhớ các phần đã hoàn thành để tránh lặp lại công việc.
 */
class ProgressManager {
    /**
     * @param {string} pageName - Tên slug của trang (ví dụ: 'home', 'about').
     */
    constructor(pageName) {
        if (!pageName) throw new Error("Cần cung cấp pageName để khởi tạo bộ nhớ.");

        // Chuẩn hóa tên file: wf_progress_home.json
        this.fileName = `wf_progress_${pageName.replace(/\//g, '')}.json`;
        this.filePath = path.join(process.cwd(), this.fileName);
        this.data = this.loadProgress();
    }

    /**
     * Tải dữ liệu từ file vật lý nếu tồn tại.
     */
    loadProgress() {
        if (fs.existsSync(this.filePath)) {
            try {
                return JSON.parse(fs.readFileSync(this.filePath, 'utf8'));
            } catch (error) {
                return this.getEmptyState();
            }
        }
        return this.getEmptyState();
    }

    /**
     * Khởi tạo cấu trúc dữ liệu mặc định cho một trang mới.
     */
    getEmptyState() {
        return {
            page_slug: this.fileName.replace('wf_progress_', '').replace('.json', ''),
            style_guide_synced: false,
            completed_sections: [], // Danh sách các section đã build thành công
            last_updated: new Date().toISOString()
        };
    }

    /**
     * Đánh dấu một section đã hoàn thành. 
     * AI nên gọi phương thức này sau mỗi lệnh builder thành công.
     * @param {string} sectionName - Tên của section (ví dụ: 'section_hero').
     * @param {string|object} elementId - ID của element gốc của section.
     */
    markSectionComplete(sectionName, elementId = null) {
        if (!this.isSectionDone(sectionName)) {
            this.data.completed_sections.push({
                name: sectionName,
                id: elementId,
                timestamp: new Date().toISOString()
            });
            this.save();
            return true;
        }
        return false;
    }

    /**
     * Kiểm tra một section đã được build chưa.
     */
    isSectionDone(sectionName) {
        return this.data.completed_sections.some(s => s.name === sectionName);
    }

    /**
     * Lưu trạng thái xuống file JSON.
     */
    save() {
        this.data.last_updated = new Date().toISOString();
        fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2));
    }
}

module.exports = ProgressManager;