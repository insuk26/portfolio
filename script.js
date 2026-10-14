// 실제 작업 제목과 설명은 이 목록에서 수정하세요.
const projects = [
  {
    id: "01",
    group: "team",
    title: "청량리 시장 홍보영상 제작 제안서",
    description: "청량리 시장 홍보영상 콘텐츠 기획 및 제안서 제작",
    role: "팀장 · 기획 · 디자인 / 기여도 80%",
    thumbnail: "assets/team-cheongnyangni.png",
    url: "https://tasty-pest-e7a.notion.site/01-3f38f22f6f4a8023b161d9b24fa9062e",
  },
  {
    id: "02",
    group: "team",
    title: "기획 협업 프로젝트 B",
    description: "팀 작업 · 기획 / 촬영 / 편집 등 담당 역할 입력",
  },
  {
    id: "03",
    group: "team",
    title: "기획 협업 프로젝트 C",
    description: "팀 작업 · 기획 / 촬영 / 편집 등 담당 역할 입력",
  },
  {
    id: "04",
    group: "solo",
    title: "상세페이지 + 제품 영상",
    description:
      "닌자 뉴트리 플러스 BN300KR · 제품의 강점을 담은 상세페이지와 영상",
  },
  {
    id: "05",
    group: "solo",
    title: "인포그래픽 모션",
    description: "정보를 읽기 쉽게, 움직임은 명확하게.",
  },
  {
    id: "06",
    group: "solo",
    title: "영상 작업",
    description: "영상 제목과 편집 / 촬영 / 사운드 등 담당 역할 입력",
  },
  {
    id: "07",
    group: "solo",
    title: "개인 작업",
    description: "개인 기획 · 실험 · 제작 과정 입력",
  },
];

// 글자를 HTML에 안전하게 넣기
const escapeHTML = (value = "") =>
  String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[character];
  });

// 작업 소개 팝업
const dialog = document.querySelector("#project-dialog");

function openProjectDialog(category, title, description) {
  if (!dialog) return;

  document.querySelector("#dialog-category").textContent = category;
  document.querySelector("#dialog-title").textContent = title;
  document.querySelector("#dialog-description").textContent = description;

  dialog.showModal();
}

// 팀 작업·개인 작업 목록 생성
projects.forEach((project) => {
  const container = document.querySelector(
    project.group === "team" ? "#team-projects" : "#solo-projects",
  );

  if (!container) return;

  // URL이 있으면 링크, 없으면 팝업 버튼
  const item = document.createElement(project.url ? "a" : "button");

  if (project.url) {
    item.href = project.url;
    item.target = "_blank";
    item.rel = "noopener noreferrer";
  } else {
    item.type = "button";
  }

  item.className = "project";
  item.id = `project-${project.id}`;
  item.setAttribute(
    "aria-label",
    `${project.title} 소개 보기${project.url ? " (새 탭)" : ""}`,
  );

  // 썸네일 구성
  let thumbnail;

  if (project.thumbnail) {
    thumbnail = `
      <span
        class="thumb"
        style="padding:0; overflow:hidden; background:#fff;"
      >
        <img
          src="${escapeHTML(project.thumbnail)}"
          alt="${escapeHTML(project.title)} 표지"
          loading="lazy"
          style="
            display:block;
            width:100%;
            height:100%;
            object-fit:contain;
          "
        >
      </span>
    `;
  } else if (project.id === "04") {
    thumbnail = `
      <span class="thumb ninja-mini">
        PLUS YOUR<br>PACE
        <small>NINJA / BN300KR</small>
      </span>
    `;
  } else {
    thumbnail = `
      <span class="thumb">
        <span class="thumb-label">
          PROJECT ${escapeHTML(project.id)}
        </span>
        <span class="thumb-note">
          THUMBNAIL / 준비 중
        </span>
      </span>
    `;
  }

  // 제목·설명·담당 역할·링크 안내
  item.innerHTML = `
    ${thumbnail}

    <span class="project-info">
      <small>${escapeHTML(project.id)}</small>
      <h3>${escapeHTML(project.title)}</h3>
      <p>${escapeHTML(project.description)}</p>

      ${
        project.role
          ? `
            <p class="project-role" style="margin-top:8px;">
              ${escapeHTML(project.role)}
            </p>
          `
          : ""
      }
    </span>

    <span class="project-action" style="gap:10px;">
      프로젝트 보기
      <b aria-hidden="true">↗</b>
    </span>
  `;

  // URL이 없는 작업은 기존 소개 팝업 사용
  if (!project.url) {
    item.addEventListener("click", () => {
      openProjectDialog(
        `PROJECT ${project.id} / ${
          project.group === "team" ? "팀 작업" : "개인 작업"
        }`,
        project.title,
        project.description,
      );
    });
  }

  container.append(item);
});

// 팝업 닫기 버튼
if (dialog) {
  const closeButton = dialog.querySelector(".close");

  closeButton?.addEventListener("click", () => {
    dialog.close();
  });

  // 팝업 바깥쪽을 누르면 닫기
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;

    const bounds = dialog.getBoundingClientRect();

    const outside =
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom;

    if (outside) {
      dialog.close();
    }
  });
}

// 링크와 버튼 위에서 오리발 주변으로 물결 퍼뜨리기
if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  const ripple = document.createElement("div");

  ripple.className = "cursor-ripple";
  ripple.setAttribute("aria-hidden", "true");

  document.body.appendChild(ripple);

  const clickable = 'a[href], button:not(:disabled), [role="button"]';

  document.addEventListener("pointermove", (event) => {
    ripple.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;

    const target =
      event.target instanceof Element ? event.target.closest(clickable) : null;

    ripple.classList.toggle("is-active", Boolean(target));
  });

  const hideRipple = () => {
    ripple.classList.remove("is-active");
  };

  document.documentElement.addEventListener("pointerleave", hideRipple);
  window.addEventListener("blur", hideRipple);
  window.addEventListener("scroll", hideRipple, { passive: true });
}

// 대표 작업 소개
// HTML에서 이미 노션 링크로 바꾼 항목은 그대로 링크를 사용합니다.
const featuredDetails = {
  ninja: {
    title: "닌자 블렌더 상세페이지 작업",
    category: "대표 작업 01 / 상세페이지 디자인",
    description:
      "Ninja Nutri Plus BN300KR의 강점을 전달하는 상세페이지 작업. “오늘의 페이스에, 건강을 더하다.”를 중심으로 POWER PLUS, EASY PLUS, DAILY PLUS를 구성했습니다.",
  },
  crab: {
    title: "크랩 모션그래픽 작업",
    category: "대표 작업 02 / 모션그래픽 제작",
    description: "크랩을 주제로 제작한 모션그래픽 작업입니다.",
  },
  anothers: {
    title: "어나더스 아티스트 인터뷰 기획 작업",
    category: "대표 작업 03 / 인터뷰 기획",
    description:
      "지역 아티스트의 이야기를 담는 어나더스 인터뷰 프로젝트에서 인터뷰 기획을 담당했습니다.",
  },
};

document.querySelectorAll("[data-featured]").forEach((button) => {
  // 실제 주소가 있는 링크는 팝업 대신 해당 주소로 이동
  if (button.matches("a[href]")) return;

  button.addEventListener("click", () => {
    const project = featuredDetails[button.dataset.featured];

    if (!project) return;

    openProjectDialog(project.category, project.title, project.description);
  });
});
