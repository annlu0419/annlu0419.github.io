/**
 * 關於我區塊的完整資料
 * 從 about.html 提取的所有內容
 */

const aboutData = {
    academicActivities: {
        title: '學術活動',
        subsections: [
            {
                subtitle: 'Session Chair',
                content: `
                    <ol>
                        <li>第十六屆全國資訊安全會議，2006，台中，台灣</li>
                        <li>第九屆國際聯合資訊科技會議，2006，高雄，台灣</li>
                        <li>2007年資訊科技國際研討會，2007，台中，台灣</li>
                        <li>2009年第十四屆人工智慧與應用研討會，台中，台灣</li>
                        <li>2010年資訊科技國際研討會，2010，台中，台灣</li>
                        <li>2011年資訊科技國際研討會，2011，台中，台灣</li>
                        <li>2011民生電子研討會(WCE2011)，2011，台中，台灣</li>
                        <li>2013年資訊科技國際研討會，2013，台中，台灣</li>
                        <li>2014 第二十五屆國際資訊管理學術研討會，台中，台灣</li>
                        <li>The Twelfth International Conference on Intelligent Information Hiding and Multimedia Signal Processing, Kaohsiung, Taiwan, 2016</li>
                        <li>第二十九屆全國資訊安全會議</li>
                        <li>2023 IEEE International Conference on Consumer Electronics – Taiwan, 2023</li>
                    </ol>
                `
            },
            {
                subtitle: 'Program Committing Chair',
                content: `
                    <ol>
                        <li>2015 The Eleventh International Conference on Intelligent Information Hiding and Multimedia Signal Processing, Adelaide, Australia</li>
                        <li>2023 the 2nd International Conference on Network Security and Blockchain Technology (ICNSBT 2023), March 25-26, 2023</li>
                        <li>2023 12th International Conference on Awareness Science and Technology (iCAST), Nov. 9-11, 2023</li>
                    </ol>
                `
            },
            {
                subtitle: 'Advisory Committee Chairs',
                content: `
                    <ol>
                        <li>IIHMSP-2024 The 20th International Conference on Intelligent Information Hiding and Multimedia Signal Processing, October 4-6, 2024, Matsue, Japan</li>
                    </ol>
                `
            },
            {
                subtitle: 'Board of Editor',
                content: `
                    <ol>
                        <li>International Journal of Advanced Information Technologies (IJAIT), 2007</li>
                        <li>Contemporary Management Research (CMR, ISSN 1813-5498), 2009-2010</li>
                        <li>中華民國資訊安全學會第18期第4卷特約編輯</li>
                        <li>International Journal of Computer & Software Engineering</li>
                    </ol>
                `
            },
            {
                subtitle: 'Guest Editor',
                content: `
                    <ol>
                        <li>Symmetry 期刊 Special Issue "Information Technology and Its Applications", 2017</li>
                        <li>Symmetry 期刊 Special Issue "Information Technology and Its Applications", 2018</li>
                        <li>Symmetry 期刊 Special Issue "Information Technology and Its Applications", 2021</li>
                        <li>Entropy 期刊 Special Issue "Entropy Based Data Hiding and Its Applications", 2021</li>
                        <li>International Journal of Applied Science and Engineering 期刊 2021/6/1-2023/7/31</li>
                    </ol>
                `
            }
        ]
    },

    academicHonors: {
        title: '學術榮譽',
        content: `
            <ol>
                <li>碩士論文榮獲2001年「九十年度全國管理碩士論文獎暨研討會」資訊管理組優勝獎</li>
                <li>榮獲2002年「九十一年度中正大學資訊工程學系學業成績優良獎」</li>
                <li>榮獲2006年IEEE學會於中國北京舉辦之國際創意計算、資訊與控制會議「最佳論文獎」</li>
                <li>榮獲朝陽科技大學96學年度推動學術研究與建教合作獎狀</li>
                <li>榮獲朝陽科技大學96學年度「論文類佳作獎」</li>
                <li>榮獲朝陽科技大學96學年度「著作佳作獎」</li>
                <li>榮獲朝陽科技大學96學年度校級優良導師</li>
                <li>榮獲朝陽科技大學102學年度校級優良教師</li>
                <li>榮獲朝陽科技大學103學年度校級優良導師</li>
                <li>榮獲朝陽科技大學110學年度優良教師傑出獎</li>
                <li>2018第23屆大專校院資訊應用服務創新競賽產學合作組（第一名）</li>
                <li>2019創想星球科技大賽創新科技組（第二名）</li>
                <li>2019年全國技專校院學生實務專題製作競賽暨成果展（第二名）</li>
                <li>InnoServe 2019資訊應用服務創新創業新秀選拔（金牌）</li>
            </ol>
        `
    },

    education: {
        title: '主要學歷',
        content: `
            <table border="2" class="info-table">
                <tr>
                    <th>畢/肄業學校</th>
                    <th>主修學門系所</th>
                    <th>學位</th>
                    <th>起訖年月</th>
                </tr>
                <tr>
                    <td>國立中正大學</td>
                    <td>資訊工程學系暨研究所</td>
                    <td>博士</td>
                    <td>90/09至94/12</td>
                </tr>
                <tr>
                    <td>朝陽科技大學</td>
                    <td>資訊管理研究所</td>
                    <td>碩士</td>
                    <td>88/09至90/06</td>
                </tr>
                <tr>
                    <td>朝陽科技大學</td>
                    <td>資訊管理學系</td>
                    <td>學士</td>
                    <td>84/09至88/06</td>
                </tr>
            </table>
        `
    },

    workExperience: {
        title: '工作經驗',
        content: `
            <ol>
                <li>朝陽科技大學資訊管理系專任助理教授 (2006/02/01-2006/07/31)</li>
                <li>朝陽科技大學資訊管理系專任助理教授 (2006/08/01-2007/01/31)</li>
                <li>朝陽科技大學資訊管理系專任副教授 (2009/2/1-2018/7/31)</li>
                <li>朝陽科技大學資訊管理系主任（兼研究所所長）(2017/8-2022/7/31)</li>
                <li>朝陽科技大學資訊管理系專任教授 (2018/8-)</li>
                <li>朝陽科技大學資訊學院院長 (2023/8-2025/7)</li>
                <li><strong>勤益科技大學資訊管理系教授 (2025/8-)</strong></li>
            </ol>
        `
    },

    researchProjects: {
        title: '研究計畫',
        content: `
            <div class="table-responsive">
                <table border="2" class="info-table">
                    <thead>
                        <tr>
                            <th>序號</th>
                            <th>計畫名稱</th>
                            <th>期間</th>
                            <th>編號</th>
                            <th>贊助單位</th>
                            <th>經費總額</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>資訊隱藏技術之研究</td>
                            <td>2006.10-2007.09</td>
                            <td>NSC 95-2218-E-324-001</td>
                            <td>國科會</td>
                            <td>428,000</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>無失真資訊隱藏方法與偽裝影像品質控制機制</td>
                            <td>2007.08-2008.09</td>
                            <td>NSC 96-2221-E-324-048</td>
                            <td>國科會</td>
                            <td>496,000</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>可逆式資訊隱藏技術及其應用於影像內容驗證與影片智慧財產權保護</td>
                            <td>2008.08-2009.10</td>
                            <td>NSC 97-2221-E-324-008</td>
                            <td>國科會</td>
                            <td>591,000</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>血液透析資料關聯性規則分析及預警系統</td>
                            <td>2011.08-2012.10</td>
                            <td>NSC 100-2221-E-324-033</td>
                            <td>國科會</td>
                            <td>519,000</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>16位元深度DICOM醫療影像之可逆式資訊隱藏技術研究</td>
                            <td>2014.08-2015.07</td>
                            <td>MOST 103-2221-E-324-014</td>
                            <td>國科會</td>
                            <td>674,000</td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td>中間對折技巧及機密訊息重編碼策略應用於內插及雙影像為基礎之高影像品質資訊隱匿方法</td>
                            <td>2016.08-2017.07</td>
                            <td>MOST 105-2221-E-324-020</td>
                            <td>科技部</td>
                            <td>707,000</td>
                        </tr>
                        <tr>
                            <td>7</td>
                            <td>「長者健康GoGoGo體感互動式遊戲」暨「大腦點點名益智遊戲」平台建置</td>
                            <td>2018.08-2019.10</td>
                            <td>107-2637-E-324-004</td>
                            <td>科技部</td>
                            <td>722,000</td>
                        </tr>
                        <tr>
                            <td>8</td>
                            <td>有效減少鋸齒殘影問題之無失真高品質內插影像資訊隱藏技術</td>
                            <td>2019.08-2020.07</td>
                            <td>108-2221-E-324-017</td>
                            <td>科技部</td>
                            <td>755,000</td>
                        </tr>
                        <tr>
                            <td>9</td>
                            <td>可逆式雙影像資訊隱藏方法使用多層編碼及最大失真控制技術搭配複雜度分析策略</td>
                            <td>2020.08-2023.07</td>
                            <td>109-2221-E-324-025-MY3</td>
                            <td>科技部</td>
                            <td>2,560,000</td>
                        </tr>
                        <tr>
                            <td>10</td>
                            <td>產學合作研究計畫─虛擬實境機車路考和危險感知教育系統結合四軸自控機車動力平台建置計畫</td>
                            <td>2021.06-2022.05</td>
                            <td>MOST 110-2622-H-324-002</td>
                            <td>科技部 + 京冠科技</td>
                            <td>592,206</td>
                        </tr>
                        <tr>
                            <td>11</td>
                            <td>企業數據保密新策略：模糊理論與人工智慧資訊隱藏技術的融合</td>
                            <td>2024.08-2025.07</td>
                            <td>NSTC 113-2410-H-324-005</td>
                            <td>國科會</td>
                            <td>620,000</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `
    },

    patents: {
        title: '專利',
        content: `
            <table border="2" class="info-table">
                <thead>
                    <tr>
                        <th>序號</th>
                        <th>專利名稱</th>
                        <th>專利編號</th>
                        <th>發明人</th>
                        <th>類別</th>
                        <th>日期</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>具有即時回饋訊號之互動系統及其操作方法</td>
                        <td>I712906</td>
                        <td>呂慈純、龍佩筠、戴廷軒、楊益聖、楊秉中、李慧筠</td>
                        <td>發明</td>
                        <td>2020/12/11 - 2039/4/22</td>
                    </tr>
                </tbody>
            </table>
        `
    },

    biography: {
        title: '簡歷',
        content: `
            <p>呂慈純，台灣省桃園縣人，先後就讀於朝陽科技大學資訊管理系、資訊管理研究所和國立中正大學資訊工程研究所，於民國九十五年取得博士學位，現任勤益科技大學資訊管理系教授。目前的研究興趣包括有資料庫、資料探勘、資訊隱藏、資訊擷取、影像處理、影像壓縮、生物資訊等。</p>
            
            <p>Tzu-Chuen Lu received the B.M. degree (1999) and MSIM degree (2001) in Information Management from Chaoyang University of Technology, Taiwan. She received her Ph.D. degree (2006) in Computer Engineering from National Chung Cheng University. Her current title is Professor in Department of Information Management from National Chin-Yi University of Technology.</p>
            
            <p><strong>ORCID:</strong> orcid.org/0000-0001-7305-4622</p>
        `
    }
};

// 導出供 main.js 使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = aboutData;
}
