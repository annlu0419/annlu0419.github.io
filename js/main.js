/**
 * 個人網站主要 JavaScript 檔案
 * 包含所有互動功能：導覽、表單驗證、地理定位、動畫等
 */

// ===== 初始化 =====
document.addEventListener('DOMContentLoaded', function () {
    // 初始化 AOS 動畫
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: true,
        offset: 100
    });

    // 初始化所有功能
    initNavigation();
    initSmoothScroll();
    initBackToTop();
    initLocationFeature();
    initStudentsSection();
    initAboutSection();
    initPublicationsSection();
    initWorksSection();
    initAISection();
    initHashRouter();
});

// ===== 導覽列功能 =====
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // 滾動時改變導覽列樣式
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // 高亮當前區塊
        highlightCurrentSection();
    });

    // 漢堡選單切換
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // 點擊導覽連結時關閉選單
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // 點擊外部關閉選單
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// 高亮當前區塊
function highlightCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ===== 平滑捲動 =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // 更新 URL hash
                history.pushState(null, null, href);
            }
        });
    });
}

// ===== 返回頂部按鈕 =====
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}


// ===== 地理定位功能 =====
function initLocationFeature() {
    const getLocationBtn = document.getElementById('getLocationBtn');
    const locationResult = document.getElementById('locationResult');
    const locationActions = document.getElementById('locationActions');
    const copyCoords = document.getElementById('copyCoords');
    const openMaps = document.getElementById('openMaps');

    if (!getLocationBtn) return;

    let currentCoords = null;

    getLocationBtn.addEventListener('click', function () {
        if (!navigator.geolocation) {
            showLocationError('您的瀏覽器不支援地理定位功能');
            return;
        }

        // 顯示載入狀態
        locationResult.classList.add('loading');
        locationResult.innerHTML = '<p>正在獲取位置...</p>';
        getLocationBtn.disabled = true;

        navigator.geolocation.getCurrentPosition(
            // 成功回調
            function (position) {
                currentCoords = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    accuracy: position.coords.accuracy,
                    timestamp: new Date(position.timestamp)
                };

                showLocationSuccess(currentCoords);
            },
            // 錯誤回調
            function (error) {
                let errorMessage = '';
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = '您拒絕了位置權限請求';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = '無法獲取位置資訊';
                        break;
                    case error.TIMEOUT:
                        errorMessage = '獲取位置超時，請重試';
                        break;
                    default:
                        errorMessage = '發生未知錯誤';
                }
                showLocationError(errorMessage);
            },
            // 選項
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    });

    function showLocationSuccess(coords) {
        locationResult.classList.remove('loading');
        locationResult.innerHTML = `
            <div class="location-data">
                <p><strong>緯度：</strong>${coords.lat.toFixed(6)}°</p>
                <p><strong>經度：</strong>${coords.lng.toFixed(6)}°</p>
                <p><strong>精確度：</strong>±${coords.accuracy.toFixed(0)} 公尺</p>
                <p><strong>時間：</strong>${coords.timestamp.toLocaleString('zh-TW')}</p>
            </div>
        `;

        locationActions.style.display = 'flex';
        getLocationBtn.disabled = false;

        // 設置 Google Maps 連結
        openMaps.href = `https://www.google.com/maps?q=${coords.lat},${coords.lng}`;
    }

    function showLocationError(message) {
        locationResult.classList.remove('loading');
        locationResult.innerHTML = `
            <div class="location-error" style="color: var(--error-color);">
                <i class="fas fa-exclamation-circle"></i>
                <p>${message}</p>
            </div>
        `;
        locationActions.style.display = 'none';
        getLocationBtn.disabled = false;
    }

    // 複製座標功能
    copyCoords.addEventListener('click', function () {
        if (!currentCoords) return;

        const coordsText = `${currentCoords.lat}, ${currentCoords.lng}`;

        navigator.clipboard.writeText(coordsText).then(() => {
            const originalText = copyCoords.innerHTML;
            copyCoords.innerHTML = '<i class="fas fa-check"></i> 已複製！';
            copyCoords.style.background = 'var(--success-color)';

            setTimeout(() => {
                copyCoords.innerHTML = originalText;
                copyCoords.style.background = '';
            }, 2000);
        }).catch(err => {
            alert('複製失敗，請手動複製：' + coordsText);
        });
    });
}

// ===== 學生區塊 =====
function initStudentsSection() {
    const studentsContent = document.getElementById('students-content');
    if (!studentsContent) return;

    // 學生資料
    const studentsData = {
        phd: [
            { year: '99', name: '曾俊雅', thesis: '可逆式資訊隱藏方法使用邊緣敏感度分析、不對稱直方圖及雙影像技術', date: '2015/3/25' },
            { year: '105', name: '李韋穎', thesis: '混合式程式語言對國中小學生程式撰寫能力之影響', date: '2024/6' },
            { year: '106', name: 'Nhan 武成仁（越南籍）', thesis: '', date: '' },
            { year: '108', name: 'PRIYANKA CHAND BHATT（印度籍）', thesis: '結合專利分析及顛覆性創新理論進行技術創新評估之結構化框架', date: '2023/7' }
        ],
        master: [
            // 這裡會包含所有碩士生資料（從 blog.html 提取）
            // 為了簡潔，這裡只列出幾個示例
            { year: '95', name: '許儷齡', thesis: '有效的失真控制資訊隱藏方法', date: '2008/7/10' },
            { year: '95', name: '黃政鈞', thesis: '植基於複雜度分析及直方圖預測編碼法之無失真資訊隱藏技術', date: '2008/7/10' },
            // ... 更多碩士生
        ],
        project: [
            '資訊隱藏實驗室管理系統（2007）- 獲得M514展示場地第二名',
            'FARM73放輕鬆銀髮健康促進（2017-2018）- 獲得M516展示場地第二名',
            '榮總導覽系統（2017-2019）- 獲得M515展示場地第一名',
            // ... 更多專題
        ]
    };

    // Tab 切換
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const tab = this.dataset.tab;

            // 更新 active 狀態
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // 顯示對應內容
            renderStudentsContent(tab, studentsData[tab]);
        });
    });

    // 初始顯示博士生
    renderStudentsContent('phd', studentsData.phd);
}

function renderStudentsContent(type, data) {
    const container = document.getElementById('students-content');

    if (type === 'project') {
        // 專題生用列表顯示
        container.innerHTML = `
            <ul class="project-list">
                ${data.map(item => `<li>${item}</li>`).join('')}
            </ul>
        `;
    } else {
        // 博士生和碩士生用表格顯示
        container.innerHTML = `
            <div class="table-responsive">
                <table class="students-table">
                    <thead>
                        <tr>
                            <th>年度</th>
                            <th>姓名</th>
                            <th>論文名稱</th>
                            <th>完成日期</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.map(student => `
                            <tr>
                                <td>${student.year}</td>
                                <td>${student.name}</td>
                                <td>${student.thesis}</td>
                                <td>${student.date}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }
}

// ===== 關於我區塊（Accordion） =====
function initAboutSection() {
    const accordion = document.getElementById('about-accordion');
    if (!accordion || typeof aboutData === 'undefined') return;

    // 準備 Accordion 資料
    const accordionItems = [
        aboutData.academicActivities,
        aboutData.academicHonors,
        aboutData.education,
        aboutData.workExperience,
        aboutData.researchProjects,
        aboutData.patents,
        aboutData.biography
    ];

    // 渲染 Accordion
    accordion.innerHTML = accordionItems.map((item, index) => {
        let content = '';

        // 處理有子區塊的項目（如學術活動）
        if (item.subsections) {
            content = item.subsections.map(sub => `
                <h4>${sub.subtitle}</h4>
                ${sub.content}
            `).join('');
        } else {
            content = item.content;
        }

        return `
            <div class="accordion-item" data-index="${index}">
                <div class="accordion-header">
                    <span>${item.title}</span>
                    <i class="fas fa-chevron-down accordion-icon"></i>
                </div>
                <div class="accordion-content">
                    <div class="accordion-body">
                        ${content}
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // Accordion 互動
    const headers = accordion.querySelectorAll('.accordion-header');
    headers.forEach(header => {
        header.addEventListener('click', function () {
            const item = this.parentElement;
            const isActive = item.classList.contains('active');

            // 關閉所有其他項目（可選：如果要允許多個同時展開，移除這段）
            accordion.querySelectorAll('.accordion-item').forEach(i => {
                i.classList.remove('active');
            });

            // 切換當前項目
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// ===== 論文著作區塊 =====
function initPublicationsSection() {
    const pubContent = document.getElementById('publications-content');
    const searchInput = document.getElementById('pub-search');
    const filterBtns = document.querySelectorAll('.filter-btn');

    if (!pubContent) return;

    // 論文資料（示例，實際應從 contact.html 提取）
    let publicationsData = [
        { type: 'international', title: 'Mining Association Rules...', year: 2001 },
        // ... 更多論文
    ];

    let currentFilter = 'all';
    let currentSearch = '';

    // Filter 按鈕
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            currentFilter = this.dataset.filter;

            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            renderPublications();
        });
    });

    // 搜尋功能
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            currentSearch = this.value.toLowerCase();
            renderPublications();
        });
    }

    function renderPublications() {
        let filtered = publicationsData;

        // 套用 filter
        if (currentFilter !== 'all') {
            filtered = filtered.filter(pub => pub.type === currentFilter);
        }

        // 套用搜尋
        if (currentSearch) {
            filtered = filtered.filter(pub =>
                pub.title.toLowerCase().includes(currentSearch)
            );
        }

        // 渲染結果
        pubContent.innerHTML = filtered.map(pub => `
            <div class="card publication-card">
                <h4>${pub.title}</h4>
                <p class="pub-year">${pub.year}</p>
            </div>
        `).join('');
    }

    // 初始渲染
    renderPublications();
}

// ===== 主要工作區塊 =====
function initWorksSection() {
    const worksContent = document.getElementById('works-content');
    if (!worksContent) return;

    // 從 subdivisions.html 提取的連結資料
    const worksData = [
        { title: '理化科教材', url: 'https://cyut-vr.com.tw/Science/' },
        { title: 'PHP程式設計講義', url: 'https://drive.google.com/drive/folders/1Xi4GAovDU3ashFbvDBbXigGALUcaBTqO' },
        { title: 'Farm 73 網站', url: 'https://cyut-vr.com.tw/Farm73_website/' },
        { title: 'MRI 網站', url: 'https://cyut-vr.com.tw/MRItest/' },
        { title: '榮總導覽系統', url: 'https://cyut-vr.com.tw/Hospital_guide/' },
        // ... 更多連結
    ];

    worksContent.innerHTML = `
        <div class="works-grid">
            ${worksData.map(work => `
                <a href="${work.url}" target="_blank" class="work-card card">
                    <i class="fas fa-external-link-alt"></i>
                    <h4>${work.title}</h4>
                </a>
            `).join('')}
        </div>
    `;
}

// ===== AI 區塊 =====
function initAISection() {
    const aiContent = document.getElementById('ai-content');
    if (!aiContent) return;

    // 這裡可以嵌入 CYUTCI_AI.html 的內容
    // 或者用 iframe
    aiContent.innerHTML = `
        <div class="ai-embed">
            <p>AI 教育內容載入中...</p>
            <a href="CYUTCI_AI.html" target="_blank" class="btn btn-primary">
                查看完整 AI 成果報告
            </a>
        </div>
    `;
}

// ===== Hash Router =====
function initHashRouter() {
    // 處理頁面載入時的 hash
    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
            setTimeout(() => {
                const navHeight = document.getElementById('navbar').offsetHeight;
                window.scrollTo({
                    top: target.offsetTop - navHeight,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }
}

// ===== 工具函數 =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
