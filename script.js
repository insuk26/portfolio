// 실제 작업 제목과 설명은 이 목록에서 수정하세요.
const projects = [
  {
    id: "01",
    group: "team",
    title: "기획 협업 프로젝트 A",
    description: "팀 작업 · 기획 / 촬영 / 편집 등 담당 역할 입력",
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
const dialog = document.querySelector("#project-dialog");
projects.forEach((project) => {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "project";
  button.id = `project-${project.id}`;
  button.setAttribute("aria-label", `${project.title} 소개 보기`);
  button.innerHTML = `${project.id === "04" ? '<span class="thumb ninja-mini">PLUS YOUR<br>PACE<small>NINJA / BN300KR</small></span>' : `<span class="thumb"><span class="thumb-label">PROJECT ${project.id}</span><span class="thumb-note">THUMBNAIL / 준비 중</span></span>`}<span class="project-info"><small>${project.id}</small><h3>${project.title}</h3><p>${project.description}</p></span><span class="project-action">프로젝트 보기 <b>↗</b></span>`;
  button.addEventListener("click", () => {
    document.querySelector("#dialog-category").textContent =
      `PROJECT ${project.id} / ${project.group === "team" ? "TEAM WORK" : "PERSONAL WORK"}`;
    document.querySelector("#dialog-title").textContent = project.title;
    document.querySelector("#dialog-description").textContent =
      project.description;
    dialog.showModal();
  });
  document
    .querySelector(
      project.group === "team" ? "#team-projects" : "#solo-projects",
    )
    .append(button);
});
document
  .querySelector(".close")
  .addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    const r = dialog.getBoundingClientRect();
    if (
      event.clientX < r.left ||
      event.clientX > r.right ||
      event.clientY < r.top ||
      event.clientY > r.bottom
    )
      dialog.close();
  }
});

// 링크와 버튼 위에서 오리발 주변으로 물결 퍼뜨리기
if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  const ripple = document.createElement("div");
  ripple.className = "cursor-ripple";
  ripple.setAttribute("aria-hidden", "true");
  document.body.appendChild(ripple);

  const clickable = 'a[href], button:not(:disabled), [role="button"]';

  document.addEventListener("pointermove", (event) => {
    ripple.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;

    const target = event.target.closest(clickable);
    ripple.classList.toggle("is-active", Boolean(target));
  });

  const hideRipple = () => ripple.classList.remove("is-active");

  document.documentElement.addEventListener("pointerleave", hideRipple);
  window.addEventListener("blur", hideRipple);
  window.addEventListener("scroll", hideRipple, { passive: true });
}

// Featured project summaries; replace with result links when ready.
const featuredDetails = {
 ninja: { title: '닌자 블렌더 상세페이지 작업', category: '대표 작업 01 / 상세페이지 디자인', description: 'Ninja Nutri Plus BN300KR의 강점을 전달하는 상세페이지 작업. “오늘의 페이스에, 건강을 더하다.”를 중심으로 POWER PLUS, EASY PLUS, DAILY PLUS를 구성했습니다.' },
 crab: { title: '크랩 모션그래픽 작업', category: '대표 작업 02 / 모션그래픽 제작', description: '크랩을 주제로 제작한 모션그래픽 작업입니다.' },
 anothers: { title: '어나더스 아티스트 인터뷰 기획 작업', category: '대표 작업 03 / 인터뷰 기획', description: '지역 아티스트의 이야기를 담는 어나더스 인터뷰 프로젝트에서 인터뷰 기획을 담당했습니다.' }
};
document.querySelectorAll('[data-featured]').forEach(button => {
 button.addEventListener('click', () => {
  const project = featuredDetails[button.dataset.featured];
  document.querySelector('#dialog-category').textContent = project.category;
  document.querySelector('#dialog-title').textContent = project.title;
  document.querySelector('#dialog-description').textContent = project.description;
  dialog.showModal();
 });
});
