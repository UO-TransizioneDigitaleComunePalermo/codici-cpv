// Highlight search term matches inside Exhibit table results
document.addEventListener("DOMContentLoaded", () => {
  const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const setup = () => {
    const searchInput =
      document.querySelector("input.exhibit-text-facet-input") ||
      document.querySelector('div[ex\\:role="facet"] input');
    const viewPanel = document.querySelector('[ex\\:role="viewPanel"]');
    if (!searchInput || !viewPanel) return false;

    const highlight = (term) => {
      viewPanel.querySelectorAll("mark.exhibit-highlight").forEach((m) => {
        m.replaceWith(m.textContent);
      });
      if (!term) return;
      const re = new RegExp(`(${escapeRegex(term)})`, "gi");
      viewPanel.querySelectorAll("td, a, span").forEach((el) => {
        if (!el.childElementCount) {
          el.innerHTML = el.textContent.replace(
            re,
            '<mark class="exhibit-highlight">$1</mark>'
          );
        }
      });
    };

    const debounced = (() => {
      let t;
      return () => {
        clearTimeout(t);
        t = setTimeout(() => highlight(searchInput.value.trim()), 150);
      };
    })();

    searchInput.addEventListener("input", debounced);
    const observer = new MutationObserver(debounced);
    observer.observe(viewPanel, { childList: true, subtree: true });
    return true;
  };

  const waitForExhibit = () => {
    if (setup()) return;
    setTimeout(waitForExhibit, 300);
  };

  waitForExhibit();
});
