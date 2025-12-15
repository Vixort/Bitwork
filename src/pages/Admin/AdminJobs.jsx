/**
 * AdminJobs.jsx - Job Management Page
 * ระบบจัดการตำแหน่งงาน: เพิ่ม, ลบ
 */
import React, { useState, useEffect } from "react";
import "./AdminProducts.css"; // Reuse styling
import { fetchJobs, createJob, deleteJob } from "../../lib/api";

const AdminJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [notification, setNotification] = useState({ show: false, message: "", type: "" });

    // Helper: Show Notification
    const showNotification = (message, type = "success") => {
        setNotification({ show: true, message, type });
        setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3000);
    };

    // Load Jobs
    const loadJobs = async () => {
        try {
            const data = await fetchJobs();
            if (data) setJobs(data);
        } catch (error) {
            console.error("Failed to load jobs", error);
            showNotification("โหลดข้อมูลไม่สำเร็จ", "error");
        }
    };

    useEffect(() => {
        loadJobs();
    }, []);

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        company: "Bitwork",
        location: "",
        type: "Full-time",
        level: "Junior",
        salaryMin: "",
        salaryMax: "",
        description: "",
        isRemote: false,
        skills: "",
        benefits: ""
    });

    const resetForm = () => {
        setFormData({
            title: "",
            company: "Bitwork",
            location: "",
            type: "Full-time",
            level: "Junior",
            salaryMin: "",
            salaryMax: "",
            description: "",
            isRemote: false,
            skills: "",
            benefits: ""
        });
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleAddJob = async (e) => {
        e.preventDefault();
        try {
            await createJob(formData);
            showNotification("เพิ่มตำแหน่งงานสำเร็จ!");
            setShowAddModal(false);
            resetForm();
            loadJobs();
        } catch (error) {
            console.error(error);
            showNotification("เพิ่มงานไม่สำเร็จ", "error");
        }
    };

    const handleDeleteJob = async (id) => {
        if (!window.confirm("คุณแน่ใจว่าต้องการลบงานนี้?")) return;
        try {
            await deleteJob(id);
            setJobs(jobs.filter(j => j.id !== id));
            showNotification("ลบงานสำเร็จ!", "warning");
        } catch (error) {
            console.error(error);
            showNotification("ลบงานไม่สำเร็จ", "error");
        }
    };

    const filteredJobs = jobs.filter(job =>
        job?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job?.company?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="admin-products-page"> {/* Reusing class for layout */}
            {notification.show && (
                <div className={`notification ${notification.type}`}>
                    {notification.message}
                </div>
            )}

            <div className="page-header">
                <div className="header-content">
                    <h1>จัดการตำแหน่งงาน</h1>
                    <p>จัดการประกาศรับสมัครงานทั้งหมด</p>
                </div>
                <button className="btn-primary" onClick={() => setShowAddModal(true)}>
                    + เพิ่มตำแหน่งงาน
                </button>
            </div>

            <div className="filters-bar">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="ค้นหาตามชื่อตำแหน่ง หรือ บริษัท..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="products-count">
                    แสดง <strong>{filteredJobs.length}</strong> จาก <strong>{jobs.length}</strong> รายการ
                </div>
            </div>

            {/* Jobs List */}
            <div className="products-container list">
                {filteredJobs.map(job => (
                    <div key={job.id} className="product-card available" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ flex: 1 }}>
                            <h3>{job.title}</h3>
                            <p style={{ color: '#666', fontSize: '0.9rem' }}>{job.company} • {job.type} • {job.location} {job.isRemote ? '(Remote)' : ''}</p>
                            <div style={{ marginTop: '0.5rem' }}>
                                <span className="status-badge active">฿{parseInt(job.salaryMin || 0).toLocaleString()} - ฿{parseInt(job.salaryMax || 0).toLocaleString()}</span>
                            </div>
                        </div>
                        <div className="product-actions">
                            <button className="btn-action delete" onClick={() => handleDeleteJob(job.id)}>
                                ลบ
                            </button>
                        </div>
                    </div>
                ))}

                {filteredJobs.length === 0 && (
                    <div className="empty-state">
                        <p>ไม่พบตำแหน่งงาน</p>
                    </div>
                )}
            </div>

            {/* Add Job Modal */}
            {showAddModal && (
                <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
                    <div className="modal modal-lg" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>เพิ่มตำแหน่งงานใหม่</h3>
                            <button className="btn-close" onClick={() => setShowAddModal(false)}>×</button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleAddJob} className="form-grid">
                                <div className="form-group">
                                    <label>ชื่อตำแหน่ง</label>
                                    <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>บริษัท</label>
                                        <input type="text" name="company" value={formData.company} onChange={handleInputChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>สถานที่</label>
                                        <input type="text" name="location" value={formData.location} onChange={handleInputChange} required />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>ประเภทงาน</label>
                                        <select name="type" value={formData.type} onChange={handleInputChange}>
                                            <option value="Full-time">Full-time</option>
                                            <option value="Part-time">Part-time</option>
                                            <option value="Contract">Contract</option>
                                            <option value="Freelance">Freelance</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>ระดับ</label>
                                        <select name="level" value={formData.level} onChange={handleInputChange}>
                                            <option value="Junior">Junior</option>
                                            <option value="Mid-Level">Mid-Level</option>
                                            <option value="Senior">Senior</option>
                                            <option value="Lead">Lead</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>เงินเดือนต่ำสุด</label>
                                        <input type="number" name="salaryMin" value={formData.salaryMin} onChange={handleInputChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>เงินเดือนสูงสุด</label>
                                        <input type="number" name="salaryMax" value={formData.salaryMax} onChange={handleInputChange} required />
                                    </div>
                                </div>
                                <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                                    <input type="checkbox" name="isRemote" checked={formData.isRemote} onChange={handleInputChange} style={{ width: 'auto' }} />
                                    <label style={{ marginBottom: 0 }}>Remote Work</label>
                                </div>
                                <div className="form-group">
                                    <label>รายละเอียดงาน</label>
                                    <textarea name="description" value={formData.description} onChange={handleInputChange} rows="4" required></textarea>
                                </div>
                                <div className="form-group">
                                    <label>ทักษะ (คั่นด้วย comma)</label>
                                    <input type="text" name="skills" value={formData.skills} onChange={handleInputChange} placeholder="React, Node.js, SQL" />
                                </div>
                                <div className="form-group">
                                    <label>สวัสดิการ (คั่นด้วย comma)</label>
                                    <input type="text" name="benefits" value={formData.benefits} onChange={handleInputChange} placeholder="ประกันสุขภาพ, โบนัส, Work from home" />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn-secondary" onClick={() => setShowAddModal(false)}>ยกเลิก</button>
                                    <button type="submit" className="btn-primary">บันทึก</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminJobs;
