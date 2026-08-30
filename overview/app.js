/**
 * Java Collections Architecture & Brain Map - Master Application Engine
 */

document.addEventListener("DOMContentLoaded", () => {
  // --- STATE MANAGEMENT ---
  const state = {
    currentView: "canvas",
    currentFilter: "all",
    zoomLevel: 1.0,
    panX: 40,
    panY: 40,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    selectedNodeId: null,
    // Method tab filtering inside modal
    methodSearchQuery: "",
    methodCategoryFilter: "all"
  };

  // --- DOM ELEMENTS ---
  const canvasViewport = document.getElementById("canvas-viewport");
  const canvasWorld = document.getElementById("canvas-world");
  const svgConnections = document.getElementById("svg-connections");
  const nodesContainer = document.getElementById("nodes-container");
  const spotlightCanvas = document.getElementById("spotlight-canvas");
  
  // Views
  const viewPanels = {
    canvas: document.getElementById("canvas-view"),
    grid: document.getElementById("grid-view")
  };

  // Modal
  const detailModal = document.getElementById("detail-modal");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const copyCodeBtn = document.getElementById("copy-code-btn");
  const methodSearchInput = document.getElementById("method-search-input");

  // --- INITIALIZATION ---
  initSpotlight();
  initNavigation();
  initCanvasNodesAndConnections();
  initPanAndZoom();
  initSearchAndFilter();
  initModalEvents();
  initGridExplorer();

  // --- 0. INTERACTIVE CURSOR SPOTLIGHT ENGINE ---
  function initSpotlight() {
    if (!spotlightCanvas) return;
    const ctx = spotlightCanvas.getContext("2d");
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    function resize() {
      spotlightCanvas.width = window.innerWidth;
      spotlightCanvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function renderSpotlight() {
      ctx.clearRect(0, 0, spotlightCanvas.width, spotlightCanvas.height);

      const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 400);
      gradient.addColorStop(0, "rgba(0, 242, 254, 0.2)");
      gradient.addColorStop(0.5, "rgba(168, 85, 247, 0.08)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, spotlightCanvas.width, spotlightCanvas.height);

      requestAnimationFrame(renderSpotlight);
    }
    renderSpotlight();
  }

  // --- 1. NAVIGATION & VIEW SWITCHING ---
  function initNavigation() {
    document.querySelectorAll(".pill-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const targetView = btn.getAttribute("data-view");
        switchView(targetView);
      });
    });
  }

  function switchView(viewName) {
    if (!viewPanels[viewName]) return;
    state.currentView = viewName;
    document.querySelectorAll(".pill-btn").forEach(b => {
      b.classList.toggle("active", b.getAttribute("data-view") === viewName);
    });

    Object.keys(viewPanels).forEach(key => {
      viewPanels[key].classList.toggle("active", key === viewName);
    });
  }

  // --- 2. CANVAS NODE & SVG CONNECTOR RENDERER ---
  function initCanvasNodesAndConnections() {
    nodesContainer.innerHTML = "";
    
    // Render Nodes
    HIERARCHY_TREE_NODES.forEach(node => {
      const data = COLLECTIONS_DATA[node.id];
      if (!data) return;

      const card = document.createElement("div");
      card.className = `node-card ${node.category}`;
      card.id = `node-${node.id}`;
      card.style.left = `${node.x}px`;
      card.style.top = `${node.y}px`;

      card.innerHTML = `
        <div class="node-header">
          <span class="node-badge">${data.category}</span>
        </div>
        <div class="node-title">${data.name}</div>
        <div class="node-subtext">${data.group}</div>
      `;

      card.addEventListener("click", (e) => {
        e.stopPropagation();
        openDetailModal(node.id);
      });

      nodesContainer.appendChild(card);
    });

    renderSVGConnections();
  }

  function renderSVGConnections() {
    const defs = svgConnections.querySelector("defs");
    svgConnections.innerHTML = "";
    if (defs) svgConnections.appendChild(defs);

    const nodeWidth = 180;
    const nodeHeight = 56;

    HIERARCHY_CONNECTIONS.forEach(conn => {
      const parentNode = HIERARCHY_TREE_NODES.find(n => n.id === conn.parent);
      const childNode = HIERARCHY_TREE_NODES.find(n => n.id === conn.child);

      if (!parentNode || !childNode) return;

      const startX = parentNode.x + nodeWidth;
      const startY = parentNode.y + nodeHeight / 2;
      const endX = childNode.x;
      const endY = childNode.y + nodeHeight / 2;

      const dx = endX - startX;
      const controlX1 = startX + dx * 0.5;
      const controlY1 = startY;
      const controlX2 = startX + dx * 0.5;
      const controlY2 = endY;

      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      const d = `M ${startX} ${startY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${endX} ${endY}`;
      
      path.setAttribute("d", d);
      path.setAttribute("class", `connection-path ${conn.type}`);
      path.setAttribute("data-parent", conn.parent);
      path.setAttribute("data-child", conn.child);
      
      if (conn.type === "extends") {
        path.setAttribute("marker-end", "url(#arrow-extends)");
      } else if (conn.type === "implements") {
        path.setAttribute("marker-end", "url(#arrow-implements)");
      }

      svgConnections.appendChild(path);
    });
  }

  // --- 3. PAN & ZOOM ENGINE (MOUSE DRAG & WHEEL) ---
  function initPanAndZoom() {
    updateTransform();

    canvasViewport.addEventListener("mousedown", (e) => {
      if (e.target.closest(".node-card") || e.target.closest(".floating-filter-bar") || e.target.closest(".bottom-dock-container")) return;
      state.isDragging = true;
      state.dragStartX = e.clientX - state.panX;
      state.dragStartY = e.clientY - state.panY;
    });

    window.addEventListener("mousemove", (e) => {
      if (!state.isDragging) return;
      state.panX = e.clientX - state.dragStartX;
      state.panY = e.clientY - state.dragStartY;
      updateTransform();
    });

    window.addEventListener("mouseup", () => {
      state.isDragging = false;
    });

    canvasViewport.addEventListener("wheel", (e) => {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
      const newZoom = Math.min(Math.max(state.zoomLevel * zoomFactor, 0.4), 2.2);

      const rect = canvasViewport.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      state.panX = mouseX - (mouseX - state.panX) * (newZoom / state.zoomLevel);
      state.panY = mouseY - (mouseY - state.panY) * (newZoom / state.zoomLevel);
      state.zoomLevel = newZoom;

      updateTransform();
    }, { passive: false });
  }

  function updateTransform() {
    canvasWorld.style.transform = `translate(${state.panX}px, ${state.panY}px) scale(${state.zoomLevel})`;
  }

  // --- 4. CATEGORY FILTERING ---
  function initSearchAndFilter() {
    document.querySelectorAll(".filter-chip").forEach(chip => {
      chip.addEventListener("click", () => {
        document.querySelectorAll(".filter-chip").forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        state.currentFilter = chip.getAttribute("data-filter");
        applyFilters();
      });
    });
  }

  function applyFilters() {
    HIERARCHY_TREE_NODES.forEach(node => {
      const card = document.getElementById(`node-${node.id}`);
      const data = COLLECTIONS_DATA[node.id];
      if (!card || !data) return;

      const matchesFilter = (state.currentFilter === "all") || (data.category === state.currentFilter);

      if (matchesFilter) {
        card.classList.remove("dimmed");
      } else {
        card.classList.add("dimmed");
      }
    });

    if (state.currentView === "grid") {
      renderGridCards();
    }
  }

  // --- 5. INTERACTIVE DETAIL MODAL WITH METHOD SEARCH ---
  function initModalEvents() {
    modalCloseBtn.addEventListener("click", closeModal);

    detailModal.addEventListener("click", (e) => {
      if (e.target === detailModal) closeModal();
    });

    // Modal Tabs
    document.querySelectorAll(".modal-tab-btn").forEach(tab => {
      tab.addEventListener("click", () => {
        const targetTab = tab.getAttribute("data-tab");
        document.querySelectorAll(".modal-tab-btn").forEach(t => t.classList.remove("active"));
        document.querySelectorAll(".modal-tab-content").forEach(c => c.classList.remove("active"));

        tab.classList.add("active");
        document.getElementById(`tab-${targetTab}`).classList.add("active");
      });
    });

    // Method search inside modal
    if (methodSearchInput) {
      methodSearchInput.addEventListener("input", (e) => {
        state.methodSearchQuery = e.target.value.toLowerCase().trim();
        renderModalMethods();
      });
    }

    // Method category chips inside modal
    document.querySelectorAll(".method-cat-chip").forEach(chip => {
      chip.addEventListener("click", () => {
        document.querySelectorAll(".method-cat-chip").forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        state.methodCategoryFilter = chip.getAttribute("data-mcat");
        renderModalMethods();
      });
    });

    // Copy Code Button
    copyCodeBtn.addEventListener("click", () => {
      const codeSnippet = document.getElementById("modal-code-snippet").textContent;
      navigator.clipboard.writeText(codeSnippet).then(() => {
        const originalText = copyCodeBtn.textContent;
        copyCodeBtn.textContent = "Copied!";
        copyCodeBtn.style.background = "var(--color-concrete)";
        copyCodeBtn.style.color = "#000";
        setTimeout(() => {
          copyCodeBtn.textContent = originalText;
          copyCodeBtn.style.background = "";
          copyCodeBtn.style.color = "";
        }, 2000);
      });
    });
  }

  function openDetailModal(id) {
    const data = COLLECTIONS_DATA[id];
    if (!data) return;

    state.selectedNodeId = id;
    state.methodSearchQuery = "";
    state.methodCategoryFilter = "all";
    if (methodSearchInput) methodSearchInput.value = "";

    // Reset method chips
    document.querySelectorAll(".method-cat-chip").forEach(c => {
      c.classList.toggle("active", c.getAttribute("data-mcat") === "all");
    });

    // Header info
    document.getElementById("modal-badge").textContent = data.category.toUpperCase();
    document.getElementById("modal-title").textContent = data.name;
    document.getElementById("modal-summary").textContent = data.summary;

    // Properties
    document.getElementById("modal-prop-structure").textContent = data.structure;
    document.getElementById("modal-prop-ordering").textContent = data.ordering;
    document.getElementById("modal-prop-duplicates").textContent = data.duplicates;
    document.getElementById("modal-prop-nulls").textContent = data.nullAllowed;
    document.getElementById("modal-prop-threadsafety").textContent = data.threadSafe;
    document.getElementById("modal-prop-version").textContent = data.javaVersion;

    // Complexities
    document.getElementById("comp-access").textContent = data.complexity.access;
    document.getElementById("comp-search").textContent = data.complexity.search;
    document.getElementById("comp-insertion").textContent = data.complexity.insertion;
    document.getElementById("comp-deletion").textContent = data.complexity.deletion;

    // Render Methods
    document.getElementById("modal-method-count").textContent = data.methods.length;
    renderModalMethods();

    // Code Snippet
    document.getElementById("modal-code-snippet").textContent = data.codeExample;

    // Guidance
    document.getElementById("modal-when-to-use").textContent = data.whenToUse;
    document.getElementById("modal-when-to-avoid").textContent = data.whenToAvoid;

    // Default to Overview tab
    document.querySelectorAll(".modal-tab-btn").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".modal-tab-content").forEach(c => c.classList.remove("active"));
    document.querySelector(".modal-tab-btn[data-tab='overview']").classList.add("active");
    document.getElementById("tab-overview").classList.add("active");

    // Highlight node in canvas
    document.querySelectorAll(".node-card").forEach(c => c.classList.remove("selected"));
    const selectedCard = document.getElementById(`node-${id}`);
    if (selectedCard) selectedCard.classList.add("selected");

    // Highlight connecting lines
    document.querySelectorAll(".connection-path").forEach(p => {
      const pParent = p.getAttribute("data-parent");
      const pChild = p.getAttribute("data-child");
      if (pParent === id || pChild === id) {
        p.classList.add("highlighted");
      } else {
        p.classList.remove("highlighted");
      }
    });

    detailModal.classList.add("active");
  }

  function renderModalMethods() {
    if (!state.selectedNodeId) return;
    const data = COLLECTIONS_DATA[state.selectedNodeId];
    if (!data) return;

    const methodsList = document.getElementById("modal-methods-list");
    methodsList.innerHTML = "";

    const filteredMethods = data.methods.filter(m => {
      const matchesCat = state.methodCategoryFilter === "all" || m.category === state.methodCategoryFilter;
      const matchesQuery = !state.methodSearchQuery || 
        m.name.toLowerCase().includes(state.methodSearchQuery) ||
        m.desc.toLowerCase().includes(state.methodSearchQuery) ||
        m.returnType.toLowerCase().includes(state.methodSearchQuery);

      return matchesCat && matchesQuery;
    });

    if (filteredMethods.length === 0) {
      methodsList.innerHTML = `<div style="text-align:center; padding: 24px; color: var(--text-muted);">No methods match your filter criteria.</div>`;
      return;
    }

    filteredMethods.forEach(m => {
      const item = document.createElement("div");
      item.className = "method-item";
      item.innerHTML = `
        <div class="method-header-line">
          <span class="method-sig">${m.returnType} ${m.name}</span>
          <span class="method-tag">${m.category || 'core'}</span>
        </div>
        <div class="method-desc">${m.desc}</div>
      `;
      methodsList.appendChild(item);
    });
  }

  function closeModal() {
    detailModal.classList.remove("active");
    document.querySelectorAll(".node-card").forEach(c => c.classList.remove("selected"));
    document.querySelectorAll(".connection-path").forEach(p => p.classList.remove("highlighted"));
  }

  // --- 6. GRID EXPLORER VIEW ---
  function initGridExplorer() {
    renderGridCards();
  }

  function renderGridCards() {
    const gridContainer = document.getElementById("grid-container");
    gridContainer.innerHTML = "";

    Object.keys(COLLECTIONS_DATA).forEach(key => {
      const data = COLLECTIONS_DATA[key];

      const matchesFilter = (state.currentFilter === "all") || (data.category === state.currentFilter);
      if (!matchesFilter) return;

      const card = document.createElement("div");
      card.className = "grid-card";
      card.innerHTML = `
        <div>
          <div class="grid-card-header">
            <span class="grid-card-title">${data.name}</span>
            <span class="node-badge" style="background: rgba(0,242,254,0.18); color: var(--color-interface);">${data.category}</span>
          </div>
          <p class="grid-card-desc">${data.summary}</p>
        </div>
        <div class="grid-card-tags">
          <span class="tag-badge">Methods: ${data.methods.length}</span>
          <span class="tag-badge">Order: ${data.ordering}</span>
          <span class="tag-badge">Thread-Safe: ${data.threadSafe.startsWith("Yes") ? "Yes" : "No"}</span>
        </div>
      `;

      card.addEventListener("click", () => openDetailModal(key));
      gridContainer.appendChild(card);
    });
  }
});
