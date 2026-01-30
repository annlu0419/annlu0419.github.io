// ========================================
// Main SPA Application
// ========================================

(function () {
    'use strict';

    // ========================================
    // State Management
    // ========================================
    const state = {
        currentSection: 'home',
        isMenuOpen: false,
        studentsData: null,
        publicationsData: null
    };

    // ========================================
    // DOM Elements
    // ========================================
    const elements = {
        loadingScreen: document.getElementById('loading-screen'),
        navbar: document.getElementById('navbar'),
        navToggle: document.getElementById('navToggle'),
        navMenu: document.getElementById('navMenu'),
        navLinks: document.querySelectorAll('.nav-link'),
        backToTop: document.getElementById('backToTop'),
        sections: document.querySelectorAll('.section'),

        // Geolocation
        getLocationBtn: document.getElementById('getLocationBtn'),
        locationResult: document.getElementById('locationResult'),
        locationError: document.getElementById('locationError'),
        locationLoading: document.getElementById('locationLoading'),
        copyCoords: document.getElementById('copyCoords'),
        openMap: document.getElementById('openMap'),

        // Filters
        studentSearch: document.getElementById('studentSearch'),
        publicationSearch: document.getElementById('publicationSearch')
    };

    // ========================================
    // Router Module
    // ========================================
    const Router = {
        init() {
            window.addEventListener('hashchange', this.handleRoute.bind(this));
            window.addEventListener('load', this.handleRoute.bind(this));
        },

        handleRoute() {
            const hash = window.location.hash.slice(1) || 'home';
            this.navigateTo(hash);
        },

        navigateTo(sectionId) {
            const section = document.getElementById(sectionId);
            if (!section) {
                sectionId = 'home';
            }

            state.currentSection = sectionId;
            this.updateActiveNav(sectionId);
            this.scrollToSection(sectionId);

            // Close mobile menu if open
            if (state.isMenuOpen) {
                Navigation.toggleMenu();
            }
        },

        scrollToSection(sectionId) {
            const section = document.getElementById(sectionId);
            if (section) {
                const navHeight = elements.navbar.offsetHeight;
                const sectionTop = section.offsetTop - navHeight;
                window.scrollTo({
                    top: sectionTop,
                    behavior: 'smooth'
                });
            }
        },

        updateActiveNav(sectionId) {
            elements.navLinks.forEach(link => {
                const href = link.getAttribute('href').slice(1);
                if (href === sectionId) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
    };

    // ========================================
    // Navigation Module
    // ========================================
    const Navigation = {
        init() {
            elements.navToggle.addEventListener('click', this.toggleMenu.bind(this));
            elements.navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const href = link.getAttribute('href');
                    window.location.hash = href;
                });
            });

            // Scroll spy
            window.addEventListener('scroll', this.handleScroll.bind(this));
        },

        toggleMenu() {
            state.isMenuOpen = !state.isMenuOpen;
            elements.navMenu.classList.toggle('active');
            elements.navToggle.classList.toggle('active');
        },

        handleScroll() {
            // Navbar shadow on scroll
            if (window.scrollY > 50) {
                elements.navbar.classList.add('scrolled');
            } else {
                elements.navbar.classList.remove('scrolled');
            }

            // Back to top button
            if (window.scrollY > 300) {
                elements.backToTop.classList.add('visible');
            } else {
                elements.backToTop.classList.remove('visible');
            }

            // Update active nav based on scroll position
            this.updateActiveNavOnScroll();
        },

        updateActiveNavOnScroll() {
            const navHeight = elements.navbar.offsetHeight;
            const scrollPosition = window.scrollY + navHeight + 100;

            elements.sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    const sectionId = section.getAttribute('id');
                    if (sectionId !== state.currentSection) {
                        state.currentSection = sectionId;
                        Router.updateActiveNav(sectionId);
                        // Update hash without scrolling
                        history.replaceState(null, null, `#${sectionId}`);
                    }
                }
            });
        }
    };

    // ========================================
    // Accordion Module
    // ========================================
    const Accordion = {
        init() {
            const accordionHeaders = document.querySelectorAll('.accordion-header');
            accordionHeaders.forEach(header => {
                header.addEventListener('click', this.toggle.bind(this, header));
            });
        },

        toggle(header) {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');

            // Close all accordion items
            document.querySelectorAll('.accordion-item').forEach(accItem => {
                accItem.classList.remove('active');
            });

            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        }
    };

    // ========================================
    // Filter Module
    // ========================================
    const Filter = {
        init() {
            // Student filter
            const studentFilterBtns = document.querySelectorAll('#blog .filter-btn');
            studentFilterBtns.forEach(btn => {
                btn.addEventListener('click', this.filterStudents.bind(this, btn));
            });

            if (elements.studentSearch) {
                elements.studentSearch.addEventListener('input', this.searchStudents.bind(this));
            }

            // Publication filter
            const publicationFilterBtns = document.querySelectorAll('#contact .filter-btn');
            publicationFilterBtns.forEach(btn => {
                btn.addEventListener('click', this.filterPublications.bind(this, btn));
            });

            if (elements.publicationSearch) {
                elements.publicationSearch.addEventListener('input', this.searchPublications.bind(this));
            }
        },

        filterStudents(btn) {
            const filter = btn.getAttribute('data-filter');

            // Update active button
            document.querySelectorAll('#blog .filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter categories
            const categories = document.querySelectorAll('.student-category');
            categories.forEach(category => {
                const categoryType = category.getAttribute('data-category');
                if (filter === 'all' || filter === categoryType) {
                    category.style.display = 'block';
                } else {
                    category.style.display = 'none';
                }
            });
        },

        searchStudents() {
            const searchTerm = elements.studentSearch.value.toLowerCase();
            const tables = document.querySelectorAll('.student-table tbody');

            tables.forEach(tbody => {
                const rows = tbody.querySelectorAll('tr');
                rows.forEach(row => {
                    const text = row.textContent.toLowerCase();
                    if (text.includes(searchTerm)) {
                        row.style.display = '';
                    } else {
                        row.style.display = 'none';
                    }
                });
            });

            // Also search in project list
            const projectItems = document.querySelectorAll('.project-list li');
            projectItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        },

        filterPublications(btn) {
            const filter = btn.getAttribute('data-filter');

            // Update active button
            document.querySelectorAll('#contact .filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter categories
            const categories = document.querySelectorAll('.publication-category');
            categories.forEach(category => {
                const categoryType = category.getAttribute('data-category');
                if (filter === 'all' || filter === categoryType) {
                    category.style.display = 'block';
                } else {
                    category.style.display = 'none';
                }
            });
        },

        searchPublications() {
            const searchTerm = elements.publicationSearch.value.toLowerCase();
            const lists = document.querySelectorAll('.publication-list');

            lists.forEach(list => {
                const items = list.querySelectorAll('li, .publication-item');
                items.forEach(item => {
                    const text = item.textContent.toLowerCase();
                    if (text.includes(searchTerm)) {
                        item.style.display = '';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        }
    };

    // ========================================
    // Geolocation Module
    // ========================================
    const Geolocation = {
        currentPosition: null,

        init() {
            if (elements.getLocationBtn) {
                elements.getLocationBtn.addEventListener('click', this.getLocation.bind(this));
            }

            if (elements.copyCoords) {
                elements.copyCoords.addEventListener('click', this.copyCoordinates.bind(this));
            }
        },

        getLocation() {
            if (!navigator.geolocation) {
                this.showError('您的瀏覽器不支援地理定位功能');
                return;
            }

            this.showLoading();

            navigator.geolocation.getCurrentPosition(
                this.handleSuccess.bind(this),
                this.handleError.bind(this),
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                }
            );
        },

        handleSuccess(position) {
            this.currentPosition = position;
            this.hideLoading();
            this.showResult(position);
        },

        handleError(error) {
            this.hideLoading();

            let message = '';
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    message = '使用者拒絕提供位置資訊';
                    break;
                case error.POSITION_UNAVAILABLE:
                    message = '無法取得位置資訊';
                    break;
                case error.TIMEOUT:
                    message = '取得位置資訊逾時';
                    break;
                default:
                    message = '發生未知錯誤';
            }

            this.showError(message);
        },

        showResult(position) {
            const { latitude, longitude, accuracy } = position.coords;
            const timestamp = new Date(position.timestamp);

            document.getElementById('latitude').textContent = latitude.toFixed(6);
            document.getElementById('longitude').textContent = longitude.toFixed(6);
            document.getElementById('accuracy').textContent = `${accuracy.toFixed(2)} 公尺`;
            document.getElementById('timestamp').textContent = timestamp.toLocaleString('zh-TW');

            // Update Google Maps link
            const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
            elements.openMap.setAttribute('href', mapsUrl);

            elements.locationResult.classList.remove('hidden');
            elements.locationError.classList.add('hidden');
        },

        showError(message) {
            document.getElementById('errorMessage').textContent = message;
            elements.locationError.classList.remove('hidden');
            elements.locationResult.classList.add('hidden');
        },

        showLoading() {
            elements.locationLoading.classList.remove('hidden');
            elements.locationResult.classList.add('hidden');
            elements.locationError.classList.add('hidden');
        },

        hideLoading() {
            elements.locationLoading.classList.add('hidden');
        },

        copyCoordinates() {
            if (!this.currentPosition) return;

            const { latitude, longitude } = this.currentPosition.coords;
            const coords = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;

            navigator.clipboard.writeText(coords).then(() => {
                // Show success feedback
                const originalText = elements.copyCoords.innerHTML;
                elements.copyCoords.innerHTML = '<i class="fas fa-check"></i> 已複製!';
                elements.copyCoords.disabled = true;

                setTimeout(() => {
                    elements.copyCoords.innerHTML = originalText;
                    elements.copyCoords.disabled = false;
                }, 2000);
            }).catch(err => {
                console.error('複製失敗:', err);
                alert('複製失敗,請手動複製座標');
            });
        }
    };

    // ========================================
    // Data Loading Module
    // ========================================
    const DataLoader = {
        init() {
            this.loadMasterStudents();
            this.loadProjectStudents();
            this.loadAboutData();
        },

        loadMasterStudents() {
            const masterStudents = [
                { year: '95', name: '許儷齡', thesis: '有效的失真控制資訊隱藏方法<br><em>Information Hiding Techniques Based on Effective Distortion Control Method</em>', date: '2008/7/10' },
                { year: '95', name: '黃政鈞', thesis: '植基於複雜度分析及直方圖預測編碼法之無失真資訊隱藏技術<br><em>Lossless Information Hiding Schemes Based on Pixels Complexity Analysis and Histogram of Predicted Coding</em>', date: '2008/7/10' },
                { year: '95', name: '吳昆益', thesis: '植基於類神經網路之顧客交易特徵分析機制<br><em>Customer Transactions Analysis Mechanism Based on Neural Network</em>', date: '2008/7/10' },
                { year: '96', name: '蔡承翰', thesis: '植基於整數轉換函式及預測編碼之可逆式資訊隱藏技術<br><em>Lossless Data Hiding Schemes Based on Integer Transform Function and Predicted Coding</em>', date: '2009/6/24' },
                { year: '96', name: '陳培倫', thesis: '有效利用整數小波轉換及區間間隔之資訊隱藏技術<br><em>Efficient Information Hiding Techniques based on Integer Wavelet Transform and Interval Expansion</em>', date: '2009/6/24' },
                { year: '96', name: '黃英軒', thesis: '結合差值擴張與直方圖修改法之無失真資訊隱藏技術<br><em>Lossless Data Embedding Schemes Based on Difference Expansion and Histogram Modification</em>', date: '2009/6/24' },
                { year: '97', name: '廖湘如', thesis: '生物基因序列之資訊隱藏方法<br><em>Information Hiding Schemes Applied to Biological Gene Sequences</em>', date: '2010/7/15' },
                { year: '97', name: '張鈞名', thesis: '以灰階影像區塊切割及模數函式為基礎之資訊隱藏技術<br><em>Information Hiding Schemes Based on the Block Segmentation and Modulus Function</em>', date: '2010/7/15' },
                { year: '98', name: '曾俊雅', thesis: '血液透析關鍵因子分析及透析病患分群技術', date: '2011/7/28' },
                { year: '98', name: '賴仕杰', thesis: '醫實驗室試劑耗材管理及需求預測資訊系統', date: '2012/7/13' }
            ];

            const tbody = document.getElementById('masterStudentsList');
            if (tbody) {
                tbody.innerHTML = masterStudents.map(student => `
                    <tr>
                        <td>${student.year}</td>
                        <td>${student.name}</td>
                        <td>${student.thesis}</td>
                        <td>${student.date}</td>
                    </tr>
                `).join('');
            }
        },

        loadProjectStudents() {
            const projects = [
                '資訊隱藏實驗室管理系統 (2007/5資管系畢業成果展、地點：朝陽科技大學，9454072林姿慜、9454062李冠樺、9454071林冠君、9454074伍芳慧、9454076呂慧君等五員)，獲得M514展示場地第二名。',
                '適用於生物基因序列之資訊隱藏技術，(2007/2-2008/6)，郭怡妤、張孟婷、王姿婷、廖湘如、莊琬婷、林曉吟等六員。',
                '可視數位浮水印，(2007/7-2008/12)，陳婉柔、溫晴芳、陳 欣、張碩桓、李偉瑄等五員。',
                '總鋪師餐飲管理系統，(2008/7-2009/12)，許峰誠、陳詠周、賴韋婷、劉泰佑、黃詩婷、江書瑋等六員。',
                'FARM73放輕鬆銀髮健康促進，(2017/7-2018/12)，10414046楊秉中、10414097楊益聖、10414100戴廷軒、10414130龍佩筠、10414148李慧筠 獲得M516展示場地第二名，資訊學院M212展示場地第一名'
            ];

            const projectList = document.getElementById('projectList');
            if (projectList) {
                projectList.innerHTML = `<ul>${projects.map(p => `<li>${p}</li>`).join('')}</ul>`;
            }
        },

        loadAboutData() {
            // Load research projects
            const researchProjects = [
                { no: 1, name: '資訊隱藏技術之研究', period: '2006.10.01-2007.09.30', code: 'NSC 95-2218-E-324-001-', sponsor: '國科會', amount: '428000' },
                { no: 2, name: '無失真資訊隱藏方法與偽裝影像品質控制機制', period: '2007.08.01-2008.09.30', code: 'NSC 96-2221-E-324-048-', sponsor: '國科會', amount: '496000' },
                { no: 3, name: '可逆式資訊隱藏技術及其應用於影像內容驗證與影片智慧財產權保護', period: '2008.08.01-2009.10.30', code: 'NSC 97-2221-E-324 -008', sponsor: '國科會', amount: '591000' }
            ];

            const researchList = document.getElementById('researchList');
            if (researchList) {
                researchList.innerHTML = researchProjects.map(r => `
                    <tr>
                        <td>${r.no}</td>
                        <td>${r.name}</td>
                        <td>${r.period}</td>
                        <td>${r.code}</td>
                        <td>${r.sponsor}</td>
                        <td>${r.amount}</td>
                    </tr>
                `).join('');
            }
        }
    };

    // ========================================
    // Utility Functions
    // ========================================
    const Utils = {
        debounce(func, wait) {
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
    };

    // ========================================
    // Initialization
    // ========================================
    function init() {
        // Hide loading screen
        setTimeout(() => {
            elements.loadingScreen.classList.add('hidden');
        }, 500);

        // Initialize modules
        Router.init();
        Navigation.init();
        Accordion.init();
        Filter.init();
        Geolocation.init();
        DataLoader.init();

        // Initialize AOS (Animate On Scroll)
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-out',
                once: true,
                offset: 100
            });
        }

        // Back to top button
        if (elements.backToTop) {
            elements.backToTop.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }

        // Smooth scroll for all internal links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href !== '#' && href.length > 1) {
                    e.preventDefault();
                    window.location.hash = href;
                }
            });
        });
    }

    // Start the application when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
