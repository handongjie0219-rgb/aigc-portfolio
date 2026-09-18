"use client";

import { useEffect, useState } from "react";
import { checklist, characters, filmBody, masterPrompt, negativePrompt, products, projectInfo, sceneInfo, shots, workflow } from "./ootd-script";
import catfoodScript from "./catfood-script.json";
import earphoneScript from "./earphone-script.json";
import lastCandyScript from "./last-candy-script.json";
import whiteWolfScript from "./white-wolf-script.json";
import royalPhysicianDocuments from "./royal-physician-documents.json";
import mulanDocuments from "./mulan-documents.json";

const royalPhysicianCharacters = ["沈薇","皇帝","皇后","掌事嬷嬷","黑衣随从","苏贵妃","顾砚舟","苏崇","小福子","秋蝉","春桃","魏承忠","六皇子"];
const royalPhysicianScenes = ["现代撞车街道","景仁宫外院","景仁宫正殿","宫女偏房","景仁宫廊下休息区","惜华宫寝殿","太医院","宫女所与疫病隔离区","御书房","天牢","苏府书房","皇家祭坛","宫中药仓","宫外义庄","宫外医馆","女医署"];
const royalPhysicianProps = ["现代急救医疗包","女主随身古代药箱","针灸银针包","诊脉配药套件","疫病防护消毒套件","验毒证物套件","假死药与解药","女主银针发簪","皇帝诏书","宫门通行腰牌","苏府密信证物","药仓账册证物","兵符与布防舆图","沈危佩剑与侍卫徽章","天牢钥匙与枷锁","药仓纵火物证","皇家祭坛礼器","贵妃药盏与香囊证物","女医署教学教具","男女主定情玉佩","皇权御玺","义庄假死棺木","宫女日常生活套件"];

const sections = [
  { id: "ip", label: "IP设计", en: "CHARACTER & IDENTITY", no: "01", tone: "coral" },
  { id: "poster", label: "海报设计", en: "POSTER & CAMPAIGN", no: "02", tone: "blue" },
  { id: "type", label: "字体设计", en: "TYPE & LETTERING", no: "03", tone: "ivory" },
  { id: "banner", label: "Banner设计", en: "DIGITAL & COMMERCE", no: "04", tone: "lime" },
  { id: "ads", label: "AI广告", en: "AI COMMERCIAL FILM", no: "05", tone: "violet" },
  { id: "drama", label: "AI短剧", en: "AI NARRATIVE SERIES", no: "06", tone: "red" },
];

const posterWorks = [
  { title: "听见生活的温度", file: 1 }, { title: "Beauty in Air", file: 2 },
  { title: "Music Goes Further", file: 3 }, { title: "成为妈妈，是更柔软的力量", file: 4 },
  { title: "来自自然的纯粹营养", file: 5 }, { title: "把生活睡成喜欢的样子", file: 6 },
  { title: "刚好喜欢你", file: 7 }, { title: "第七次回声", file: 8 }, { title: "月下长生", file: 9 },
  { title: "一城烟火，是生活最好的解药", file: 10 }, { title: "有你在，就是最好的日子", file: 11 },
  { title: "城市有光，我们正向前", file: 12 },
];

const posterSummaries = [
  "以声音与日常温度为核心，通过柔和光影与产品特写，建立安静、亲近的生活方式视觉。",
  "围绕轻盈空气感展开，将美妆产品融入通透场景，突出洁净质感与精致护理体验。",
  "以音乐为情绪线索，用流动构图和节奏化色彩表现声音带来的陪伴与延伸感。",
  "聚焦母婴关系中的柔软力量，以温暖色调和细腻叙事传递守护、成长与情感连接。",
  "提取自然原料与纯粹营养概念，通过清新色彩和有机元素建立健康可信的产品印象。",
  "以舒适家居与日常仪式感为主题，让产品进入真实生活场景，传达松弛而愉悦的氛围。",
  "围绕年轻化情绪表达，以轻松构图和鲜明视觉符号呈现自然、直接的喜欢。",
  "用悬疑化光影与留白制造叙事张力，在有限画面中建立未知感与观看期待。",
  "融合东方意象与幻想氛围，以月色、古典元素和层次光影构建诗意叙事空间。",
  "记录城市烟火与饮食温度，通过生活化场景表现忙碌都市中的松弛与治愈。",
  "以陪伴关系为情感核心，用温暖人物互动和柔和环境光表达安心、依靠与归属感。",
  "面向未来城市主题，以科技光效和向前延伸的空间构图传递开放、连接与成长感。",
];

const posterProjectTitles = [
  "耳机产品海报",
  "美妆产品海报",
  "音乐耳机海报",
  "母婴品牌海报",
  "健康食品海报",
  "家居生活海报",
  "情感主题海报",
  "悬疑短剧海报",
  "东方幻想海报",
  "城市美食海报",
  "宠物情感海报",
  "未来城市海报",
];

const posterGroups = [
  { no: "A", title: "商业产品视觉", en: "COMMERCIAL & PRODUCT", desc: "科技数码、母婴与生活消费品的产品主视觉。", items: posterWorks.slice(0, 6) },
  { no: "B", title: "影视叙事海报", en: "FILM & NARRATIVE", desc: "都市情感、悬疑反转与东方幻想题材的故事型海报。", items: posterWorks.slice(6, 9) },
  { no: "C", title: "生活方式插画", en: "LIFESTYLE & CULTURE", desc: "以美食、宠物和未来城市为主题的场景化视觉表达。", items: posterWorks.slice(9, 12) },
];

const typeWorks = [
  { title: "焕新狂欢购", file: 1 }, { title: "探索未来", file: 2 },
  { title: "奇思妙想", file: 3 }, { title: "文字设计", file: 4 },
  { title: "欢迎新同学", file: 5 }, { title: "双11疯抢节", file: 6 },
  { title: "帐篷节嘉年华", file: 7 }, { title: "摆脱内耗", file: 8 },
  { title: "敢想就去做", file: 9 }, { title: "玩出真实的自己", file: 10 },
  { title: "冰爽一夏", file: 11 },
];

const typeGroups = [
  { no: "A", title: "品牌字标", en: "BRAND LETTERING", desc: "以几何切割、结构重组建立具有识别度的中文标题字。", items: typeWorks.slice(0, 4) },
  { no: "B", title: "电商促销字体", en: "E-COMMERCE DISPLAY", desc: "针对节日营销与活动传播设计的高冲击力立体标题。", items: typeWorks.slice(4, 8) },
  { no: "C", title: "情绪化标题字", en: "EXPRESSIVE TYPE", desc: "融合笔刷、涂鸦与材质效果，强化青年文化和季节氛围。", items: typeWorks.slice(8, 11) },
];

const bannerWorks = [
  { title: "Milk Tea", file: 1 }, { title: "Scent of You", file: 2 }, { title: "把好日子烤出来", file: 3 },
  { title: "Play More Real", file: 4 }, { title: "茶阅山河", file: 5 }, { title: "东方本真", file: 6 },
  { title: "听见更大的世界", file: 7 }, { title: "Matcha Daily", file: 8 }, { title: "Choco Late", file: 9 },
];

const bannerSummaries = [
  { type: "饮品品牌 Banner", desc: "以柔和奶油色和清爽饮品特写突出顺滑口感，营造轻松、年轻的下午茶氛围。" },
  { type: "香氛美妆 Banner", desc: "通过细腻光影、留白与精致材质表现香气层次，建立克制而高级的品牌气质。" },
  { type: "烘焙食品 Banner", desc: "利用暖色烘焙场景与食物近景放大酥香质感，传递新鲜出炉的幸福感。" },
  { type: "潮流数码 Banner", desc: "以高对比色、动感构图和年轻化视觉语言，呈现产品的娱乐属性与潮流态度。" },
  { type: "东方茶饮 Banner", desc: "将茶叶、山水与东方色彩融合，在传统意境中呈现现代茶饮品牌的文化质感。" },
  { type: "东方美妆 Banner", desc: "以自然材质和东方器物构建静谧画面，强调产品纯粹、温润与本真的价值表达。" },
  { type: "音响产品 Banner", desc: "通过声波、空间纵深和科技光效表现声音能量，强化沉浸聆听的产品体验。" },
  { type: "抹茶饮品 Banner", desc: "运用抹茶绿与生活化构图突出清新风味，营造自然、轻盈的日常消费场景。" },
  { type: "巧克力食品 Banner", desc: "以浓郁棕色、流动质感和甜品特写强化醇厚口感，制造直接的味觉吸引力。" },
];

const bannerGroups = [
  { no: "A", title: "餐饮风味", en: "FOOD & BEVERAGE", desc: "用色彩、材质和动态瞬间放大饮品与烘焙产品的味觉想象。", items: [bannerWorks[0], bannerWorks[2], bannerWorks[7], bannerWorks[8]] },
  { no: "B", title: "美妆与东方生活", en: "BEAUTY & ORIENTAL", desc: "在商业质感与东方美学之间建立克制、细腻的品牌氛围。", items: [bannerWorks[1], bannerWorks[4], bannerWorks[5]] },
  { no: "C", title: "潮流数码与 IP", en: "TREND & TECHNOLOGY", desc: "以霓虹、高对比和角色叙事表达年轻化的潮流态度。", items: [bannerWorks[3], bannerWorks[6]] },
];

const ootdAssets = ["1", "2", "3", "4", "5", "6", "7", "8", "A", "B", "场景"];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [posterOpen, setPosterOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [adsOpen, setAdsOpen] = useState(false);
  const [dramaOpen, setDramaOpen] = useState(false);
  const [visualHubOpen, setVisualHubOpen] = useState(false);
  const [videoHubOpen, setVideoHubOpen] = useState(false);
  const [selectedPoster, setSelectedPoster] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<number | null>(null);
  const [selectedBanner, setSelectedBanner] = useState<number | null>(null);
  const [selectedAdAsset, setSelectedAdAsset] = useState<string | null>(null);
  const [scriptOpen, setScriptOpen] = useState(false);
  const [ootdAssetsOpen, setOotdAssetsOpen] = useState(false);
  const [catAssetsOpen, setCatAssetsOpen] = useState(false);
  const [catScriptOpen, setCatScriptOpen] = useState(false);
  const [earAssetsOpen, setEarAssetsOpen] = useState(false);
  const [earScriptOpen, setEarScriptOpen] = useState(false);
  const [candyAssetsOpen, setCandyAssetsOpen] = useState(false);
  const [candyScriptOpen, setCandyScriptOpen] = useState(false);
  const [candyAssetCategory, setCandyAssetCategory] = useState<"characters" | "scenes" | "props">("characters");
  const [whiteWolfAssetsOpen, setWhiteWolfAssetsOpen] = useState(false);
  const [whiteWolfScriptOpen, setWhiteWolfScriptOpen] = useState(false);
  const [whiteWolfAssetCategory, setWhiteWolfAssetCategory] = useState<"characters" | "scenes" | "props">("characters");
  const [royalPhysicianAssetsOpen, setRoyalPhysicianAssetsOpen] = useState(false);
  const [royalPhysicianScriptOpen, setRoyalPhysicianScriptOpen] = useState(false);
  const [mulanAssetsOpen, setMulanAssetsOpen] = useState(false);
  const [mulanAssetCategory, setMulanAssetCategory] = useState<"characters" | "scenes" | "props">("characters");
  const [mulanScriptOpen, setMulanScriptOpen] = useState(false);
  const [royalPhysicianAssetCategory, setRoyalPhysicianAssetCategory] = useState<"characters" | "scenes" | "props">("characters");
  const [leafyOpen, setLeafyOpen] = useState(false);
  const [breezyOpen, setBreezyOpen] = useState(false);
  const [moriOpen, setMoriOpen] = useState(false);
  const [ipOpen, setIpOpen] = useState(false);

  useEffect(() => {
    const backOneLevel = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (selectedPoster !== null) return setSelectedPoster(null);
      if (selectedType !== null) return setSelectedType(null);
      if (selectedBanner !== null) return setSelectedBanner(null);
      if (selectedAdAsset !== null) return setSelectedAdAsset(null);
      if (leafyOpen) return setLeafyOpen(false);
      if (breezyOpen) return setBreezyOpen(false);
      if (moriOpen) return setMoriOpen(false);
      if (scriptOpen) return setScriptOpen(false);
      if (ootdAssetsOpen) return setOotdAssetsOpen(false);
      if (catAssetsOpen) return setCatAssetsOpen(false);
      if (catScriptOpen) return setCatScriptOpen(false);
      if (earAssetsOpen) return setEarAssetsOpen(false);
      if (earScriptOpen) return setEarScriptOpen(false);
      if (candyAssetsOpen) return setCandyAssetsOpen(false);
      if (candyScriptOpen) return setCandyScriptOpen(false);
      if (whiteWolfAssetsOpen) return setWhiteWolfAssetsOpen(false);
      if (whiteWolfScriptOpen) return setWhiteWolfScriptOpen(false);
      if (royalPhysicianAssetsOpen) return setRoyalPhysicianAssetsOpen(false);
      if (royalPhysicianScriptOpen) return setRoyalPhysicianScriptOpen(false);
      if (mulanAssetsOpen) return setMulanAssetsOpen(false);
      if (mulanScriptOpen) return setMulanScriptOpen(false);
      if (ipOpen) { setIpOpen(false); return setVisualHubOpen(true); }
      if (posterOpen) { setPosterOpen(false); return setVisualHubOpen(true); }
      if (typeOpen) { setTypeOpen(false); return setVisualHubOpen(true); }
      if (bannerOpen) { setBannerOpen(false); return setVisualHubOpen(true); }
      if (adsOpen) { setAdsOpen(false); return setVideoHubOpen(true); }
      if (dramaOpen) { setDramaOpen(false); return setVideoHubOpen(true); }
      if (visualHubOpen) return setVisualHubOpen(false);
      if (videoHubOpen) return setVideoHubOpen(false);
    };
    window.addEventListener("keydown", backOneLevel);
    const locked = visualHubOpen || videoHubOpen || ipOpen || posterOpen || typeOpen || bannerOpen || adsOpen || dramaOpen || selectedPoster !== null || selectedType !== null || selectedBanner !== null || selectedAdAsset !== null || scriptOpen || ootdAssetsOpen || catAssetsOpen || catScriptOpen || earAssetsOpen || earScriptOpen || candyAssetsOpen || candyScriptOpen || whiteWolfAssetsOpen || whiteWolfScriptOpen || royalPhysicianAssetsOpen || royalPhysicianScriptOpen || mulanAssetsOpen || mulanScriptOpen || leafyOpen || breezyOpen || moriOpen;
    document.body.style.overflow = locked ? "hidden" : "";
    return () => { window.removeEventListener("keydown", backOneLevel); document.body.style.overflow = ""; };
  }, [visualHubOpen, videoHubOpen, ipOpen, posterOpen, typeOpen, bannerOpen, adsOpen, dramaOpen, selectedPoster, selectedType, selectedBanner, selectedAdAsset, scriptOpen, ootdAssetsOpen, catAssetsOpen, catScriptOpen, earAssetsOpen, earScriptOpen, candyAssetsOpen, candyScriptOpen, whiteWolfAssetsOpen, whiteWolfScriptOpen, royalPhysicianAssetsOpen, royalPhysicianScriptOpen, mulanAssetsOpen, mulanScriptOpen, leafyOpen, breezyOpen, moriOpen]);

  const openVisualHub = () => {
    setVideoHubOpen(false); setAdsOpen(false); setDramaOpen(false);
    setIpOpen(false); setPosterOpen(false); setTypeOpen(false); setBannerOpen(false);
    setVisualHubOpen(true);
  };

  const openVideoHub = () => {
    setVisualHubOpen(false); setIpOpen(false); setPosterOpen(false); setTypeOpen(false); setBannerOpen(false);
    setAdsOpen(false); setDramaOpen(false); setVideoHubOpen(true);
  };

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <main>
      <section id="home" className="hero">
        <video autoPlay muted loop playsInline className="hero-video">
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260806_134653_2b70d062-3521-429b-a824-8d9f98de488a.mp4" type="video/mp4" />
        </video>
        <div className="hero-shade" />
        <header className="nav-wrap">
          <nav className="nav-pill" aria-label="主导航">
            <button className="brand" onClick={() => go("home")} aria-label="返回首页">
              <span className="brand-mark" aria-hidden="true"><i /><i /><i /><i /></span>
              <span>HDJ Studio</span>
            </button>
            <div className="desktop-nav">
              <button onClick={() => go("home")}>首页</button>
              <button onClick={openVisualHub}>AI视觉</button>
              <button onClick={openVideoHub}>AI视频</button>
            </div>
            <button className="about-btn" onClick={() => go("about")}>我的 <span>↗</span></button>
            <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="打开菜单">
              <span /><span />
            </button>
          </nav>
          {menuOpen && (
            <div className="mobile-menu">
              <button onClick={() => go("home")}>首页</button>
              <button onClick={() => { setMenuOpen(false); openVisualHub(); }}>AI视觉</button>
              <button onClick={() => { setMenuOpen(false); openVideoHub(); }}>AI视频</button>
              <button onClick={() => go("about")}>我的</button>
            </div>
          )}
        </header>

        <div className="hero-category-nav" aria-label="作品分类入口">
          <button type="button" onClick={openVisualHub}>
            <span>01</span><strong>AI视觉</strong><small>VISUAL DESIGN</small><i>↗</i>
          </button>
          <button type="button" onClick={openVideoHub}>
            <span>02</span><strong>AI视频</strong><small>MOTION & FILM</small><i>↗</i>
          </button>
        </div>

        <div className="hero-copy">
          <div className="eyebrow"><span /> AIGC 内容创作 · 韩东杰</div>
          <h1>让创意，生长为<br /><em>有生命的影像。</em></h1>
          <p>从创意策划、品牌视觉到 AI 视频量产，<br className="desktop-only" />用设计与生成式技术完成可落地的内容表达。</p>
          <button className="work-btn" onClick={() => go("profile")} aria-label="进入个人介绍"><span>个人介绍</span><b>↓</b></button>
        </div>
        <div className="hero-foot"><span>BEIJING · CHINA</span><span>SCROLL TO EXPLORE</span><span>HDJ · 2026 PORTFOLIO</span></div>
      </section>

      {visualHubOpen && (
        <section className="portfolio-hub visual-hub" role="dialog" aria-modal="true" aria-label="AI视觉作品分类">
          <button className="portfolio-hub-close" type="button" onClick={() => setVisualHubOpen(false)} aria-label="关闭">×</button>
          <div className="portfolio-hub-inner">
            <header className="portfolio-hub-heading"><span>01 / VISUAL</span><h2>AI视觉</h2><p>从角色、海报、字体到商业 Banner，进入不同的视觉设计内容。</p></header>
            <div className="portfolio-hub-grid visual-grid">
              <button type="button" onClick={() => { setVisualHubOpen(false); setIpOpen(true); }}><span>01</span><small>CHARACTER & IP</small><h3>IP设计</h3><p>角色设定 · 表情延展 · 场景应用</p><i>进入作品 ↗</i></button>
              <button type="button" onClick={() => { setVisualHubOpen(false); setPosterOpen(true); }}><span>02</span><small>POSTER DESIGN</small><h3>海报设计</h3><p>品牌视觉 · 主题海报 · 商业创意</p><i>进入作品 ↗</i></button>
              <button type="button" onClick={() => { setVisualHubOpen(false); setTypeOpen(true); }}><span>03</span><small>TYPE DESIGN</small><h3>字体设计</h3><p>字体实验 · 字形语言 · 动态排版</p><i>进入作品 ↗</i></button>
              <button type="button" onClick={() => { setVisualHubOpen(false); setBannerOpen(true); }}><span>04</span><small>BANNER DESIGN</small><h3>Banner设计</h3><p>电商视觉 · 信息编排 · 营销氛围</p><i>进入作品 ↗</i></button>
            </div>
          </div>
        </section>
      )}

      {videoHubOpen && (
        <section className="portfolio-hub video-hub" role="dialog" aria-modal="true" aria-label="AI视频作品分类">
          <button className="portfolio-hub-close" type="button" onClick={() => setVideoHubOpen(false)} aria-label="关闭">×</button>
          <div className="portfolio-hub-inner">
            <header className="portfolio-hub-heading"><span>02 / MOTION</span><h2>AI视频</h2><p>以生成式影像连接商业传播与叙事表达。</p></header>
            <div className="portfolio-hub-grid video-grid">
              <button type="button" onClick={() => { setVideoHubOpen(false); setAdsOpen(true); }}><span>01</span><small>AI COMMERCIAL</small><h3>AI广告</h3><p>产品影像 · 品牌广告 · 视觉营销</p><i>进入作品 ↗</i></button>
              <button type="button" onClick={() => { setVideoHubOpen(false); setDramaOpen(true); }}><span>02</span><small>AI NARRATIVE</small><h3>AI短剧</h3><p>角色资产 · 剧本创作 · 连续叙事</p><i>进入作品 ↗</i></button>
            </div>
          </div>
        </section>
      )}

      <section id="profile" className="profile-page">
        <div className="profile-orbit" aria-hidden="true"><span>CREATIVE</span><span>DESIGN</span><span>AIGC</span></div>
        <div className="profile-photo-wrap">
          <span className="profile-photo-index">PORTRAIT / 01</span>
          <img src="/profile-hdj.png" alt="韩东杰个人肖像" className="profile-photo" />
          <div className="profile-photo-caption"><b>HDJ</b><span>VISUAL CREATOR · 2026</span></div>
        </div>
        <div className="profile-content">
          <p className="profile-kicker">ABOUT THE CREATOR · AIGC VISUAL DESIGN</p>
          <h2><span>韩东杰。</span></h2>
          <p className="profile-lead">在创意、设计与生成式技术之间，寻找影像真正有生命力的表达。</p>
          <div className="profile-statement">
            <p>专注于 AIGC 视觉内容创作，涵盖品牌视觉、IP 角色、商业广告与叙事短片。从前期概念、视觉设定到动态成片，持续探索新技术与设计语言的结合方式。</p>
            <p>我相信工具会不断变化，但清晰的审美判断、对故事的感受力，以及把想法真正完成的能力，始终是创作的核心。</p>
          </div>
          <div className="profile-resume">
            <section className="resume-block work-block">
              <header><span>01</span><div><b>工作经历</b><small>EXPERIENCE</small></div></header>
              <div className="resume-item">
                <div className="resume-title"><h3>威万影视文化传媒有限公司</h3><time>2025.02 — 2026.09</time></div>
                <strong>AI 内容创意制作</strong>
                <p>负责 AI 创意策划、脚本与文案生成、批量影像生产及成片交付；完成关键视觉、海报和产品意境图，并沉淀提示词、设计模板与标准化生产流程。</p>
              </div>
              <div className="resume-item">
                <div className="resume-title"><h3>快手</h3><time>2019.06 — 2024.12</time></div>
                <strong>运营部 · 内容制作</strong>
                <p>围绕站内热点、品类扶持及活动目标完成选题策划、素材管理与短视频制作；独立负责拍摄、剪辑、调色、字幕、音效和活动视觉物料交付。</p>
              </div>
            </section>
          </div>
          <div className="profile-tags"><span>视觉设计</span><span>AI 影像</span><span>创意策划</span><span>动态叙事</span></div>
          <button className="profile-next" onClick={() => go("ip")}><span>查看作品</span><b>↘</b></button>
        </div>
        <div className="profile-side-note">BASED IN CHINA · CREATING EVERYWHERE</div>
      </section>

      <section id="work" className="work-section">
        <div className="section-intro">
          <p className="section-kicker">SELECTED DISCIPLINES</p>
          <h2>在创意与技术之间，<br />寻找每个项目的<em>独特表达。</em></h2>
          <p className="section-note">六个创作方向，一套不断生长的视觉语言。</p>
        </div>

        <div className="project-grid">
          {sections.map((item, index) => (
            <article id={["ip", "poster", "type", "banner", "ads", "drama"].includes(item.id) ? undefined : item.id} className={`project-card ${item.tone}`} key={item.id} onClick={["ip", "poster", "type", "banner", "ads", "drama"].includes(item.id) ? () => go(item.id) : undefined}>
              <div className="card-visual">
                <span className="card-number">{item.no}</span>
                <div className="art-shape" aria-hidden="true">
                  <span className="shape-a" /><span className="shape-b" /><span className="shape-c" />
                  {index === 2 && <strong>字</strong>}
                  {index === 4 && <b>AI</b>}
                </div>
                <span className="view-mark">VIEW ↗</span>
              </div>
              <div className="card-meta">
                <h3>{item.label}</h3>
                <span>{item.en}</span>
              </div>
            </article>
          ))}
        </div>

        <section id="ip" className={`ip-showcase ${ipOpen ? "ip-expanded" : ""}`}>
          <button className="ip-master-entry" onClick={() => setIpOpen(true)}>
            <span className="ip-master-index">01 / CHARACTER &amp; IDENTITY</span>
            <div className="ip-master-orbits" aria-hidden="true"><i /><i /><i /><b>IP</b></div>
            <div className="ip-master-copy"><small>CHARACTER · EMOTION · BRAND WORLD</small><h2>IP设计</h2><h3>三个角色世界，三种鲜明的品牌性格。</h3><p>Leafy · Breezy · Mori</p></div>
            <em>进入完整 IP 系列 ↗</em>
          </button>
          {ipOpen && <button className="ip-master-close" onClick={() => { setIpOpen(false); setVisualHubOpen(true); }}>← 返回 AI视觉</button>}
          <div className="ip-heading"><div><p className="section-kicker">IP DESIGN COLLECTION · 2026</p><h2>IP设计<em>三种氛围入口。</em></h2></div><p>从角色造型、表情系统、色彩语言到周边应用，以完整提案呈现不同性格的品牌角色。</p></div>
          <div className="ip-entry-grid">
            <button className="ip-entry leafy-entry" onClick={() => setLeafyOpen(true)}><span>01 / NATURAL HEALING</span><div><b>LEAFY</b><h3>叶芽小伙伴</h3><p>自然、温暖、治愈</p></div><i>进入完整内容 ↗</i></button>
            <button className="ip-entry breezy-entry" onClick={() => setBreezyOpen(true)}><span>02 / OUTDOOR TECH</span><div><b>BREEZY</b><h3>风行伙伴</h3><p>户外 · 科技 · 潮流</p></div><i>进入完整内容 ↗</i></button>
            <button className="ip-entry mori-entry" onClick={() => setMoriOpen(true)}><span>03 / WARM NATURE</span><div><b>MORI</b><h3>一点小光</h3><p>自然 · 温暖 · 治愈</p></div><i>进入完整内容 ↗</i></button>
          </div>
        </section>

        {leafyOpen && <div className="script-document leafy-document" role="dialog" aria-modal="true" aria-label="Leafy IP完整设计提案" onClick={() => setLeafyOpen(false)}><button className="script-close" onClick={() => setLeafyOpen(false)}>关闭内容 ×</button><article className="leafy-page" onClick={event=>event.stopPropagation()}><header><span>IP DESIGN · CASE 01</span><h2>Leafy<em>与小小的叶子，走进更温暖的日常。</em></h2><p>角色三视图 · 表情延展 · 色彩方案 · 细节展示 · 周边应用</p></header><div className="leafy-gallery">{["主视觉与角色定位","角色三视图","表情延展系统","品牌色彩方案","造型细节展示","周边应用系统"].map((title,index)=><figure key={title}><img src={`/ip-design/leafy/${index+1}.png`} alt={`Leafy ${title}`} /><figcaption><span>{String(index+1).padStart(2,"0")}</span><b>{title}</b></figcaption></figure>)}</div></article></div>}
        {breezyOpen && <div className="script-document breezy-document" role="dialog" aria-modal="true" aria-label="Breezy IP完整设计提案" onClick={() => setBreezyOpen(false)}><button className="script-close" onClick={() => setBreezyOpen(false)}>关闭内容 ×</button><article className="breezy-page" onClick={event=>event.stopPropagation()}><header><span>IP DESIGN · CASE 02</span><h2>BREEZY<em>轻盈风感，户外随行。</em></h2><p>角色设计 · 表情延展 · 产品展示 · 细节设计 · 配色方案 · 场景应用</p></header><div className="breezy-gallery">{[{file:7,title:"主视觉与角色定位"},{file:1,title:"角色三视图"},{file:2,title:"表情延展"},{file:3,title:"产品展示"},{file:4,title:"细节展示"},{file:5,title:"配色方案"},{file:6,title:"场景应用"}].map(item=><figure key={item.title}><img src={`/ip-design/breezy/${item.file}.png`} alt={`Breezy ${item.title}`} /><figcaption><b>{item.title}</b></figcaption></figure>)}</div></article></div>}
        {moriOpen && <div className="script-document mori-document" role="dialog" aria-modal="true" aria-label="Mori IP完整设计提案" onClick={() => setMoriOpen(false)}><button className="script-close" onClick={() => setMoriOpen(false)}>关闭内容 ×</button><article className="mori-page" onClick={event=>event.stopPropagation()}><header><span>IP DESIGN · CASE 03</span><h2>Mori<em>一点小光，温暖更大的世界。</em></h2><p>角色介绍 · 角色三视图 · 表情延展 · 细节展示 · 场景应用</p></header><div className="mori-gallery">{[{file:1,title:"主视觉与角色定位"},{file:2,title:"角色介绍"},{file:3,title:"角色三视图"},{file:4,title:"表情延展"},{file:6,title:"细节展示"},{file:5,title:"场景应用"}].map(item=><figure key={item.title}><img src={`/ip-design/mori/${item.file}.png`} alt={`Mori ${item.title}`} /><figcaption><b>{item.title}</b></figcaption></figure>)}</div></article></div>}

        <section id="poster" className="poster-showcase">
          <button className="poster-entry" onClick={() => setPosterOpen(true)}>
            <span>POSTER DESIGN · COMPLETE COLLECTION</span>
            <div><b>海报设计</b><h3>三大类别 · 十二组完整作品</h3><p>商业产品视觉、影视叙事海报与生活方式插画</p></div>
            <i>进入完整内容 ↗</i>
          </button>
          <div className="poster-heading">
            <div>
              <p className="section-kicker">POSTER COLLECTION · 2025</p>
              <h2>海报设计<em>作品集。</em></h2>
            </div>
            <p>覆盖产品商业视觉、节日营销、生活方式、影视短剧与城市文化主题。以 AI 生成辅助视觉创意，并完成版式、文案与成品精修。</p>
          </div>
          <div className="poster-groups">
            {posterGroups.map((group) => (
              <section className="poster-group" key={group.no}>
                <div className="group-heading">
                  <span>{group.no}</span>
                  <div><h3>{group.title}</h3><b>{group.en}</b></div>
                  <p>{group.desc}</p>
                </div>
                <div className={`poster-grid poster-grid-${group.items.length}`}>
                  {group.items.map((work) => {
                    const index = posterWorks.indexOf(work);
                    return (
                      <button className="poster-item" key={work.title} onClick={() => setSelectedPoster(index)} aria-label={`放大查看：${work.title}`}>
                        <img src={`/posters/${work.file}.webp`} alt={work.title} loading="lazy" />
                        <span><b>{String(index + 1).padStart(2, "0")}</b><em>{work.title}</em><i>VIEW ↗</i></span>
                      </button>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </section>

        {posterOpen && <div className="script-document poster-document" role="dialog" aria-modal="true" aria-label="海报设计完整作品集" onClick={() => { setPosterOpen(false); setVisualHubOpen(true); }}>
          <button className="script-close" onClick={() => { setPosterOpen(false); setVisualHubOpen(true); }}>← 返回 AI视觉</button>
          <article className="poster-page" onClick={event => event.stopPropagation()}>
            <header><span>POSTER DESIGN · COMPLETE COLLECTION</span><h2>海报设计<em>完整作品集。</em></h2><p>商业产品视觉、影视叙事海报与生活方式插画，按创作方向分类呈现。</p></header>
            <div className="poster-single-pages">
              {posterWorks.map((work, index) => (
                <section className="poster-single-page" key={`single-${work.file}`}>
                  <div className="poster-single-copy">
                    <span>{String(index + 1).padStart(2, "0")} / POSTER PROJECT</span>
                    <h3>{posterProjectTitles[index]}</h3>
                    <b className="poster-original-title">{work.title}</b>
                    <p>{posterSummaries[index]}</p>
                    <button type="button" onClick={() => setSelectedPoster(index)}>放大查看 ↗</button>
                  </div>
                  <button className="poster-single-image" type="button" onClick={() => setSelectedPoster(index)} aria-label={`放大查看：${work.title}`}>
                    <img src={`/posters/${work.file}.webp`} alt={work.title} loading="lazy" />
                  </button>
                </section>
              ))}
            </div>
            <div className="poster-modal-groups poster-modal-groups-legacy">
              {posterGroups.map((group) => <section className="poster-group" key={group.no}>
                <div className="group-heading"><span>{group.no}</span><div><h3>{group.title}</h3><b>{group.en}</b></div><p>{group.desc}</p></div>
                <div className={`poster-grid poster-grid-${group.items.length}`}>
                  {group.items.map((work) => { const index = posterWorks.indexOf(work); return <button className="poster-item" key={work.title} onClick={() => setSelectedPoster(index)} aria-label={`放大查看：${work.title}`}><img src={`/posters/${work.file}.webp`} alt={work.title} loading="lazy" /><span><b>{String(index + 1).padStart(2, "0")}</b><em>{work.title}</em><i>VIEW ↗</i></span></button>; })}
                </div>
              </section>)}
            </div>
          </article>
        </div>}

        <section id="type" className="type-showcase">
          <button className="type-entry" onClick={() => setTypeOpen(true)}>
            <span>TYPE DESIGN · EXPERIMENTAL COLLECTION</span>
            <div className="type-entry-art" aria-hidden="true"><b>字</b><b>TYPE</b><i>形</i></div>
            <div className="type-entry-copy"><strong>字体设计</strong><h3>三种字体语言 · 十一组视觉实验</h3><p>品牌字标、电商促销字体与情绪化标题字</p></div>
            <em>进入完整内容 ↗</em>
          </button>
          <div className="type-heading">
            <p className="section-kicker">TYPE COLLECTION · 2025</p>
            <h2>字体设计<em>作品集。</em></h2>
            <p>从结构字标到立体促销标题，以不同字体语言回应品牌、活动与内容传播场景。</p>
          </div>
          <div className="type-groups">
            {typeGroups.map((group) => (
              <section className="type-group" key={group.no}>
                <div className="type-group-heading">
                  <span>{group.no}</span>
                  <div><h3>{group.title}</h3><b>{group.en}</b></div>
                  <p>{group.desc}</p>
                </div>
                <div className={`type-grid type-count-${group.items.length}`}>
                  {group.items.map((work) => (
                    <button className="type-item" key={work.title} onClick={() => setSelectedType(typeWorks.indexOf(work))} aria-label={`放大查看：${work.title}`}>
                      <img src={`/typeworks/${work.file}.webp`} alt={work.title} loading="lazy" />
                      <span><b>{String(typeWorks.indexOf(work) + 1).padStart(2, "0")}</b><em>{work.title}</em><i>VIEW ↗</i></span>
                    </button>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>

        {typeOpen && <div className="script-document type-document" role="dialog" aria-modal="true" aria-label="字体设计完整作品集" onClick={() => { setTypeOpen(false); setVisualHubOpen(true); }}>
          <button className="script-close" onClick={() => { setTypeOpen(false); setVisualHubOpen(true); }}>← 返回 AI视觉</button>
          <article className="type-page" onClick={event => event.stopPropagation()}>
            <header><span>TYPE DESIGN · COMPLETE COLLECTION</span><h2>字体设计<em>视觉实验集。</em></h2><p>从结构字标到立体促销标题，以不同字体语言回应品牌、活动与内容传播场景。</p></header>
            <div className="type-modal-groups">
              {typeGroups.map((group) => <section className="type-group" key={group.no}>
                <div className="type-group-heading"><span>{group.no}</span><div><h3>{group.title}</h3><b>{group.en}</b></div><p>{group.desc}</p></div>
                <div className={`type-grid type-grid-${group.items.length}`}>
                  {group.items.map((work) => { const index = typeWorks.indexOf(work); return <button className="type-item" key={work.title} onClick={() => setSelectedType(index)} aria-label={`放大查看：${work.title}`}><img src={`/typeworks/${work.file}.webp`} alt={work.title} loading="lazy" /><span><b>{String(index + 1).padStart(2, "0")}</b><em>{work.title}</em><i>VIEW ↗</i></span></button>; })}
                </div>
              </section>)}
            </div>
          </article>
        </div>}

        <section id="banner" className="banner-showcase">
          <button className="banner-entry" onClick={() => setBannerOpen(true)}>
            <span>BANNER DESIGN · DIGITAL CAMPAIGN</span>
            <div className="banner-entry-windows" aria-hidden="true"><i /><i /><i /></div>
            <div className="banner-entry-copy"><strong>Banner设计</strong><h3>三类商业场景 · 九组横幅作品</h3><p>餐饮风味、美妆东方与潮流数码 IP</p></div>
            <em>进入完整内容 ↗</em>
          </button>
          <div className="banner-heading">
            <div>
              <p className="section-kicker">BANNER COLLECTION · 2025</p>
              <h2>Banner设计<em>作品集。</em></h2>
            </div>
            <p>围绕餐饮、美妆、东方生活与潮流数码场景，以超宽画幅完成商品氛围、核心卖点和品牌情绪的集中表达。</p>
          </div>
          <div className="banner-groups">
            {bannerGroups.map((group) => (
              <section className="banner-group" key={group.no}>
                <div className="banner-group-heading">
                  <span>{group.no}</span>
                  <div><h3>{group.title}</h3><b>{group.en}</b></div>
                  <p>{group.desc}</p>
                </div>
                <div className={`banner-grid banner-count-${group.items.length}`}>
                  {group.items.map((work) => {
                    const index = bannerWorks.indexOf(work);
                    return (
                      <button className="banner-item" key={work.title} onClick={() => setSelectedBanner(index)} aria-label={`放大查看：${work.title}`}>
                        <img src={`/banners/${work.file}.webp`} alt={work.title} loading="lazy" />
                        <span><b>{String(index + 1).padStart(2, "0")}</b><em>{work.title}</em><i>VIEW ↗</i></span>
                      </button>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </section>

        {bannerOpen && <div className="script-document banner-document" role="dialog" aria-modal="true" aria-label="Banner设计完整作品集" onClick={() => { setBannerOpen(false); setVisualHubOpen(true); }}>
          <button className="script-close" onClick={() => { setBannerOpen(false); setVisualHubOpen(true); }}>← 返回 AI视觉</button>
          <article className="banner-page" onClick={event => event.stopPropagation()}>
            <header><span>BANNER DESIGN · COMPLETE COLLECTION</span><h2>Banner设计<em>数字商业视觉。</em></h2><p>围绕餐饮、美妆、东方生活与潮流数码场景，以超宽画幅集中表达商品氛围、核心卖点和品牌情绪。</p></header>
            <div className="banner-single-pages">
              {bannerWorks.map((work, index) => (
                <section className="banner-single-page" key={`banner-single-${work.file}`}>
                  <button className="banner-single-image" type="button" onClick={() => setSelectedBanner(index)} aria-label={`放大查看：${work.title}`}>
                    <img src={`/banners/${work.file}.webp`} alt={work.title} loading="lazy" />
                  </button>
                  <div className="banner-single-copy">
                    <span>{String(index + 1).padStart(2, "0")} / BANNER PROJECT</span>
                    <h3>{bannerSummaries[index].type}</h3>
                    <b>{work.title}</b>
                    <p>{bannerSummaries[index].desc}</p>
                    <button type="button" onClick={() => setSelectedBanner(index)}>放大查看 ↗</button>
                  </div>
                </section>
              ))}
            </div>
            <div className="banner-modal-groups banner-modal-groups-legacy">
              {bannerGroups.map((group) => <section className="banner-group" key={group.no}>
                <div className="banner-group-heading"><span>{group.no}</span><div><h3>{group.title}</h3><b>{group.en}</b></div><p>{group.desc}</p></div>
                <div className={`banner-grid banner-count-${group.items.length}`}>
                  {group.items.map((work) => { const index = bannerWorks.indexOf(work); return <button className="banner-item" key={work.title} onClick={() => setSelectedBanner(index)} aria-label={`放大查看：${work.title}`}><img src={`/banners/${work.file}.webp`} alt={work.title} loading="lazy" /><span><b>{String(index + 1).padStart(2, "0")}</b><em>{work.title}</em><i>VIEW ↗</i></span></button>; })}
                </div>
              </section>)}
            </div>
          </article>
        </div>}

        <section id="ads" className={`ad-showcase ${adsOpen ? "ad-expanded" : ""}`}>
          <button className="ads-entry" onClick={() => setAdsOpen(true)}>
            <span className="ads-entry-index">05 / AI COMMERCIAL FILMS</span>
            <div className="ads-entry-reel" aria-hidden="true"><i /><i /><i /><b>AI</b></div>
            <div className="ads-entry-copy"><small>GENERATIVE MOTION · BRAND STORY</small><h2>AI广告</h2><h3>三组影像案例，一套完整生成链路。</h3><p>时尚穿搭、宠物食品与沉浸声场</p></div>
            <em>播放完整作品集 ↗</em>
          </button>
          {adsOpen && <button className="ads-close" onClick={() => { setAdsOpen(false); setVideoHubOpen(true); }}>← 返回 AI视频</button>}
          <header className="showcase-title"><span>05 / SELECTED WORKS</span><h2>AI广告</h2><p>AI COMMERCIAL FILMS</p></header>
          <div className="ad-heading">
            <p className="section-kicker">AI COMMERCIAL CASE · OOTD</p>
            <h2>一支关于穿搭的<em>AI时尚广告。</em></h2>
            <p>从人物设定、服装资产、场景控制到动态成片，建立可复用的 AI 影像生产链路。</p>
          </div>

          <div className="ad-film">
            <video id="video-ootd" controls playsInline preload="metadata" poster="/ai-ads/ootd/2.webp">
              <source src="/ai-ads/ootd/ootd.mp4" type="video/mp4" />
            </video>
            <div className="ad-film-meta"><span>01 / HERO FILM</span><h3>OOTD · AI Fashion Film</h3><p>角色一致性 × 多套造型 × 节奏化剪辑</p></div>
          </div>

          <div className="cat-entry-grid ootd-entry-grid">
            <button className="cat-entry ootd-asset-entry" onClick={() => setOotdAssetsOpen(true)}><span>01 / ASSET LIBRARY</span><h3>进入分类资产</h3><p>角色定妆、服装组合与场景资产</p><b>OPEN ASSETS ↗</b></button>
            <button className="cat-entry ootd-document-entry" onClick={() => setScriptOpen(true)}><span>02 / FULL DOCUMENT</span><h3>打开完整剧本</h3><p>广告正文、逐镜脚本与生成提示词</p><b>READ SCRIPT ↗</b></button>
          </div>

          {ootdAssetsOpen && <div className="script-document ootd-assets-document" role="dialog" aria-modal="true" aria-label="OOTD 分类资产" onClick={() => setOotdAssetsOpen(false)}><button className="script-close" onClick={() => setOotdAssetsOpen(false)}>关闭资产 ×</button><div className="ootd-assets-page" onClick={e=>e.stopPropagation()}>
          <header className="ootd-assets-head"><span>OOTD · ASSET LIBRARY</span><h2>项目资产<em>分类归档。</em></h2></header>
          <div className="asset-block">
            <div className="asset-title"><span>02</span><div><h3>角色定妆</h3><b>CHARACTER & LOOK DEVELOPMENT</b></div><p>8 组角色与穿搭设定，统一记录正侧背视图及表情状态，为动态生成提供稳定参照。</p></div>
            <div className="character-assets">
              {ootdAssets.slice(0, 8).map((name, index) => (
                <button key={name} onClick={() => setSelectedAdAsset(name)} aria-label={`放大查看角色定妆 ${index + 1}`}>
                  <img src={`/ai-ads/ootd/${name}.webp`} alt={`OOTD 角色定妆 ${index + 1}`} loading="lazy" />
                  <span>LOOK {String(index + 1).padStart(2, "0")}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="asset-block">
            <div className="asset-title"><span>03</span><div><h3>服装资产</h3><b>WARDROBE ASSETS</b></div><p>将核心造型拆解为单品组合，明确服装、鞋履、配饰与色彩关系，便于镜头间延续。</p></div>
            <div className="wardrobe-assets">
              {["A", "B"].map((name, index) => (
                <button key={name} onClick={() => setSelectedAdAsset(name)} aria-label={`放大查看服装资产 ${index + 1}`}>
                  <img src={`/ai-ads/ootd/${name}.webp`} alt={`OOTD 服装资产 ${index + 1}`} loading="lazy" />
                  <span>WARDROBE SET {index + 1}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="asset-block scene-block">
            <div className="asset-title"><span>04</span><div><h3>场景与脚本</h3><b>SCENE & SCRIPT</b></div><p>使用中性影棚场景承载多套造型切换，并通过脚本拆分节奏、动作和转场节点。</p></div>
            <button className="scene-asset" onClick={() => setSelectedAdAsset("场景")} aria-label="放大查看场景资产">
              <img src="/ai-ads/ootd/场景.webp" alt="OOTD 中性影棚场景" loading="lazy" />
              <span><b>NEUTRAL STUDIO</b><em>统一光线与空间基准</em></span>
            </button>
            <div className="script-card asset-note"><span>PRODUCTION NOTE</span><h3>从静态资产到动态成片</h3><p>人物设定、造型拆解与统一场景共同构成稳定的生成基础。</p><div><b>人物设定</b><i>→</i><b>造型拆解</b><i>→</i><b>场景锁定</b></div></div>
          </div>
          </div></div>}

          {scriptOpen && <div className="script-document" role="dialog" aria-modal="true" aria-label="今天穿哪套完整剧本文档" onClick={() => setScriptOpen(false)}>
          <button className="script-close" onClick={() => setScriptOpen(false)} aria-label="关闭剧本文档">关闭文档 ×</button>
          <div className="full-script" onClick={(event) => event.stopPropagation()}>
            <div className="full-script-head"><span>05 / FULL DOCUMENT</span><h3>《今天穿哪套？》<em>完整剧本与生成脚本</em></h3><p>OOTD｜8 LOOKS · 逐镜头脚本 · 人物 · 产品 · 场景资产</p></div>

            <section className="doc-section"><h4>项目信息</h4><div className="doc-info">{projectInfo.map(([k,v])=><div key={k}><b>{k}</b><p>{v}</p></div>)}</div></section>
            <section className="doc-section"><h4>完整版广告剧本</h4><div className="film-settings"><p><b>片长</b>56.7 秒</p><p><b>场景</b>白色无影棚｜日｜内</p><p><b>人物</b>八套造型模特，可由同一数字人换装，也可分别锁定八张角色参考</p><p><b>声音</b>无对白；节奏型时尚电子音乐，每 7.1 秒设置一次明显节拍重音</p><p><b>核心表达</b>一间纯白影棚，八套不同性格依次接管镜头：甜酷、极简、运动、休闲、学院、复古、派对、彩色运动</p></div><div className="film-body">{filmBody.map((p,i)=><p key={i}><span>{String(i+1).padStart(2,"0")}</span>{p}</p>)}</div></section>
            <section className="doc-section"><h4>逐镜头拍摄与 LibTV 生视频脚本</h4><p className="doc-lead">原片结构为 8 个长镜头，每镜约 7.1 秒。建议在 LibTV 中逐套生成，内部按照“入画—完整展示—旋转转场”三个动作节拍完成。</p><div className="shot-list">{shots.map(s=><article key={s.no}><header><span>{s.no}</span><div><b>{s.look}</b><em>{s.time}</em></div><p>{s.camera}</p></header><div className="shot-copy"><p><b>画面动作</b>{s.action}</p><p><b>声音／节奏</b>{s.sound}</p><p className="prompt"><b>LibTV 提示词</b>{s.prompt}</p></div></article>)}</div></section>
            <section className="doc-section"><h4>人物三视图与表情资产</h4><p className="doc-lead">以下每张图片均包含正面、左侧面、背面和五组表情，可直接作为 LibTV 角色参考图。为避免换装时串脸，建议一个 LOOK 对应一个角色参考编号。</p><div className="character-docs">{characters.map(c=><article key={c.title}><h5>{c.title}</h5><span>生成资产｜人物三视图＋五组表情</span><p><b>外形服装</b>{c.clothes}</p><p><b>表演方向</b>{c.performance}</p><p><b>连续性锁定</b>{c.lock}</p></article>)}</div></section>
            <section className="doc-section"><h4>产品与服装资产</h4><p className="doc-lead">产品资产按完整穿搭拆分为上装、下装、鞋、包和配饰。生成镜头时应同时引用对应 LOOK 的人物图与产品图。</p><div className="product-docs">{products.map(p=><article key={p[0]}><header><span>{p[0]}</span><b>{p[1]}</b></header><p><b>产品组件</b>{p[2]}</p><p><b>材质与颜色约束</b>{p[3]}</p></article>)}</div></section>
            <section className="doc-section"><h4>场景资产 · S01</h4><div className="doc-info">{sceneInfo.map(([k,v])=><div key={k}><b>{k}</b><p>{v}</p></div>)}</div></section>
            <section className="doc-section"><h4>连续性与生成规范</h4><ol className="workflow-list">{workflow.map((x,i)=><li key={i}><span>{String(i+1).padStart(2,"0")}</span>{x}</li>)}</ol><div className="prompt-pair"><div><b>全片主提示词</b><p>{masterPrompt}</p></div><div><b>统一负面提示词</b><p>{negativePrompt}</p></div></div></section>
            <section className="doc-section"><h4>交付前检查</h4><div className="checklist">{checklist.map(([k,v])=><div key={k}><b>✓ {k}</b><p>{v}</p></div>)}</div></section>
          </div></div>}

          <div className="cat-case">
            <div className="cat-case-head"><span>CASE 02 · PET COMMERCIAL</span><h2>菲力猫粮<em>懂它的一天。</em></h2><p>用“充电”比喻猫咪吃饭、玩耍与休息的能量循环，最后回到等待主人归家的情感价值。</p></div>
            <div id="video-catfood" className="cat-film"><video controls playsInline preload="metadata" poster="/ai-ads/catfood/product.webp"><source src="/ai-ads/catfood/catfood.mp4" type="video/mp4" /></video><div><span>55.10 SEC · 16:9 · PET STORY</span><h3>从日常能量，到回家的那一刻。</h3></div></div>
            <div className="cat-entry-grid">
              <button className="cat-entry asset-entry" onClick={() => setCatAssetsOpen(true)}><span>01 / ASSET LIBRARY</span><h3>进入分类资产</h3><p>产品包装、角色卡与五组场景空镜</p><b>OPEN ASSETS ↗</b></button>
              <button className="cat-entry document-entry" onClick={() => setCatScriptOpen(true)}><span>02 / FULL DOCUMENT</span><h3>打开完整剧本</h3><p>文学剧本、拍摄脚本与逐镜提示词</p><b>READ SCRIPT ↗</b></button>
            </div>
          </div>

          {catAssetsOpen && <div className="script-document cat-assets-document" role="dialog" aria-modal="true" aria-label="菲力猫粮分类资产" onClick={() => setCatAssetsOpen(false)}><button className="script-close" onClick={() => setCatAssetsOpen(false)}>关闭资产 ×</button><div className="cat-assets-page" onClick={e=>e.stopPropagation()}>
            <header><span>FELINE FEAST · ASSET LIBRARY</span><h2>项目资产<em>分类归档。</em></h2></header>
            <section><div className="cat-asset-title"><span>01</span><div><h3>产品资产</h3><b>PRODUCT REFERENCE</b></div></div><img src="/ai-ads/catfood/product.webp" alt="FELINE FEAST 猫粮包装参考" /></section>
            <section><div className="cat-asset-title"><span>02</span><div><h3>人物与角色</h3><b>CHARACTER REFERENCES</b></div></div><div className="cat-character-grid"><figure><img src="/ai-ads/catfood/cat.webp" alt="虎斑猫角色卡" /><figcaption>P01 · 虎斑猫三视图与表情参考</figcaption></figure><figure><img src="/ai-ads/catfood/owner.webp" alt="年轻女主人角色卡" /><figcaption>P02 · 年轻女主人三视图与表情参考</figcaption></figure></div></section>
            <section><div className="cat-asset-title"><span>03</span><div><h3>场景资产</h3><b>SCENE REFERENCES</b></div></div><div className="cat-scene-grid">{[1,2,3,4,5].map((n)=><figure key={n}><img src={`/ai-ads/catfood/scene-${n}.webp`} alt={`菲力猫粮场景 ${n}`} /><figcaption>S0{n} · {['晨间木屋露台','复古餐厨空间','复古客厅','玄关与鞋架','金黄色产品棚拍'][n-1]}</figcaption></figure>)}</div></section>
          </div></div>}

          {catScriptOpen && <div className="script-document cat-script-document" role="dialog" aria-modal="true" aria-label="菲力猫粮完整剧本文档" onClick={() => setCatScriptOpen(false)}><button className="script-close" onClick={() => setCatScriptOpen(false)}>关闭文档 ×</button><article className="cat-script-page" onClick={e=>e.stopPropagation()}><header><span>LIBTV PET COMMERCIAL PRODUCTION DOCUMENT</span><h2>菲力猫粮<em>懂它的一天。</em></h2><p>文学剧本｜拍摄脚本｜LibTV 逐镜提示词</p></header><div className="cat-script-content">{catfoodScript.map((line,index)=>{const heading=/^(项目概览|完整旁白|第一部分|第二部分|第三部分|全局生成|镜头 \d+|场景[一二三四五六七]|人物资产|场景资产|产品资产)/.test(line);return heading?<h3 key={index}>{line}</h3>:<p key={index}>{line}</p>})}</div></article></div>}

          <div className="cat-case ear-case">
            <div className="cat-case-head ear-case-head"><span>CASE 03 · AUDIO COMMERCIAL</span><h2>声场成真<em>鲜活声场，极致沉浸。</em></h2><p>把“听见”转化为“看见”：音乐化作彩色手绘角色与轨迹，从白色产品棚进入真实客厅，建立产品、人物与视效之间的完整叙事。</p></div>
            <div id="video-earphone" className="cat-film ear-film"><video controls playsInline preload="metadata" poster="/ai-ads/earphone/product.webp"><source src="/ai-ads/earphone/earphone.mp4" type="video/mp4" /></video><div><span>63.25 SEC · 16:9 · IMMERSIVE AUDIO</span><h3>从一副耳机，进入一整个鲜活世界。</h3></div></div>
            <div className="cat-entry-grid">
              <button className="cat-entry ear-asset-entry" onClick={() => setEarAssetsOpen(true)}><span>01 / ASSET LIBRARY</span><h3>进入分类资产</h3><p>产品、人物、场景与音乐手绘视效</p><b>OPEN ASSETS ↗</b></button>
              <button className="cat-entry ear-document-entry" onClick={() => setEarScriptOpen(true)}><span>02 / FULL DOCUMENT</span><h3>打开完整剧本</h3><p>广告剧本、拍摄脚本与 LibTV 提示词全文</p><b>READ SCRIPT ↗</b></button>
            </div>
          </div>

          {earAssetsOpen && <div className="script-document ear-assets-document" role="dialog" aria-modal="true" aria-label="耳机宣传分类资产" onClick={() => setEarAssetsOpen(false)}><button className="script-close" onClick={() => setEarAssetsOpen(false)}>关闭资产 ×</button><div className="cat-assets-page ear-assets-page" onClick={e=>e.stopPropagation()}>
            <header><span>WHITE TWS EARBUDS · ASSET LIBRARY</span><h2>项目资产<em>分类归档。</em></h2></header>
            <section><div className="cat-asset-title"><span>01</span><div><h3>产品资产</h3><b>PRODUCT REFERENCE</b></div></div><img src="/ai-ads/earphone/product.webp" alt="白色 TWS 耳机产品资产卡" /></section>
            <section><div className="cat-asset-title"><span>02</span><div><h3>人物资产</h3><b>CHARACTER REFERENCES</b></div></div><div className="cat-character-grid"><figure><img src="/ai-ads/earphone/male.webp" alt="年轻男主人物资产卡" /><figcaption>P01 · 年轻男主三视图与表情参考</figcaption></figure><figure><img src="/ai-ads/earphone/female.webp" alt="年轻女室友人物资产卡" /><figcaption>P02 · 年轻女室友三视图与表情参考</figcaption></figure></div></section>
            <section><div className="cat-asset-title"><span>03</span><div><h3>场景资产</h3><b>SCENE REFERENCES</b></div></div><div className="cat-scene-grid ear-scene-grid"><figure><img src="/ai-ads/earphone/scene-studio.webp" alt="白色产品棚拍场景" /><figcaption>S01 · 白色产品棚拍空间</figcaption></figure><figure><img src="/ai-ads/earphone/scene-living.webp" alt="明亮开放式客厅场景" /><figcaption>S02 · 明亮开放式客厅</figcaption></figure></div></section>
            <section><div className="cat-asset-title"><span>04</span><div><h3>视效资产</h3><b>VISUAL EFFECTS</b></div></div><img className="ear-vfx" src="/ai-ads/earphone/vfx.webp" alt="音乐手绘涂鸦视效资产卡" /></section>
          </div></div>}

          {earScriptOpen && <div className="script-document ear-script-document" role="dialog" aria-modal="true" aria-label="耳机宣传完整剧本文档" onClick={() => setEarScriptOpen(false)}><button className="script-close" onClick={() => setEarScriptOpen(false)}>关闭文档 ×</button><article className="cat-script-page ear-script-page" onClick={e=>e.stopPropagation()}><header><span>LIBTV IMMERSIVE AUDIO COMMERCIAL PRODUCTION DOCUMENT</span><h2>声场成真<em>鲜活声场，极致沉浸。</em></h2><p>剧本｜拍摄脚本｜资产卡｜LibTV 提示词</p></header><div className="cat-script-content ear-script-content">{earphoneScript.map((line,index)=>{const heading=/^(项目概览|核心创意|叙事结构|完整|第一|第二|第三|第四|第五|第六|镜头|场景|人物|产品|视效|声音|全局|生成|剪辑|交付|附录)/.test(line);return heading?<h3 key={index}>{line}</h3>:<p key={index}>{line}</p>})}</div></article></div>}

          <div className="cat-case interactive-case">
            <div className="cat-case-head interactive-case-head"><span>CASE 04 · INTERACTIVE COMMERCIAL</span><h2>互动影像<em>让画面回应每一次参与。</em></h2><p>以互动节奏和动态视觉建立观看参与感，在简洁的影像结构中呈现更直接、更具记忆点的广告表达。</p></div>
            <div className="cat-film interactive-film"><video controls playsInline preload="metadata"><source src="/ai-ads/interactive/interactive.mp4" type="video/mp4" /></video><div><span>AI COMMERCIAL · INTERACTIVE MOTION</span><h3>互动 · AI Creative Film</h3></div></div>
          </div>
        </section>

        <section id="drama" className={`drama-showcase ${dramaOpen ? "drama-expanded" : ""}`}>
          <button className="drama-master-entry" onClick={() => setDramaOpen(true)}>
            <span className="drama-master-index">06 / AI NARRATIVE SERIES</span>
            <div className="drama-master-frame" aria-hidden="true"><i /><i /><b>▶</b></div>
            <div className="drama-master-copy"><small>STORY · CHARACTER · CINEMATIC WORLD</small><h2>AI短剧</h2><h3>四部故事，进入完整影像叙事宇宙。</h3><p>现实亲情、奇幻史诗、宫廷逆袭与巾帼传奇</p></div>
            <em>进入短剧作品集 ↗</em>
          </button>
          {dramaOpen && <button className="drama-master-close" onClick={() => { setDramaOpen(false); setVideoHubOpen(true); }}>← 返回 AI视频</button>}
          <header className="showcase-title drama-showcase-title"><span>06 / SELECTED WORKS</span><h2>AI短剧</h2><p>AI NARRATIVE SERIES</p></header>
          <div className="drama-heading"><p className="section-kicker">AI NARRATIVE SERIES · CASE 01</p><h2>最后一颗糖<em>有些等待，从未过期。</em></h2><p>一颗被珍藏多年的水果糖，连接童年赠糖、成年离乡、电话牵挂与返乡重逢。以现实主义影像呈现跨越时间的亲情守候。</p></div>
          <div id="video-candy" className="drama-film"><video controls playsInline preload="metadata" poster="/ai-drama/last-candy/candy.webp"><source src="/ai-drama/last-candy/last-candy.mp4" type="video/mp4" /></video><div><span>03:30 · 16:9 · FAMILY DRAMA</span><h3>一颗糖，等一个人回家。</h3></div></div>
          <div className="cat-entry-grid drama-entry-grid"><button className="cat-entry drama-asset-entry" onClick={() => setCandyAssetsOpen(true)}><span>01 / ASSET LIBRARY</span><h3>进入分类资产</h3><p>人物、场景与核心道具交互归档</p><b>OPEN ASSETS ↗</b></button><button className="cat-entry drama-document-entry" onClick={() => setCandyScriptOpen(true)}><span>02 / FULL DOCUMENT</span><h3>打开完整剧本</h3><p>完整剧本、拍摄分镜与生成提示词</p><b>READ SCRIPT ↗</b></button></div>

          {candyAssetsOpen && <div className="script-document" role="dialog" aria-modal="true" aria-label="最后一颗糖分类资产" onClick={() => setCandyAssetsOpen(false)}><button className="script-close" onClick={() => setCandyAssetsOpen(false)}>关闭资产 ×</button><div className="candy-assets-page" onClick={e=>e.stopPropagation()}><header><span>THE LAST CANDY · ASSET LIBRARY</span><h2>短剧资产<em>分类浏览。</em></h2><p>点击分类按钮切换人物、场景与道具资产。</p></header><nav className="asset-tabs" aria-label="资产分类"><button className={candyAssetCategory==="characters"?"active":""} onClick={()=>setCandyAssetCategory("characters")}>人物资产 · 05</button><button className={candyAssetCategory==="scenes"?"active":""} onClick={()=>setCandyAssetCategory("scenes")}>场景资产 · 05</button><button className={candyAssetCategory==="props"?"active":""} onClick={()=>setCandyAssetCategory("props")}>道具资产 · 02</button></nav>
            {candyAssetCategory==="characters" && <section><div className="candy-asset-title"><span>01</span><div><h3>人物资产</h3><b>CHARACTER REFERENCES</b></div></div><div className="candy-grid">{[["adult-granddaughter","成年孙女"],["young-granddaughter","童年孙女"],["grandmother","奶奶"],["grandfather","爷爷"],["leader","领导"]].map(([file,title])=><figure key={file}><img src={`/ai-drama/last-candy/${file}.webp`} alt={`${title}人物资产卡`} /><figcaption>{title} · 三视图与表情参考</figcaption></figure>)}</div></section>}
            {candyAssetCategory==="scenes" && <section><div className="candy-asset-title"><span>02</span><div><h3>场景资产</h3><b>SCENE REFERENCES</b></div></div><div className="candy-grid candy-scene-grid">{[["scene-office","深夜办公室"],["scene-train","高铁车厢"],["scene-station","高铁站"],["scene-street","老街黄昏"],["scene-home","乡村老宅"]].map(([file,title])=><figure key={file}><img src={`/ai-drama/last-candy/${file}.webp`} alt={`${title}场景资产`} /><figcaption>{title} · 空间与光线参考</figcaption></figure>)}</div></section>}
            {candyAssetCategory==="props" && <section><div className="candy-asset-title"><span>03</span><div><h3>道具资产</h3><b>PROP REFERENCES</b></div></div><div className="candy-grid"><figure><img src="/ai-drama/last-candy/candy.webp" alt="最后一颗糖核心道具资产" /><figcaption>核心道具 · 红色水果糖多角度参考</figcaption></figure><figure><img src="/ai-drama/last-candy/props.webp" alt="短剧综合道具资产" /><figcaption>综合道具 · 背包、行李箱、手机、电脑与木凳</figcaption></figure></div></section>}
          </div></div>}

          {candyScriptOpen && <div className="script-document" role="dialog" aria-modal="true" aria-label="最后一颗糖完整剧本文档" onClick={() => setCandyScriptOpen(false)}><button className="script-close" onClick={() => setCandyScriptOpen(false)}>关闭文档 ×</button><article className="candy-script-page" onClick={e=>e.stopPropagation()}><header><span>LIBTV NARRATIVE PRODUCTION DOCUMENT</span><h2>最后一颗糖<em>完整剧本与拍摄脚本。</em></h2><p>原文完整导入 · 共 {lastCandyScript.length} 个内容段落</p></header><div className="candy-script-content">{lastCandyScript.map((line,index)=>{const heading=/^(规格|项目|故事|人物|场景|道具|完整|剧本|分镜|镜头|第一|第二|第三|第四|第五|第六|第七|第八|全局|生成|声音|剪辑|交付|附录)/.test(line);return heading?<h3 key={index}>{line}</h3>:<p key={index}>{line}</p>})}</div></article></div>}

          <div className="shanjia-case white-wolf-case">
            <div className="drama-heading white-wolf-heading"><p className="section-kicker">AI NARRATIVE SERIES · CASE 02</p><h2>白狼女王<em>黑血归来，王冠由选择铸成。</em></h2><p>一部围绕血脉、自由与救赎展开的暗黑奇幻竖屏短剧。艾拉从封魂水晶中看见自己的白狼真身，穿越雪原前往吸血鬼城，并揭开三族共同掩埋的黑血旧约。</p></div>
            <div id="video-white-wolf" className="white-wolf-films">
              <div className="drama-film white-wolf-film"><video controls playsInline preload="metadata" poster="/ai-drama/white-wolf/场景/01_阿尔德里克书房_黄昏.png"><source src="/ai-drama/white-wolf/white-wolf-1.mp4" type="video/mp4" /></video><div><span>PART 01 · 9:16 · DARK FANTASY</span><h3>冰晶显影，白狼血脉第一次苏醒。</h3></div></div>
              <div className="drama-film white-wolf-film"><video controls playsInline preload="metadata" poster="/ai-drama/white-wolf/场景/04_吸血鬼城门_血月.png"><source src="/ai-drama/white-wolf/white-wolf-2.mp4" type="video/mp4" /></video><div><span>PART 02 · 9:16 · DARK FANTASY</span><h3>穿过雪岭，黑血在王城之下归来。</h3></div></div>
            </div>
            <div className="cat-entry-grid drama-entry-grid"><button className="cat-entry white-wolf-asset-entry" onClick={() => setWhiteWolfAssetsOpen(true)}><span>01 / ASSET LIBRARY</span><h3>进入分类资产</h3><p>9 组人物、13 组场景与 10 组核心道具</p><b>OPEN ASSETS ↗</b></button><button className="cat-entry white-wolf-document-entry" onClick={() => setWhiteWolfScriptOpen(true)}><span>02 / FULL DOCUMENT</span><h3>打开制作文档</h3><p>60 分钟完整故事、19 场结构与 22 镜头脚本</p><b>READ DOCUMENT ↗</b></button></div>
          </div>

          {whiteWolfAssetsOpen && <div className="script-document white-wolf-assets-document" role="dialog" aria-modal="true" aria-label="白狼女王分类资产" onClick={() => setWhiteWolfAssetsOpen(false)}><button className="script-close" onClick={() => setWhiteWolfAssetsOpen(false)}>关闭资产 ×</button><div className="candy-assets-page white-wolf-assets-page" onClick={e=>e.stopPropagation()}><header><span>THE WHITE WOLF QUEEN · ASSET LIBRARY</span><h2>白狼女王<em>视觉资产档案。</em></h2><p>角色、世界场景与叙事道具均按连续性生产标准整理。</p></header><nav className="asset-tabs white-wolf-tabs" aria-label="白狼女王资产分类"><button className={whiteWolfAssetCategory==="characters"?"active":""} onClick={()=>setWhiteWolfAssetCategory("characters")}>人物资产 · 09</button><button className={whiteWolfAssetCategory==="scenes"?"active":""} onClick={()=>setWhiteWolfAssetCategory("scenes")}>场景资产 · 13</button><button className={whiteWolfAssetCategory==="props"?"active":""} onClick={()=>setWhiteWolfAssetCategory("props")}>道具资产 · 10</button></nav>
            {whiteWolfAssetCategory==="characters" && <section><div className="candy-asset-title"><span>01</span><div><h3>人物资产</h3><b>CHARACTER REFERENCES</b></div></div><div className="candy-grid">{[["01_阿尔德里克_三视图表情版","阿尔德里克"],["02_卢锡安_三视图表情版","卢锡安"],["03_妮拉_三视图表情版","妮拉"],["04_露恩_三视图表情版","露恩"],["05_恩妮德_三视图表情版","恩妮德"],["06_玛拉_三视图表情版","玛拉"],["07_玛拉的女儿_三视图表情版","玛拉的女儿"],["08_感染老人_三视图表情版","感染老人"],["09_黑血实体_三视图形态版","黑血实体"]].map(([file,title])=><figure key={file}><img src={`/ai-drama/white-wolf/人物/${file}.png`} alt={`${title}人物资产卡`} /><figcaption>{title} · 三视图、表情与造型连续性</figcaption></figure>)}</div></section>}
            {whiteWolfAssetCategory==="scenes" && <section><div className="candy-asset-title"><span>02</span><div><h3>场景资产</h3><b>SCENE REFERENCES</b></div></div><div className="candy-grid candy-scene-grid">{[["01_阿尔德里克书房_黄昏","阿尔德里克书房"],["02_黑血雪村_夜","黑血雪村"],["03_骨镜森林_夜","骨镜森林"],["04_吸血鬼城门_血月","吸血鬼城门"],["05_吸血鬼王座厅_夜","吸血鬼王座厅"],["06_血月假面舞厅_夜","血月假面舞厅"],["07_地下囚禁礼拜堂_夜","地下囚禁礼拜堂"],["08_被抹去的盟约档案馆","盟约档案馆"],["09_吸血鬼城上空北境裂隙","北境裂隙"],["10_废墟王座厅_黎明","废墟王座厅"],["11_吸血鬼城中央广场_白昼","中央广场"],["12_复苏中的无名村_清晨","复苏中的无名村"],["13_北境界碑_日落极光","北境界碑"]].map(([file,title])=><figure key={file}><img src={`/ai-drama/white-wolf/场景/${file}.png`} alt={`${title}场景资产`} /><figcaption>{title} · 空间、光线与气氛参考</figcaption></figure>)}</div></section>}
            {whiteWolfAssetCategory==="props" && <section><div className="candy-asset-title"><span>03</span><div><h3>道具资产</h3><b>PROP REFERENCES</b></div></div><div className="candy-grid shanjia-prop-grid">{[["01_狼牙钥匙","狼牙钥匙"],["02_通往吸血鬼城的烧毁地图","烧毁地图"],["03_黑血瓶","黑血瓶"],["04_村庄木质名牌","村庄木质名牌"],["05_露恩的银色仪式匕首","银色仪式匕首"],["06_被抹去的三国盟约","三国盟约"],["07_灵魂水晶","灵魂水晶"],["08_治疗水晶碎片","治疗水晶碎片"],["09_白狼王族银冠","白狼王族银冠"],["10_王冠固定于剑柄_最终状态","王冠剑柄"]].map(([file,title])=><figure key={file}><img src={`/ai-drama/white-wolf/道具/${file}.png`} alt={`${title}道具资产`} /><figcaption>{title} · 叙事功能与形态参考</figcaption></figure>)}</div></section>}
          </div></div>}

          {whiteWolfScriptOpen && <div className="script-document white-wolf-script-document" role="dialog" aria-modal="true" aria-label="白狼女王完整制作文档" onClick={() => setWhiteWolfScriptOpen(false)}><button className="script-close" onClick={() => setWhiteWolfScriptOpen(false)}>关闭文档 ×</button><article className="candy-script-page white-wolf-script-page" onClick={e=>e.stopPropagation()}><header><span>THE WHITE WOLF QUEEN · PRODUCTION DOCUMENT</span><h2>黑血归来<em>完整故事与制作设定。</em></h2><p>两段原片 · 60 分钟扩写 · 19 场叙事 · 22 镜头生成规范</p></header><div className="candy-script-content">{whiteWolfScript.map((line,index)=>{const heading=/^(《|项目定位|故事梗概|主要人物|十九场叙事结构|视觉规则|资产与制作)/.test(line);return heading?<h3 key={index}>{line}</h3>:<p key={index}>{line}</p>})}</div></article></div>}

          <div className="shanjia-case royal-physician-case">
            <div className="drama-heading royal-physician-heading"><p className="section-kicker">AI NARRATIVE SERIES · CASE 03</p><h2>医妃入宫<em>圣手逆命。</em></h2><p>以宫廷医术与命运逆袭为主线的竖屏 AI 短剧。双篇成片依照原始顺序呈现，完整保留连续剧情与人物关系。</p></div>
            <div id="video-royal-physician" className="white-wolf-films royal-physician-films">
              <div className="drama-film royal-physician-film"><video controls playsInline preload="metadata" poster="/ai-drama/royal-physician/scenes/06.png"><source src="/ai-drama/royal-physician/royal-physician-2-web.mp4" type="video/mp4" /></video><div><span>PART 01 · 9:16 · PALACE DRAMA</span><h3>医妃入宫 · 圣手逆命（上篇）</h3></div></div>
              <div className="drama-film royal-physician-film"><video controls playsInline preload="metadata" poster="/ai-drama/royal-physician/scenes/02.png"><source src="/ai-drama/royal-physician/royal-physician-1-web.mp4" type="video/mp4" /></video><div><span>PART 02 · 9:16 · PALACE DRAMA</span><h3>医妃入宫 · 圣手逆命（下篇）</h3></div></div>
            </div>
            <div className="cat-entry-grid drama-entry-grid"><button className="cat-entry royal-physician-asset-entry" onClick={() => setRoyalPhysicianAssetsOpen(true)}><span>01 / ASSET LIBRARY</span><h3>进入分类资产</h3><p>13 组人物、16 组场景与 23 组核心道具</p><b>OPEN ASSETS ↗</b></button><button className="cat-entry royal-physician-document-entry" onClick={() => setRoyalPhysicianScriptOpen(true)}><span>02 / FULL DOCUMENT</span><h3>打开制作文档</h3><p>完整文学剧本与 150 分钟拍摄脚本表格</p><b>READ DOCUMENT ↗</b></button></div>
          </div>

          {royalPhysicianAssetsOpen && <div className="script-document royal-physician-assets-document" role="dialog" aria-modal="true" aria-label="医妃入宫分类资产" onClick={() => setRoyalPhysicianAssetsOpen(false)}><button className="script-close" onClick={() => setRoyalPhysicianAssetsOpen(false)}>关闭资产 ×</button><div className="candy-assets-page royal-physician-assets-page" onClick={e=>e.stopPropagation()}><header><span>ROYAL PHYSICIAN · ASSET LIBRARY</span><h2>医妃入宫<em>视觉资产档案。</em></h2><p>人物造型、宫廷空间与关键叙事道具按制作类别完整收录。</p></header><nav className="asset-tabs royal-physician-tabs" aria-label="医妃入宫资产分类"><button className={royalPhysicianAssetCategory==="characters"?"active":""} onClick={()=>setRoyalPhysicianAssetCategory("characters")}>人物资产 · 13</button><button className={royalPhysicianAssetCategory==="scenes"?"active":""} onClick={()=>setRoyalPhysicianAssetCategory("scenes")}>场景资产 · 16</button><button className={royalPhysicianAssetCategory==="props"?"active":""} onClick={()=>setRoyalPhysicianAssetCategory("props")}>道具资产 · 23</button></nav>
            {royalPhysicianAssetCategory==="characters" && <section><div className="candy-asset-title"><span>01</span><div><h3>人物资产</h3><b>CHARACTER REFERENCES</b></div></div><div className="candy-grid">{royalPhysicianCharacters.map((title,index)=><figure key={title}><img src={`/ai-drama/royal-physician/characters/${String(index+1).padStart(2,"0")}.png`} alt={`${title}人物资产卡`} /><figcaption>{title} · 三视图、妆造与细节参考</figcaption></figure>)}</div></section>}
            {royalPhysicianAssetCategory==="scenes" && <section><div className="candy-asset-title"><span>02</span><div><h3>场景资产</h3><b>SCENE REFERENCES</b></div></div><div className="candy-grid candy-scene-grid">{royalPhysicianScenes.map((title,index)=><figure key={title}><img src={`/ai-drama/royal-physician/scenes/${String(index+1).padStart(2,"0")}.png`} alt={`${title}场景资产`} /><figcaption>{title} · 空间、光线与陈设参考</figcaption></figure>)}</div></section>}
            {royalPhysicianAssetCategory==="props" && <section><div className="candy-asset-title"><span>03</span><div><h3>道具资产</h3><b>PROP REFERENCES</b></div></div><div className="candy-grid royal-physician-prop-grid">{royalPhysicianProps.map((title,index)=><figure key={title}><img src={`/ai-drama/royal-physician/props/${String(index+1).padStart(2,"0")}.png`} alt={`${title}道具资产`} /><figcaption>{title} · 形态、材质与叙事功能参考</figcaption></figure>)}</div></section>}
          </div></div>}

          {royalPhysicianScriptOpen && <div className="script-document royal-physician-script-document" role="dialog" aria-modal="true" aria-label="医妃入宫完整剧本与拍摄脚本" onClick={() => setRoyalPhysicianScriptOpen(false)}><button className="script-close" onClick={() => setRoyalPhysicianScriptOpen(false)}>关闭文档 ×</button><article className="candy-script-page royal-physician-script-page" onClick={e=>e.stopPropagation()}><header><span>ROYAL PHYSICIAN · COMPLETE PRODUCTION DOCUMENTS</span><h2>医妃入宫<em>完整剧本与拍摄脚本。</em></h2><p>Word 剧本 {royalPhysicianDocuments.screenplay.length} 段 · Excel 拍摄脚本 {royalPhysicianDocuments.shootingScript.reduce((sum,sheet)=>sum+sheet.rows.length,0)} 行</p></header><div className="candy-script-content royal-physician-script-content"><h2 className="document-divider">01 · 完整文学剧本（DOCX）</h2>{royalPhysicianDocuments.screenplay.map((line,index)=>{const heading=/^(《|第[一二三四五六七八九十百0-9]+[集幕场]|主要人物|人物小传|故事梗概|项目)/.test(line);return heading?<h3 key={`doc-${index}`}>{line}</h3>:<p key={`doc-${index}`}>{line}</p>})}<h2 className="document-divider">02 · 150 分钟拍摄脚本（XLSX）</h2>{royalPhysicianDocuments.shootingScript.map((sheet,sheetIndex)=><section className="shooting-sheet" key={sheet.sheet}><h3>{String(sheetIndex+1).padStart(2,"0")} · {sheet.sheet}</h3><div className="shooting-table-wrap"><table><tbody>{sheet.rows.map((row,rowIndex)=><tr key={rowIndex}>{row.map((cell,cellIndex)=><td key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table></div></section>)}</div></article></div>}

          <div className="shanjia-case mulan-case">
            <div className="drama-heading mulan-heading"><p className="section-kicker">AI NARRATIVE SERIES · CASE 04</p><h2>花木兰<em>替父从军，踏上自己的征途。</em></h2><p>以木兰替父从军的经典故事为叙事核心，通过双篇影像呈现身份选择、战场成长与家国担当。</p></div>
            <div id="video-mulan" className="white-wolf-films mulan-films">
              <div className="drama-film mulan-film"><video controls playsInline preload="metadata"><source src="/ai-drama/mulan/mulan-1.mp4" type="video/mp4" /></video><div><span>PART 01 · AI NARRATIVE</span><h3>《花木兰》（上篇）</h3></div></div>
              <div className="drama-film mulan-film"><video controls playsInline preload="metadata"><source src="/ai-drama/mulan/mulan-2.mp4" type="video/mp4" /></video><div><span>PART 02 · AI NARRATIVE</span><h3>《花木兰》（下篇）</h3></div></div>
            </div>
            <div className="cat-entry-grid drama-entry-grid mulan-entry-grid"><button className="cat-entry mulan-asset-entry" onClick={() => setMulanAssetsOpen(true)}><span>01 / ASSET LIBRARY</span><h3>进入分类资产</h3><p>5 组人物、3 组场景与 2 组道具资产</p><b>OPEN ASSETS ↗</b></button><button className="cat-entry mulan-document-entry" onClick={() => setMulanScriptOpen(true)}><span>02 / FULL DOCUMENT</span><h3>打开完整剧本</h3><p>完整版文学剧本与 28 分钟分镜拍摄执行脚本</p><b>READ DOCUMENT ↗</b></button></div>
          </div>

          {mulanAssetsOpen && <div className="script-document mulan-assets-document" role="dialog" aria-modal="true" aria-label="花木兰分类资产" onClick={() => setMulanAssetsOpen(false)}><button className="script-close" onClick={() => setMulanAssetsOpen(false)}>关闭资产 ×</button><div className="candy-assets-page mulan-assets-page" onClick={e=>e.stopPropagation()}><header><span>MULAN · ASSET LIBRARY</span><h2>花木兰<em>视觉资产档案。</em></h2><p>人物造型、乡村场景与关键陈设按制作类别整理。</p></header><nav className="asset-tabs mulan-tabs" aria-label="花木兰资产分类"><button className={mulanAssetCategory==="characters"?"active":""} onClick={()=>setMulanAssetCategory("characters")}>人物资产 · 05</button><button className={mulanAssetCategory==="scenes"?"active":""} onClick={()=>setMulanAssetCategory("scenes")}>场景资产 · 03</button><button className={mulanAssetCategory==="props"?"active":""} onClick={()=>setMulanAssetCategory("props")}>道具资产 · 02</button></nav>
            {mulanAssetCategory==="characters" && <section><div className="candy-asset-title"><span>01</span><div><h3>人物资产</h3><b>CHARACTER REFERENCES</b></div></div><div className="candy-grid">{[["mulan","花木兰"],["father","花父"],["elder-villager","老村民"],["young-villager","年轻村民"],["recruiting-officer","征兵官"]].map(([file,title])=><figure key={file}><img src={`/ai-drama/mulan/assets/characters/${file}.png`} alt={`${title}人物资产卡`} /><figcaption>{title} · 三视图、造型与表情参考</figcaption></figure>)}</div></section>}
            {mulanAssetCategory==="scenes" && <section><div className="candy-asset-title"><span>02</span><div><h3>场景资产</h3><b>SCENE REFERENCES</b></div></div><div className="candy-grid candy-scene-grid">{[["village-recruitment","村口征兵"],["hua-courtyard","花家院内"],["hua-home","花家宅院"]].map(([file,title])=><figure key={file}><img src={`/ai-drama/mulan/assets/scenes/${file}.png`} alt={`${title}场景资产`} /><figcaption>{title} · 空间、光线与环境陈设参考</figcaption></figure>)}</div></section>}
            {mulanAssetCategory==="props" && <section><div className="candy-asset-title"><span>03</span><div><h3>道具资产</h3><b>PROP REFERENCES</b></div></div><div className="candy-grid mulan-prop-grid">{[["village-props-1","征兵告示与村落器物"],["village-props-2","花家生活陈设"]].map(([file,title])=><figure key={file}><img src={`/ai-drama/mulan/assets/props/${file}.png`} alt={`${title}道具资产`} /><figcaption>{title} · 形态、材质与使用参考</figcaption></figure>)}</div></section>}
          </div></div>}

          {mulanScriptOpen && <div className="script-document mulan-script-document" role="dialog" aria-modal="true" aria-label="花木兰完整剧本与拍摄脚本" onClick={() => setMulanScriptOpen(false)}><button className="script-close" onClick={() => setMulanScriptOpen(false)}>关闭文档 ×</button><article className="candy-script-page mulan-script-page" onClick={e=>e.stopPropagation()}><header><span>MULAN · COMPLETE PRODUCTION DOCUMENT</span><h2>花木兰<em>完整剧本与拍摄脚本。</em></h2><p>文学剧本 {mulanDocuments.screenplay.length} 段 · 分镜拍摄脚本 {mulanDocuments.shootingScript.length} 镜</p></header><div className="candy-script-content mulan-script-content"><h2 className="document-divider">01 · 完整文学剧本（DOCX）</h2>{mulanDocuments.screenplay.map((line,index)=>{const heading=/^(《|[一二三四五六]+、|第[一二三四五六七八九十]+场|全片完)/.test(line);return heading?<h3 key={`doc-${index}`}>{line}</h3>:<p key={`doc-${index}`}>{line}</p>})}<h2 className="document-divider">02 · 分镜与拍摄执行脚本</h2><section className="shooting-sheet"><div className="shooting-table-wrap"><table><tbody>{mulanDocuments.shootingScript.map((row,rowIndex)=><tr key={rowIndex}>{row.map((cell,cellIndex)=><td key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table></div></section><h2 className="document-divider">03 · 制作建议</h2>{mulanDocuments.productionNotes.map((line,index)=>{const heading=/^(六、|[1-5]\. )/.test(line);return heading?<h3 key={`note-${index}`}>{line}</h3>:<p key={`note-${index}`}>{line}</p>})}</div></article></div>}
        </section>
      </section>

      {selectedPoster !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={posterWorks[selectedPoster].title} onClick={() => setSelectedPoster(null)}>
          <button className="lightbox-close" onClick={() => setSelectedPoster(null)} aria-label="关闭大图">关闭 ×</button>
          <img src={`/posters/${posterWorks[selectedPoster].file}.webp`} alt={posterWorks[selectedPoster].title} onClick={(event) => event.stopPropagation()} />
          <p>{String(selectedPoster + 1).padStart(2, "0")} / 12 · {posterWorks[selectedPoster].title}</p>
        </div>
      )}

      {selectedType !== null && (
        <div className="lightbox type-lightbox" role="dialog" aria-modal="true" aria-label={typeWorks[selectedType].title} onClick={() => setSelectedType(null)}>
          <button className="lightbox-close" onClick={() => setSelectedType(null)} aria-label="关闭大图">关闭 ×</button>
          <img src={`/typeworks/${typeWorks[selectedType].file}.webp`} alt={typeWorks[selectedType].title} onClick={(event) => event.stopPropagation()} />
          <p>{String(selectedType + 1).padStart(2, "0")} / 11 · {typeWorks[selectedType].title}</p>
        </div>
      )}

      {selectedBanner !== null && (
        <div className="lightbox banner-lightbox" role="dialog" aria-modal="true" aria-label={bannerWorks[selectedBanner].title} onClick={() => setSelectedBanner(null)}>
          <button className="lightbox-close" onClick={() => setSelectedBanner(null)} aria-label="关闭大图">关闭 ×</button>
          <img src={`/banners/${bannerWorks[selectedBanner].file}.webp`} alt={bannerWorks[selectedBanner].title} onClick={(event) => event.stopPropagation()} />
          <p>{String(selectedBanner + 1).padStart(2, "0")} / 09 · {bannerWorks[selectedBanner].title}</p>
        </div>
      )}

      {selectedAdAsset !== null && (
        <div className="lightbox ad-lightbox" role="dialog" aria-modal="true" aria-label="OOTD 项目资产" onClick={() => setSelectedAdAsset(null)}>
          <button className="lightbox-close" onClick={() => setSelectedAdAsset(null)} aria-label="关闭大图">关闭 ×</button>
          <img src={`/ai-ads/ootd/${selectedAdAsset}.webp`} alt="OOTD 项目资产大图" onClick={(event) => event.stopPropagation()} />
          <p>OOTD · AI COMMERCIAL ASSET</p>
        </div>
      )}

      <section className="about-section about-section-removed" aria-hidden="true">
        <p className="section-kicker">ABOUT THE CREATOR</p>
        <div className="about-grid">
          <h2>你好，我是<em>韩东杰。</em></h2>
          <div>
            <p>我专注于 AIGC 内容创作，拥有多年内容制作与平台运营经验。擅长拆解创意需求，以 AI 完成脚本、分镜、品牌 KV、海报和动态影像，并建立稳定高效的视觉生产流程。</p>
            <p className="muted">熟悉 Photoshop、Premiere Pro、After Effects、Midjourney、Stable Diffusion、ComfyUI、Kling AI、Dreamina 与 Figma。目前在北京，开放视觉创意与 AI 影像合作。</p>
            <div className="contact-links">
              <a href="mailto:2975879964@qq.com">邮件联系 <span>↗</span></a>
              <a href="https://hdj-131155.github.io/?project=islapaw-update" target="_blank" rel="noreferrer">原作品集 <span>↗</span></a>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="closing-page" aria-label="联系韩东杰">
        <div className="closing-glow closing-glow-one" />
        <div className="closing-glow closing-glow-two" />
        <div className="closing-thanks">
          <span>THANKS FOR WATCHING</span>
          <h2>谢谢<br /><em>观看</em></h2>
          <p>让每一次创意，都成为有生命的影像。</p>
        </div>
        <div className="closing-contact">
          <header>
            <span>CONTACT · 2026</span>
            <h3>保持联系</h3>
          </header>
          <div className="closing-contact-list">
            <a href="tel:17547055309"><small>电话 / PHONE</small><strong>175 4705 5309</strong></a>
            <a href="mailto:2975879964@qq.com"><small>邮箱 / EMAIL</small><strong>2975879964@qq.com</strong></a>
          </div>
          <div className="closing-wechat">
            <div><small>微信 / WECHAT</small><strong>扫码添加微信</strong><p>期待与你交流创意、影像与新的合作。</p></div>
            <figure><img src="/wechat-qr.png" alt="韩东杰微信二维码" /><figcaption>SCAN TO CONNECT</figcaption></figure>
          </div>
        </div>
        <div className="closing-mark">HDJ</div>
      </section>

      <footer><span>HDJ STUDIO © 2026</span><button onClick={() => go("home")}>回到顶部 ↑</button></footer>
    </main>
  );
}
