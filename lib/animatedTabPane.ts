/** Cross-fade / slide classes for stacked tab panels (Designs platform-tab-pane). */
export function animatedTabPaneClass(
  isActive: boolean,
  paneClass: string,
  layoutClass = "",
): string {
  return [
    "animated-tab-pane",
    paneClass,
    layoutClass,
    isActive ? "is-active" : "",
  ]
    .filter(Boolean)
    .join(" ");
}
