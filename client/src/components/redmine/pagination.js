
// DYNAMIC PAGINATION
const pagination = {
  pagination: (totalPages = 1, curPage = 1) => {
    const delta = 1;
    const range = delta + 4; // use for handle visible number of links left side

    let render = [];
    let renderTwoSide = [];
    let dot = { active: "", index: "..." };
    let countTruncate = 0; // use for ellipsis - truncate left side or right side

    // use for truncate two side
    const numberTruncateLeft = curPage - delta;
    const numberTruncateRight = curPage + delta;

    let active = "";
    for (let pos = 1; pos <= totalPages; pos++) {
      active = pos === curPage ? "active" : "";
      // truncate
      if (totalPages >= 2 * range - 1) {
        if (
          numberTruncateLeft > 3 &&
          numberTruncateRight < totalPages - 3 + 1
        ) {
          // truncate 2 side
          if (pos >= numberTruncateLeft && pos <= numberTruncateRight) {
            renderTwoSide.push(renderPage(pos, active));
          }
        } else {
          // truncate left side or right side
          if (
            (curPage < range && pos <= range) ||
            (curPage > totalPages - range && pos >= totalPages - range + 1) ||
            pos === totalPages ||
            pos === 1
          ) {
            render.push(renderPage(pos, active));
          } else {
            countTruncate++;
            if (countTruncate === 1) render.push(dot);
          }
        }
      } else {
        // not truncate
        render.push(renderPage(pos, active))
      }
    }
    if (renderTwoSide.length) {
      renderTwoSide = [
        renderPage(1),
        dot,
        ...renderTwoSide,
        dot,
        renderPage(totalPages),
      ];
      return renderTwoSide;
    } else {
      return render;
    }
  },
};

function renderPage(index, active = "") {
  return {
    active: active,
    index: index,
  };
}
export default pagination;
